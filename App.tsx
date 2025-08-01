// src/App.tsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './components/Scene';
import LoadingScreen from './components/LoadingScreen';
import { MEMORIES } from './constants';
import useImagePreloader from './hooks/useImagePreloader';
// lucide-react paketini yüklediğini varsayıyorum. Yüklemediysen bir önceki cevaptaki adımları uygula.
import { Volume2, VolumeX } from 'lucide-react';

function App() {
  const imageUrls = MEMORIES.filter(m => m.img).map(m => m.img);
  const { allImagesLoaded } = useImagePreloader(imageUrls);

  const [isExperienceStarted, setIsExperienceStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (isExperienceStarted && audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(error => console.error("Ses dosyası otomatik başlatılamadı:", error));
      }
    }
  }, [isMuted, isExperienceStarted]);

  const handleStartExperience = () => {
    setIsExperienceStarted(true);
  };

  if (!allImagesLoaded) {
    return <LoadingScreen />;
  }
  
  if (!isExperienceStarted) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Canım Anneme...</h1>
        <p className="text-xl max-w-lg mb-8">Hayatının en güzel anılarına doğru bir yolculuk seni bekliyor.</p>
        <button
          onClick={handleStartExperience}
          className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300"
        >
          Yolculuğa Başla
        </button>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsMuted(!isMuted)} 
        className="fixed top-5 right-5 z-50 p-3 bg-black/50 text-white rounded-full transition-opacity hover:opacity-100 opacity-80"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* KRİTİK DEĞİŞİKLİK: bg-black sınıfı buradan kaldırıldı! */}
      <main className="h-full w-full">
        {MEMORIES.map((memory, index) => (
          <Scene
            key={memory.id}
            memory={memory}
            index={index}
            total={MEMORIES.length}
          />
        ))}
      </main>

      <audio ref={audioRef} src="/sarki.mp3" loop />
    </>
  );
}

export default App;