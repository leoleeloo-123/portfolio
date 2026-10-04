/* eslint-disable react-hooks/immutability -- Three.js resources are updated imperatively without React frame state. */
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { MotionValue } from 'motion/react'
import {
  CanvasTexture, Color, DoubleSide, Euler, Group, HalfFloatType, LinearFilter, Mesh,
  MeshBasicMaterial, NoToneMapping, PerspectiveCamera, PlaneGeometry, Quaternion,
  Scene, SRGBColorSpace, TextureLoader, UnsignedByteType, Vector2, Vector3, WebGLRenderTarget,
} from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { GLASS_POSES, SCENE, clampProgress, smoothRange } from './config'
import type { GlassCommand } from './config'
import { createHeadlineCanvas, createAtmosphereCanvas, createGlassMaterial } from './glassMaterial'
import i18n from '../i18n/setup'

type SceneCanvasProps = {
  progress: MotionValue<number>
  command: RefObject<GlassCommand | null>
  active: boolean
  onFailure: () => void
  onReady?: () => void
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const xAxis = new Vector3(1, 0, 0)
const yAxis = new Vector3(0, 1, 0)

function PortraitGlass({ progress, command, active, onFailure, onReady }: SceneCanvasProps) {
  const content = useRef<Group>(null)
  const portrait = useRef<Mesh>(null)
  const atmosphere = useRef<Mesh>(null)
  const headline = useRef<Mesh>(null)
  const current = useRef(clampProgress(progress.get()))
  const interaction = useRef({
    rotation: new Quaternion(), pointerId: -1, touch: false, dragging: false,
    lastX: 0, lastY: 0, originX: 0, originY: 0, lastTime: 0,
    velocityX: 0, velocityY: 0, sinceRelease: 1.6, turn: 0, resetting: false,
    x: 0, y: 0, targetX: 0, targetY: 0,
  })
  const portraitImage = useRef({ loaded: false, aspect: 0.72 })
  const readyFrame = useRef<number | undefined>(undefined)
  const hasRendered = useRef(false)
  const { camera, size, viewport, gl, scene, invalidate } = useThree()

  const resources = useMemo(() => {
    const geometry = new RoundedBoxGeometry(SCENE.shell.edge, SCENE.shell.edge, SCENE.shell.edge, SCENE.shell.segments, SCENE.shell.radius)
    const front = createGlassMaterial(false, SCENE.refraction.desktopSamples, SCENE.refraction.chromatic)
    const back = createGlassMaterial(true, SCENE.refraction.desktopSamples, SCENE.refraction.chromatic)
    const shell = new Mesh(geometry, front)
    const shellGroup = new Group()
    shellGroup.add(shell)
    const glassScene = new Scene()
    glassScene.add(shellGroup)
    const targetType = gl.extensions.has('EXT_color_buffer_float') ? HalfFloatType : UnsignedByteType
    const targets = [0, 1].map(() => new WebGLRenderTarget(1, 1, { type: targetType, minFilter: LinearFilter, magFilter: LinearFilter }))
    const texture = (canvas: HTMLCanvasElement) => {
      const result = new CanvasTexture(canvas)
      result.colorSpace = SRGBColorSpace
      result.generateMipmaps = false
      result.minFilter = LinearFilter
      return result
    }
    const atmosphereTexture = texture(createAtmosphereCanvas())
    const headlineTexture = texture(createHeadlineCanvas(['', '', '']))
    return {
      geometry, front, back, shell, shellGroup, glassScene, targets,
      atmosphereTexture, planeGeometry: new PlaneGeometry(1, 1),
      atmosphereMaterial: new MeshBasicMaterial({ map: atmosphereTexture, transparent: true, opacity: GLASS_POSES[0].atmosphere, depthWrite: false, toneMapped: false }),
      headlineMaterial: new MeshBasicMaterial({ map: headlineTexture, transparent: true, depthWrite: false, toneMapped: false }),
      portraitMaterial: new MeshBasicMaterial({ side: DoubleSide, transparent: true, opacity: 0, depthWrite: false, toneMapped: false }),
      bufferSize: new Vector2(), clearColor: new Color(),
      baseEuler: new Euler(), baseRotation: new Quaternion(), step: new Quaternion(), identity: new Quaternion(),
      faceCenter: new Vector3(), faceRight: new Vector3(), faceTop: new Vector3(),
    }
  }, [gl])

  useEffect(() => {
    let cancelled = false
    const redraw = () => {
      if (cancelled) return
      const lines = [i18n.t('scene.word1'), i18n.t('scene.word2'), i18n.t('scene.word3')]
      const texture = new CanvasTexture(createHeadlineCanvas(lines, size.width / Math.max(1, size.height)))
      texture.colorSpace = SRGBColorSpace
      texture.generateMipmaps = false
      texture.minFilter = LinearFilter
      const previous = resources.headlineMaterial.map
      resources.headlineMaterial.map = texture
      resources.headlineMaterial.needsUpdate = true
      previous?.dispose()
      invalidate()
    }
    // The R3F canvas owns a separate root; subscribe at the texture boundary.
    redraw()
    void document.fonts.ready.then(redraw)
    document.fonts.addEventListener('loadingdone', redraw)
    i18n.on('languageChanged', redraw)
    return () => {
      cancelled = true
      document.fonts.removeEventListener('loadingdone', redraw)
      i18n.off('languageChanged', redraw)
    }
  }, [invalidate, resources, size.height, size.width])

  useEffect(() => {
    let cancelled = false
    portraitImage.current.loaded = false
    const texture = new TextureLoader().load('/images/leo-portrait.png', loaded => {
      if (cancelled) return
      const image = loaded.image as HTMLImageElement
      portraitImage.current = { loaded: true, aspect: image.width / image.height }
      loaded.colorSpace = SRGBColorSpace
      loaded.minFilter = LinearFilter
      loaded.magFilter = LinearFilter
      loaded.generateMipmaps = false
      resources.portraitMaterial.map = loaded
      resources.portraitMaterial.opacity = 1
      resources.portraitMaterial.needsUpdate = true
      invalidate()
    }, undefined, error => {
      if (cancelled) return
      console.error('Portrait texture loading failed', error)
      onFailure()
    })
    return () => { cancelled = true; texture.dispose() }
  }, [invalidate, onFailure, resources])

  useEffect(() => () => {
    if (readyFrame.current !== undefined) cancelAnimationFrame(readyFrame.current)
    resources.geometry.dispose()
    resources.front.dispose()
    resources.back.dispose()
    resources.targets.forEach(target => target.dispose())
    resources.atmosphereTexture.dispose()
    resources.headlineMaterial.map?.dispose()
    resources.planeGeometry.dispose()
    resources.atmosphereMaterial.dispose()
    resources.headlineMaterial.dispose()
    resources.portraitMaterial.dispose()
  }, [resources])

  useLayoutEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return
    const aspect = size.width / Math.max(size.height, 1)
    const phone = size.width < 500
    const height = Math.max(phone ? SCENE.camera.compactHeight : SCENE.camera.minHeight, SCENE.camera.minWidth / aspect)
    camera.fov = SCENE.camera.fov
    camera.aspect = aspect
    camera.position.set(0, 0, height / (2 * Math.tan(SCENE.camera.fov * Math.PI / 360)))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    camera.updateMatrixWorld()
    const backgroundHeight = height * (1 + 2.15 / camera.position.z)
    headline.current?.scale.set(backgroundHeight * aspect, backgroundHeight, 1)
    const limit = phone ? SCENE.refraction.phoneEdge : SCENE.refraction.desktopEdge
    const factor = Math.min(viewport.dpr, limit / Math.max(size.width, size.height))
    const width = Math.max(1, Math.round(size.width * factor))
    const targetHeight = Math.max(1, Math.round(size.height * factor))
    resources.targets.forEach(target => target.setSize(width, targetHeight))
    const samples = phone ? SCENE.refraction.phoneSamples : SCENE.refraction.desktopSamples
    for (const material of [resources.front, resources.back]) {
      if (material.defines.SAMPLES !== samples) { material.defines.SAMPLES = samples; material.needsUpdate = true }
    }
    resources.back.uniforms.uResolution.value.set(width, targetHeight)
    if (active) invalidate()
  }, [active, camera, invalidate, resources, size.height, size.width, viewport.dpr])

  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure() }
    gl.domElement.addEventListener('webglcontextlost', lost)
    return () => gl.domElement.removeEventListener('webglcontextlost', lost)
  }, [gl, onFailure])

  useEffect(() => {
    if (!active) return
    invalidate()
    const unsubscribe = progress.on('change', () => invalidate())
    const surface = gl.domElement
    const state = interaction.current
    const finish = (cancelled = false) => {
      if (state.pointerId !== -1 && surface.hasPointerCapture(state.pointerId)) surface.releasePointerCapture(state.pointerId)
      state.pointerId = -1
      state.dragging = false
      state.sinceRelease = 0
      if (cancelled) { state.velocityX = 0; state.velocityY = 0 }
      surface.classList.remove('dragging')
    }
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return
      state.pointerId = event.pointerId
      state.touch = event.pointerType !== 'mouse'
      state.dragging = !state.touch
      state.originX = state.lastX = event.clientX
      state.originY = state.lastY = event.clientY
      state.lastTime = performance.now()
      state.velocityX = state.velocityY = state.turn = 0
      state.resetting = false
      surface.setPointerCapture(event.pointerId)
      if (state.dragging) surface.classList.add('dragging')
      invalidate()
    }
    const move = (event: PointerEvent) => {
      const bounds = surface.getBoundingClientRect()
      if (event.pointerType === 'mouse') {
        state.targetX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
        state.targetY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      }
      if (event.pointerId === state.pointerId) {
        if (state.touch && !state.dragging) {
          const horizontal = Math.abs(event.clientX - state.originX)
          const vertical = Math.abs(event.clientY - state.originY)
          if (vertical > 8 && vertical > horizontal) { finish(true); return }
          if (horizontal < 8) return
          state.dragging = true
          surface.classList.add('dragging')
        }
        const dx = (event.clientX - state.lastX) * SCENE.rotation.drag
        const dy = (event.clientY - state.lastY) * SCENE.rotation.drag
        const now = performance.now()
        const dt = Math.max(0.008, Math.min(0.05, (now - state.lastTime) / 1000))
        state.rotation.premultiply(resources.step.setFromAxisAngle(yAxis, dx))
        state.rotation.premultiply(resources.step.setFromAxisAngle(xAxis, dy)).normalize()
        state.velocityX = Math.max(-4, Math.min(4, dy / dt))
        state.velocityY = Math.max(-4, Math.min(4, dx / dt))
        state.lastX = event.clientX
        state.lastY = event.clientY
        state.lastTime = now
      }
      invalidate()
    }
    const up = (event: PointerEvent) => { if (event.pointerId === state.pointerId) finish() }
    const cancel = () => finish(true)
    const leave = () => { state.targetX = 0; state.targetY = 0; invalidate() }
    surface.addEventListener('pointerdown', down)
    surface.addEventListener('pointermove', move)
    surface.addEventListener('pointerup', up)
    surface.addEventListener('pointercancel', cancel)
    surface.addEventListener('pointerleave', leave)
    window.addEventListener('blur', cancel)
    return () => {
      unsubscribe()
      finish(true)
      surface.removeEventListener('pointerdown', down)
      surface.removeEventListener('pointermove', move)
      surface.removeEventListener('pointerup', up)
      surface.removeEventListener('pointercancel', cancel)
      surface.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', cancel)
    }
  }, [active, gl, invalidate, progress, resources])

  // Demand rendering continues only while the visible scene has its intentional idle spin.
  useFrame((_, delta) => {
    if (!active || !content.current || !portrait.current || !atmosphere.current) return
    const dt = Math.min(delta, SCENE.maxDelta)
    const target = clampProgress(progress.get())
    current.current = lerp(current.current, target, 1 - Math.exp(-SCENE.damping * dt))
    const state = interaction.current
    const requested = command.current
    if (requested) {
      command.current = null
      state.velocityX = state.velocityY = 0
      state.sinceRelease = 0
      state.resetting = requested.type === 'reset'
      state.turn = requested.type === 'turn' ? state.turn + requested.angle : 0
    }
    if (!state.dragging && state.pointerId === -1) {
      state.sinceRelease += dt
      if (state.resetting) {
        state.rotation.slerp(resources.identity, 1 - Math.exp(-7 * dt))
        if (state.rotation.angleTo(resources.identity) < 0.001) { state.rotation.identity(); state.resetting = false; state.sinceRelease = 0 }
      } else if (Math.abs(state.turn) > 0.0005) {
        const step = state.turn * (1 - Math.exp(-5.65 * dt))
        state.rotation.premultiply(resources.step.setFromAxisAngle(yAxis, step))
        state.turn -= step
        state.sinceRelease = 0
      } else {
        state.turn = 0
        const blend = smoothRange(state.sinceRelease, SCENE.rotation.resumeDelay, SCENE.rotation.resumeDelay + 1)
        state.rotation.premultiply(resources.step.setFromAxisAngle(yAxis, (state.velocityY + SCENE.rotation.idleY * blend) * dt))
        state.rotation.premultiply(resources.step.setFromAxisAngle(xAxis, (state.velocityX + SCENE.rotation.idleX * blend) * dt)).normalize()
        const damping = Math.pow(SCENE.rotation.inertia, dt * 60)
        state.velocityX *= damping
        state.velocityY *= damping
      }
    }
    const pointerBlend = 1 - Math.exp(-SCENE.pointerDamping * dt)
    state.x = lerp(state.x, state.targetX, pointerBlend)
    state.y = lerp(state.y, state.targetY, pointerBlend)
    const value = current.current
    const first = value <= 0.5
    const from = GLASS_POSES[first ? 0 : 1]
    const to = GLASS_POSES[first ? 1 : 2]
    const t = smoothRange(value, first ? 0 : 0.5, first ? 0.5 : 1)
    resources.baseEuler.set(lerp(from.rotation[0], to.rotation[0], t) - state.y * SCENE.pointerAmplitude,
      lerp(from.rotation[1], to.rotation[1], t) + state.x * SCENE.pointerAmplitude,
      lerp(from.rotation[2], to.rotation[2], t))
    resources.baseRotation.setFromEuler(resources.baseEuler)
    content.current.quaternion.copy(resources.baseRotation).premultiply(state.rotation)
    content.current.scale.setScalar(lerp(from.scale, to.scale, t))
    resources.shellGroup.quaternion.copy(content.current.quaternion)
    resources.shellGroup.scale.copy(content.current.scale)
    // A camera-facing photographic plane inside the rotating shell retains identity.
    portrait.current.quaternion.copy(content.current.quaternion).invert()
    portrait.current.position.set(state.x * 0.025, -0.035 - state.y * 0.015, lerp(from.portraitDepth, to.portraitDepth, t))
    portrait.current.scale.set(SCENE.portraitHeight * portraitImage.current.aspect, SCENE.portraitHeight, 1)
    atmosphere.current.position.set(-state.x * 0.08, state.y * 0.04, -0.8)
    resources.atmosphereMaterial.opacity = lerp(from.atmosphere, to.atmosphere, t)
    scene.updateMatrixWorld()
    const center = portrait.current.localToWorld(resources.faceCenter.set(0, 0.13, 0)).project(camera)
    const right = portrait.current.localToWorld(resources.faceRight.set(0.24, 0.13, 0)).project(camera)
    const top = portrait.current.localToWorld(resources.faceTop.set(0, 0.36, 0)).project(camera)
    for (const material of [resources.front, resources.back]) {
      material.uniforms.uFaceCenter.value.set(center.x * 0.5 + 0.5, center.y * 0.5 + 0.5)
      material.uniforms.uFaceRadius.value.set(Math.max(0.001, Math.abs(right.x - center.x) * 0.5), Math.max(0.001, Math.abs(top.y - center.y) * 0.5))
    }

    const previousTarget = gl.getRenderTarget()
    const previousAutoClear = gl.autoClear
    const previousAlpha = gl.getClearAlpha()
    gl.getClearColor(resources.clearColor)
    try {
      gl.setClearColor(SCENE.colors.background, 1)
      gl.autoClear = true
      gl.setRenderTarget(resources.targets[0])
      gl.render(scene, camera)
      gl.setRenderTarget(resources.targets[1])
      gl.render(scene, camera)
      gl.autoClear = false
      gl.clearDepth()
      resources.shell.material = resources.back
      resources.back.uniforms.uTexture.value = resources.targets[0].texture
      gl.render(resources.glassScene, camera)
      gl.setRenderTarget(previousTarget)
      gl.autoClear = true
      gl.render(scene, camera)
      gl.autoClear = false
      gl.clearDepth()
      resources.shell.material = resources.front
      resources.front.uniforms.uTexture.value = resources.targets[1].texture
      gl.getDrawingBufferSize(resources.bufferSize)
      resources.front.uniforms.uResolution.value.copy(resources.bufferSize)
      gl.render(resources.glassScene, camera)
      if (portraitImage.current.loaded && !hasRendered.current) {
        hasRendered.current = true
        readyFrame.current = requestAnimationFrame(() => onReady?.())
      }
    } catch (error) {
      console.error('Portrait glass rendering failed', error)
      onFailure()
      return
    } finally {
      gl.setRenderTarget(previousTarget)
      gl.autoClear = previousAutoClear
      gl.setClearColor(resources.clearColor, previousAlpha)
    }
    invalidate()
  }, 1)

  return (
    <>
      <mesh ref={headline} position={[0, 0, -2.15]} scale={[7.2, 4.8, 1]}
        geometry={resources.planeGeometry} material={resources.headlineMaterial} renderOrder={-1} dispose={null} />
      <group ref={content} rotation={GLASS_POSES[0].rotation} dispose={null}>
        <mesh ref={atmosphere} position={[0, 0, -0.8]} scale={[2.5, 2.5, 1]}
          geometry={resources.planeGeometry} material={resources.atmosphereMaterial} renderOrder={0} />
        <mesh ref={portrait} position={[0, -0.035, GLASS_POSES[0].portraitDepth]}
          geometry={resources.planeGeometry} material={resources.portraitMaterial} renderOrder={1} />
      </group>
    </>
  )
}

export default function SceneCanvas(props: SceneCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: SCENE.camera.fov, near: 0.1, far: 50 }}
      dpr={SCENE.dpr} frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.toneMapping = NoToneMapping
        gl.outputColorSpace = SRGBColorSpace
        gl.setClearColor(SCENE.colors.background, 0)
      }} style={{ touchAction: 'pan-y' }}>
      <PortraitGlass {...props} />
    </Canvas>
  )
}
