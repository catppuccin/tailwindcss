import convert from "color-convert";
import type { RGB } from "color-convert/conversions";

const intensityMap: { [k: number]: number } = {
  50: 0.71,
  100: 0.55,
  200: 0.4,
  300: 0.25,
  400: 0.1,
  500: 0,
  600: 0.1,
  700: 0.25,
  800: 0.4,
  900: 0.55,
  950: 0.71,
};

function hueShift(hues: Array<number>, hue: number, intensity: number) {
  const closestHue = hues.sort(
    (a, b) => Math.abs(a - hue) - Math.abs(b - hue)
  )[0];
  const hueShift = closestHue - hue;

  return intensity * hueShift * 0.5;
}

const shade = (rgb: RGB, shade: number): string => {
  let [h, s, v] = convert.rgb.hsv.raw(rgb);

  const intensity = intensityMap[shade];
  if (intensity === 0) {
    return convert.hsv.rgb([h, s, v]).toString().replaceAll(",", " ");
  }

  const darken = shade > 500;
  const hues = darken ? [360, 240, 120, 0] : [180, 300, 60];

  h += hueShift(hues, h, intensity);
  if (darken) {
    s += (100 - s) * intensity;
    v -= v * intensity;
  } else {
    s -= s * intensity;
    v += (100 - v) * intensity;
  }

  return convert.hsv.rgb([h, s, v]).toString().replaceAll(",", " ");
};

export const generateShades = (baseColor: RGB) => {
  const result: Record<string, string> = {};

  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => {
    result[step] = shade(baseColor, step);
  });

  return result;
};
