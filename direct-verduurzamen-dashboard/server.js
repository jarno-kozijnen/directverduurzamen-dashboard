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
    { name: 'MH | Bel Direct | 09-12', adsets: ['AS_09-12_Almelo_MA-VR'], ads: ['AD_Bel_Direct_V1', 'AD_Bel_Direct_V2'] },
    { name: 'MH | Afspraak | 13-17', adsets: ['AS_13-17_Almelo_MA-VR'], ads: ['AD_Afspraak_V1', 'AD_Afspraak_V2'] },
    { name: 'MH | Info | Avond', adsets: ['AS_Avond_Almelo_MA-Do+WE'], ads: ['AD_Info_Avond_V1', 'AD_Info_Avond_V2'] }
  ];

  const data = [];
  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    campaigns.forEach(campaign => {
      campaign.adsets.forEach(adset => {
        campaign.ads.forEach(ad => {
          data.push({
            date: d.toISOString().split('T')[0],
            campaign: campaign.name,
            adset: adset,
            ad: ad,
            spend: Math.random() * 60,
            impressions: Math.floor(Math.random() * 2500),
            reach: Math.floor(Math.random() * 2200),
            clicks: Math.floor(Math.random() * 200),
            conversions: Math.floor(Math.random() * 15),
            cpc: (Math.random() * 0.05 + 0.25).toFixed(2),
            cpm: (Math.random() * 2 + 19).toFixed(2),
            ctr: (Math.random() * 2 + 6).toFixed(2),
            frequency: (Math.random() * 0.05 + 1.14).toFixed(2),
            status: 'ACTIVE'
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
