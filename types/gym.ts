export type DiaSemana =
  | 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';

export type GrupoMuscular =
  | 'pierna' | 'pecho' | 'triceps' | 'espalda' | 'hombro' | 'biceps'
  | 'abdomen' | 'cadera' | 'gluteo' | 'lumbar' | 'antebrazo';

export interface Ejercicio {
  id: string; // 'pec-01'
  nombre: string;
  grupo: GrupoMuscular;
  series: number; // 4
  repeticiones: number; // 12
  imagen?: number; // require('@/assets/images/ejercicios/pec-01.png')
}

export interface DiaPlan {
  dia: DiaSemana;
  enfoque: string;
  color: string;
  ejercicios: string[]; // ids de Ejercicio
  cardioMin?: number;
}

export interface Medida {
  mes: string; // '2026-11'
  estaturaM: number;
  pesoKg: number;
  perimetrosCm: Record<
    'hombro' | 'brazo' | 'antebrazo' | 'pecho' | 'abdomen' | 'cadera' | 'pierna' | 'pantorrilla',
    number
  >;
}

export interface Socio {
  nombre: string;
  edad: number;
  fechaAsignacion: string; // '2026-11-04'
  objetivo: string;
  observaciones: string[];
  lesiones: GrupoMuscular[];
  medidas: Medida[];
}
