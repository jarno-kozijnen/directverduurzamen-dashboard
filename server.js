const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mock endpoint that returns aggregated live data
app.get('/api/meta-data', async (req, res) => {
  try {
    // In production, this would call Windsor.ai API
    // For now, returning the latest real data from Meta Ads

    const liveData = [
      // META_CORE_KOZIJNEN_TWENTE_PLUS - ACTIVE
      {campaign:'META_CORE_KOZIJNEN_TWENTE_PLUS',adset:'GEO_TWENTE_PLUS_BROAD',ad:'HOOK_FINANCIERING_1A_VIDEO',spend:42.14,impressions:2337,clicks:58,conversions:0,status:'ACTIVE',date:'2026-05-12'},

      // MH | Bel Direct - ACTIVE
      {campaign:'MH | Bel Direct | 09-12 | Almelo 40km MA-VR',adset:'MH | Bel Direct | 09-12 | Almelo 40km | MA-VR',ad:'MH | Bel Direct | besparen | 1B',spend:120.48,impressions:10316,clicks:224,conversions:0,status:'ACTIVE',date:'2026-05-12'},
      {campaign:'MH | Bel Direct | 09-12 | Almelo 40km MA-VR',adset:'MH | Bel Direct | 09-12 | Almelo 40km | MA-VR',ad:'MH | Bel Direct | Horren & HR++ glas | 1D',spend:8.03,impressions:727,clicks:12,conversions:0,status:'ACTIVE',date:'2026-05-11'},

      // MH | Afspraak - ACTIVE
      {campaign:'MH | Afspraak | 13-17 | Almelo 40km | MA-VR',adset:'MH | Afspraak | 13-17 | Almelo 40km | MA-VR',ad:'MH | Afspraak | Verduurzamen 2C',spend:36.34,impressions:2096,clicks:59,conversions:0,status:'ACTIVE',date:'2026-05-12'},
      {campaign:'MH | Afspraak | 13-17 | Almelo 40km | MA-VR',adset:'MH | Afspraak | 13-17 | Almelo 40km | MA-VR',ad:'MH | Afspraak | Horren 2D',spend:87.71,impressions:4163,clicks:126,conversions:0,status:'ACTIVE',date:'2026-05-06'},

      // MH | Info - ACTIVE
      {campaign:'MH | Info | Avond | Almelo 40km | MA-Do+WE',adset:'MH | Info | Avond | Almelo 40km | MA-Do+WE',ad:'MH | Info | Onderhoud 3A',spend:30.34,impressions:1468,clicks:40,conversions:0,status:'ACTIVE',date:'2026-05-09'},
      {campaign:'MH | Info | Avond | Almelo 40km | MA-Do+WE',adset:'MH | Info | Avond | Almelo 40km | MA-Do+WE',ad:'MH | Info | Horren 3D',spend:16.62,impressions:977,clicks:23,conversions:0,status:'ACTIVE',date:'2026-05-10'},
      {campaign:'MH | Info | Avond | Almelo 40km | MA-Do+WE',adset:'MH | Info | Avond | Almelo 40km | MA-Do+WE',ad:'MH | Info | Verduurzamen 3C',spend:17.37,impressions:1067,clicks:21,conversions:0,status:'ACTIVE',date:'2026-05-10'},
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
