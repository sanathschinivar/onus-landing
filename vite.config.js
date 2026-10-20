import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function validateWebhook(name, value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a deployed Google Apps Script /exec URL.`);
  }

  if (
    url.protocol !== 'https:'
    || url.hostname !== 'script.google.com'
    || !/^\/macros\/s\/[^/]+\/exec\/?$/.test(url.pathname)
    || /YOUR_SCRIPT_ID|PLACEHOLDER|REPLACE_WITH/i.test(value)
  ) {
    throw new Error(`${name} must be a deployed Google Apps Script /exec URL, not a placeholder.`);
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (mode === 'production') {
    const sharedUrl = env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim();
    const driverUrl = env.VITE_GOOGLE_SHEETS_DRIVER_URL?.trim() || sharedUrl;
    const cpoUrl = env.VITE_GOOGLE_SHEETS_CPO_URL?.trim() || sharedUrl;

    if (!driverUrl || !cpoUrl) {
      throw new Error('Configure VITE_GOOGLE_SHEETS_WEBHOOK_URL or both driver and CPO webhook URLs before building for production.');
    }
    validateWebhook('Driver lead webhook', driverUrl);
    validateWebhook('CPO lead webhook', cpoUrl);
  }

  return {
    plugins: [react(), tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'three', test: /node_modules[\\/]three[\\/]/, priority: 20 },
              { name: 'react-vendor', test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/, priority: 10 }
            ]
          }
        }
      }
    }
  };
})
