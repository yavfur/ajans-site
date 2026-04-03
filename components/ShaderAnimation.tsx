"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(true) // default true = no flash

  useEffect(() => {
    // Detect mobile / low-power devices
    const mobile = window.matchMedia("(max-width: 768px)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    setIsMobile(mobile)
    if (mobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision mediump float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "low-power" })
    } catch {
      return
    }

    const camera = new THREE.Camera()
    camera.position.z = 1
    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    scene.add(new THREE.Mesh(geometry, material))

    // Cap pixelRatio at 1 on desktop — massive perf gain on retina
    renderer.setPixelRatio(1)

    const resize = () => {
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth
      const h = canvas.parentElement?.clientHeight ?? window.innerHeight
      renderer.setSize(w, h, false)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }

    resize()
    window.addEventListener("resize", resize)

    let frame = 0
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      frame++
      // Render every 2nd frame on desktop → 30fps instead of 60fps
      if (frame % 2 !== 0) return
      uniforms.time.value += 0.1
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationIdRef.current)
      window.removeEventListener("resize", resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [isMobile])

  // Mobile: lightweight static gradient, zero GPU cost
  if (isMobile) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, #1a3a1a 0%, #0b1a12 50%, #050d08 100%)",
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}
