import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.clovis.deeplinks',
  appName: 'clovis-frontoffice',
  webDir: 'dist/clovis-frontoffice/browser',
  android: { allowMixedContent: true },
  server: {
    cleartext: true,
},
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
