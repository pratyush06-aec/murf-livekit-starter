'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform sampler2D map;
uniform float width;
uniform float height;
uniform float nearClipping, farClipping;
uniform float pointSize;
uniform float zOffset;

varying vec2 vUv;

const float XtoZ = 1.11146; // tan( 1.0144686 / 2.0 ) * 2.0;
const float YtoZ = 0.83359; // tan( 0.7898090 / 2.0 ) * 2.0;

void main() {
  vUv = vec2( position.x / width, position.y / height );

  vec4 color = texture2D( map, vUv );
  float depth = ( color.r + color.g + color.b ) / 3.0;

  // Projection code by @kcmic
  float z = ( 1.0 - depth ) * (farClipping - nearClipping) + nearClipping;

  vec4 pos = vec4(
    ( position.x / width - 0.5 ) * z * XtoZ,
    ( position.y / height - 0.5 ) * z * YtoZ,
    - z + zOffset,
    1.0
  );

  gl_PointSize = pointSize;
  gl_Position = projectionMatrix * modelViewMatrix * pos;
}
`;

const fragmentShader = `
uniform sampler2D map;

varying vec2 vUv;

void main() {
  vec4 color = texture2D( map, vUv );
  gl_FragColor = vec4( color.r, color.g, color.b, 0.2 );
}
`;

export function ThreeKinectBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!mountRef.current || !videoRef.current) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let geometry: THREE.BufferGeometry, mesh: THREE.Points, material: THREE.ShaderMaterial;
    let animationFrameId: number;
    let mouse = new THREE.Vector3(0, 0, 1);
    let center = new THREE.Vector3(0, 0, -1000);

    const init = () => {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 0, 500);

      scene = new THREE.Scene();

      const video = videoRef.current!;
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;

      const width = 640;
      const height = 480;
      const nearClipping = 850;
      const farClipping = 4000;

      geometry = new THREE.BufferGeometry();

      const vertices = new Float32Array(width * height * 3);

      for (let i = 0, j = 0, l = vertices.length; i < l; i += 3, j++) {
        vertices[i] = j % width;
        vertices[i + 1] = Math.floor(j / width);
        vertices[i + 2] = 0; 
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

      material = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          width: { value: width },
          height: { value: height },
          nearClipping: { value: nearClipping },
          farClipping: { value: farClipping },
          pointSize: { value: 2 },
          zOffset: { value: 1000 },
        },
        vertexShader,
        fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true,
      });

      mesh = new THREE.Points(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';

      mountRef.current?.appendChild(renderer.domElement);

      video.addEventListener('loadeddata', () => {
        video.play().catch(e => console.warn('Autoplay prevented', e));
      });
      // Just in case it's already loaded
      if (video.readyState >= 2) {
        video.play().catch(e => console.warn('Autoplay prevented', e));
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - window.innerWidth / 2) * 8;
      mouse.y = (event.clientY - window.innerHeight / 2) * 8;
    };

    const animate = () => {
      camera.position.x += (mouse.x - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y - camera.position.y) * 0.05;
      camera.lookAt(center);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}
      >
        <source src="/textures/kinect.webm" type="video/webm" />
        <source src="/textures/kinect.mp4" type="video/mp4" />
      </video>
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-100" />
    </>
  );
}
