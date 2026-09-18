import QRCode from "qrcode";
import { business } from "@/data/business";

export function getPoppinsRentalUrl() {
  return business.poppinsRentalUrl;
}

export async function getPoppinsQrSvg() {
  const svg = await QRCode.toString(getPoppinsRentalUrl(), {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark: "#071521",
      light: "#ffffff",
    },
  });

  return svg.replace(/^<\?xml[^>]*>\s*/i, "");
}
