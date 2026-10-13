export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const token = req.body['h-captcha-response'];

  const r = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.HCAPTCHA_SECRET,
      response: token,
    }),
  });

  const data = await r.json();
  if (data.success) return res.status(200).send('Humano verificado');
  return res.status(400).send('Falló la verificación');
}
