import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { Memory } from '../constants';

interface SceneProps {
  memory: Memory;
  isOpening: boolean;
  isFinale: boolean;
}

const Scene: React.FC<SceneProps> = ({ memory, isOpening, isFinale }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;

    // Scene entrance animation: fade and slight scale
    gsap.fromTo(
      sceneRef.current,
      { autoAlpha: 0, scale: 0.98 },
      { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.inOut' }
    );

    // Text animation: slide up and fade in with color transition
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }

    // Image animation: scale and fade with frame glow
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 0.95, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
      );
    }

    // Exit animation (unless finale)
    if (!isFinale) {
      gsap.to(sceneRef.current, {
        autoAlpha: 0,
        scale: 0.98,
        duration: 1,
        ease: 'power2.inOut',
        delay: 4,
      });
    }

    return () => {
      gsap.killTweensOf([sceneRef.current, textRef.current, imgRef.current]);
    };
  }, [memory, isFinale]);

  return (
    <section
      ref={sceneRef}
      className="absolute inset-0 flex flex-col bg-gradient-to-b from-gray-900 to-black opacity-0"
    >
      {/* Image Section with Elegant Frame */}
      <div className="relative h-3/5 w-full flex-shrink-0">
        {memory.img && (
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* Decorative Frame with Subtle Glow */}
            <div className="relative w-[85%] h-[85%] bg-gradient-to-r from-gray-800/50 to-gray-600/50 rounded-xl shadow-xl shadow-gray-500/30 p-3">
              <img
                ref={imgRef}
                src={memory.img}
                alt={`Memory ${memory.id}`}
                className="w-full h-full object-contain rounded-lg"
              />
              {/* Inner Frame Glow */}
              <div className="absolute inset-0 rounded-xl shadow-inner shadow-gray-400/30 pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>

      {/* Text Section with Enhanced Styling and Animations */}
      <div className="relative h-2/5 w-full flex-grow flex flex-col items-center justify-center p-6 text-center">
        {isFinale ? (
          <div className="flex flex-col items-center justify-center">
            <h1
              ref={textRef}
              className="text-5xl md:text-8xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 text-transparent bg-clip-text animate-glow"
              style={{ textShadow: '0 4px 30px rgba(251, 191, 36, 0.4)' }}
            >
              {memory.text}
            </h1>
            <div className="mt-10">
              <p className="text-gray-200 text-xl md:text-2xl animate-fadeIn">
                Seni her zaman ve her şeyden çok seven,
              </p>
              <p className="text-amber-400 mt-2 text-2xl md:text-3xl font-bold animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Ailen
              </p>
            </div>
          </div>
        ) : isOpening ? (
          <h1
            ref={textRef}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-100 via-white to-gray-100 text-transparent bg-clip-text animate-glow"
          >
            {memory.text}
          </h1>
        ) : (
          <h1
            ref={textRef}
            className="max-w-5xl text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-transparent bg-clip-text animate-glow"
          >
            {memory.text}
          </h1>
        )}
      </div>

      {/* Inline Tailwind Animation Styles */}
      <style>
        {`
          .animate-glow {
            animation: glow 2.5s ease-in-out infinite;
          }
          .animate-fadeIn {
            animation: fadeIn 1.2s ease-out forwards;
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 12px rgba(255, 255, 255, 0.4); }
            50% { text-shadow: 0 0 24px rgba(255, 255, 255, 0.7); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Scene;