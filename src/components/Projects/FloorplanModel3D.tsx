"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloorplanModel3DProps {
  activeResidence: number;
  activeRoomIdx: number;
  setActiveRoomIdx: (idx: number) => void;
}

export default function FloorplanModel3D({
  activeResidence,
  activeRoomIdx,
  setActiveRoomIdx,
}: FloorplanModel3DProps) {
  const modelRef = useRef<THREE.Group>(null);

  // Slow idle rotation of the model
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (modelRef.current) {
      // Very gentle rotation
      modelRef.current.rotation.y = elapsed * 0.04;
    }
  });

  // Materials
  const floorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#181a22", // Elegant slate/charcoal concrete
    roughness: 0.5,
    metalness: 0.2, // Matte stone/terrazzo vibe
  }), []);

  const activeFloorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#282119",
    roughness: 0.45,
    metalness: 0.3,
  }), []);

  const solidWallMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#fafaf9", // Soft ivory/cream solid plaster walls for realistic layout divisions
    roughness: 0.85,
    metalness: 0.0,
  }), []);

  const glassWallMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#bae6fd", // Translucent crystal clear blue window panels
    roughness: 0.02,
    metalness: 0.1,
    transparent: true,
    opacity: 0.22,
    transmission: 0.95,
    ior: 1.5,
  }), []);

  const woodFurnitureMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#854d0e", // Warm oak/walnut wood
    roughness: 0.55,
    metalness: 0.1,
  }), []);

  const fabricMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#f4f4f5", // Luxurious bright off-white bouclé/linen fabric
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  const poolWaterMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0ea5e9", // Luminous turquoise water
    roughness: 0.08,
    metalness: 0.1,
    transparent: true,
    opacity: 0.65,
    transmission: 0.8,
    ior: 1.333,
  }), []);

  const goldAccentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#eab308", // Bright luxury gold accents
    roughness: 0.1,
    metalness: 0.9,
  }), []);

  return (
    <group ref={modelRef}>
      {/* Lights inside the local modal canvas - Optimized for a bright, studio architectural model render */}
      <ambientLight intensity={1.8} color="#ffffff" />
      <hemisphereLight color="#ffffff" groundColor="#1e1b4b" intensity={1.6} />
      <directionalLight position={[8, 12, 6]} intensity={3.5} castShadow shadow-mapSize={[2048, 2048]} />
      <pointLight position={[-6, 6, -6]} intensity={2.5} color="#818cf8" />
      <pointLight position={[6, 4, 6]} intensity={2.0} color="#fff1f2" />
      
      {/* 1. FLOOR PLAN BASES & WALL LAYOUTS */}
      {activeResidence === 0 && (
        /* ========================================================================= */
        /* SKY MANSIONS 3D FLOORPLAN                                                 */
        /* ========================================================================= */
        <group position={[0, -0.2, 0]}>
          {/* Main Floor Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.15, 4.2]} />
            <primitive object={floorMaterial} attach="material" />
          </mesh>
          {/* Active room floor glow */}
          {activeRoomIdx === 2 && (
            <mesh position={[1.0, 0.08, -0.5]}>
              <boxGeometry args={[2.0, 0.01, 3.0]} />
              <meshBasicMaterial color="#d4af37" transparent opacity={0.15} />
            </mesh>
          )}

          {/* Outer Glass Walls */}
          <mesh position={[0, 0.4, -2.05]} castShadow>
            <boxGeometry args={[4.2, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.4, 2.05]} castShadow>
            <boxGeometry args={[4.2, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[-2.05, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[4.2, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[2.05, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[4.2, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>

          {/* Internal Room Dividers */}
          <mesh position={[-0.4, 0.4, -0.6]} castShadow>
            <boxGeometry args={[3.2, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>
          <mesh position={[-0.4, 0.4, 0.6]} castShadow>
            <boxGeometry args={[3.2, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>
          <mesh position={[0.4, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[1.2, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>

          {/* 3D Furniture Items */}
          {/* Foyer Elevator Cabin */}
          <group position={[-1.2, 0.4, -1.2]}>
            <mesh castShadow>
              <boxGeometry args={[1.0, 0.7, 1.0]} />
              <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0.51]}>
              <boxGeometry args={[0.6, 0.5, 0.02]} />
              <primitive object={goldAccentMaterial} attach="material" />
            </mesh>
          </group>

          {/* Kitchen Counters */}
          <group position={[-1.3, 0.25, 1.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.5, 1.3]} />
              <meshStandardMaterial color="#fafafa" roughness={0.1} />
            </mesh>
            {/* Barstools */}
            {[-0.4, 0.4].map((z, i) => (
              <mesh key={i} position={[0.4, -0.1, z]}>
                <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
                <primitive object={woodFurnitureMaterial} attach="material" />
              </mesh>
            ))}
          </group>

          {/* Living Room Sectional Sofa */}
          <group position={[1.0, 0.2, -0.6]}>
            <mesh castShadow>
              <boxGeometry args={[1.5, 0.3, 0.5]} />
              <primitive object={fabricMaterial} attach="material" />
            </mesh>
            <mesh position={[-0.5, 0, 0.6]} rotation={[0, Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[1.2, 0.3, 0.5]} />
              <primitive object={fabricMaterial} attach="material" />
            </mesh>
            {/* Coffee Table */}
            <mesh position={[0.4, -0.05, 0.5]} castShadow>
              <boxGeometry args={[0.6, 0.15, 0.6]} />
              <primitive object={woodFurnitureMaterial} attach="material" />
            </mesh>
          </group>

          {/* Teak Wood Balcony Floor */}
          <mesh position={[0, 0.1, 1.6]} castShadow>
            <boxGeometry args={[3.8, 0.05, 0.8]} />
            <primitive object={woodFurnitureMaterial} attach="material" />
          </mesh>
        </group>
      )}

      {activeResidence === 1 && (
        /* ========================================================================= */
        /* DUPLEX PENTHOUSES 3D FLOORPLAN                                            */
        /* ========================================================================= */
        <group position={[0, -0.2, 0]}>
          {/* Main Floor Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.4, 0.15, 4.4]} />
            <primitive object={floorMaterial} attach="material" />
          </mesh>

          {/* Outer Glass Walls */}
          <mesh position={[0, 0.4, -2.15]} castShadow>
            <boxGeometry args={[4.4, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.4, 2.15]} castShadow>
            <boxGeometry args={[4.4, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[-2.15, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[4.4, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[2.15, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[4.4, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>

          {/* Internal divisions (split living / bedroom / pool) */}
          <mesh position={[0, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[4.4, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>
          <mesh position={[1.0, 0.4, 0.6]} castShadow>
            <boxGeometry args={[2.0, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>
          <mesh position={[-1.0, 0.4, -0.6]} castShadow>
            <boxGeometry args={[2.0, 0.8, 0.03]} />
            <primitive object={solidWallMaterial} attach="material" />
          </mesh>

          {/* Sculptural Floating Staircase steps */}
          <group position={[-0.2, 0, 0.2]} rotation={[0, -Math.PI / 2, 0]}>
            {Array.from({ length: 8 }).map((_, i) => (
              <mesh
                key={i}
                position={[i * 0.18 - 0.7, i * 0.09 + 0.1, 0]}
                castShadow
              >
                <boxGeometry args={[0.3, 0.03, 0.9]} />
                <primitive object={woodFurnitureMaterial} attach="material" />
              </mesh>
            ))}
          </group>

          {/* 3D Private plunge pool */}
          <group position={[-1.0, 0.15, 1.0]}>
            {/* Pool water block */}
            <mesh castShadow>
              <boxGeometry args={[1.5, 0.3, 1.5]} />
              <primitive object={poolWaterMaterial} attach="material" />
            </mesh>
            {/* Border frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.6, 0.32, 1.6]} />
              <meshStandardMaterial color="#090d16" wireframe />
            </mesh>
          </group>

          {/* Double-Height Salon Sofa */}
          <group position={[1.1, 0.2, -0.6]}>
            <mesh castShadow>
              <boxGeometry args={[1.4, 0.3, 1.4]} />
              <primitive object={fabricMaterial} attach="material" />
            </mesh>
            <mesh position={[-0.1, 0.2, 0.1]}>
              <boxGeometry args={[1.2, 0.2, 1.2]} />
              <meshStandardMaterial color="#fcd34d" roughness={0.8} />
            </mesh>
          </group>

          {/* Master Bedroom Bed */}
          <group position={[1.2, 0.2, 1.2]}>
            {/* Bed Frame */}
            <mesh castShadow>
              <boxGeometry args={[1.2, 0.2, 1.2]} />
              <primitive object={woodFurnitureMaterial} attach="material" />
            </mesh>
            {/* Mattress */}
            <mesh position={[0, 0.1, 0.1]}>
              <boxGeometry args={[1.1, 0.2, 1.0]} />
              <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </mesh>
            {/* Pillows */}
            {[-0.3, 0.3].map((x, i) => (
              <mesh key={i} position={[x, 0.22, 0.4]}>
                <boxGeometry args={[0.35, 0.08, 0.25]} />
                <meshStandardMaterial color="#f4f4f5" />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {activeResidence === 2 && (
        /* ========================================================================= */
        /* THE TITAN CROWN 3D FLOORPLAN                                              */
        /* ========================================================================= */
        <group position={[0, -0.2, 0]}>
          {/* Main Floor Slab */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.4, 0.15, 4.4]} />
            <primitive object={floorMaterial} attach="material" />
          </mesh>

          {/* Diagonal Glass Corner Walls */}
          {[-1, 1].map((x) =>
            [-1, 1].map((z) => (
              <mesh
                key={`crown-corner-${x}-${z}`}
                position={[x * 1.5, 0.4, z * 1.5]}
                rotation={[0, x * z * Math.PI / 4, 0]}
                castShadow
              >
                <boxGeometry args={[1.5, 0.8, 0.04]} />
                <primitive object={glassWallMaterial} attach="material" />
              </mesh>
            ))
          )}
          {/* Straight outer walls */}
          <mesh position={[0, 0.4, -2.1]} castShadow>
            <boxGeometry args={[1.5, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0.4, 2.1]} castShadow>
            <boxGeometry args={[1.5, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[-2.1, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[1.5, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>
          <mesh position={[2.1, 0.4, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[1.5, 0.8, 0.04]} />
            <primitive object={glassWallMaterial} attach="material" />
          </mesh>

          {/* Helipad circular portal pad */}
          <group position={[1.1, 0.1, -1.1]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.7, 0.7, 0.05, 24]} />
              <meshStandardMaterial color="#27272a" roughness={0.7} />
            </mesh>
            {/* Painted 'H' letter */}
            <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshBasicMaterial color="#d4af37" />
            </mesh>
          </group>

          {/* Observation Dome center dining setup */}
          <group position={[0, 0.2, 0]}>
            {/* Circular Dining Table */}
            <mesh castShadow>
              <cylinderGeometry args={[0.6, 0.6, 0.04, 24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 12]} />
              <primitive object={goldAccentMaterial} attach="material" />
            </mesh>
            {/* Dining Chairs */}
            {Array.from({ length: 5 }).map((_, i) => {
              const theta = (i * 2 * Math.PI) / 5;
              return (
                <mesh
                  key={i}
                  position={[0.75 * Math.sin(theta), -0.05, 0.75 * Math.cos(theta)]}
                  rotation={[0, theta + Math.PI, 0]}
                  castShadow
                >
                  <boxGeometry args={[0.2, 0.25, 0.2]} />
                  <primitive object={woodFurnitureMaterial} attach="material" />
                </mesh>
              );
            })}
          </group>

          {/* Sky Garden Soil beds */}
          <group position={[0, 0.1, 1.4]}>
            <mesh castShadow>
              <boxGeometry args={[2.5, 0.06, 0.6]} />
              <meshStandardMaterial color="#1c1917" roughness={0.9} />
            </mesh>
            {/* Simplified plants/trees (spheres on trunks) */}
            {[-0.8, 0, 0.8].map((x, i) => (
              <group key={i} position={[x, 0.1, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
                  <primitive object={woodFurnitureMaterial} attach="material" />
                </mesh>
                <mesh position={[0, 0.25, 0]} castShadow>
                  <sphereGeometry args={[0.15, 8, 8]} />
                  <meshStandardMaterial color="#15803d" roughness={0.9} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      )}

      {/* 2. INTERACTIVE ROOM HOTSPOTS IN 3D */}
      {(() => {
        // Hotspot coordinates matching residence tabs
        const hotspots: { idx: number; pos: [number, number, number] }[][] = [
          // Sky Mansions hotspots
          [
            { idx: 0, pos: [-1.2, 0.3, -1.2] }, // Lift Foyer
            { idx: 1, pos: [-1.3, 0.2, 0.5] },  // Kitchen
            { idx: 2, pos: [0.6, 0.2, -0.6] },  // Living Hall
            { idx: 3, pos: [0, 0.1, 1.6] },     // Balcony
          ],
          // Duplex hotspots
          [
            { idx: 0, pos: [-1.4, 0.1, -1.4] }, // Entry
            { idx: 1, pos: [-1.0, 0.15, 1.0] }, // Plunge Pool
            { idx: 2, pos: [1.1, 0.2, -0.6] },  // Salon
            { idx: 3, pos: [1.2, 0.2, 1.2] },   // Master Bed
          ],
          // Crown hotspots
          [
            { idx: 0, pos: [0, 0.25, 0] },       // Observation Dome
            { idx: 1, pos: [-1.2, 0.1, 0] },     // Butler
            { idx: 2, pos: [1.1, 0.15, -1.1] },  // Helipad
            { idx: 3, pos: [0, 0.1, 1.4] },      // Sky Garden
          ],
        ];

        const activeSet = hotspots[activeResidence] || [];

        return activeSet.map((hs) => {
          const isActive = activeRoomIdx === hs.idx;

          return (
            <group key={hs.idx} position={hs.pos}>
              {/* Pulsing Hotspot Click Target */}
              <mesh
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveRoomIdx(hs.idx);
                }}
              >
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                  color={isActive ? "#ffffff" : "#d4af37"}
                  emissive={isActive ? "#ffba08" : "#937020"}
                  emissiveIntensity={isActive ? 4.0 : 1.2}
                />
              </mesh>

              {/* Halo Scanner ring */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <ringGeometry args={[0.26, 0.3, 16]} />
                <meshBasicMaterial
                  color={isActive ? "#ffba08" : "#d4af37"}
                  transparent
                  opacity={isActive ? 0.9 : 0.35}
                />
              </mesh>
            </group>
          );
        });
      })()}
    </group>
  );
}
