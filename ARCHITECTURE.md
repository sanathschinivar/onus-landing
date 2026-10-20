# ONUZ application architecture

## Product boundary

This repository contains a pre-launch marketing site and browser prototype. Network and station records, session telemetry, the roadmap, and other product-preview values come from `src/constants/data.js` or component-local sample state. No live OCPI feed, charger control, account system, or payment processing is connected.

The interest forms send a JSON payload to a Google Apps Script web app using a browser `no-cors` request. This lets the static site dispatch a lead without requiring a server, but the browser cannot read the response status or confirm that the script wrote the row. Validate the deployed script and sheet independently before relying on submissions.

## Runtime structure

- `src/main.jsx` mounts the React application.
- `src/App.jsx` owns the page flow and theme hook.
- `src/components/sections/Hero.jsx` contains the three-viewport scroll-driven hero; `HeroDetails.jsx` begins the content that follows it.
- `src/components/layout/ThreeDBackground.jsx` creates and manages the WebGL renderer.
- `src/components/evScene/createChargingScene.js` builds the EV inlet, connector, cable, and small articulated arm and updates their poses from hero scroll progress.
- `src/components/sections/` contains the network ticker, product preview, feature, portal, roadmap, and FAQ sections.
- `src/components/layout/` contains site navigation, the hero renderer, and footer.
- `src/services/sheetsService.js` validates the public Apps Script endpoint and dispatches lead payloads.
- `src/hooks/` contains theme persistence, countdown, and same-origin page response-time behavior.

## Hero rendering and performance

The WebGL scene is a separate dynamic bundle. Geometry and materials are created once when the scene initializes, not inside the render loop. Rendering is capped by a timer, uses a reduced pixel ratio on phones, and pauses when the scene is outside the viewport or the document is hidden. Continuous ambient energy animation only runs after the connector docks; reduced-motion preferences keep the scene static. If WebGL cannot initialize, a lightweight SVG illustration is used.

The page uses normal document scrolling. The hero is about three viewport heights, with the ONUZ wordmark first and the product taglines later. Scroll progress drives the cable-held connector toward an inlet that is revealed at its fixed scene position.

## Environment configuration

Create `.env.local` from `.env.example` for local development. Supported public values are:

- `VITE_GOOGLE_SHEETS_WEBHOOK_URL` for a shared Apps Script deployment.
- `VITE_GOOGLE_SHEETS_DRIVER_URL` and `VITE_GOOGLE_SHEETS_CPO_URL` for separate deployments; each may fall back to the shared URL.

The endpoint must be an HTTPS Apps Script `/macros/s/<deployment-id>/exec` URL. Production builds validate the configured routes and reject placeholders. Vite exposes `VITE_` values to client code, so do not store secrets in these variables.

## Commands

- `npm ci` installs the lockfile dependencies.
- `npm run dev` starts the local Vite server.
- `npm run lint` runs Oxlint.
- `npm run build` creates the production bundle.
- `npm run preview` serves the built bundle locally.
