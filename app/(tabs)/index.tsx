import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TarjetaDia } from '@/components/TarjetaDia';
import { COLORES } from '@/constants/colores';
import { PLAN, diaDeHoy } from '@/data/plan';
import { useGym } from '@/context/GymContext';

export default function Inicio() {
  const { socio } = useGym();
  const hoy = diaDeHoy();

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Text style={estilos.titulo}>Hola, {socio.nombre.split(' ')[0]}</Text>
        <Text style={estilos.subtitulo}>Tu plan semanal</Text>
        {hoy === null && (
          <Text style={estilos.descanso}>Hoy es domingo: día de descanso 😴</Text>
        )}
        {PLAN.map(p => (
          <TarjetaDia key={p.dia} plan={p} esHoy={p.dia === hoy} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 16 },
  titulo: { color: COLORES.texto, fontSize: 26, fontWeight: '800' },
  subtitulo: { color: COLORES.textoSuave, fontSize: 16, marginBottom: 14 },
  descanso: {
    color: COLORES.texto, fontSize: 16, backgroundColor: COLORES.tarjeta,
    padding: 12, borderRadius: 10, marginBottom: 14,
  },
});
