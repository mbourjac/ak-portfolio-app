import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { pixelizationAtom } from '../atoms/pixelisation';

export const usePixelization = () => {
  const [pixelization, setPixelization] = useAtom(pixelizationAtom);
  const { isPixelization, config } = pixelization;

  useEffect(() => {
    const pixelizationDuration = config.reduce(
      (totalDuration, { duration }) => totalDuration + duration,
      0,
    );

    const stopPixelization = setTimeout(() => {
      setPixelization((prevPixelisation) => ({
        ...prevPixelisation,
        isPixelization: false,
      }));
    }, pixelizationDuration);

    return () => clearTimeout(stopPixelization);
  }, [config, setPixelization]);

  return { isPixelization, config };
};
