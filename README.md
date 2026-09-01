# Phil Multi-Services

Site vitrine Next.js de Phil Multi-Services à Saint-Amand-les-Eaux.

## Développement local

```bash
npm install
npm run dev
```

Le site utilise `http://localhost:3000` uniquement en développement quand aucune URL n’est configurée.

## URL publique et builds de production

Copier `.env.example` vers `.env.local`, puis remplacer la valeur d’exemple :

```bash
NEXT_PUBLIC_SITE_URL=https://votre-domaine.fr
```

`NEXT_PUBLIC_SITE_URL` doit contenir l’origine publique HTTPS, sans slash final. Un build de production échoue volontairement si cette variable est absente afin d’empêcher la publication d’URLs `localhost` dans les métadonnées, `robots.txt` et `sitemap.xml`.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Google Maps et avis Google

La section boutique ouvre déjà la fiche confirmée dans Google Maps. Le lien court sert uniquement à ouvrir Maps et n’est jamais utilisé dans un iframe.

L’affichage automatique des avis repose sur Places API (New). Dans Google Cloud, la facturation doit être activée et la clé serveur doit être limitée à Places API. Configurer `GOOGLE_PLACES_API_KEY` et `GOOGLE_PLACE_ID` dans Vercel ; le Place ID peut être conservé dans la configuration, mais la clé ne doit jamais être exposée au navigateur.

Les contenus Places sont lus à la demande avec `cache: "no-store"` et ne sont stockés ni dans le repository, ni dans un fichier statique, ni dans une base de données. En l’absence de configuration ou si Google est indisponible, les avis dynamiques sont simplement masqués et la homepage continue de fonctionner.
