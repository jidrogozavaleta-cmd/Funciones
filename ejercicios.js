/*
 * Ejercicios con corrección al instante.
 * T = plantillas (cada una genera un ejercicio con números al azar).
 * El «motor» dibuja los ejercicios, los califica y lleva el puntaje.
 */

const T = [
  () => {
    const ok = Math.random() < 0.5,
      xs = [ri(-4, 0), ri(1, 3), ri(4, 6), ri(7, 9)];
    if (!ok) xs[2] = xs[1];
    const ps = xs.map((x) => `(${neg(x)}, ${neg(ri(-6, 9))})`);
    if (!ok) while (ps[2] === ps[1]) ps[2] = `(${neg(xs[1])}, ${neg(ri(-6, 9))})`;
    return {
      tema: "Concepto",
      q: `¿La relación <span class="m">{${ps.join(", ")}}</span> es una función?`,
      kind: "mc",
      opts: ["Sí, es función", "No es función"],
      ans: ok ? 0 : 1,
      hint: "Fíjate si algún valor de x se repite con otra y.",
      sol: ok
        ? "Sí: cada x aparece una sola vez, así que tiene una única salida."
        : `No: x = ${neg(xs[1])} tiene dos salidas distintas.`,
      v: 0,
    };
  },
  () => {
    const m = nz(-5, 5),
      b = ri(-9, 9),
      x = ri(-5, 5),
      a = m * x + b;
    return {
      tema: "Lineal",
      q: `Si <span class="m">f(x) = ${lin(m, b)}</span>, ¿cuánto vale <span class="m">f(${neg(x)})</span>?`,
      kind: "num",
      ans: a,
      hint: "Reemplaza x por el número y respeta los signos.",
      sol: `f(${neg(x)}) = ${neg(m)}·${p(x)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${neg(m * x)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = <b>${neg(a)}</b>`,
      v: 0,
    };
  },
  () => {
    const x1 = ri(-5, 2),
      dx = ri(1, 4),
      x2 = x1 + dx,
      y1 = ri(-5, 5),
      dy = nz(-6, 6),
      y2 = y1 + dy;
    return {
      tema: "Lineal",
      q: `Halla la pendiente de la recta que pasa por <span class="m">A(${neg(x1)}, ${neg(y1)})</span> y <span class="m">B(${neg(x2)}, ${neg(y2)})</span>.`,
      kind: "num",
      ans: dy / dx,
      hint: "m = (y₂ − y₁) / (x₂ − x₁)",
      sol: `m = (${neg(y2)} − ${p(y1)}) / (${neg(x2)} − ${p(x1)}) = ${neg(dy)}/${dx} = <b>${frac(dy, dx)}</b>`,
      v: 0,
    };
  },
  () => {
    const k = ri(2, 4),
      m = nz(-4, 4),
      b = ri(-5, 5);
    return {
      tema: "Lineal",
      q: `La recta <span class="m">${k}y = ${lin(k * m, k * b)}</span>. Escribe su pendiente m y su ordenada al origen b.`,
      kind: "pair",
      labels: ["m =", "b ="],
      ordered: true,
      ans: [m, b],
      hint: `Despeja y: divide todo entre ${k}.`,
      sol: `y = ${lin(m, b)} → m = <b>${neg(m)}</b>, b = <b>${neg(b)}</b>`,
      v: 1,
    };
  },
  () => {
    const m = pick([nz(1, 5), -nz(1, 5), 0]),
      b = ri(-6, 6);
    return {
      tema: "Lineal",
      q: `La función <span class="m">f(x) = ${m ? lin(m, b) : neg(b)}</span> es…`,
      kind: "mc",
      opts: ["Creciente", "Decreciente", "Constante"],
      ans: m > 0 ? 0 : m < 0 ? 1 : 2,
      hint: "Mira el signo de la pendiente (el número que acompaña a x).",
      sol: `La pendiente es ${neg(m)}, ${m > 0 ? "positiva: creciente" : m < 0 ? "negativa: decreciente" : "cero: constante"}.`,
      v: 0,
    };
  },
  () => {
    const r = ri(-6, 6),
      m = nz(-4, 4),
      b = -m * r;
    return {
      tema: "Lineal",
      q: `¿En qué valor de x corta la recta <span class="m">y = ${lin(m, b)}</span> al eje x?`,
      kind: "num",
      ans: r,
      hint: "En el eje x, y vale 0. Resuelve mx + b = 0.",
      sol: `${lin(m, b)} = 0 → ${neg(m)}x = ${neg(-b)} → x = <b>${neg(r)}</b>`,
      v: 1,
    };
  },
  () => {
    const base = ri(3, 6),
      per = pick([1.5, 2, 2.5, 3]),
      km = ri(3, 15),
      t = base + per * km;
    return {
      tema: "Aplicación",
      q: `Un taxi cobra S/ ${base} al subir más S/ ${String(per).replace(".", ",")} por kilómetro. ¿Cuánto cuesta (en soles) un viaje de ${km} km?`,
      kind: "num",
      ans: t,
      hint: "Arma la función C(x) = (precio por km)·x + costo fijo.",
      sol: `C(x) = ${String(per).replace(".", ",")}x + ${base} → C(${km}) = ${String(per * km).replace(".", ",")} + ${base} = <b>S/ ${String(t).replace(".", ",")}</b>`,
      v: 0,
    };
  },
  () => {
    const m = nz(-2, 2),
      b = ri(-3, 3),
      x1 = ri(-2, 0),
      x2 = x1 + ri(1, 3);
    return {
      tema: "Gráfica",
      q: `Mueve los deslizadores hasta que la recta pase por <span class="m">A(${neg(x1)}, ${neg(m * x1 + b)})</span> y <span class="m">B(${neg(x2)}, ${neg(m * x2 + b)})</span>.`,
      kind: "graph",
      ans: [m, b],
      A: [x1, m * x1 + b],
      B: [x2, m * x2 + b],
      hint: "Primero calcula la pendiente entre A y B, luego ajusta b.",
      sol: `m = ${neg(m)}, b = ${neg(b)} → y = <b>${lin(m, b)}</b>`,
      v: 0,
    };
  },
  () => {
    const a = nz(-3, 3),
      b = ri(-5, 5),
      c = ri(-6, 6),
      x = ri(-3, 3),
      r = a * x * x + b * x + c;
    return {
      tema: "Cuadrática",
      q: `Si <span class="m">f(x) = ${quad(a, b, c)}</span>, ¿cuánto vale <span class="m">f(${neg(x)})</span>?`,
      kind: "num",
      ans: r,
      hint: "Primero eleva x al cuadrado (siempre da positivo), luego multiplica.",
      sol: `f(${neg(x)}) = ${neg(a)}·${x * x} ${b * x < 0 ? "−" : "+"} ${Math.abs(b * x)} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = <b>${neg(r)}</b>`,
      v: 2,
    };
  },
  () => {
    const a = nz(-4, 4),
      b = ri(-6, 6),
      c = ri(-6, 6);
    return {
      tema: "Cuadrática",
      q: `La parábola <span class="m">y = ${quad(a, b, c)}</span>…`,
      kind: "mc",
      opts: [
        "Abre hacia arriba y su vértice es un mínimo",
        "Abre hacia abajo y su vértice es un máximo",
        "Abre hacia arriba y su vértice es un máximo",
        "Abre hacia abajo y su vértice es un mínimo",
      ],
      ans: a > 0 ? 0 : 1,
      hint: "Solo importa el signo de a (el número que acompaña a x²).",
      sol: `a = ${neg(a)} es ${a > 0 ? "positivo: abre hacia arriba, mínimo" : "negativo: abre hacia abajo, máximo"}.`,
      v: 2,
    };
  },
  () => {
    const a = nz(-2, 2),
      h = ri(-4, 4),
      k = ri(-6, 6),
      b = -2 * a * h,
      c = a * h * h + k;
    return {
      tema: "Cuadrática",
      q: `Halla el vértice de <span class="m">f(x) = ${quad(a, b, c)}</span>.`,
      kind: "pair",
      labels: ["xᵥ =", "yᵥ ="],
      ordered: true,
      ans: [h, k],
      hint: "xᵥ = −b / (2a); luego reemplaza xᵥ en f(x).",
      sol: `xᵥ = −(${neg(b)}) / (2·${p(a)}) = ${neg(h)}; yᵥ = f(${neg(h)}) = ${neg(k)} → <b>V(${neg(h)}, ${neg(k)})</b>`,
      v: 3,
    };
  },
  () => {
    const r1 = ri(-6, 6),
      r2 = ri(-6, 6);
    return {
      tema: "Cuadrática",
      q: `Encuentra las raíces de <span class="m">${quad(1, -(r1 + r2), r1 * r2)} = 0</span>.`,
      kind: "pair",
      labels: ["x₁ =", "x₂ ="],
      ordered: false,
      ans: [r1, r2],
      hint: "Busca dos números que sumados den el opuesto del coeficiente de x y multiplicados den el término independiente.",
      sol: `(x ${r1 < 0 ? "+" : "−"} ${Math.abs(r1)})(x ${r2 < 0 ? "+" : "−"} ${Math.abs(r2)}) = 0 → x = <b>${neg(r1)}</b> y x = <b>${neg(r2)}</b>`,
      v: 5,
    };
  },
  () => {
    const cs = ri(0, 2);
    let a = nz(-2, 2),
      b,
      c;
    if (cs === 0) {
      let r1 = ri(-4, 4),
        r2;
      do r2 = ri(-4, 4);
      while (r2 === r1);
      b = -a * (r1 + r2);
      c = a * r1 * r2;
    } else if (cs === 1) {
      const h = ri(-4, 4);
      b = -2 * a * h;
      c = a * h * h;
    } else {
      const h = ri(-3, 3),
        k = Math.sign(a) * ri(1, 5);
      b = -2 * a * h;
      c = a * h * h + k;
    }
    const D = b * b - 4 * a * c;
    return {
      tema: "Cuadrática",
      q: `¿Cuántas raíces reales tiene <span class="m">${quad(a, b, c)} = 0</span>?`,
      kind: "mc",
      opts: ["Dos raíces reales distintas", "Una raíz real (doble)", "Ninguna raíz real"],
      ans: D > 0 ? 0 : D === 0 ? 1 : 2,
      hint: "Calcula el discriminante Δ = b² − 4ac y mira su signo.",
      sol: `Δ = ${p(b)}² − 4·${p(a)}·${p(c)} = <b>${neg(D)}</b> → ${D > 0 ? "Δ > 0: dos raíces" : D === 0 ? "Δ = 0: una raíz doble" : "Δ < 0: ninguna raíz real"}.`,
      v: 3,
    };
  },
];

