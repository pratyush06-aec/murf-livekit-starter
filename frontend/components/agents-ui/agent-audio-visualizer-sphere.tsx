'use client';

import React, { type ComponentProps, forwardRef, useCallback, useEffect, useRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { LocalAudioTrack, RemoteAudioTrack } from 'livekit-client';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { type AgentState, type TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { useAgentAudioVisualizerWave } from '@/hooks/agents-ui/use-agent-audio-visualizer-wave';
import { cn } from '@/lib/shadcn/utils';

export const AgentAudioVisualizerSphereVariants = cva([], {
  variants: {
    size: {
      icon: 'aspect-square h-[24px]',
      sm: 'aspect-square h-[56px]',
      md: 'aspect-square h-[112px]',
      lg: 'aspect-square h-[224px]',
      xl: 'aspect-square h-[448px]',
      full: 'w-full h-full min-h-[300px]',
    },
  },
  defaultVariants: {
    size: 'full',
  },
});

export interface AgentAudioVisualizerSphereProps {
  size?: 'icon' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  state?: AgentState;
  audioTrack?: LocalAudioTrack | RemoteAudioTrack | TrackReferenceOrPlaceholder;
  className?: string;
}

export const AgentAudioVisualizerSphere = React.forwardRef<
  HTMLDivElement,
  AgentAudioVisualizerSphereProps &
  ComponentProps<'div'> &
  VariantProps<typeof AgentAudioVisualizerSphereVariants>
>(({ size = 'full', state = 'speaking', audioTrack, className, ...props }, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  // Merge the refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref]
  );

  const containerRef = internalRef;

  // Use the same audio reactivity hook as the wave visualizer
  const { speed, amplitude, frequency, opacity } = useAgentAudioVisualizerWave({
    state,
    audioTrack,
  });

  // Keep references to our Three.js objects that need to react to audio
  const sceneParams = useRef({ amplitude, opacity, speed });

  useEffect(() => {
    sceneParams.current = { amplitude, opacity, speed };
  }, [amplitude, opacity, speed]);

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();

    // Transparent background
    scene.background = null;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Zoom is handled dynamically by audio
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // GEOMETRY - The Lines and Sphere
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central glowing dense sphere (Reddish-orange)
    const centerGeometry = new THREE.SphereGeometry(2, 32, 32);
    const centerMaterial = new THREE.PointsMaterial({
      color: 0xff4500, // Orange Red
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });
    const centerPoints = new THREE.Points(centerGeometry, centerMaterial);
    group.add(centerPoints);

    // 2. Radial Lines (White / Yellow / Orange mix)
    const lineCount = 3000;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 2 * 3); // 2 vertices per line, 3 coords
    const lineColors = new Float32Array(lineCount * 2 * 3);

    // Store data to animate the lines outward
    const lineData: {
      nx: number;
      ny: number;
      nz: number;
      radius: number;
      length: number;
      speed: number;
    }[] = [];

    const colorYellow = new THREE.Color(0xffd700); // Yellow/Gold
    const colorWhite = new THREE.Color(0xffffff); // White
    const colorOrange = new THREE.Color(0xff4500); // Orange Red

    for (let i = 0; i < lineCount; i++) {
      // Random direction on sphere
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      // Line parameters
      const startRadius = 2.0 + Math.random() * 15.0; // Random starting distance
      const length = 0.5 + Math.random() * 2.5; // Random length of the line
      const speed = 0.05 + Math.random() * 0.15; // Random outward speed

      lineData.push({ nx: x, ny: y, nz: z, radius: startRadius, length, speed });

      const i6 = i * 6;

      // Start Vertex (will be dynamically updated in animate loop, just initialize here)
      linePositions[i6] = x * startRadius;
      linePositions[i6 + 1] = y * startRadius;
      linePositions[i6 + 2] = z * startRadius;

      // End Vertex
      linePositions[i6 + 3] = x * (startRadius + length);
      linePositions[i6 + 4] = y * (startRadius + length);
      linePositions[i6 + 5] = z * (startRadius + length);

      // Mix colors: 60% Yellow, 30% White, 10% Orange
      const randColor = Math.random();
      let chosenOuterColor = colorYellow;
      if (randColor > 0.9) chosenOuterColor = colorOrange;
      else if (randColor > 0.6) chosenOuterColor = colorWhite;

      const chosenInnerColor = colorOrange; // Keep inner ends slightly orange for the glowing core effect

      // Colors - Inner vertex
      lineColors[i6] = chosenInnerColor.r;
      lineColors[i6 + 1] = chosenInnerColor.g;
      lineColors[i6 + 2] = chosenInnerColor.b;

      // Colors - Outer vertex
      lineColors[i6 + 3] = chosenOuterColor.r;
      lineColors[i6 + 4] = chosenOuterColor.g;
      lineColors[i6 + 5] = chosenOuterColor.b;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // RESIZE HANDLER using ResizeObserver for robustness
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // ANIMATION LOOP
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Fetch latest reactive values
      const { amplitude, opacity, speed } = sceneParams.current;

      // Rotate naturally
      time += 0.01 * speed;
      group.rotation.x = Math.sin(time * 0.5) * 0.5;
      group.rotation.y = time * 0.2;

      // Dynamic Audio Reactivity (Zooming/Scaling)
      // Amplitude base is 0.025, spikes up to 0.4+ when loud.
      // We scale the whole group smoothly based on this amplitude.
      const targetScale = 1.0 + amplitude * 2.5; // Scale grows by up to 2.0x

      // LERP (smoothly interpolate) scale to target
      group.scale.x += (targetScale - group.scale.x) * 0.1;
      group.scale.y += (targetScale - group.scale.y) * 0.1;
      group.scale.z += (targetScale - group.scale.z) * 0.1;

      // Dynamic opacity (dims when listening/thinking)
      centerMaterial.opacity = 0.8 * opacity;
      lineMaterial.opacity = 0.6 * opacity;

      // Animate lines outward (warp speed effect)
      const positions = lineGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < lineCount; i++) {
        const data = lineData[i];

        // Move line outward. Base speed + reactivity to audio amplitude
        data.radius += data.speed * (1.0 + amplitude * 15.0);

        // If it goes too far out, reset it back to the center
        if (data.radius > 35.0) {
          data.radius = 2.0;
        }

        const i6 = i * 6;

        // Start vertex
        positions[i6] = data.nx * data.radius;
        positions[i6 + 1] = data.ny * data.radius;
        positions[i6 + 2] = data.nz * data.radius;

        // End vertex
        positions[i6 + 3] = data.nx * (data.radius + data.length);
        positions[i6 + 4] = data.ny * (data.radius + data.length);
        positions[i6 + 5] = data.nz * (data.radius + data.length);
      }
      lineGeometry.attributes.position.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose WebGL resources
      centerGeometry.dispose();
      centerMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(AgentAudioVisualizerSphereVariants({ size }), className)}
      {...props}
    />
  );
});

AgentAudioVisualizerSphere.displayName = 'AgentAudioVisualizerSphere';
