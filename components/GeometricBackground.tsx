"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random so buildings are identical on every render
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type BuildingDef = {
  pos: [number, number, number];
  size: [number, number, number];
  delay: number;
  color: string;
};

function generateBuildings(): BuildingDef[] {
  const rng = makeRng(137);
  const buildings: BuildingDef[] = [];

  // Back row — tall, spaced wide, appear first
  for (let i = 0; i < 14; i++) {
    const w = 0.8 + rng() * 1.8;
    const h = 10 + rng() * 18;
    const d = 0.8 + rng() * 1.8;
    buildings.push({
      pos: [(i - 6.5) * 3.2 + (rng() - 0.5) * 0.8, 0, -18 - rng() * 4],
      size: [w, h, d],
      delay: i * 0.22,
      color: "#282828",
    });
  }

  // Mid row — medium height
  for (let i = 0; i < 10; i++) {
    const w = 1.0 + rng() * 1.6;
    const h = 6 + rng() * 12;
    const d = 1.0 + rng() * 1.6;
    buildings.push({
      pos: [(i - 4.5) * 3.8 + (rng() - 0.5), 0, -10 - rng() * 3],
      size: [w, h, d],
      delay: 1.5 + i * 0.28,
      color: "#333333",
    });
  }

  // Foreground flanks — large, frame the view
  const flankX = [[-16, -12, -9], [9, 12, 16]];
  for (const side of flankX) {
    for (const x of side) {
      const w = 2 + rng() * 2;
      const h = 12 + rng() * 14;
      const d = 2 + rng() * 2;
      buildings.push({
        pos: [x + (rng() - 0.5), 0, -4 - rng() * 3],
        size: [w, h, d],
        delay: 3 + rng() * 1.5,
        color: "#3f3f3f",
      });
    }
  }

  return buildings;
}

const BUILDINGS = generateBuildings();

function Building({ def }: { def: BuildingDef }) {
  const lsRef = useRef<THREE.LineSegments>(null);
  const [w, h, d] = def.size;

  const edgesGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(w, h, d);
    box.translate(0, h / 2, 0); // anchor bottom at y=0
    const edges = new THREE.EdgesGeometry(box);
    box.dispose();
    return edges;
  }, [w, h, d]);

  useFrame(({ clock }) => {
    if (!lsRef.current) return;
    const elapsed = Math.max(0, clock.elapsedTime - def.delay);
    const raw = Math.min(1, elapsed / 1.8);
    // ease-out cubic
    lsRef.current.scale.y = 1 - Math.pow(1 - raw, 3);
  });

  return (
    <lineSegments ref={lsRef} position={def.pos} scale={[1, 0, 1]}>
      <primitive object={edgesGeo} attach="geometry" />
      <lineBasicMaterial color={def.color} transparent opacity={0.85} fog />
    </lineSegments>
  );
}

// Horizontal grid lines at ground level for city-block feel
function GroundGrid() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts: number[] = [];
    const count = 20;
    const span = 40;
    for (let i = -count; i <= count; i++) {
      const x = (i / count) * span;
      verts.push(x, 0, -span, x, 0, 0);
      verts.push(-span, 0, (i / count) * span, span, 0, (i / count) * span);
    }
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#1a1a1a" transparent opacity={0.5} fog />
    </lineSegments>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 5, 0), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 2.5;
    camera.position.y = 7 + Math.sin(t * 0.025) * 0.4;
    camera.position.z = 20 + Math.cos(t * 0.03) * 0.5;
    camera.lookAt(target);
  });

  return null;
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#080808", 12, 35]} />
      <CameraRig />
      <GroundGrid />
      {BUILDINGS.map((def, i) => (
        <Building key={i} def={def} />
      ))}
    </>
  );
}

export default function GeometricBackground() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 7, 20], fov: 65 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />
    </div>
  );
}
