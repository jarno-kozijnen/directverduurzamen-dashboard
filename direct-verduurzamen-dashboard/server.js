const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const META_ACCOUNT_ID = '627183079667838'; // Directverduurzamen

// Windsor API configuration
const WINDSOR_API_BASE = 'https://api.windsor.ai/v1';
// Note: In production, set WINDSOR_TOKEN via environment or secure config

app.get('/api/data', async (req, res) => {
  try {
    const { dateFrom, dateTo, granularity = 'day' } = req.query;

    if (!dateFrom || !dateTo) {
      return res.status(400).json({
        success: false,
        error: 'dateFrom en dateTo zijn verplicht'
      });
    }

    // For now, return mock data - in production this would call Windsor API
    const data = getMockData(dateFrom, dateTo);

    res.json({
      success: true,
      data: data,
      metadata: {
        dateFrom,
        dateTo,
        granularity,
        rowCount: data.length,
        note: 'Vervang met echte Windsor API calls'
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

function getMockData(dateFrom, dateTo) {
  // Mock data for testing
  const campaigns = [
    { name: 'MH | Bel Direct | 09-12', adsets: ['AS_09-12_Almelo_MA-VR'], ads: ['AD_Bel_Direct_V1', 'AD_Bel_Direct_V2'], status: 'INACTIVE' },
    { name: 'MH | Afspraak | 13-17', adsets: ['AS_13-17_Almelo_MA-VR'], ads: ['AD_Afspraak_V1', 'AD_Afspraak_V2'], status: 'INACTIVE' },
    { name: 'MH | Info | Avond', adsets: ['AS_Avond_Almelo_MA-Do+WE'], ads: ['AD_Info_Avond_V1', 'AD_Info_Avond_V2'], status: 'INACTIVE' },
    {
      name: 'META_CORE_KOZIJNEN_TWENTE_PLUS',
      adsets: ['GEO_TWENTE_PLUS_BROAD'],
      ads: ['HOOK_ACHTERAF_BETALEN_1A_STATIC', 'HOOK_0_RENTE_1A_STATIC', 'HOOK_GRATIS_HORREN_1A_STATIC', 'HOOK_GEEN_AANBETALING_1A_STATIC', 'HOOK_VERGELIJKEN_1A_STATIC', 'HOOK_NOOIT_MEER_SCHILDEREN_1A_STATIC'],
      status: 'ACTIVE'
    }
  ];

  const data = [];
  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    campaigns.forEach(campaign => {
      campaign.adsets.forEach(adset => {
        campaign.ads.forEach(ad => {
          // Generate higher performance for active campaigns
          const isActive = campaign.status === 'ACTIVE';
          const baseSpend = isActive ? 35 + Math.random() * 25 : Math.random() * 10;
          const baseImpressions = isActive ? 1800 + Math.floor(Math.random() * 1200) : Math.floor(Math.random() * 500);
          const baseClicks = isActive ? 120 + Math.floor(Math.random() * 80) : Math.floor(Math.random() * 30);
          const baseConversions = isActive ? 8 + Math.floor(Math.random() * 7) : Math.floor(Math.random() * 2);

          data.push({
            date: d.toISOString().split('T')[0],
            campaign_name: campaign.name,
            campaign: campaign.name,
            adset_name: adset,
            adset: adset,
            ad_name: ad,
            ad: ad,
            spend: parseFloat(baseSpend.toFixed(2)),
            impressions: baseImpressions,
            reach: Math.floor(baseImpressions * 0.85),
            clicks: baseClicks,
            conversions: baseConversions,
            actions_lead: baseConversions,
            cpc: (baseClicks > 0 ? baseSpend / baseClicks : 0).toFixed(2),
            cpm: (baseImpressions > 0 ? (baseSpend / baseImpressions * 1000) : 0).toFixed(2),
            ctr: (baseImpressions > 0 ? (baseClicks / baseImpressions * 100) : 0).toFixed(2),
            frequency: (1.15 + Math.random() * 0.3).toFixed(2),
            status: campaign.status
          });
        });
      });
    });
  }

  return data;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dashboard running on http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/public/dashboard.html in your browser`);
});
