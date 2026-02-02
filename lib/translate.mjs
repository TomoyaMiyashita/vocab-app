import fetch from 'node-fetch';

const DEFAULT_URLS = ['https://translate.argosopentech.com', 'https://libretranslate.de'];
const LIBRE_URL = process.env.LIBRETRANSLATE_URL ?? DEFAULT_URLS[0];
const API_KEY = process.env.LIBRETRANSLATE_API_KEY ?? undefined;

export async function translate(text, source, target) {
  const url = `${LIBRE_URL}/translate`;
  const body = {
    q: text,
    source,
    target,
    format: 'text',
  };
  if (API_KEY) body.api_key = API_KEY;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`translate failed: ${res.status}`);
  }
  const data = await res.json();
  return data.translatedText;
}
