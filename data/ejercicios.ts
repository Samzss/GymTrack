import type { Ejercicio, GrupoMuscular } from '@/types/gym';

// Todos los ejercicios de la ficha usan el esquema 4 x 12.
const e = (id: string, nombre: string, grupo: GrupoMuscular, imagen?: number): Ejercicio => ({
  id,
  nombre,
  grupo,
  series: 4,
  repeticiones: 12,
  imagen,
});

const reserva = require('@/assets/images/ejercicios/ejercicio.png');

// Las rutas se escriben directamente porque React Native no permite require dinámico.
export const EJERCICIOS: Ejercicio[] = [
  e('pie-01', 'Media prensa 45°', 'pierna', require('@/assets/images/ejercicios/pie-01.jpg')),
  e('pie-02', 'Extensión de cuádriceps', 'pierna', require('@/assets/images/ejercicios/pie-02.jpg')),
  e('pie-03', 'Desplazamiento con mancuerna', 'pierna', require('@/assets/images/ejercicios/pie-03.webp')),
  e('pie-04', 'Curl femoral', 'pierna', require('@/assets/images/ejercicios/pie-04.jpg')),
  e('pie-05', 'Pantorrilla sentado', 'pierna', require('@/assets/images/ejercicios/pie-05.jpg')),

  e('pec-01', 'Press banca plano', 'pecho', require('@/assets/images/ejercicios/pec-01.jpg')),
  e('pec-02', 'Vuelos', 'pecho', require('@/assets/images/ejercicios/pec-02.webp')),
  e('pec-03', 'Crossover', 'pecho', require('@/assets/images/ejercicios/pec-03.jpg')),
  e('pec-04', 'Peck deck', 'pecho', require('@/assets/images/ejercicios/pec-04.jpg')),

  e('tri-01', 'Extensión con mancuerna', 'triceps', require('@/assets/images/ejercicios/tri-01.jpg')),
  e('tri-02', 'Extensión en polea', 'triceps', require('@/assets/images/ejercicios/tri-02.jpg')),
  e('tri-03', 'Patada de tríceps', 'triceps', require('@/assets/images/ejercicios/tri-03.jpg')),
  e('tri-04', 'Fondos', 'triceps', require('@/assets/images/ejercicios/tri-04.webp')),

  e('esp-01', 'Dominada colgado', 'espalda', require('@/assets/images/ejercicios/esp-01.jpg')),
  e('esp-02', 'Jalón polea espalda', 'espalda', require('@/assets/images/ejercicios/esp-02.jpg')),
  e('esp-03', 'Remo sentado', 'espalda', require('@/assets/images/ejercicios/esp-03.jpg')),
  e('esp-04', 'Jalón polea al pecho', 'espalda', require('@/assets/images/ejercicios/esp-04.jpg')),

  e('hom-01', 'Press con mancuerna', 'hombro', require('@/assets/images/ejercicios/hom-01.jpg')),
  e('hom-02', 'Elevación lateral', 'hombro', require('@/assets/images/ejercicios/hom-02.jpg')),
  e('hom-03', 'Elevación frontal', 'hombro', require('@/assets/images/ejercicios/hom-03.webp')),
  e('hom-04', 'Remo al mentón cerrado', 'hombro', require('@/assets/images/ejercicios/hom-04.jpg')),
  e('hom-05', 'Hombro posterior', 'hombro', require('@/assets/images/ejercicios/hom-05.jpg')),

  e('bic-01', 'Curl con barra', 'biceps', require('@/assets/images/ejercicios/bic-01.jpg')),
  e('bic-02', 'Curl alternado de pie', 'biceps', require('@/assets/images/ejercicios/bic-02.jpg')),
  e('bic-03', 'Predicador con barra', 'biceps', require('@/assets/images/ejercicios/bic-03.jpg')),
  e('bic-04', 'Curl martillo', 'biceps', require('@/assets/images/ejercicios/bic-04.jpg')),

  e('abd-01', 'Elevación de piernas', 'abdomen', require('@/assets/images/ejercicios/abd-01.jpg')),
  e('abd-02', 'Oblicuos con dos mancuernas', 'abdomen', require('@/assets/images/ejercicios/abd-02.jpg')),
  e('abd-03', 'Máquina abdominal', 'abdomen', require('@/assets/images/ejercicios/abd-03.jpg')),

  e('cad-01', 'Abductor en máquina', 'cadera', require('@/assets/images/ejercicios/cad-01.jpg')),
  e('cad-02', 'Patada lateral en polea', 'cadera', reserva),

  e('glu-01', 'Máquina de glúteo', 'gluteo', reserva),

  e('lum-01', 'Peso muerto', 'lumbar', reserva),
  e('lum-02', 'Hiperextensiones', 'lumbar', reserva),
  e('lum-03', 'Máquina lumbar', 'lumbar', reserva),

  e('ant-01', 'Curl de muñeca', 'antebrazo', reserva),
  e('ant-02', 'Curl de muñeca invertido', 'antebrazo', reserva),
];

// Los 11 grupos de la ficha, con su nombre para mostrar (con tildes).
export const GRUPOS: { id: GrupoMuscular; nombre: string }[] = [
  { id: 'pierna', nombre: 'Pierna' },
  { id: 'pecho', nombre: 'Pecho' },
  { id: 'triceps', nombre: 'Tríceps' },
  { id: 'espalda', nombre: 'Espalda' },
  { id: 'hombro', nombre: 'Hombro' },
  { id: 'biceps', nombre: 'Bíceps' },
  { id: 'abdomen', nombre: 'Abdomen' },
  { id: 'cadera', nombre: 'Cadera' },
  { id: 'gluteo', nombre: 'Glúteo' },
  { id: 'lumbar', nombre: 'Lumbar' },
  { id: 'antebrazo', nombre: 'Antebrazo' },
];

export function nombreGrupo(id: GrupoMuscular): string {
  return GRUPOS.find(g => g.id === id)?.nombre ?? id;
}

export function buscarEjercicio(id: string): Ejercicio | undefined {
  return EJERCICIOS.find(x => x.id === id);
}

export function esGrupo(valor: string): valor is GrupoMuscular {
  return GRUPOS.some(g => g.id === valor);
}
