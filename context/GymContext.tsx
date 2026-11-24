import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Socio, Medida, DiaSemana } from '@/types/gym';
import { socioInicial } from '@/data/socio';

type Completados = Record<DiaSemana, string[]>;

interface GymState {
  socio: Socio;
  setSocio: (s: Socio) => void;
  medidas: Medida[];
  agregarMedida: (m: Medida) => void;
  completados: Completados;
  alternarEjercicio: (dia: DiaSemana, id: string) => void;
}

const vacio: Completados = {
  lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: [],
};

const GymContext = createContext<GymState | null>(null);

export function GymProvider({ children }: { children: ReactNode }) {
  const [socio, setSocio] = useState<Socio>(socioInicial);
  const [medidas, setMedidas] = useState<Medida[]>(socioInicial.medidas);
  const [completados, setCompletados] = useState<Completados>(vacio);

  const agregarMedida = (m: Medida) => setMedidas(prev => [m, ...prev]);

  const alternarEjercicio = (dia: DiaSemana, id: string) =>
    setCompletados(prev => ({
      ...prev,
      [dia]: prev[dia].includes(id)
        ? prev[dia].filter(x => x !== id)
        : [...prev[dia], id],
    }));

  return (
    <GymContext.Provider
      value={{ socio, setSocio, medidas, agregarMedida, completados, alternarEjercicio }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym(): GymState {
  const ctx = useContext(GymContext);
  if (!ctx) throw new Error('useGym debe usarse dentro de GymProvider');
  return ctx;
}
