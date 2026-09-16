import "server-only";

export type GooglePlaceReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: { text?: string; languageCode?: string };
  googleMapsUri?: string;
  publishTime?: string;
  visitDate?: { year?: number; month?: number; day?: number };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

export type GooglePlace = {
  id?: string;
  displayName?: { text?: string; languageCode?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
  googleMapsUri?: string;
  googleMapsLinks?: {
    placeUri?: string;
    writeAReviewUri?: string;
    reviewsUri?: string;
    directionsUri?: string;
  };
};

const fieldMask =
  "id,displayName,rating,userRatingCount,reviews,googleMapsUri,googleMapsLinks";

type PlacesFailureCause =
  | "missing_variables"
  | "invalid_place_id"
  | "key_rejected"
  | "api_not_enabled"
  | "key_restrictions"
  | "billing_or_quota"
  | "google_temporary"
  | "parse_error"
  | "unknown";

type GoogleErrorDetails = {
  reason?: string;
  domain?: string;
};

type GoogleErrorBody = {
  error?: {
    code?: number;
    message?: string;
    status?: string;
    details?: GoogleErrorDetails[];
  };
};

function sanitizeEnvValue(value: string | undefined): string {
  if (!value) return "";

  let sanitized = value.trim();
  const quote = sanitized[0];
  if (
    (quote === '"' || quote === "'") &&
    sanitized.length >= 2 &&
    sanitized[sanitized.length - 1] === quote
  ) {
    sanitized = sanitized.slice(1, -1).trim();
  }

  return sanitized;
}

function sanitizePlaceId(value: string): string {
  return value.startsWith("places/") ? value.slice("places/".length) : value;
}

function placeIdShape(placeId: string): "chij" | "resource_name" | "url" | "cid" | "empty" | "other" {
  if (!placeId) return "empty";
  if (/^ChIJ[A-Za-z0-9_-]+$/.test(placeId)) return "chij";
  if (placeId.startsWith("places/")) return "resource_name";
  if (/^https?:\/\//i.test(placeId)) return "url";
  if (/^\d+$/.test(placeId)) return "cid";
  return "other";
}

function classifyPlacesFailure(input: {
  status?: number;
  googleStatus?: string | null;
  googleReason?: string | null;
  message?: string | null;
  parseError?: boolean;
}): PlacesFailureCause {
  if (input.parseError) return "parse_error";

  const reason = (input.googleReason ?? "").toUpperCase();
  const status = (input.googleStatus ?? "").toUpperCase();
  const message = (input.message ?? "").toLowerCase();
  const httpStatus = input.status ?? 0;

  if (
    reason === "API_KEY_HTTP_REFERRER_BLOCKED" ||
    reason === "API_KEY_IP_ADDRESS_BLOCKED" ||
    reason === "API_KEY_ANDROID_APP_BLOCKED" ||
    reason === "API_KEY_IOS_APP_BLOCKED" ||
    reason === "API_KEY_API_TARGET_BLOCKED" ||
    reason === "API_KEY_SERVICE_BLOCKED" ||
    message.includes("referer") ||
    message.includes("referrer") ||
    message.includes("not authorized to use this api key") ||
    message.includes("ip address restriction")
  ) {
    return "key_restrictions";
  }

  if (
    reason === "SERVICE_DISABLED" ||
    message.includes("has not been used") ||
    message.includes("is disabled") ||
    message.includes("api has not been enabled")
  ) {
    return "api_not_enabled";
  }

  if (
    reason === "BILLING_DISABLED" ||
    reason === "RATE_LIMIT_EXCEEDED" ||
    status === "RESOURCE_EXHAUSTED" ||
    message.includes("billing") ||
    message.includes("quota") ||
    httpStatus === 429
  ) {
    return "billing_or_quota";
  }

  if (
    reason === "API_KEY_INVALID" ||
    message.includes("api key not valid") ||
    message.includes("missing a valid api key") ||
    message.includes("api keys are not supported")
  ) {
    return "key_rejected";
  }

  if (
    httpStatus === 404 ||
    status === "NOT_FOUND" ||
    message.includes("place id") ||
    message.includes("not found")
  ) {
    return "invalid_place_id";
  }

  if (
    httpStatus >= 500 ||
    status === "UNAVAILABLE" ||
    status === "DEADLINE_EXCEEDED" ||
    status === "INTERNAL"
  ) {
    return "google_temporary";
  }

  return "unknown";
}

function redactSecrets(text: string | null | undefined, secrets: string[]): string | null {
  if (!text) return text ?? null;

  let redacted = text.replace(/AIza[0-9A-Za-z_-]{20,}/g, "[redacted]");
  redacted = redacted.replace(/(?:api[_-]?key|key)=[^&\s"]+/gi, "key=[redacted]");

  for (const secret of secrets) {
    if (secret.length < 8) continue;
    redacted = redacted.split(secret).join("[redacted]");
    const encoded = encodeURIComponent(secret);
    if (encoded !== secret && encoded.length >= 8) {
      redacted = redacted.split(encoded).join("[redacted]");
    }
  }

  return redacted;
}

function logPlacesFailure(details: {
  status?: number;
  statusText?: string;
  googleStatus?: string | null;
  googleReason?: string | null;
  message?: string | null;
  cause: PlacesFailureCause;
  placeIdLength?: number;
  placeIdShape?: ReturnType<typeof placeIdShape>;
}) {
  console.warn("Google Places request failed", {
    status: details.status ?? null,
    statusText: details.statusText ?? null,
    googleStatus: details.googleStatus ?? null,
    googleReason: details.googleReason ?? null,
    message: details.message ?? null,
    cause: details.cause,
    fieldMask,
    placeIdLength: details.placeIdLength ?? null,
    placeIdShape: details.placeIdShape ?? null,
  });
}

async function readGoogleError(response: Response): Promise<{
  googleStatus: string | null;
  googleReason: string | null;
  message: string | null;
  parseError: boolean;
}> {
  let body = "";

  try {
    body = await response.text();
  } catch {
    return {
      googleStatus: null,
      googleReason: null,
      message: "Impossible de lire le corps de réponse Google.",
      parseError: true,
    };
  }

  if (!body) {
    return {
      googleStatus: null,
      googleReason: null,
      message: null,
      parseError: false,
    };
  }

  try {
    const json = JSON.parse(body) as GoogleErrorBody;
    const error = json.error;

    return {
      googleStatus: error?.status ?? null,
      googleReason: error?.details?.find((detail) => detail.reason)?.reason ?? null,
      message: error?.message ?? null,
      parseError: false,
    };
  } catch {
    return {
      googleStatus: null,
      googleReason: null,
      message: "Réponse Google non JSON.",
      parseError: true,
    };
  }
}

export async function getGooglePlace(): Promise<GooglePlace | null> {
  const apiKey = sanitizeEnvValue(process.env.GOOGLE_PLACES_API_KEY);
  const rawPlaceId = sanitizeEnvValue(process.env.GOOGLE_PLACE_ID);
  const placeId = sanitizePlaceId(rawPlaceId);
  const secrets = [apiKey, rawPlaceId, placeId];

  if (!apiKey || !placeId) {
    const missing = [
      !apiKey ? "GOOGLE_PLACES_API_KEY" : null,
      !placeId ? "GOOGLE_PLACE_ID" : null,
    ].filter(Boolean);

    logPlacesFailure({
      message: `${missing.join(" et ")} absente(s).`,
      cause: "missing_variables",
      placeIdLength: placeId.length,
      placeIdShape: placeIdShape(rawPlaceId),
    });
    return null;
  }

  try {
    const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`);
    url.searchParams.set("languageCode", "fr");
    url.searchParams.set("regionCode", "FR");

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const googleError = await readGoogleError(response);
      logPlacesFailure({
        status: response.status,
        statusText: response.statusText,
        googleStatus: googleError.googleStatus,
        googleReason: googleError.googleReason,
        message: redactSecrets(googleError.message, secrets),
        cause: classifyPlacesFailure({
          status: response.status,
          googleStatus: googleError.googleStatus,
          googleReason: googleError.googleReason,
          message: googleError.message,
          parseError: googleError.parseError,
        }),
        placeIdLength: placeId.length,
        placeIdShape: placeIdShape(rawPlaceId),
      });
      return null;
    }

    try {
      return (await response.json()) as GooglePlace;
    } catch {
      logPlacesFailure({
        status: response.status,
        statusText: response.statusText,
        message: "Réponse Google illisible.",
        cause: "parse_error",
        placeIdLength: placeId.length,
        placeIdShape: placeIdShape(rawPlaceId),
      });
      return null;
    }
  } catch {
    logPlacesFailure({
      message: "Erreur réseau ou exception locale pendant l’appel Google Places.",
      cause: "google_temporary",
      placeIdLength: placeId.length,
      placeIdShape: placeIdShape(rawPlaceId),
    });
    return null;
  }
}
