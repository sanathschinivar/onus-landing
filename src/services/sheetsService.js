// Google Sheets Webhook Service for ONUZ (onuz.in)

export const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';
export const GOOGLE_SHEETS_DRIVER_URL = import.meta.env.VITE_GOOGLE_SHEETS_DRIVER_URL || '';
export const GOOGLE_SHEETS_CPO_URL = import.meta.env.VITE_GOOGLE_SHEETS_CPO_URL || '';

/**
 * Submit form data to Google Sheets Webhook
 * @param {Object} payloadData - Form fields to record in Google Sheets
 */
export async function submitToGoogleSheets(payloadData) {
  const isCpo = payloadData.formType && payloadData.formType.toLowerCase().includes('cpo');
  
  // Determine target webhook URL (specific CPO/Driver URL, or fallback to single URL)
  let targetUrl = isCpo 
    ? (GOOGLE_SHEETS_CPO_URL || GOOGLE_SHEETS_WEBHOOK_URL)
    : (GOOGLE_SHEETS_DRIVER_URL || GOOGLE_SHEETS_WEBHOOK_URL);

  const payload = {
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    targetTab: isCpo ? 'CPO Partners' : 'EV Drivers',
    ...payloadData
  };

  console.log(`[ONUZ Submission -> ${payload.targetTab}]:`, payload);

  if (!targetUrl) {
    console.warn('[ONUZ] Google Sheets Webhook URL is not configured yet. Set VITE_GOOGLE_SHEETS_WEBHOOK_URL in .env');
    return { success: true, simulated: true };
  }

  try {
    await fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return { success: true };
  } catch (error) {
    console.error('[ONUZ] Error submitting to Google Sheets:', error);
    return { success: false, error };
  }
}
