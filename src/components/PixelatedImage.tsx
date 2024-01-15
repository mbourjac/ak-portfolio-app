import { useEffect, useRef } from 'react';
import { usePixelization } from '../hooks/use-pixelisation';

export type PixelatedImageProps = {
  imageUrl: string;
};

export const PixelatedImage = ({ imageUrl }: PixelatedImageProps) => {
  const { config } = usePixelization();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const image = new Image();
    image.src = imageUrl;

    let currentIndex = 0;

    const drawPixelatedImage = () => {
      const currentConfig = config[currentIndex];

      if (!currentConfig) return;

      const { pixelFactor, duration } = currentConfig;
      const { width, height } = image;

      canvas.width = width;
      canvas.height = height;

      // Set the pixelation effect
      context.imageSmoothingEnabled = false;
      context.drawImage(image, 0, 0, width / pixelFactor, height / pixelFactor);
      context.drawImage(
        canvas,
        0,
        0,
        width / pixelFactor,
        height / pixelFactor,
        0,
        0,
        width,
        height,
      );

      currentIndex++;

      // Schedule the next iteration
      setTimeout(drawPixelatedImage, duration);
    };

    image.onload = () => {
      drawPixelatedImage();
    };
  }, [imageUrl, config]);

  return (
    <canvas ref={canvasRef} className="absolute block w-full object-cover" />
  );
};
