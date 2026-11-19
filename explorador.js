/*
 * Explorador de gráficas: deslizadores para la función lineal
 * (m, b) y la cuadrática (a, b, c).
 */

const H = { mode: "L", m: 1, b: 1, a: 1, bq: -2, c: -3 };
const SL = {
  L: [
    ["m", "m", -5, 5, 0.5],
    ["b", "b", -8, 8, 1],
  ],
  Q: [
    ["a", "a", -3, 3, 0.5],
    ["bq", "b", -8, 8, 1],
    ["c", "c", -8, 8, 1],
  ],
};
function heroUI() {
  $("hS").innerHTML = SL[H.mode]
    .map(
      ([k, l, mi, ma, s]) =>
        `<label>${l}<input type="range" min="${mi}" max="${ma}" step="${s}" value="${H[k]}" data-k="${k}" aria-label="${l}"><output id="o_${k}">${neg(H[k])}</output></label>`,
    )
    .join("");
  heroDraw();
}
function heroDraw() {
  const hc = $("hero");
  if (H.mode === "L") {
    const { m, b } = H;
    $("hF").textContent = "f(x) = " + lin(m, b);
    $("hR").innerHTML =
      `<span>Pendiente: <b>${neg(m)}</b></span><span>Corte eje y: <b>(0, ${neg(b)})</b></span><span>Corte eje x: <b>${m ? "x = " + neg(+(-b / m).toFixed(2)) : "no corta"}</b></span><span>Es <b>${m > 0 ? "creciente" : m < 0 ? "decreciente" : "constante"}</b></span>`;
    plot(hc, [{ f: (x) => m * x + b }], [{ x: 0, y: b, t: "(0, " + neg(b) + ")" }]);
  } else {
    let { a, bq: b, c } = H;
    if (!a) {
      a = H.a = 0.5;
      heroUI();
      return;
    }
    const xv = -b / (2 * a),
      yv = a * xv * xv + b * xv + c,
      D = b * b - 4 * a * c,
      r = (n) => neg(+n.toFixed(2));
    $("hF").textContent = "f(x) = " + quad(a, b, c);
    const pts = [{ x: xv, y: yv, t: "V(" + r(xv) + ", " + r(yv) + ")" }];
    let rt = "ninguna real";
    if (D >= 0) {
      const x1 = (-b - Math.sqrt(D)) / (2 * a),
        x2 = (-b + Math.sqrt(D)) / (2 * a);
      rt = D
        ? "x = " + r(Math.min(x1, x2)) + " y x = " + r(Math.max(x1, x2))
        : "x = " + r(x1) + " (doble)";
      pts.push({ x: x1, y: 0, c: css("--ok") }, { x: x2, y: 0, c: css("--ok") });
    }
    $("hR").innerHTML =
      `<span>Vértice: <b>(${r(xv)}, ${r(yv)})</b> ${a > 0 ? "mínimo" : "máximo"}</span><span>Δ = <b>${r(D)}</b></span><span>Raíces: <b>${rt}</b></span><span>Abre hacia <b>${a > 0 ? "arriba" : "abajo"}</b></span>`;
    plot(hc, [{ f: (x) => a * x * x + b * x + c }], pts);
  }
}
$("hS").addEventListener("input", (e) => {
  const k = e.target.dataset.k;
  if (!k) return;
  H[k] = +e.target.value;
  $("o_" + k).textContent = neg(H[k]);
  heroDraw();
});
const setMode = (m) => {
  H.mode = m;
  $("tL").setAttribute("aria-pressed", m === "L");
  $("tQ").setAttribute("aria-pressed", m === "Q");
  heroUI();
};
$("tL").onclick = () => setMode("L");
$("tQ").onclick = () => setMode("Q");
heroUI();
reg($("hero"), heroDraw);
