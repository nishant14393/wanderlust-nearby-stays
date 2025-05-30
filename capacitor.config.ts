
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d4a0175bf4644c1f8545e1a0a31e9336',
  appName: 'Hotel Finder',
  webDir: 'dist',
  server: {
    url: 'https://d4a0175b-f464-4c1f-8545-e1a0a31e9336.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ["location"]
    }
  }
};

export default config;
