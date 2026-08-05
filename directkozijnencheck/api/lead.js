const REQUIRED = ['woning_eigendom','aantal','termijn','postcode','plaats','naam','telefoon','email','toestemming'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const missing = REQUIRED.filter((key) => !body[key]);
  if (!Array.isArray(body.product) || body.product.length === 0) missing.push('product');
  if (missing.length) return res.status(400).json({ error: 'Ontbrekende velden', fields: missing });

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email));
  const phoneOk = String(body.telefoon).replace(/\D/g, '').length >= 9;
  if (!emailOk || !phoneOk) return res.status(400).json({ error: 'Ongeldige contactgegevens' });

  const payload = {
    ...body,
    source: 'directkozijnencheck.nl',
    submitted_at: new Date().toISOString(),
    user_agent: req.headers['user-agent'] || '',
    ip_forwarded: req.headers['x-forwarded-for'] || ''
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.log('Lead ontvangen, maar LEAD_WEBHOOK_URL ontbreekt', JSON.stringify(payload));
    return res.status(503).json({ error: 'Leadkoppeling is nog niet geactiveerd' });
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET ? { 'x-webhook-secret': process.env.LEAD_WEBHOOK_SECRET } : {})
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Webhook gaf status ${response.status}`);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Doorsturen lead mislukt', error);
    return res.status(502).json({ error: 'Doorsturen van de aanvraag is mislukt' });
  }
}
