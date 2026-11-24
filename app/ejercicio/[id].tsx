import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { buscarEjercicio, nombreGrupo } from '@/data/ejercicios';
import { NOMBRE_DIA, PLAN } from '@/data/plan';

const IMAGEN_RESERVA = require('@/assets/images/ejercicios/ejercicio.png');

export default function DetalleEjercicio() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { socio } = useGym();
  const ejercicio = id ? buscarEjercicio(id) : undefined;

  if (!ejercicio) {
    return (
      <SafeAreaView style={estilos.centro}>
        <Stack.Screen options={{ title: 'Ejercicio no encontrado' }} />
        <Text style={estilos.titulo}>Ese ejercicio no existe</Text>
        <Link href="/catalogo" style={estilos.enlace}>Ir al catálogo</Link>
      </SafeAreaView>
    );
  }

  // Días del plan que incluyen este ejercicio.
  const dias = PLAN.filter(p => p.ejercicios.includes(ejercicio.id));

  return (
    <SafeAreaView style={estilos.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: ejercicio.nombre }} />
      <ScrollView contentContainerStyle={estilos.contenido}>
        <Image
          source={ejercicio.imagen ?? IMAGEN_RESERVA}
          style={estilos.imagen}
          resizeMode="contain"
        />

        <Text style={estilos.titulo}>{ejercicio.nombre}</Text>
        <Text style={estilos.dato}>Grupo: {nombreGrupo(ejercicio.grupo)}</Text>
        <Text style={estilos.dato}>
          Series y repeticiones: {ejercicio.series} × {ejercicio.repeticiones}
        </Text>
        {socio.lesiones.includes(ejercicio.grupo) && (
          <Text style={estilos.aviso}>⚠ Tienes una lesión en este grupo: consulta a tu entrenador.</Text>
        )}

        <Text style={estilos.seccion}>Asignado en</Text>
        {dias.length === 0 ? (
          <Text style={estilos.nota}>No está asignado a ningún día.</Text>
        ) : (
          dias.map(d => (
            <View key={d.dia} style={[estilos.chip, { borderColor: d.color }]}>
              <Text style={estilos.dato}>{NOMBRE_DIA[d.dia]} · {d.enfoque}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  centro: { flex: 1, backgroundColor: COLORES.fondo, alignItems: 'center', justifyContent: 'center', gap: 12 },
  contenido: { padding: 16 },
  imagen: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  marcador: { backgroundColor: COLORES.tarjeta, alignItems: 'center', justifyContent: 'center' },
  titulo: { color: COLORES.texto, fontSize: 24, fontWeight: '800', marginBottom: 8 },
  dato: { color: COLORES.texto, fontSize: 16, marginBottom: 4 },
  nota: { color: COLORES.textoSuave, fontSize: 14 },
  aviso: { color: COLORES.advertencia, fontSize: 14, marginTop: 8 },
  seccion: { color: COLORES.primario, fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  chip: { borderWidth: 2, borderRadius: 10, padding: 10, marginBottom: 8, minHeight: 44, justifyContent: 'center' },
  enlace: { color: COLORES.primario, fontSize: 16, padding: 12 },
});
