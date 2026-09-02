"use client";

import { useEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

export default function FooterPage() {
  const footerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();

      const scrollDistance =
        rect.height - window.innerHeight;

      const currentProgress =
        scrollDistance > 0
          ? -rect.top / scrollDistance
          : 0;

      setProgress(
        Math.min(
          1,
          Math.max(0, currentProgress)
        )
      );
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current =
        requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  /*
   * Smooth scroll interpolation.
   */
  const ease = (t: number) =>
    t * t * (3 - 2 * t);

  const p = ease(progress);

  /*
   * Footer rises from underneath.
   */
  const footerY = 100 - p * 100;

  /*
   * Main typography movement.
   */
  const textY = 95 - p * 95;

  /*
   * Creates the collapsing effect
   * between the duplicated text.
   */
  const collapse =
    Math.sin(p * Math.PI);

  const scale =
    1 - collapse * 0.08;

  const spacing =
    -2 - collapse * 4;

  return (
    <main className="w-full overflow-hidden bg-[#2735b9]">

      <section
        ref={footerRef}
        className="relative h-[180vh] w-full"
      >

        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* =========================================
              BLUE FOOTER
          ========================================== */}

          <div
            className="absolute inset-0 w-full bg-[#2735b9]"
            style={{
              transform: `translate3d(0, ${footerY}%, 0)`,
              willChange: "transform",
            }}
          >

            {/* =========================================
                LET'S TALK
            ========================================== */}

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">

              <div
                className="flex w-full flex-col items-center justify-center"
                style={{
                  transform: `translate3d(0, ${textY}vh, 0)`,
                  willChange: "transform",
                }}
              >

                {/* FIRST */}
                <div
                  className={`
                    ${anton.className}
                    whitespace-nowrap
                    text-[#efede7]
                    text-[18vw]
                    md:text-[16vw]
                    lg:text-[15vw]
                    leading-[0.68]
                    tracking-[-0.055em]
                  `}
                  style={{
                    transform: `scale(${scale})`,
                    marginBottom: `${spacing}vh`,
                    willChange: "transform",
                  }}
                >
                  LET&apos;S TALK
                </div>

                {/* SECOND */}
                <div
                  className={`
                    ${anton.className}
                    whitespace-nowrap
                    text-[#efede7]
                    text-[18vw]
                    md:text-[16vw]
                    lg:text-[15vw]
                    leading-[0.68]
                    tracking-[-0.055em]
                  `}
                  style={{
                    transform: `scale(${scale})`,
                    marginBottom: `${spacing}vh`,
                    willChange: "transform",
                  }}
                >
                  LET&apos;S TALK
                </div>

                {/* THIRD */}
                <div
                  className={`
                    ${anton.className}
                    whitespace-nowrap
                    text-[#efede7]
                    text-[18vw]
                    md:text-[16vw]
                    lg:text-[15vw]
                    leading-[0.68]
                    tracking-[-0.055em]
                  `}
                  style={{
                    transform: `scale(${scale})`,
                    marginBottom: `${spacing}vh`,
                    willChange: "transform",
                  }}
                >
                  LET&apos;S TALK
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}