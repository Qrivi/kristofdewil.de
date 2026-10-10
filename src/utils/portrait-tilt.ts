type Vector = [number, number, number];

export type PortraitOrientation = {
  right: Vector;
  normal: Vector;
};

export function getPortraitOrientation({ alpha, beta, gamma }: Pick<DeviceOrientationEvent, "alpha" | "beta" | "gamma">, screenAngle: number): PortraitOrientation | null {
  if (alpha === null || beta === null || gamma === null || ![alpha, beta, gamma, screenAngle].every(Number.isFinite)) return null;

  const radians = Math.PI / 180;
  const ca = Math.cos(alpha * radians);
  const sa = Math.sin(alpha * radians);
  const cb = Math.cos(beta * radians);
  const sb = Math.sin(beta * radians);
  const cg = Math.cos(gamma * radians);
  const sg = Math.sin(gamma * radians);
  const cosScreen = Math.cos(screenAngle * radians);
  const sinScreen = Math.sin(screenAngle * radians);

  // DeviceOrientation uses Z-X-Y rotations, not independent rotations about fixed axes.
  // https://www.w3.org/TR/orientation-event/#device-orientation
  const x: Vector = [ca * cg - sa * sb * sg, sa * cg + ca * sb * sg, -cb * sg];
  const y: Vector = [-sa * cb, ca * cb, sb];

  return {
    right: x.map((value, index) => value * cosScreen - y[index] * sinScreen) as Vector,
    normal: [sa * sb * cg + ca * sg, sa * sg - ca * sb * cg, cb * cg],
  };
}

export function getPortraitTilt(neutral: PortraitOrientation, current: PortraitOrientation): number {
  const dot = (a: Vector, b: Vector) => a.reduce((sum, value, index) => sum + value * b[index], 0);
  // Measure the current screen normal in the starting screen's horizontal plane.
  // Pure forward/backward pitch has no horizontal component, even in landscape.
  return Math.atan2(dot(neutral.right, current.normal), dot(neutral.normal, current.normal)) * (180 / Math.PI);
}
