/*
 * Funciones auxiliares compartidas: números al azar, fracciones,
 * lectura de respuestas del alumno y escritura de polinomios.
 */

const $ = (id) => document.getElementById(id);
const probe = document.createElement("i");
probe.style.display = "none";
document.body.appendChild(probe);
const css = (n) => {
  probe.style.color = "var(" + n + ")";
  return getComputedStyle(probe).color || "#1d3a8a";
};
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const nz = (a, b) => {
  let v;
  do v = ri(a, b);
  while (v === 0);
  return v;
};
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const neg = (n) => String(n).replace("-", "−");
const frac = (n, d) => {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  return d === 1 ? neg(n) : neg(n) + "/" + d;
};
const num = (s) => {
  s = String(s).trim().replace(/−/g, "-").replace(/\s/g, "").replace(",", ".");
  if (/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)) {
    const [a, b] = s.split("/");
    return +b === 0 ? NaN : +a / +b;
  }
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? +s : NaN;
};
const poly = (terms) => {
  let o = "";
  for (const [c, v] of terms) {
    if (!c) continue;
    const ab = Math.abs(c),
      k = ab === 1 && v ? "" : ab;
    o += o ? ` ${c < 0 ? "−" : "+"} ${k}${v}` : `${c < 0 ? "−" : ""}${k}${v}`;
  }
  return o || "0";
};
const lin = (m, b) =>
  poly([
    [m, "x"],
    [b, ""],
  ]);
const quad = (a, b, c) =>
  poly([
    [a, "x²"],
    [b, "x"],
    [c, ""],
  ]);
const p = (v) => (v < 0 ? `(${neg(v)})` : v);
