import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import * as random from 'maath/random'

function Particles(props) {
  const ref = useRef()
  const { viewport, mouse } = useThree()
  const [sphere] = useMemo(() => [random.inSphere(new Float32Array(5000), { radius: 1.5 })], [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
      
      // Mouse interaction
      ref.current.rotation.x += mouse.y * 0.1 * delta
      ref.current.rotation.y += mouse.x * 0.1 * delta
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

function FloatingOrbs() {
  const orbsRef = useRef()
  const orbs = useMemo(() => {
    const temp = []
    for (let i = 0; i < 20; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, i) => {
        orb.position.y = orbs[i].position[1] + Math.sin(state.clock.elapsedTime + i) * 0.5
        orb.rotation.x += orbs[i].speed
        orb.rotation.y += orbs[i].speed * 0.5
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {orbs.map((orb, i) => (
        <Sphere key={i} position={orb.position} scale={orb.scale}>
          <meshBasicMaterial 
            color="#ff00ff" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </Sphere>
      ))}
    </group>
  )
}

function NeuralNetwork() {
  const networkRef = useRef()
  const nodes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ]
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={networkRef}>
      {nodes.map((node, i) => (
        <Sphere key={i} position={node.position} scale={0.02}>
          <meshBasicMaterial color="#00ff00" transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  )
}

export default function EnhancedParticleBackground() {
  return (
    <div className="particle-bg">
      <Canvas 
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles />
        <FloatingOrbs />
        <NeuralNetwork />
      </Canvas>
    </div>
  )
}


