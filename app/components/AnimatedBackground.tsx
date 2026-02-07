"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function FundoAnimado() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
  <Particles
    id="tsparticles"
    className="fixed top-0 left-0 w-screen h-screen -z-10"
    style={{ position: "fixed" }}
    options={{
      fullScreen: {
        enable: true,
        zIndex: -10,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.5,
              color: "#17e810",
            },
          },
        },
      },
      particles: {
        color: { value: "#a5c9ff" },
        links: {
          color: "#a5c9ff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          outModes: { default: "out" },
        },
        number: {
          density: { enable: true },
          value: 100,
        },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }}
  />
);