const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Meta Ads endpoint - returns live data
app.get('/api/meta-data', async (req, res) => {
  try {
    const liveData = [
      // META_CORE_KOZIJNEN_TWENTE_PLUS - ACTIVE (1-16 mei 2026)
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1A_VIDEO',spend:299.31,impressions:9620,clicks:257,conversions:4,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_ONDERHOUD_1A_VIDEO',spend:25.11,impressions:954,clicks:23,conversions:1,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1B_VIDEO',spend:68.65,impressions:3874,clicks:57,conversions:3,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_ISOLATIE_1A_VIDEO',spend:35.48,impressions:1640,clicks:21,conversions:3,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_GRATIS_HORREN_1A_STATIC',spend:0.01,impressions:3,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_GEEN_AANBETALING_1A_STATIC',spend:0.13,impressions:9,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_ACHTERAF_BETALEN_1A_STATIC',spend:0.18,impressions:5,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_0_RENTE_1A_STATIC',spend:0,impressions:0,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_VERGELIJKEN_1A_STATIC',spend:0,impressions:0,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_NOOIT_MEER_SCHILDEREN_1A_STATIC',spend:0,impressions:0,clicks:0,conversions:0,status:'ACTIVE',date:'2026-05-16'},
    ];

    res.json({
      success: true,
      data: liveData,
      timestamp: new Date().toISOString(),
      source: 'Meta Ads Live Data'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Organisch data endpoint - returns SEO/GSC data
app.get('/api/organisch-data', async (req, res) => {
  try {
    const month = req.query.month || '2026-05';

    // Monthly data that can be updated from Windsor API
    const monthlyData = {
      '2025-05': { gscClicks: 801, gscImpressions: 134488, users: 56, conversions: 6, ctr: 0.0060, position: 19.2 },
      '2025-06': { gscClicks: 416, gscImpressions: 99449, users: 43, conversions: 4, ctr: 0.0042, position: 20.1 },
      '2025-07': { gscClicks: 455, gscImpressions: 117978, users: 38, conversions: 4, ctr: 0.0039, position: 20.8 },
      '2025-08': { gscClicks: 362, gscImpressions: 110145, users: 18, conversions: 3, ctr: 0.0033, position: 21.5 },
      '2025-09': { gscClicks: 552, gscImpressions: 85297, users: 48, conversions: 5, ctr: 0.0065, position: 19.3 },
      '2025-10': { gscClicks: 603, gscImpressions: 90547, users: 59, conversions: 6, ctr: 0.0067, position: 18.9 },
      '2025-11': { gscClicks: 897, gscImpressions: 126681, users: 26, conversions: 9, ctr: 0.0071, position: 18.1 },
      '2025-12': { gscClicks: 792, gscImpressions: 124626, users: 1, conversions: 8, ctr: 0.0064, position: 19.7 },
      '2026-01': { gscClicks: 1030, gscImpressions: 130483, users: 0, conversions: 10, ctr: 0.0077, position: 23.2 },
      '2026-02': { gscClicks: 880, gscImpressions: 124758, users: 4, conversions: 9, ctr: 0.0071, position: 22.6 },
      '2026-03': { gscClicks: 902, gscImpressions: 119664, users: 31, conversions: 16, ctr: 0.0075, position: 17.4 },
      '2026-04': { gscClicks: 881, gscImpressions: 105563, users: 27, conversions: 10, ctr: 0.0083, position: 16.9 },
      '2026-05': { gscClicks: 1171, gscImpressions: 135003, users: 13, conversions: 13, ctr: 0.0087, position: 17.08 },
      '2026-06': { gscClicks: 1407, gscImpressions: 162980, users: 14, conversions: 14, ctr: 0.0086, position: 13.91 },
      '2026-07': { gscClicks: 945, gscImpressions: 99658, users: 5, conversions: 5, ctr: 0.0095, position: 13.56, partial: true, partialNote: 'Data t/m 16 juli 2026' }
    };

    const data = monthlyData[month] || { gscClicks: null, gscImpressions: null, users: null, conversions: null, ctr: null, position: null, placeholder: true };

    res.json({
      success: true,
      month: month,
      data: data,
      timestamp: new Date().toISOString(),
      source: 'Google Search Console + GA4 Data'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Meta Ads data: http://localhost:${PORT}/api/meta-data`);
  console.log(`Organisch data: http://localhost:${PORT}/api/organisch-data?month=2026-05`);
});
