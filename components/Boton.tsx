import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORES } from '@/constants/colores';

interface Props {
  titulo: string;
  alPresionar: () => void;
  color?: string;
}

export function Boton({ titulo, alPresionar, color = COLORES.primario }: Props) {
  return (
    <Pressable onPress={alPresionar} style={[estilos.boton, { backgroundColor: color }]} accessibilityRole="button">
      <Text style={estilos.texto}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: { minHeight: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  texto: { color: '#0F172A', fontSize: 16, fontWeight: '700' },
});
