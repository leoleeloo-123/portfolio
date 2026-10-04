import { BackSide, FrontSide, ShaderMaterial, Vector2 } from 'three'

const vertexShader = /* glsl */ `
varying vec3 vNormal;
varying vec3 vEye;
void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vEye = viewPosition.xyz;
  gl_Position = projectionMatrix * viewPosition;
}
`

// Six spectral bands and two surface passes follow the supplied optical recipe.
// Only a small projected face region is protected; the rest stays fully refractive.
const fragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uFaceCenter;
uniform vec2 uFaceRadius;
uniform float uBackside;
uniform float uChromatic;
uniform float uPower;
varying vec3 vNormal;
varying vec3 vEye;
vec3 bandSample(vec2 uv, vec3 eye, vec3 normal, float ior, float slide, float power) {
  vec3 ray = refract(eye, normal, 1.0 / ior);
  return texture2D(uTexture, clamp(uv + ray.xy * (power + slide) * uChromatic, 0.001, 0.999)).rgb;
}
float specular(vec3 light, vec3 normal, vec3 eye, float shininess, float diffuse) {
  vec3 direction = normalize(-light);
  vec3 halfway = normalize(direction - eye);
  return pow(max(dot(normal, halfway), 0.0), shininess) + max(dot(normal, direction), 0.0) * diffuse;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 normal = normalize(vNormal);
  if (uBackside > 0.5) normal = -normal;
  vec3 eye = normalize(vEye);
  float incidence = clamp(1.0 + dot(eye, normal), 0.0, 1.0);
  float face = 1.0 - smoothstep(0.75, 1.2, length((uv - uFaceCenter) / uFaceRadius));
  float protection = face * (1.0 - smoothstep(0.28, 0.75, incidence));
  float power = uPower * mix(1.0, 0.12, protection);
  vec3 color = vec3(0.0);
  for (int i = 0; i < SAMPLES; i++) {
    float slide = float(i) / float(SAMPLES) * 0.045 * mix(1.0, 0.12, protection);
    vec3 R = bandSample(uv, eye, normal, 1.15, slide, power);
    vec3 Y = bandSample(uv, eye, normal, 1.16, slide, power);
    vec3 G = bandSample(uv, eye, normal, 1.18, slide * 2.0, power);
    vec3 C = bandSample(uv, eye, normal, 1.22, slide * 2.5, power);
    vec3 B = bandSample(uv, eye, normal, 1.22, slide * 3.0, power);
    vec3 P = bandSample(uv, eye, normal, 1.22, slide, power);
    float r = R.r * 0.5;
    float y = (Y.r * 2.0 + Y.g * 2.0 - Y.b) / 6.0;
    float g = G.g * 0.5;
    float c = (C.g * 2.0 + C.b * 2.0 - C.r) / 6.0;
    float b = B.b * 0.5;
    float p = (P.b * 2.0 + P.r * 2.0 - P.g) / 6.0;
    color += vec3(r + (2.0 * p + 2.0 * y - c) / 3.0,
                  g + (2.0 * y + 2.0 * c - p) / 3.0,
                  b + (2.0 * c + 2.0 * p - y) / 3.0);
  }
  color /= float(SAMPLES);
  float luma = dot(color, vec3(0.2125, 0.7154, 0.0721));
  color = mix(vec3(luma), color, 1.08);
  float shine = specular(vec3(-1.0, 1.0, 1.0), normal, eye, 90.0, 0.02);
  shine += 0.6 * specular(vec3(1.0, 1.0, -1.0), normal, eye, 54.0, 0.01);
  color += shine * mix(1.0, 0.35, uBackside) * mix(1.0, 0.12, face);
  float fresnel = pow(incidence, 5.0) * mix(1.0, 0.60, face);
  color = mix(color, vec3(1.0), fresnel * mix(0.55, 0.25, uBackside));
  color += vec3(0.004, 0.005, 0.007);
  gl_FragColor = vec4(max(color, 0.0), 1.0);
  #include <colorspace_fragment>
}
`

export function createGlassMaterial(back: boolean, samples: number, chromatic: number) {
  return new ShaderMaterial({
    defines: { SAMPLES: samples },
    uniforms: {
      uTexture: { value: null }, uResolution: { value: new Vector2(1, 1) },
      uFaceCenter: { value: new Vector2(0.5, 0.58) },
      uFaceRadius: { value: new Vector2(0.08, 0.14) },
      uBackside: { value: back ? 1 : 0 }, uChromatic: { value: chromatic },
      uPower: { value: back ? 0.22 : 0.30 },
    },
    vertexShader, fragmentShader, side: back ? BackSide : FrontSide, toneMapped: false,
  })
}

function canvasWithContext(width: number, height = width) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D is unavailable')
  return { canvas, context }
}

/** Bright contours remain in the WebGL background so the shell can bend them. */
export function createHeadlineCanvas(lines: readonly string[], aspect = 1.5) {
  const width = 1536
  const height = Math.round(width / Math.max(0.6, aspect))
  const { canvas, context } = canvasWithContext(width, height)
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  let size = Math.min(height * 0.21, width * 0.25)
  const font = () => `800 ${size}px "Manrope Variable", "Microsoft YaHei", sans-serif`
  context.font = font()
  const widest = Math.max(...lines.map(line => context.measureText(line).width))
  size *= Math.min(1, width * 0.90 / Math.max(widest, 1))
  context.font = font()
  context.fillStyle = '#e9e9e9'
  lines.forEach((line, index) => context.fillText(line, width / 2, height / 2 + (index - 1) * size * 1.18))
  return canvas
}

/** A soft environment behind the photo complements the sharp typographic layer. */
export function createAtmosphereCanvas() {
  const { canvas, context } = canvasWithContext(768)
  const glow = context.createRadialGradient(410, 290, 12, 360, 360, 410)
  glow.addColorStop(0, 'rgba(137, 169, 195, .70)')
  glow.addColorStop(0.40, 'rgba(70, 113, 131, .40)')
  glow.addColorStop(0.72, 'rgba(37, 60, 82, .23)')
  glow.addColorStop(1, 'rgba(16, 17, 20, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, 768, 768)
  return canvas
}
