import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores';
import { parseNumero } from '@/utils/texto';
import type { Medida } from '@/types/gym';
import { Boton } from './Boton';
import { CampoFormulario } from './CampoFormulario';

type Perimetro = keyof Medida['perimetrosCm'];
const PERIMETROS: Perimetro[] = [
  'hombro', 'brazo', 'antebrazo', 'pecho', 'abdomen', 'cadera', 'pierna', 'pantorrilla',
];

interface Props {
  mesesExistentes: string[];
  alGuardar: (m: Medida) => void;
}

type Errores = Record<string, string>;

export function FormularioMedida({ mesesExistentes, alGuardar }: Props) {
  const [mes, setMes] = useState('');
  const [estatura, setEstatura] = useState('');
  const [peso, setPeso] = useState('');
  const [perim, setPerim] = useState<Record<Perimetro, string>>(
    () => Object.fromEntries(PERIMETROS.map(p => [p, ''])) as Record<Perimetro, string>,
  );
  const [errores, setErrores] = useState<Errores>({});

  const guardar = () => {
    const nuevos: Errores = {};
    const mesLimpio = mes.trim();
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mesLimpio)) nuevos.mes = 'Usa el formato AAAA-MM (ej. 2026-12)';
    else if (mesesExistentes.includes(mesLimpio)) nuevos.mes = 'Ya existe una medida de ese mes';

    const est = parseNumero(estatura);
    if (est === null || est < 1 || est > 2.3) nuevos.estatura = 'Estatura entre 1,00 y 2,30 m';
    const kg = parseNumero(peso);
    if (kg === null || kg < 30 || kg > 300) nuevos.peso = 'Peso entre 30 y 300 kg';

    const valores = {} as Record<Perimetro, number>;
    for (const p of PERIMETROS) {
      const v = parseNumero(perim[p]);
      if (v === null || v <= 0 || v > 300) nuevos[p] = 'Ingresa un valor en cm (mayor que 0)';
      else valores[p] = v;
    }

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0 || est === null || kg === null) return;

    alGuardar({ mes: mesLimpio, estaturaM: est, pesoKg: kg, perimetrosCm: valores });
    setMes(''); setEstatura(''); setPeso('');
    setPerim(Object.fromEntries(PERIMETROS.map(p => [p, ''])) as Record<Perimetro, string>);
  };

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>Registrar un mes</Text>
      <CampoFormulario etiqueta="Mes (AAAA-MM)" value={mes} onChangeText={setMes}
        placeholder="2026-12" error={errores.mes} autoCapitalize="none" />
      <CampoFormulario etiqueta="Estatura (m)" value={estatura} onChangeText={setEstatura}
        placeholder="1.75" keyboardType="decimal-pad" error={errores.estatura} />
      <CampoFormulario etiqueta="Peso (kg)" value={peso} onChangeText={setPeso}
        placeholder="98" keyboardType="decimal-pad" error={errores.peso} />
      {PERIMETROS.map(p => (
        <CampoFormulario key={p} etiqueta={`Perímetro de ${p} (cm)`} value={perim[p]}
          onChangeText={t => setPerim(prev => ({ ...prev, [p]: t }))}
          keyboardType="decimal-pad" error={errores[p]} />
      ))}
      <Boton titulo="Guardar medida" alPresionar={guardar} />
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: { backgroundColor: COLORES.fondo, marginTop: 8 },
  titulo: { color: COLORES.texto, fontSize: 18, fontWeight: '700', marginBottom: 10 },
});
