import { useState, useEffect, useCallback, useRef } from 'react';

/** Measures this page's same-origin response time; it is not an OCPI network ping. */
export function useLatencyPing() {
  const [latencyMs, setLatencyMs] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const requestRef = useRef(null);

  const measureLatency = useCallback(async () => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 5000);
    setIsTesting(true);
    const start = performance.now();

    try {
      const response = await fetch(`${window.location.origin}/?rtt=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`Page ping failed: ${response.status}`);
      if (requestRef.current === controller) {
        setLatencyMs(Math.round(performance.now() - start));
      }
    } catch {
      if (requestRef.current === controller) {
        setLatencyMs(null);
      }
    } finally {
      clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
        setIsTesting(false);
      }
    }
  }, []);

  useEffect(() => () => {
    const controller = requestRef.current;
    requestRef.current = null;
    controller?.abort();
  }, []);

  return { latencyMs, isTesting, measureLatency };
}
