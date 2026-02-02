#!/usr/bin/env node
import { translate } from '../lib/translate.mjs';

(async () => {
  try {
    const t = await translate('hello', 'en', 'fr');
    console.log('en->fr:', t);
    const j = await translate('hello', 'en', 'ja');
    console.log('en->ja:', j);
  } catch (e) {
    console.error('translate check failed', e.message);
    process.exit(1);
  }
})();