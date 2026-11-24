import type { DiaSemana } from '@/types/gym';

// Un color por día (los mismos del resaltador de la ficha).
export const COLOR_DIA: Record<DiaSemana, string> = {
  lunes: '#22C3E6',
  martes: '#F59E0B',
  miercoles: '#22C55E',
  jueves: '#EC4899',
  viernes: '#22C3E6',
  sabado: '#A3E635',
};

export const COLORES = {
  fondo: '#0F172A',
  tarjeta: '#1E293B',
  borde: '#334155',
  texto: '#F8FAFC',
  textoSuave: '#CBD5E1',
  primario: '#22C3E6',
  exito: '#22C55E',
  error: '#F87171',
  advertencia: '#FBBF24',
};
