import { Config } from '@remotion/cli/config';

// Aset khusus render video (musik, logo) dipisah dari public/ situs supaya
// tidak ikut terunggah ke website.
Config.setPublicDir('./remotion/public');
