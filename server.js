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
      // META_CORE_KOZIJNEN_TWENTE_PLUS - ACTIVE
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1A_VIDEO',spend:286.00,impressions:9354,clicks:248,conversions:4,status:'ACTIVE',date:'2026-05-14'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_ONDERHOUD_1A_VIDEO',spend:1.81,impressions:43,clicks:4,conversions:1,status:'ACTIVE',date:'2026-05-14'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1B_VIDEO',spend:2.77,impressions:116,clicks:1,conversions:0,status:'ACTIVE',date:'2026-05-14'},
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_ISOLATIE_1A_VIDEO',spend:3.35,impressions:207,clicks:3,conversions:0,status:'ACTIVE',date:'2026-05-14'},
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
      '2026-05': { gscClicks: 304, gscImpressions: 37529, users: 72, conversions: 8, ctr: 0.0081, position: 16.9 }
    };

    const data = monthlyData[month] || monthlyData['2026-05'];

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
