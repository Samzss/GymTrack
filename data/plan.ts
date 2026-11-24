import { COLOR_DIA } from '@/constants/colores';
import type { DiaPlan, DiaSemana } from '@/types/gym';

const fullBody = ['pec-01', 'esp-04', 'hom-01', 'pie-01', 'bic-01', 'tri-02', 'abd-01'];

export const PLAN: DiaPlan[] = [
  { dia: 'lunes', enfoque: 'Full body', color: COLOR_DIA.lunes, ejercicios: fullBody },
  {
    dia: 'martes',
    enfoque: 'Pierna + cardio',
    color: COLOR_DIA.martes,
    ejercicios: ['pie-01', 'pie-02', 'pie-03', 'pie-04', 'pie-05'],
    cardioMin: 20, // supuesto docente: la ficha no fija la duración
  },
  {
    dia: 'miercoles',
    enfoque: 'Tren superior + abdomen',
    color: COLOR_DIA.miercoles,
    ejercicios: ['pec-02', 'pec-04', 'hom-02', 'hom-03', 'tri-01', 'bic-04', 'abd-02', 'abd-03'],
  },
  {
    dia: 'jueves',
    enfoque: 'Pierna + tren superior',
    color: COLOR_DIA.jueves,
    ejercicios: ['pie-02', 'pie-04', 'esp-02', 'esp-03', 'lum-02', 'bic-02', 'tri-03'],
  },
  { dia: 'viernes', enfoque: 'Full body', color: COLOR_DIA.viernes, ejercicios: fullBody },
  {
    dia: 'sabado',
    enfoque: 'Glúteo + cardio',
    color: COLOR_DIA.sabado,
    ejercicios: ['glu-01', 'cad-01', 'cad-02', 'lum-03', 'ant-01', 'ant-02'],
    cardioMin: 20,
  },
];

export const NOMBRE_DIA: Record<DiaSemana, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
};

export const CALENTAMIENTO_INICIO_MIN = 5;
export const CALENTAMIENTO_FINAL_MIN = 10;

export function esDia(valor: string | undefined): valor is DiaSemana {
  return PLAN.some(p => p.dia === valor);
}

export function buscarDia(dia: DiaSemana): DiaPlan {
  // Seguro: DiaSemana solo admite los 6 días del plan.
  return PLAN.find(p => p.dia === dia) as DiaPlan;
}

// Date.getDay(): 0 = domingo, 1 = lunes ... 6 = sábado.
export function diaDeHoy(fecha: Date = new Date()): DiaSemana | null {
  const orden: (DiaSemana | null)[] = [null, 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  return orden[fecha.getDay()];
}
