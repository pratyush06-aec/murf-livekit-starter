'use client';

import { useEffect, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";
import type { Engine } from "@tsparticles/engine";

export function FireflyParticles() {
  const init = async (engine: Engine) => {
    await loadFireflyPreset(engine);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 h-full w-full">
      <ParticlesProvider init={init}>
        <Particles
        id="tsparticles"
        options={{
          preset: "firefly",
          fullScreen: { enable: false },
          background: {
            color: "transparent"
          },
          particles: {
            color: {
              value: "#ffcc00" // A subtle warm color matching the orangish-yellow brand
            }
          }
        }}
        className="h-full w-full opacity-60"
      />
      </ParticlesProvider>
    </div>
  );
}
