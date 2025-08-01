
import { useState, useEffect } from 'react';

const useImagePreloader = (imageUrlList: string[]) => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imageCount = imageUrlList.filter(url => url).length;

    if (imageCount === 0) {
      setAllImagesLoaded(true);
      return;
    }

    imageUrlList.forEach((imageUrl) => {
      if (!imageUrl) return;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageCount) {
          // Add a small delay to ensure rendering is complete
          setTimeout(() => setAllImagesLoaded(true), 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.error(`Could not load image: ${imageUrl}`);
        if (loadedCount === imageCount) {
          setTimeout(() => setAllImagesLoaded(true), 500);
        }
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { allImagesLoaded };
};

export default useImagePreloader;
