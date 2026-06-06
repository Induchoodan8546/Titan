"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import ProceduralBuilding from "./ProceduralBuilding";

interface SceneProps {
  scrollProgress: number;
}

// Camera controller that flies around the building based on page scroll
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Define keyframe positions for camera flight path based on scrollProgress (0 to 1)
    let targetX = 0;
    let targetY = 6.5;
    let targetZ = 13.0;
    let targetLookAtY = 5.5;

    if (scrollProgress < 0.25) {
      // Phase 1: Hero to Stats - Zoom in to lower-middle floor
      const t = scrollProgress / 0.25;
      targetX = THREE.MathUtils.lerp(0, 3.5, t);
      targetY = THREE.MathUtils.lerp(6.5, 4.5, t);
      targetZ = THREE.MathUtils.lerp(13.0, 7.5, t);
      targetLookAtY = THREE.MathUtils.lerp(5.5, 3.8, t);
    } else if (scrollProgress < 0.5) {
      // Phase 2: Stats to Amenities - Orbit to the side/back of the building
      const t = (scrollProgress - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(3.5, -4.5, t);
      targetY = THREE.MathUtils.lerp(4.5, 6.0, t);
      targetZ = THREE.MathUtils.lerp(7.5, 6.0, t);
      targetLookAtY = THREE.MathUtils.lerp(3.8, 5.5, t);
    } else if (scrollProgress < 0.75) {
      // Phase 3: Amenities to Projects - Fly up close to the penthouse/crown
      const t = (scrollProgress - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(-4.5, 0.0, t);
      targetY = THREE.MathUtils.lerp(6.0, 13.5, t);
      targetZ = THREE.MathUtils.lerp(6.0, 4.5, t);
      targetLookAtY = THREE.MathUtils.lerp(5.5, 12.8, t);
    } else {
      // Phase 4: Projects to Contact - Pull back out to reveal full building majestically
      const t = (scrollProgress - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(0.0, -5.5, t);
      targetY = THREE.MathUtils.lerp(13.5, 7.5, t);
      targetZ = THREE.MathUtils.lerp(4.5, 12.0, t);
      targetLookAtY = THREE.MathUtils.lerp(12.8, 6.5, t);
    }

    // Smooth lerping for cinematic motion
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);

    // Apply look-at smoothly
    const lookTarget = new THREE.Vector3(0, THREE.MathUtils.lerp(camera.position.y - 1, targetLookAtY, 0.04), 0);
    camera.lookAt(lookTarget);
  });

  return null;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-luxury-black overflow-hidden pointer-events-none">
      {/* City sunset background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a12] via-[#050508] to-luxury-black opacity-90" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-bronze-900/10 blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-900/10 blur-[180px]" />

      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 6.5, 13.0], fov: 45 }}
      >
        {/* Fog to blend building into background */}
        <fog attach="fog" args={["#050505", 10, 28]} />

        {/* Ambient illumination */}
        <ambientLight intensity={0.9} color="#0c1220" />

        {/* Dynamic golden sunset main light */}
        <directionalLight
          position={[10, 8, 5]}
          intensity={3.5}
          color="#fcd34d"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={30}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={15}
          shadow-camera-bottom={-2}
        />

        {/* Soft fill light from the opposite side */}
        <directionalLight position={[-10, 5, -5]} intensity={1.5} color="#818cf8" />

        {/* Lobby ground glowing spot */}
        <pointLight position={[0, 0.5, 2.5]} intensity={2.5} distance={6} color="#fbbf24" />

        {/* Animated stars background */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1} />

        {/* 3D Skyscraper */}
        <ProceduralBuilding scrollProgress={scrollProgress} />

        {/* Custom scroll camera controller */}
        <CameraController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
