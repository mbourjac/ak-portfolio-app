import { atom } from 'jotai';

const pixelisation = {
  isPixelization: true,
  config: [
    { pixelFactor: 30, duration: 300 },
    { pixelFactor: 10, duration: 500 },
    { pixelFactor: 5, duration: 200 },
  ],
};

export const pixelizationAtom = atom(pixelisation);
