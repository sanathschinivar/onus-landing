# ONUZ

ONUZ is a pre-launch website and product concept for a unified EV charging experience in India. It includes a scroll-driven 3D EV connector scene, product previews, and driver and charge-point-operator interest forms.

The station catalog, charging-session values, network list, and roadmap are illustrative local data. This site does not currently connect to live charger networks, initiate charging, or process payments.

## Run locally

```sh
npm ci
npm run dev
```

To try the interest forms, copy `.env.example` to `.env.local` and set a deployed Google Apps Script web-app URL. `VITE_` values are included in the browser bundle, so only use a public endpoint URL; never put credentials or private API keys there. Production builds fail if a webhook is missing or still a placeholder.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The production build requires `VITE_GOOGLE_SHEETS_WEBHOOK_URL`, or both `VITE_GOOGLE_SHEETS_DRIVER_URL` and `VITE_GOOGLE_SHEETS_CPO_URL`. The form uses a cross-origin `no-cors` request, so the browser can report that it dispatched the request but cannot confirm that Apps Script stored it. Verify the deployed Apps Script and its sheet separately before opening the forms to the public.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the current component map and performance behavior.
