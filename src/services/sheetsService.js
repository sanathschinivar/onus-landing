const SHARED_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim() ?? '';
const DRIVER_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_DRIVER_URL?.trim() ?? '';
const CPO_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_CPO_URL?.trim() ?? '';

function resolveWebhookUrl(isCpo) {
  const candidate = (isCpo ? CPO_WEBHOOK_URL : DRIVER_WEBHOOK_URL) || SHARED_WEBHOOK_URL;
  if (!candidate || /YOUR_SCRIPT_ID|PLACEHOLDER/i.test(candidate)) {
    throw new Error('Lead capture is not configured. Please try again later.');
  }

  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error('Lead capture is not configured. Please try again later.');
  }

  if (
    url.protocol !== 'https:'
    || url.hostname !== 'script.google.com'
    || !/^\/macros\/s\/[^/]+\/exec\/?$/.test(url.pathname)
  ) {
    throw new Error('Lead capture is not configured. Please try again later.');
  }

  return url.toString();
}

/** Send a lead to the deployed Google Apps Script web app. */
export async function submitToGoogleSheets(payloadData) {
  const isCpo = String(payloadData.formType ?? '').toLowerCase().includes('cpo');
  const targetTab = isCpo ? 'CPO Partners' : 'EV Drivers';

  try {
    const targetUrl = resolveWebhookUrl(isCpo);
    const now = new Date();
    const payload = {
      ...payloadData,
      timestamp: now.toISOString(),
      formattedDate: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      targetTab
    };

    const response = await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload)
    });

    // Google Apps Script responses are opaque cross-origin responses in browsers.
    // A resolved opaque response means the browser dispatched the request, but its
    // response body/status cannot be inspected from this static site.
    return { success: response.type === 'opaque' || response.ok, confirmed: response.type !== 'opaque' };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unable to submit this request.')
    };
  }
}
