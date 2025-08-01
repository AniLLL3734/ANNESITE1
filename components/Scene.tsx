// src/components/Scene.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Memory } from '../constants';

gsap.registerPlugin(ScrollTrigger);

// Bu yardımcı fonksiyonu component dışına almak daha temizdir.
const splitText = (element: HTMLElement | null) => {
    if (element && element.textContent) {
      const text = element.textContent;
      element.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        if (char === ' ') span.style.minWidth = '0.25em';
        element.appendChild(span);
      });
      return Array.from(element.querySelectorAll('span'));
    }
    return [];
  };


interface SceneProps {
  memory: Memory;
  index: number;
  total: number;
}

const Scene: React.FC<SceneProps> = ({ memory, index, total }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      const isOpening = index === 0;
      const isFinale = index === total - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        },
      });

      if (isOpening) {
        const chars = splitText(textRef.current);
        tl.from(chars, {
            autoAlpha: 0, scale: 2.5, rotationX: -90, transformOrigin: '50% 50% -50px', stagger: 0.05,
          })
          .to(chars, { autoAlpha: 0, y: -100, stagger: 0.03 }, "+=1.5");
      } 
      else if (isFinale) {
        tl.fromTo(imageRef.current, { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 2 })
          .from(textRef.current, { autoAlpha: 0, scale: 0.8, y: 50 }, "-=1");
      } 
      else {
        const animationStyle = index % 3;
        switch (animationStyle) {
          case 0:
            tl.from([imageRef.current, textRef.current], { autoAlpha: 0, y: '50vh', stagger: 0.2, duration: 2 })
              .to([imageRef.current, textRef.current], { autoAlpha: 0, y: '-50vh', stagger: 0.1, duration: 2 }, "+=2");
            break;
          case 1:
            tl.fromTo(imageRef.current, { scale: 2.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 2 })
              .from(textRef.current, { autoAlpha: 0, scale: 0.5, duration: 1.5 }, "-=1.5")
              .to([imageRef.current, textRef.current], { scale: 0.8, autoAlpha: 0, duration: 2 }, "+=2");
            break;
          case 2:
            tl.from(imageRef.current, { xPercent: -100, autoAlpha: 1, duration: 2 })
              .from(textRef.current, { autoAlpha: 0 }, "-=1")
              .to(sceneRef.current, { xPercent: 100, duration: 2, ease: "power2.in" }, "+=2");
            break;
        }
      }
    }, sceneRef);
    return () => ctx.revert();
  }, [index, total]);
  
  return (
    // KRİTİK DEĞİŞİKLİK: bg-black sınıfı buraya eklendi!
    <section ref={sceneRef} className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        {memory.img && (
          <img
            ref={imageRef}
            src={memory.img}
            alt={`Memory ${memory.id}`}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60" />

      <div className="absolute inset-0 flex items-center justify-center text-center p-4 pointer-events-none">
          {index === total - 1 ? (
              <div ref={textRef as React.RefObject<HTMLDivElement>} className="flex flex-col items-center justify-center">
                  <h1 className="text-white text-5xl md:text-8xl font-extrabold" style={{ textShadow: '0 4px 25px rgba(0,0,0,1)' }}>
                      {memory.text}
                  </h1>
                  <p className="text-white/80 mt-12 text-2xl md:text-3xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Seni her zaman ve her şeyden çok seven,</p>
                  <p className="text-amber-300 mt-2 text-3xl md:text-4xl font-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Ailen</p>
              </div>
          ) : (
              <h1
                  ref={textRef}
                  className="text-white max-w-5xl text-4xl md:text-6xl font-bold leading-tight"
                  style={{ textShadow: '0 3px 20px rgba(0,0,0,0.8)' }}
              >
                  {memory.text}
              </h1>
          )}
      </div>
    </section>
  );
};

export default Scene;