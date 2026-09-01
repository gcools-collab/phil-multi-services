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
