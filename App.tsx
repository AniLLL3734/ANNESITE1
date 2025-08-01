// src/App.tsx

import React, { useState, useEffect, useRef } from 'react';
import Scene from './components/Scene';
import LoadingScreen from './components/LoadingScreen';
import { MEMORIES } from './constants';
import useImagePreloader from './hooks/useImagePreloader';
import { Volume2, VolumeX } from 'lucide-react';

// Her sahnenin ekranda kalma süresi (milisaniye)
const SLIDE_DURATION_MS = 5000;

function App() {
  const imageUrls = MEMORIES.filter(m => m.img).map(m => m.img);
  const { allImagesLoaded } = useImagePreloader(imageUrls);
  
  const [isExperienceStarted, setIsExperienceStarted] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Otomatik sahne geçişi zamanlayıcısı
  useEffect(() => {
    if (isExperienceStarted && currentSceneIndex < MEMORIES.length - 1) {
      const timer = setTimeout(() => {
        setCurrentSceneIndex(prevIndex => prevIndex + 1);
      }, SLIDE_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isExperienceStarted, currentSceneIndex]);

  // Ses kontrolü
  useEffect(() => {
    if (isExperienceStarted && audioRef.current) {
      audioRef.current.volume = 0.4;
      isMuted ? audioRef.current.pause() : audioRef.current.play();
    }
  }, [isMuted, isExperienceStarted]);

  const handleStartExperience = () => {
    setIsExperienceStarted(true);
  };

  // --- Render Aşamaları ---

  if (!allImagesLoaded) {
    return <LoadingScreen />;
  }

  if (!isExperienceStarted) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Canım Anneme...</h1>
        <p className="text-xl max-w-lg mb-8">Hayatının en güzel anılarına doğru bir yolculuk.</p>
        <button onClick={handleStartExperience}
          className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300">
          Filmi Başlat
        </button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setIsMuted(!isMuted)}
        className="fixed top-5 right-5 z-50 p-3 bg-black/50 text-white rounded-full">
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <main className="relative h-screen w-screen bg-black overflow-hidden">
        <Scene
          key={MEMORIES[currentSceneIndex].id}
          memory={MEMORIES[currentSceneIndex]}
          isFinale={currentSceneIndex === MEMORIES.length - 1}
        />
      </main>
      
      {/* 
        KRİTİK DEĞİŞİKLİK BURADA: 'loop' attribute'ü eklendi.
        Bu tek kelime, ses dosyası bittiğinde otomatik olarak yeniden başlamasını sağlar.
      */}
      <audio ref={audioRef} src="/sarki.mp3" loop />
    </>
  );
}

export default App;