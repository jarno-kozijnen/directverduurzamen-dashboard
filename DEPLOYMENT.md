# Direct Verduurzamen Dashboard - Deployment

## Live URL
Beschikbaar op: https://directverduurzamen-dashboard.vercel.app

## Lokaal uitvoeren
```bash
node server.js
# Open http://localhost:3000
```

## Vercel Deployment Setup

### Optie 1: Automatisch via GitHub Actions (aanbevolen)
1. Ga naar GitHub repository settings
2. Voeg deze secrets toe:
   - `VERCEL_TOKEN`: Token van https://vercel.com/account/tokens
   - `VERCEL_ORG_ID`: Je Vercel team ID
   - `VERCEL_PROJECT_ID`: Project ID (krijg je na eerste deploy)

### Optie 2: Handmatig via Vercel Dashboard
1. Login op https://vercel.com
2. Klik "Add New Project"
3. Selecteer GitHub repository: `jarno-kozijnen/directverduurzamen-dashboard`
4. Vercel detecteert vercel.json en deploy automatisch

### Optie 3: CLI (lokal)
```bash
npm install -g vercel
vercel deploy --prod
```

## Data Updates

### Meta Ads Data
De fallback data in `index.html` wordt automatisch bijgewerkt:
- Haal live data op van Windsor.ai
- Update de `allData` array in de `<script>` sectie
- Push naar GitHub
- Vercel redeploy automatisch

Voorbeeld live data update:
```javascript
allData = [
  {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1A_VIDEO',spend:322.92,impressions:10391,clicks:280,conversions:0,frequency:1.21,cpm:31.08,form:'Financiering Kozijnen',status:'ACTIVE'},
  // ... meer ads
];
```

## Features
- Live Meta Ads campaign performance
- Daily performance trends
- Best performing ads
- Campaign manager (toggle on/off)
- Organisch (SEO) data tab
- Responsive design
