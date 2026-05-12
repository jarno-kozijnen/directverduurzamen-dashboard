# Direct Verduurzamen - Meta Ads Dashboard

Realtime Meta Ads performance dashboard voor Direct Verduurzamen.

## Features

- 📊 Realtime data uit Meta Ads API (via Windsor.ai)
- 📅 Per dag, week en maand breakdown
- 🎯 Drill-down: Campagne → Ad Set → Ad niveau
- 📈 KPI cards met spend, leads, CPL
- 🔍 Filters en sorteerfunctionaliteit
- 📱 Responsief design voor alle devices

## Setup

### 1. Prerequisites
- Node.js 14+
- Windsor.ai account met Meta Ads connector gekoppeld

### 2. Installation

```bash
npm install
```

### 3. Environment Setup

Kopieer `.env.example` naar `.env` en vul je Windsor API key in:

```bash
cp .env.example .env
```

Edit `.env`:
```
WINDSOR_API_KEY=your_api_key_here
PORT=3000
```

### 4. Start Dashboard

```bash
npm start
```

Dashboard is beschikbaar op `http://localhost:3000`

## Datamodel

Dashboard toont data van deze 3 campagnes:
- **MH | Bel Direct | 09-12** — Almelo 40km MA-VR (09:00-12:00)
- **MH | Afspraak | 13-17** — Almelo 40km MA-VR (13:00-17:00)
- **MH | Info | Avond** — Almelo 40km MA-Do+WE (18:00-21:00 ma-do, heel weekend)

## Metrics

- Spend
- Impressions
- Reach
- Clicks
- Conversions (Leads)
- CPM (Cost Per Mille)
- CPC (Cost Per Click)
- CTR (Click Through Rate)
- Frequency
- Status

## Deployment

Voor deployment naar productie:

### Vercel
```bash
vercel
```

### Heroku
```bash
git push heroku main
```

### Custom Server
```bash
npm run start
```

## API Routes

`GET /api/data` — Fetch Meta Ads data

Query parameters:
- `dateFrom` (YYYY-MM-DD)
- `dateTo` (YYYY-MM-DD)
- `granularity` (day|week|month)

## TODO (Later)

- [ ] Tabblad 2: SEO en organische social media
- [ ] Export naar PDF/Excel
- [ ] Custom date range picker
- [ ] UTM tracking data
- [ ] Lead form data integration
- [ ] Creative/hook breakdown
- [ ] Audience/location breakdown
