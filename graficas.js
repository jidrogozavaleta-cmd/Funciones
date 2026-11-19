/*
 * Dibuja el plano cartesiano y las funciones en un <canvas>.
 * Se usa en el explorador y en el ejercicio de gráfica.
 */

function plot(cv, fns, pts = []) {
  const W = cv.clientWidth,
    H = cv.clientHeight;
  if (!W || !H) return;
  const d = devicePixelRatio || 1;
  cv.width = W * d;
  cv.height = H * d;
  const g = cv.getContext("2d");
  g.setTransform(d, 0, 0, d, 0, 0);
  const u = Math.min(W / 20, H / 20),
    cx = W / 2,
    cy = H / 2,
    X = (x) => cx + x * u,
    Y = (y) => cy - y * u,
    ym = H / 2 / u,
    xm = W / 2 / u;
  g.fillStyle = css("--card");
  g.fillRect(0, 0, W, H);
  g.strokeStyle = css("--grid");
  g.lineWidth = 1;
  g.beginPath();
  for (let i = Math.ceil(-xm); i <= xm; i++) {
    g.moveTo(X(i), 0);
    g.lineTo(X(i), H);
  }
  for (let j = Math.ceil(-ym); j <= ym; j++) {
    g.moveTo(0, Y(j));
    g.lineTo(W, Y(j));
  }
  g.stroke();
  g.strokeStyle = css("--soft");
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(0, cy);
  g.lineTo(W, cy);
  g.moveTo(cx, 0);
  g.lineTo(cx, H);
  g.stroke();
  g.fillStyle = css("--soft");
  g.font = "12px Atkinson Hyperlegible, sans-serif";
  const st = u < 22 ? 5 : 2;
  for (let i = Math.ceil(-xm / st) * st; i < xm; i += st) {
    if (i) g.fillText(neg(i), X(i) - 6, cy + 15);
  }
  for (let j = Math.ceil((-ym + 0.6) / st) * st; j < ym - 0.6; j += st) {
    if (j) g.fillText(neg(j), cx + 5, Y(j) + 4);
  }
  for (const f of fns) {
    g.strokeStyle = f.c || css("--blue");
    g.lineWidth = f.w || 3;
    g.setLineDash(f.dash || []);
    g.beginPath();
    let on = false;
    for (let px = 0; px <= W; px += 2) {
      const y = f.f((px - cx) / u),
        py = Y(y);
      if (!isFinite(py) || Math.abs(py) > H * 4) {
        on = false;
        continue;
      }
      on ? g.lineTo(px, py) : g.moveTo(px, py);
      on = true;
    }
    g.stroke();
    g.setLineDash([]);
  }
  for (const q of pts) {
    g.fillStyle = q.c || css("--red");
    g.beginPath();
    g.arc(X(q.x), Y(q.y), 6, 0, 7);
    g.fill();
    if (q.t) {
      g.font = "bold 14px Lexend, sans-serif";
      const tx = X(q.x) + 10,
        ty = Y(q.y) - 10;
      g.fillStyle = css("--card");
      g.fillRect(tx - 3, ty - 14, g.measureText(q.t).width + 6, 19);
      g.fillStyle = q.c || css("--red");
      g.fillText(q.t, tx, ty);
    }
  }
}
const drawers = [];
const ro = new ResizeObserver(() => drawers.forEach((f) => f()));
const reg = (el, f) => {
  drawers.push(f);
  ro.observe(el);
  f();
};
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () =>
  drawers.forEach((f) => f()),
);
new MutationObserver(() => drawers.forEach((f) => f())).observe(
  document.documentElement,
  { attributes: true, attributeFilter: ["data-theme"] },
);
