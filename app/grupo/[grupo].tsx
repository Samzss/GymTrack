import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { EJERCICIOS, esGrupo, nombreGrupo } from '@/data/ejercicios';

export default function DetalleGrupo() {
  const { grupo } = useLocalSearchParams<{ grupo: string }>();
  const { socio } = useGym();

  if (!esGrupo(grupo)) {
    return (
      <SafeAreaView style={estilos.centro}>
        <Stack.Screen options={{ title: 'Grupo no válido' }} />
        <Text style={estilos.titulo}>Ese grupo muscular no existe</Text>
        <Link href="/catalogo" style={estilos.enlace}>Volver al catálogo</Link>
      </SafeAreaView>
    );
  }

  const lista = EJERCICIOS.filter(e => e.grupo === grupo);
  const lesionado = socio.lesiones.includes(grupo);

  return (
    <SafeAreaView style={estilos.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: nombreGrupo(grupo) }} />
      <ScrollView contentContainerStyle={estilos.contenido}>
        {lesionado && (
          <Text style={estilos.aviso}>⚠ Registraste una lesión en este grupo muscular.</Text>
        )}
        {lista.map(e => (
          <ItemEjercicio key={e.id} ejercicio={e} advertencia={lesionado} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  centro: { flex: 1, backgroundColor: COLORES.fondo, alignItems: 'center', justifyContent: 'center', gap: 12 },
  contenido: { padding: 16 },
  titulo: { color: COLORES.texto, fontSize: 20, fontWeight: '700' },
  enlace: { color: COLORES.primario, fontSize: 16, padding: 12 },
  aviso: { color: COLORES.advertencia, fontSize: 14, marginBottom: 12 },
});
