// IMC = peso (kg) / estatura (m)^2
export function calcularImc(pesoKg: number, estaturaM: number): number {
  return pesoKg / (estaturaM * estaturaM);
}

// Clasificación OMS. Se compara con el valor ya redondeado a 1 decimal,
// para que lo mostrado y la categoría siempre coincidan.
export function clasificarImc(imc: number): string {
  const v = Math.round(imc * 10) / 10;
  if (v < 18.5) return 'Bajo peso';
  if (v < 25) return 'Normal';
  if (v < 30) return 'Sobrepeso';
  if (v < 35) return 'Obesidad grado I';
  if (v < 40) return 'Obesidad grado II';
  return 'Obesidad grado III';
}
