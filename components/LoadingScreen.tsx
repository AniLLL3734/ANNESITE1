
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#111111] flex items-center justify-center z-50">
      <h1 className="text-2xl font-bold text-[#F0EFEB] animate-pulse">
        Anılar yükleniyor...
      </h1>
    </div>
  );
};

export default LoadingScreen;
