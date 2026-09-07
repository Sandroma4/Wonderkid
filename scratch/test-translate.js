import { translate } from '@vitalets/google-translate-api';

async function test() {
  try {
    const res = await translate('Bonjour le monde', { to: 'en' });
    console.log(res.text);
  } catch (err) {
    console.error(err);
  }
}

test();
