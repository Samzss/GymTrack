// Pasa a minúsculas y quita tildes: "Extensión" -> "extension".
// NFD separa cada letra de su tilde; el rango ̀-ͯ son las tildes sueltas.
export function normalizar(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Convierte texto de un TextInput a número. Devuelve null si está vacío o no es válido.
// Number('') es 0, y eso haría pasar un campo vacío como si fuera un valor real.
export function parseNumero(texto: string): number | null {
  const limpio = texto.trim().replace(',', '.');
  if (limpio === '') return null;
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
}
