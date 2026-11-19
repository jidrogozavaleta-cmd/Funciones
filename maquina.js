/*
 * Máquina de funciones de la página «¿Qué es una función?»:
 * calcula f(x) = 2x + 3 mientras el alumno escribe.
 */

$("mx").addEventListener("input", (e) => {
  const v = num(e.target.value);
  $("my").textContent = isNaN(v) ? "?" : neg(+(2 * v + 3).toFixed(4));
});
