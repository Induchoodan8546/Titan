"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProceduralBuildingProps {
  scrollProgress?: number;
}

export default function ProceduralBuilding({ scrollProgress = 0 }: ProceduralBuildingProps) {
  const buildingRef = useRef<THREE.Group>(null);
  const elevatorRef = useRef<THREE.Mesh>(null);
  const searchlight1Ref = useRef<THREE.SpotLight>(null);
  const searchlight2Ref = useRef<THREE.SpotLight>(null);

  // Configuration
  const FLOOR_COUNT = 24;
  const FLOOR_HEIGHT = 0.55;
  const BUILDING_WIDTH = 3.2;
  const BUILDING_DEPTH = 3.2;

  // Animate the building's rotation, elevators, searchlights, and scanner sleeve
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Slow elegant idle rotation + scroll-based rotation
    if (buildingRef.current) {
      buildingRef.current.rotation.y = elapsed * 0.03 + scrollProgress * Math.PI * 1.5;
    }

    // Animate elevator up and down smoothly
    if (elevatorRef.current) {
      const elevatorY = 3.0 + Math.sin(elapsed * 0.3) * 5.0; // moves between floors
      elevatorRef.current.position.y = elevatorY;
    }

    // Rotate searchlights at the top
    if (searchlight1Ref.current) {
      searchlight1Ref.current.target.position.x = Math.sin(elapsed * 0.8) * 15;
      searchlight1Ref.current.target.position.z = Math.cos(elapsed * 0.8) * 15;
      searchlight1Ref.current.target.position.y = 20;
    }
    if (searchlight2Ref.current) {
      searchlight2Ref.current.target.position.x = Math.sin(elapsed * 0.5 + Math.PI) * 12;
      searchlight2Ref.current.target.position.z = Math.cos(elapsed * 0.5 + Math.PI) * 12;
      searchlight2Ref.current.target.position.y = 20;
    }

  });

  // Generate windows with random states (on/off)
  const windowsData = useMemo(() => {
    const list = [];
    const windowsPerSide = 5;
    for (let f = 0; f < FLOOR_COUNT; f++) {
      // Don't put normal windows on lobby (floor 0-2) or penthouse (top 2 floors)
      if (f <= 2 || f >= FLOOR_COUNT - 2) continue;

      // 4 sides
      for (let side = 0; side < 4; side++) {
        for (let w = 0; w < windowsPerSide; w++) {
          // Skip middle windows on one side for the elevator shaft
          if (side === 0 && (w === 2 || w === 3)) continue;

          // Randomize window state (emissive/on or dark/off)
          const isOn = Math.random() > 0.4;
          list.push({
            id: `${f}-${side}-${w}`,
            floor: f,
            side,
            windowIdx: w,
            isOn,
          });
        }
      }
    }
    return list;
  }, []);

  // Custom materials setup
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0a1324",
    roughness: 0.1,
    metalness: 0.95,
    transparent: true,
    opacity: 0.7,
    transmission: 0.5,
    ior: 1.52,
  }), []);

  const goldMetallicMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#d4af37",
    roughness: 0.1,
    metalness: 0.9,
  }), []);

  const darkMetalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#121214",
    roughness: 0.4,
    metalness: 0.8,
  }), []);

  const windowOnMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#fffcf0",
    emissive: "#ffba08",
    emissiveIntensity: 4.0,
  }), []);

  const windowOffMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#07070a",
    roughness: 0.15,
    metalness: 0.9,
  }), []);

  const glowingLedRed = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff3333",
  }), []);

  return (
    <group ref={buildingRef}>
      {/* 1. LOBBY / PLAZA BASE */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[BUILDING_WIDTH + 0.6, 0.9, BUILDING_DEPTH + 0.6]} />
        <meshStandardMaterial color="#08080a" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Plaza Glass Facade */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[BUILDING_WIDTH + 0.4, 1.0, BUILDING_DEPTH + 0.4]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      
      {/* Lobby Gold Entrance Portal */}
      <mesh position={[0, 0.4, BUILDING_DEPTH / 2 + 0.31]} castShadow>
        <boxGeometry args={[1.5, 0.8, 0.08]} />
        <primitive object={goldMetallicMaterial} attach="material" />
      </mesh>
      
      {/* Lobby interior entry glow */}
      <mesh position={[0, 0.4, BUILDING_DEPTH / 2 + 0.28]}>
        <boxGeometry args={[1.2, 0.7, 0.04]} />
        <meshBasicMaterial color="#fcd34d" />
      </mesh>

      {/* Lobby Pillars */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`lobby-pillar-${x}-${z}`}
            position={[x * (BUILDING_WIDTH / 2 + 0.25), 0.5, z * (BUILDING_DEPTH / 2 + 0.25)]}
            castShadow
          >
            <cylinderGeometry args={[0.07, 0.07, 1.0, 16]} />
            <primitive object={goldMetallicMaterial} attach="material" />
          </mesh>
        ))
      )}

      {/* 2. PROCEDURAL FLOORS CONTAINER */}
      <group position={[0, 0.9, 0]}>
        {/* Main Glass Facade Core */}
        <mesh position={[0, (FLOOR_COUNT * FLOOR_HEIGHT) / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[BUILDING_WIDTH, FLOOR_COUNT * FLOOR_HEIGHT, BUILDING_DEPTH]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>

        {/* Floor Slabs (concrete rings between floors) */}
        {Array.from({ length: FLOOR_COUNT }).map((_, f) => (
          <mesh
            key={`slab-${f}`}
            position={[0, f * FLOOR_HEIGHT, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[BUILDING_WIDTH + 0.12, 0.05, BUILDING_DEPTH + 0.12]} />
            <primitive object={darkMetalMaterial} attach="material" />
          </mesh>
        ))}

        {/* Vertical Gold Corner Pillars */}
        {[-1, 1].map((x) =>
          [-1, 1].map((z) => (
            <mesh
              key={`pillar-${x}-${z}`}
              position={[
                x * (BUILDING_WIDTH / 2 + 0.03),
                (FLOOR_COUNT * FLOOR_HEIGHT) / 2,
                z * (BUILDING_DEPTH / 2 + 0.03),
              ]}
              castShadow
            >
              <cylinderGeometry
                args={[0.04, 0.04, FLOOR_COUNT * FLOOR_HEIGHT, 8]}
              />
              <primitive object={goldMetallicMaterial} attach="material" />
            </mesh>
          ))
        )}

        {/* Window Grids with emissive materials */}
        {windowsData.map((w) => {
          const xOffset = BUILDING_WIDTH / 2;
          const zOffset = BUILDING_DEPTH / 2;
          const wWidth = BUILDING_WIDTH / 65; // window plane dimensions
          const xPos = -BUILDING_WIDTH / 2 + (w.windowIdx + 0.8) * (BUILDING_WIDTH / 5);
          const zPos = -BUILDING_DEPTH / 2 + (w.windowIdx + 0.8) * (BUILDING_DEPTH / 5);
          
          let pos: [number, number, number] = [0, 0, 0];
          let rot: [number, number, number] = [0, 0, 0];

          if (w.side === 0) {
            // Front side (+Z)
            pos = [xPos, w.floor * FLOOR_HEIGHT + FLOOR_HEIGHT / 2, zOffset + 0.015];
            rot = [0, 0, 0];
          } else if (w.side === 1) {
            // Back side (-Z)
            pos = [-xPos, w.floor * FLOOR_HEIGHT + FLOOR_HEIGHT / 2, -zOffset - 0.015];
            rot = [0, Math.PI, 0];
          } else if (w.side === 2) {
            // Right side (+X)
            pos = [xOffset + 0.015, w.floor * FLOOR_HEIGHT + FLOOR_HEIGHT / 2, zPos];
            rot = [0, Math.PI / 2, 0];
          } else {
            // Left side (-X)
            pos = [-xOffset - 0.015, w.floor * FLOOR_HEIGHT + FLOOR_HEIGHT / 2, -zPos];
            rot = [0, -Math.PI / 2, 0];
          }

          return (
            <mesh key={w.id} position={pos} rotation={rot}>
              <planeGeometry args={[0.38, FLOOR_HEIGHT * 0.65]} />
              <primitive
                object={w.isOn ? windowOnMaterial : windowOffMaterial}
                attach="material"
              />
            </mesh>
          );
        })}

        {/* Vertical Glass Elevator Shaft (Left side) */}
        <group position={[-BUILDING_WIDTH / 2 - 0.2, (FLOOR_COUNT * FLOOR_HEIGHT) / 2, 0]}>
          {/* Shaft Glass Box */}
          <mesh>
            <boxGeometry args={[0.26, FLOOR_COUNT * FLOOR_HEIGHT, 0.36]} />
            <meshPhysicalMaterial
              color="#090d16"
              roughness={0.05}
              metalness={0.9}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Gold Structural Shaft Beams */}
          {[-1, 1].map((z) => (
            <mesh key={`elevator-beam-${z}`} position={[0.13, 0, z * 0.18]}>
              <boxGeometry args={[0.02, FLOOR_COUNT * FLOOR_HEIGHT, 0.02]} />
              <primitive object={goldMetallicMaterial} attach="material" />
            </mesh>
          ))}
          
          {/* Elevator Cabin (Animated in useFrame) */}
          <mesh ref={elevatorRef} position={[0, 2, 0]} castShadow>
            <boxGeometry args={[0.18, 0.32, 0.28]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#f59e0b"
              emissiveIntensity={3.5}
              roughness={0.1}
            />
          </mesh>
        </group>
      </group>

      {/* 3. ROOFTOP PENTHOUSE & CROWN */}
      <group position={[0, 0.9 + FLOOR_COUNT * FLOOR_HEIGHT, 0]}>
        {/* Penthouse structure */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[BUILDING_WIDTH - 0.6, 0.9, BUILDING_DEPTH - 0.6]} />
          <primitive object={glassMaterial} attach="material" />
        </mesh>
        
        {/* Double-Height Glass Facade for Penthouse */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[BUILDING_WIDTH - 0.7, 0.88, BUILDING_DEPTH - 0.7]} />
          <meshStandardMaterial
            color="#fffab0"
            emissive="#d4af37"
            emissiveIntensity={2.0}
          />
        </mesh>
        
        {/* Penthouse Gold Columns */}
        {[-1, 1].map((x) =>
          [-1, 1].map((z) => (
            <mesh
              key={`penthouse-col-${x}-${z}`}
              position={[x * (BUILDING_WIDTH / 2 - 0.35), 0.45, z * (BUILDING_DEPTH / 2 - 0.35)]}
              castShadow
            >
              <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
              <primitive object={goldMetallicMaterial} attach="material" />
            </mesh>
          ))
        )}

        {/* Penthouse Roof Slab (Helipad platform) */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[BUILDING_WIDTH / 2 - 0.1, BUILDING_WIDTH / 2, 0.08, 16]} />
          <primitive object={darkMetalMaterial} attach="material" />
        </mesh>
        
        {/* Heli-pad glowing circle */}
        <mesh position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.6, 32]} />
          <meshBasicMaterial color="#d4af37" side={THREE.DoubleSide} />
        </mesh>

        {/* Spire */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.035, 1.2, 8]} />
          <primitive object={goldMetallicMaterial} attach="material" />
        </mesh>
        
        {/* Warning Light on spire top */}
        <mesh position={[0, 2.12, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <primitive object={glowingLedRed} attach="material" />
        </mesh>

        {/* 4. SEARCHLIGHT BEAMS */}
        {/* Searchlight 1 */}
        <group position={[0, 0.95, 0]}>
          <spotLight
            ref={searchlight1Ref}
            color="#d4af37"
            intensity={10.0}
            distance={40}
            angle={Math.PI / 18}
            penumbra={0.5}
            castShadow
          />
          <primitive object={new THREE.Object3D()} attach="target" />
        </group>
        
        {/* Searchlight 2 */}
        <group position={[0, 0.95, 0]}>
          <spotLight
            ref={searchlight2Ref}
            color="#ffffff"
            intensity={8.0}
            distance={35}
            angle={Math.PI / 20}
            penumbra={0.6}
            castShadow
          />
        </group>
      </group>
    </group>
  );
}
