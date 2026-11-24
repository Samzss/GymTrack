import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores';
import { NOMBRE_DIA } from '@/data/plan';
import type { DiaPlan } from '@/types/gym';

interface Props {
  plan: DiaPlan;
  esHoy: boolean;
}

export function TarjetaDia({ plan, esHoy }: Props) {
  return (
    <Link href={{ pathname: '/dia/[dia]', params: { dia: plan.dia } }} asChild>
      <Pressable
        style={StyleSheet.flatten([
          estilos.tarjeta,
          { borderColor: plan.color },
          esHoy && { backgroundColor: plan.color + '33' },
        ])}>
        <View style={[estilos.franja, { backgroundColor: plan.color }]} />
        <View style={estilos.cuerpo}>
          <Text style={estilos.dia}>{NOMBRE_DIA[plan.dia]}</Text>
          <Text style={estilos.enfoque}>{plan.enfoque}</Text>
        </View>
        {esHoy && <Text style={[estilos.hoy, { color: plan.color }]}>HOY</Text>}
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', minHeight: 64,
    borderWidth: 2, borderRadius: 12, backgroundColor: COLORES.tarjeta,
    marginBottom: 12, overflow: 'hidden',
  },
  franja: { width: 10, alignSelf: 'stretch' },
  cuerpo: { flex: 1, padding: 12 },
  dia: { color: COLORES.texto, fontSize: 18, fontWeight: '700' },
  enfoque: { color: COLORES.textoSuave, fontSize: 14, marginTop: 2 },
  hoy: { fontSize: 14, fontWeight: '800', marginRight: 14 },
});
