import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitToGoogleSheets } from '../../services/sheetsService';
import { useLatencyPing } from '../../hooks/useLatencyPing';
import { CONNECTED_NETWORKS, STATIONS_DATA } from '../../constants/data';

export default function HeroDetails() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { latencyMs, isTesting, measureLatency } = useLatencyPing();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await submitToGoogleSheets({
        formType: 'EV Driver Waitlist (Hero Top)',
        email
      });
      if (!result.success) throw result.error;
      setDeliveryConfirmed(result.confirmed);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#EF6156', '#299093', '#FFBD00', '#061A1E']
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 bg-[#F5F3ED] px-4 py-14 dark:bg-[#07090E] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#D8D4C9] pb-6 text-xs font-mono-tech uppercase text-[#8E8B82] dark:border-[#1F2837] sm:flex-row sm:items-center sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 animate-ping-soft rounded-full bg-[#299093]" />
            <span className="font-bold text-[#061A1E] dark:text-white">NETWORK DATA PREVIEW</span>
            <span className="hidden xl:inline">• PAN-INDIA AGGREGATION</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <span>[NETWORKS SHOWN: {String(CONNECTED_NETWORKS.length).padStart(2, '0')}]</span>
            <span className="font-semibold">[STATIONS: {String(STATIONS_DATA.length).padStart(2, '0')}]</span>
            <button
              onClick={measureLatency}
              title="Measure this page's response time"
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#EF6156]/30 bg-[#EF6156]/15 px-2.5 py-1 text-[11px] font-bold text-[#EF6156] transition-all hover:bg-[#EF6156]/25"
            >
              <RefreshCw className={`h-3 w-3 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{latencyMs === null ? '—' : `${latencyMs}MS`} PAGE RTT</span>
            </button>
          </div>
        </div>

        <div className="mb-10 flex flex-col justify-between gap-8 pt-2 md:flex-row md:items-end">
          <p className="max-w-2xl text-base font-normal leading-relaxed text-[#061A1E]/80 dark:text-slate-300 sm:text-xl">
            Finding a working charger without juggling apps?{' '}
            <strong className="font-bold text-[#061A1E] underline decoration-[#EF6156] decoration-4 underline-offset-4 dark:text-white">
              That's ONUZ.
            </strong>{' '}
            Real-time station availability, queue intelligence, and one-tap checkout across Tata Power, Zeon, Shell, and ChargeZone.
          </p>

          <div className="w-full shrink-0 md:max-w-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" aria-busy={isSubmitting}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter email address..."
                  className="flex-1 rounded-full border border-[#D8D4C9] bg-white px-4 py-3 text-sm text-[#061A1E] shadow-sm transition-all placeholder:text-[#8E8B82] focus:border-[#061A1E] focus:outline-none dark:border-[#1F2837] dark:bg-[#131924] dark:text-white dark:focus:border-white"
                />
                <button type="submit" disabled={isSubmitting} className="btn-onuz group shrink-0 disabled:cursor-wait disabled:opacity-60">
                  <span className="wipe-layer wipe-layer-1 bg-[#EF6156]" />
                  <span className="wipe-layer wipe-layer-2 bg-[#299093]" />
                  <span className="wipe-layer wipe-layer-3 bg-[#FFBD00]" />
                  <span className="btn-content">
                    <span className="transition-colors group-hover:text-[#061A1E]">{isSubmitting ? 'SENDING...' : 'CLAIM SPOT'}</span>
                    <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-[#061A1E]" />
                  </span>
                </button>
              </form>
            ) : (
              <div role="status" className="flex items-center gap-3 rounded-2xl border border-[#299093]/40 bg-[#299093]/15 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#299093] text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono-tech text-xs font-bold uppercase text-[#299093]">
                    {deliveryConfirmed ? 'REQUEST RECEIVED' : 'REQUEST DISPATCHED'}
                  </div>
                  <div className="text-xs text-[#061A1E] dark:text-slate-300">
                    {deliveryConfirmed
                      ? 'Your early-access request was received. We’ll be in touch when access opens.'
                      : 'Your request was sent from this browser, but delivery could not be confirmed.'}
                  </div>
                </div>
              </div>
            )}
            {submitError && <p role="alert" className="mt-2 text-sm text-[#B23A32] dark:text-[#FF8B80]">{submitError}</p>}
            <div className="mt-2 flex items-center gap-2 text-[11px] font-mono-tech text-[#8E8B82] dark:text-slate-400">
              <span>⚡ NO CREDIT CARD REQUIRED</span>
              <span>•</span>
              <span>EXCLUSIVE PERKS</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          <article className="flex flex-col justify-between rounded-3xl border border-[#D8D4C9] bg-white p-6 shadow-sm transition-all hover:border-[#061A1E] dark:border-[#1F2837] dark:bg-[#0E121A] dark:hover:border-white sm:p-8">
            <div>
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <span className="tech-chip"><span className="h-2 w-2 rounded-full bg-[#299093]" />TELEMETRY MATRIX</span>
                <span className="font-mono-tech text-xs text-[#8E8B82]">[01 / SYNC]</span>
              </div>
              <h2 className="mb-2 font-['Syne'] text-xl font-bold text-[#061A1E] dark:text-white sm:text-2xl">
                Pan-India Charger Mesh
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-[#061A1E]/75 dark:text-slate-400 sm:text-sm">
                One view for operator pricing, connector types, and charging availability across a sample network catalog.
              </p>
            </div>
            <div className="space-y-3 border-t border-[#D8D4C9]/60 pt-4 font-mono-tech text-xs dark:border-white/10">
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Networks in catalog:</span><strong className="text-[#061A1E] dark:text-white">{CONNECTED_NETWORKS.length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Station records:</span><strong className="text-[#299093]">{STATIONS_DATA.length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Data source:</span><strong className="text-[#EF6156]">Local demo</strong></div>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-3xl border border-[#D8D4C9] bg-white p-6 shadow-sm transition-all hover:border-[#061A1E] dark:border-[#1F2837] dark:bg-[#0E121A] dark:hover:border-white sm:p-8">
            <div>
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <span className="tech-chip"><span className="h-2 w-2 rounded-full bg-[#EF6156]" />ZERO APP SWITCHING</span>
                <span className="font-mono-tech text-xs text-[#8E8B82]">[02 / PAY]</span>
              </div>
              <h2 className="mb-2 font-['Syne'] text-xl font-bold text-[#061A1E] dark:text-white sm:text-2xl">
                One Account. One Invoice.
              </h2>
              <p className="mb-6 text-xs leading-relaxed text-[#061A1E]/75 dark:text-slate-400 sm:text-sm">
                Forget maintaining 8 different prepaid wallet balances. Pay once via UPI, Fastag, or AutoPay with consolidated monthly GST tax filing.
              </p>
            </div>
            <div className="space-y-3 border-t border-[#D8D4C9]/60 pt-4 font-mono-tech text-xs dark:border-white/10">
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Settlement protocol:</span><strong className="text-[#061A1E] dark:text-white">Instant UPI 2.0</strong></div>
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Corporate GST compliance:</span><strong className="text-[#299093]">Automated 100%</strong></div>
              <div className="flex items-center justify-between"><span className="text-[#8E8B82]">Supported wallets:</span><strong className="text-[#FFBD00]">Universal AutoPay</strong></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
