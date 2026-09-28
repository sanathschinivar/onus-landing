import { useState, useEffect } from 'react';

/**
 * Reusable countdown timer hook
 * @param {number|string|Date} targetDateOrSeconds - Target timestamp or initial seconds
 * @param {boolean} isTimestamp - True if target is future Date timestamp
 */
export function useCountdown(targetDateOrSeconds, isTimestamp = false) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (isTimestamp) {
      const target = new Date(targetDateOrSeconds).getTime();
      const diff = Math.max(target - Date.now(), 0);
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    }
    return { seconds: Number(targetDateOrSeconds) || 0 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (isTimestamp) {
          const target = new Date(targetDateOrSeconds).getTime();
          const diff = Math.max(target - Date.now(), 0);
          return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60)
          };
        }
        return { seconds: prev.seconds > 0 ? prev.seconds - 1 : 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateOrSeconds, isTimestamp]);

  return timeLeft;
}