/* ---------- motor ---------- */
let S = [];
function build() {
  drawers.length = 0;
  S = T.map((t) => ({ ...t(), done: false, ok: false, tries: 0 }));
  $("exs").innerHTML = S.map((e, i) => {
    let body = "";
    if (e.kind === "num")
      body = `<div class="row"><label>Respuesta <input class="ans" id="a${i}_0" inputmode="decimal" autocomplete="off"></label><button class="btn main" data-c="${i}">Comprobar</button></div>`;
    if (e.kind === "pair")
      body = `<div class="row">${e.labels.map((l, j) => `<label>${l} <input class="ans" id="a${i}_${j}" inputmode="decimal" autocomplete="off"></label>`).join("")}<button class="btn main" data-c="${i}">Comprobar</button></div>`;
    if (e.kind === "mc")
      body = `<div class="opts">${e.opts.map((o, j) => `<button class="opt" data-mc="${i}" data-j="${j}">${o}</button>`).join("")}</div>`;
    if (e.kind === "graph") {
      e.m = 1;
      e.b = 0;
      body = `<div class="fig"><canvas id="g${i}"></canvas></div><div class="sliders"><label>m<input type="range" min="-5" max="5" step="0.5" value="1" data-g="${i}" data-k="m" aria-label="pendiente m"><output id="g${i}m">1</output></label><label>b<input type="range" min="-8" max="8" step="1" value="0" data-g="${i}" data-k="b" aria-label="ordenada b"><output id="g${i}b">0</output></label></div><div class="live" id="lv${i}"></div><div class="row"><button class="btn main" data-c="${i}">Comprobar</button></div>`;
    }
    return `<article class="ex" id="ex${i}"><header><b>${i + 1}.</b><span class="chip">${e.tema}</span></header><div class="q">${e.q}</div>${body}<div class="fb" id="fb${i}" role="status"></div><div class="row"><button class="link" data-h="${i}">Pista</button><button class="link" data-s="${i}">Ver solución</button></div><div class="sol" id="sol${i}"></div></article>`;
  }).join("");
  S.forEach((e, i) => {
    if (e.kind === "graph") {
      const cv = $("g" + i);
      reg(cv.parentElement, () => gDraw(i));
    }
  });
  score();
}
function gDraw(i) {
  const e = S[i],
    cv = $("g" + i),
    on = ([x, y]) => Math.abs(e.m * x + e.b - y) < 1e-9;
  plot(
    cv,
    [{ f: (x) => e.m * x + e.b }],
    [
      { x: e.A[0], y: e.A[1], t: "A", c: on(e.A) ? css("--ok") : css("--red") },
      { x: e.B[0], y: e.B[1], t: "B", c: on(e.B) ? css("--ok") : css("--red") },
    ],
  );
  $("lv" + i).innerHTML =
    `<span>y = ${lin(e.m, e.b)}</span><span class="${on(e.A) ? "y" : ""}">${on(e.A) ? "✓ Pasa por A" : "✗ No pasa por A"}</span><span class="${on(e.B) ? "y" : ""}">${on(e.B) ? "✓ Pasa por B" : "✗ No pasa por B"}</span>`;
}
function grade(i, ok, msg) {
  const e = S[i];
  if (e.done && e.ok) return;
  e.tries++;
  const fb = $("fb" + i),
    ex = $("ex" + i);
  if (ok) {
    e.done = e.ok = true;
    e.first = e.tries === 1;
    ex.className = "ex good";
    fb.className = "fb show ok";
    fb.innerHTML = `<strong>¡Correcto!${e.first ? " Al primer intento." : ""}</strong><p>${e.sol}</p>`;
  } else {
    ex.className = "ex bad";
    fb.className = "fb show no";
    fb.innerHTML = `<strong>${msg || "Todavía no. Revisa tu procedimiento e inténtalo otra vez."}</strong><p>Pista: ${e.hint}<br>Repasa con el ${vlink(e.v)}.</p>`;
  }
  score();
}
function check(i) {
  const e = S[i];
  if (e.kind === "graph")
    return grade(
      i,
      e.m === e.ans[0] && e.b === e.ans[1],
      "La recta aún no pasa por los dos puntos.",
    );
  const vals = (e.kind === "num" ? [0] : [0, 1]).map((j) =>
    num($("a" + i + "_" + j).value),
  );
  if (vals.some(isNaN)) {
    const fb = $("fb" + i);
    fb.className = "fb show no";
    fb.innerHTML =
      "<strong>Escribe un número válido (por ejemplo −3, 2/5 o 0,5).</strong>";
    return;
  }
  const eq = (a, b) => Math.abs(a - b) < 1e-6;
  if (e.kind === "num") return grade(i, eq(vals[0], e.ans));
  const ok = e.ordered
    ? eq(vals[0], e.ans[0]) && eq(vals[1], e.ans[1])
    : (eq(vals[0], e.ans[0]) && eq(vals[1], e.ans[1])) ||
      (eq(vals[0], e.ans[1]) && eq(vals[1], e.ans[0]));
  let msg;
  if (!ok && e.ordered && (eq(vals[0], e.ans[0]) || eq(vals[1], e.ans[1])))
    msg = "Uno de los dos valores está bien; revisa el otro.";
  grade(i, ok, msg);
}
function score() {
  const c = S.filter((e) => e.ok).length,
    f = S.filter((e) => e.first).length;
  $("sc").textContent = `Correctas: ${c} de ${S.length}`;
  $("sc2").textContent = `Al primer intento: ${f}`;
  $("scb").style.width = (c / S.length) * 100 + "%";
  if (c === S.length)
    $("sc").textContent =
      `¡Terminaste! ${c} de ${S.length} · Nota: ${Math.round((20 * f) / S.length)}/20 al primer intento`;
}
$("exs").addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  if (d.c) check(+d.c);
  if (d.mc) {
    const i = +d.mc,
      ex = S[i];
    if (ex.ok) return;
    const ok = +d.j === ex.ans;
    t.classList.add(ok ? "right" : "wrong");
    grade(i, ok, ok ? "" : "Esa no es. Elige otra opción.");
  }
  if (d.h) {
    const fb = $("fb" + d.h);
    if (!fb.classList.contains("ok")) {
      fb.className = "fb show";
      fb.innerHTML = `<strong style="color:var(--blue)">Pista</strong><p>${S[d.h].hint}</p>`;
    }
  }
  if (d.s) {
    const s = $("sol" + d.s);
    s.innerHTML = S[d.s].sol;
    s.classList.toggle("show");
    t.textContent = s.classList.contains("show") ? "Ocultar solución" : "Ver solución";
  }
});
$("exs").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.id?.startsWith("a"))
    check(+e.target.id.slice(1).split("_")[0]);
});
$("exs").addEventListener("input", (e) => {
  const d = e.target.dataset;
  if (d.g) {
    const ex = S[+d.g];
    ex[d.k] = +e.target.value;
    $("g" + d.g + d.k).textContent = neg(ex[d.k]);
    gDraw(+d.g);
  }
});
$("regen").onclick = () => {
  build();
  scrollTo(0, 0);
};
build();
