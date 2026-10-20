import React, { useEffect, useRef, useState } from 'react';
import ChargingSceneFallback from '../evScene/ChargingSceneFallback';
import ParticleField from '../layout/ParticleField';

const ThreeDBackground = React.lazy(() => import('../layout/ThreeDBackground'));
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

export default function Hero({ darkMode }) {
  const beatRefs = useRef([]);
  const [reveals, setReveals] = useState([1, 0, 0]);

  useEffect(() => {
    let frame = null;
    const updateReveals = () => {
      frame = null;
      const viewportHeight = window.innerHeight;
      setReveals(beatRefs.current.map((beat, index) => {
        if (!beat) return index === 0 ? 1 : 0;
        const progress = (viewportHeight * 0.82 - beat.getBoundingClientRect().top)
          / Math.max(beat.offsetHeight * 0.42, 1);
        return index === 0 ? 1 : 0.16 + smoothstep(progress) * 0.84;
      }));
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateReveals);
    };

    updateReveals();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <section
      id="overview"
      className="relative isolate h-[240svh] min-h-[1500px] bg-[#F5F3ED] dark:bg-[#07090E] sm:h-[255svh] sm:min-h-[1650px] lg:h-[285svh] lg:min-h-[1800px]"
      aria-label="ONUZ universal EV charging"
    >
      <ParticleField darkMode={darkMode} />

      <div className="charging-scene-viewport pointer-events-none absolute left-0 top-0 z-[1] h-[100svh] min-h-[600px] w-full">
        <React.Suspense fallback={<ChargingSceneFallback />}>
          <ThreeDBackground darkMode={darkMode} />
        </React.Suspense>
      </div>

      <div ref={(element) => { beatRefs.current[0] = element; }} className="relative z-10 flex h-[80svh] min-h-[500px] items-center px-4 sm:h-[85svh] sm:min-h-[550px] lg:h-[95svh] lg:min-h-[600px]">
        <div className="hero-beat-content mx-auto w-full max-w-[1680px]" data-revealed={reveals[0] > 0.5} style={{ opacity: reveals[0] }}>
          <h1 className="select-none text-[clamp(5rem,19vw,22rem)] font-extrabold leading-none tracking-[-0.09em] text-[#061A1E] dark:text-white">
            {['O', 'N', 'U', 'Z'].map((letter, index) => (
              <span key={letter} className="hero-stagger-item inline-block" style={{ transitionDelay: `${index * 70}ms` }}>
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div ref={(element) => { beatRefs.current[1] = element; }} className="relative z-10 flex h-[80svh] min-h-[500px] items-center px-4 sm:h-[85svh] sm:min-h-[550px] lg:h-[95svh] lg:min-h-[600px]">
        <div className="hero-beat-content mx-auto w-full max-w-[1680px]" data-revealed={reveals[1] > 0.5} style={{ opacity: reveals[1] }}>
          <h2 className="w-full text-[clamp(2rem,7.2vw,9rem)] font-extrabold leading-[1.02] tracking-[-0.065em] text-[#061A1E] dark:text-white sm:w-[56%] xl:w-[62%] 2xl:w-[65%]">
            <span className="hero-stagger-item block" style={{ transitionDelay: '40ms' }}>
              Every{' '}
              <span className="headline-pill bg-[#061A1E] text-[0.8em] text-white dark:bg-white dark:text-[#061A1E]">
                Charger
              </span>
              .
            </span>
            <span className="hero-stagger-item mt-3 block sm:mt-5" style={{ transitionDelay: '160ms' }}>
              One{' '}
              <span className="headline-pill bg-[#EF6156] text-[0.8em] text-white">
                App
              </span>
              .
            </span>
          </h2>
        </div>
      </div>

      <div ref={(element) => { beatRefs.current[2] = element; }} className="relative z-10 flex h-[80svh] min-h-[500px] items-center px-4 sm:h-[85svh] sm:min-h-[550px] lg:h-[95svh] lg:min-h-[600px]">
        <div className="hero-beat-content mx-auto w-full max-w-[1680px]" data-revealed={reveals[2] > 0.5} style={{ opacity: reveals[2] }}>
          <h2 className="w-full max-w-[1120px] text-[clamp(2.1rem,4.4vw,7rem)] font-extrabold leading-[1.02] tracking-[-0.065em] text-[#061A1E] dark:text-white sm:w-[58%] xl:w-[62%] 2xl:w-[65%] xl:text-[clamp(2.1rem,5.2vw,7rem)]">
            <span className="hero-stagger-item block" style={{ transitionDelay: '40ms' }}>The universal</span>
            <span className="hero-stagger-item my-2 block sm:my-3" style={{ transitionDelay: '140ms' }}>
              <span className="headline-pill bg-[#299093] text-[0.8em] text-white">
                Intelligence
              </span>
            </span>
            <span className="hero-stagger-item block" style={{ transitionDelay: '240ms' }}>layer for EV charging.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
