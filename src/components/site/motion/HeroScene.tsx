'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer, RoundedBox } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import { MathUtils } from 'three';

const BRAND = '#0d5df3';
const ACCENT = '#ffc93c';

type Shape = {
  kind: 'tile' | 'coin' | 'orb';
  pos: [number, number, number];
  rot?: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  /** Disembunyikan di layar kecil supaya tidak menutupi teks. */
  desktopOnly?: boolean;
};

// Sengaja sedikit dan kecil: aksen di sekitar gambar perangkat, bukan pusat
// perhatian. Posisi dalam unit kamera (lebar ±6, tinggi ±3); sisi kiri
// tempat judul hero dibiarkan kosong.
const SHAPES: Shape[] = [
  { kind: 'tile', pos: [6.3, 2.5, -2], rot: [0.4, -0.5, 0.2], scale: 0.7, color: BRAND, speed: 1.1 },
  { kind: 'coin', pos: [0.6, 3, -3.5], rot: [1.2, 0.3, 0], scale: 0.45, color: ACCENT, speed: 1.4 },
  { kind: 'orb', pos: [1.4, -2.7, -1.5], scale: 0.3, color: '#ffffff', speed: 1.6 },
  { kind: 'tile', pos: [5.6, -2, -2.5], rot: [0.2, 0.3, -0.5], scale: 0.5, color: ACCENT, speed: 1.2, desktopOnly: true },
  { kind: 'orb', pos: [-2.6, 3.1, -4], scale: 0.22, color: BRAND, speed: 1.8, desktopOnly: true },
];

// Material standar (tanpa clearcoat/transmisi) jauh lebih ringan untuk GPU HP,
// kilapnya cukup dari pantulan lingkungan.
function Glossy({ color, metal = 0.15 }: { color: string; metal?: number }) {
  return <meshStandardMaterial color={color} roughness={0.22} metalness={metal} envMapIntensity={1.1} />;
}

function ShapeMesh({ s }: { s: Shape }) {
  if (s.kind === 'tile') {
    return (
      <RoundedBox args={[1.4, 1.4, 0.36]} radius={0.16} smoothness={3} rotation={s.rot} scale={s.scale}>
        <Glossy color={s.color} />
      </RoundedBox>
    );
  }
  if (s.kind === 'coin') {
    return (
      <mesh rotation={s.rot} scale={s.scale}>
        <cylinderGeometry args={[1, 1, 0.22, 40]} />
        <Glossy color={s.color} metal={0.6} />
      </mesh>
    );
  }
  return (
    <mesh scale={s.scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <Glossy color={s.color} />
    </mesh>
  );
}

/** Seluruh benda ikut condong ke arah kursor dan naik pelan saat discroll. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame(({ pointer }, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-delta * 3);
    g.rotation.y = MathUtils.lerp(g.rotation.y, pointer.x * 0.18, k);
    g.rotation.x = MathUtils.lerp(g.rotation.x, -pointer.y * 0.12, k);
    g.position.y = MathUtils.lerp(g.position.y, window.scrollY * 0.004, k);
  });
  return <group ref={group}>{children}</group>;
}

function Shapes() {
  const width = useThree(s => s.size.width);
  const compact = width < 768;
  return (
    <Rig>
      {SHAPES.filter(s => !(compact && s.desktopOnly)).map((s, i) => {
        // Di layar kecil semua benda dirapatkan dan dikecilkan.
        const pos: [number, number, number] = compact ? [s.pos[0] * 0.4, s.pos[1] * 0.8 - 0.9, s.pos[2] - 2] : s.pos;
        return (
          <Float key={i} position={pos} speed={s.speed} rotationIntensity={0.7} floatIntensity={1} floatingRange={[-0.12, 0.12]}>
            <ShapeMesh s={s} />
          </Float>
        );
      })}
    </Rig>
  );
}

/**
 * Latar 3D hero: benda-benda mengkilap warna merek yang melayang. Berhenti
 * merender ketika hero sudah tidak terlihat supaya tidak membebani baterai.
 */
export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} aria-hidden className="absolute inset-0 transition-opacity duration-[1600ms] ease-out" style={{ opacity: ready ? 1 : 0 }}>
      <Canvas
        dpr={[1, 1.25]}
        flat
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 6]} intensity={1.3} />
        <Shapes />
        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 6]} scale={[10, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} color="#9fc0ff" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="ring" intensity={2} color={ACCENT} position={[6, -2, 3]} scale={3} />
        </Environment>
      </Canvas>
    </div>
  );
}
