// src/components/Scene.tsx

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
  
  useLayoutEffect(() => {
    if (!sceneRef.current) return;
    
    // ANİMASYON MANTIĞI: Her sahne giriş yapar, durur ve çıkış yapar.
    const image = sceneRef.current.querySelector('.scene-image');
    const text = sceneRef.current.querySelector('.scene-text');
    const finalSignature = sceneRef.current.querySelector('.scene-signature');
    
    // GİRİŞ ANİMASYONU: Sahne belirir
    const enterAnimation = gsap.fromTo(sceneRef.current, 
      { autoAlpha: 0 }, 
      { autoAlpha: 1, duration: 1, ease: 'power2.inOut' }
    );
    
    // ÇIKIŞ ANİMASYONU: Sahne kaybolur (eğer son sahne değilse)
    if (!isFinale) {
        gsap.to(sceneRef.current, {
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.inOut',
            delay: 4 // Giriş (1sn) + Ekranda kalma (3sn) = 4sn sonra çıkış başlar
        });
    }

    // Sahne temizlendiğinde tüm animasyonları durdur
    return () => {
        gsap.killTweensOf(sceneRef.current);
    }
  }, [memory, isFinale]);

  return (
    <section ref={sceneRef} className="absolute inset-0 flex items-center justify-center bg-black opacity-0">
      
      {/* Resim Alanı */}
      <div className="absolute inset-0">
        {memory.img && (
          <img
            src={memory.img}
            alt={`Memory ${memory.id}`}
            // Fotoğrafın kırpılmadan ekrana sığmasını sağlar
            className="scene-image w-full h-full object-contain"
          />
        )}
      </div>

      {/* Okunabilirlik İçin Gradient Katmanı */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/60" />

      {/* Metin Alanı */}
      <div className="scene-text relative flex items-center justify-center text-center p-4">
        {isFinale ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white text-5xl md:text-8xl font-extrabold" style={{ textShadow: '0 4px 25px rgba(0,0,0,1)' }}>
              {memory.text}
            </h1>
            <div className="scene-signature mt-12">
                <p className="text-white/80 text-2xl md:text-3xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Seni her zaman ve her şeyden çok seven,</p>
                <p className="text-amber-300 mt-2 text-3xl md:text-4xl font-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Ailen</p>
            </div>
          </div>
        ) : (
          <h1 className="text-white max-w-5xl text-4xl md:text-6xl font-bold leading-tight"
              style={{ textShadow: '0 3px 20px rgba(0,0,0,0.8)' }}>
            {memory.text}
          </h1>
        )}
      </div>
    </section>
  );
};

export default Scene;