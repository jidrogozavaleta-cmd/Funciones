/*
 * Lista de videos de YouTube. Para agregar uno, añade una fila
 * con [id del video, título, descripción].
 */

const V = [
  [
    "PnATAsxu_oo",
    "¿Qué es la función lineal? Explicación sencilla",
    "Pendiente, corte con el eje y y gráfica",
  ],
  [
    "UtQVHfLheq4",
    "Función lineal: video de refuerzo",
    "Ecuación de la recta y sus elementos",
  ],
  [
    "svqAxfMPw7Q",
    "Función cuadrática: explicación completa",
    "Forma de la parábola, vértice y cortes",
  ],
  ["iZ4guTg3tXg", "Vértice de una parábola", "Cómo hallar el vértice paso a paso"],
  [
    "6JQw45YO3Fs",
    "Gráfica de la función cuadrática",
    "Graficar con el vértice y una tabla de valores",
  ],
  ["Ql8L09-HsI0", "Función cuadrática: ejercicios resueltos", "Factorización y raíces"],
];
const playSvg =
  '<svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M8 5l14 8-14 8z" fill="#fff"/></svg>';
if ($("vids"))
  $("vids").innerHTML = V.map(
    ([id, t, s], i) =>
      `<a class="vid" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><span class="play">${playSvg}</span><span><b>${i + 1}. ${t}</b><small>${s}</small></span></a>`,
  ).join("");
const vlink = (i) =>
  `<a href="https://www.youtube.com/watch?v=${V[i][0]}" target="_blank" rel="noopener">Video ${i + 1}: ${V[i][1]}</a>`;
