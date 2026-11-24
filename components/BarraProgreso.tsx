import { StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores';

interface Props {
  valor: number;
  total: number;
  color?: string;
}

export function BarraProgreso({ valor, total, color = COLORES.primario }: Props) {
  const porcentaje = total > 0 ? Math.round((valor / total) * 100) : 0;
  return (
    <View>
      <Text style={estilos.texto}>
        {valor} de {total} ejercicios · {porcentaje} %
      </Text>
      <View style={estilos.pista}>
        {/* El ancho del relleno es un porcentaje del ancho de la pista */}
        <View style={[estilos.relleno, { width: `${porcentaje}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  texto: { color: COLORES.texto, fontSize: 14, marginBottom: 6 },
  pista: { height: 12, borderRadius: 6, backgroundColor: COLORES.borde, overflow: 'hidden' },
  relleno: { height: '100%', borderRadius: 6 },
});
