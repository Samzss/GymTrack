import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarraProgreso } from '@/components/BarraProgreso';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { Temporizador } from '@/components/Temporizador';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { buscarEjercicio, nombreGrupo } from '@/data/ejercicios';
import {
  CALENTAMIENTO_FINAL_MIN, CALENTAMIENTO_INICIO_MIN, NOMBRE_DIA, buscarDia, esDia,
} from '@/data/plan';
import type { Ejercicio, GrupoMuscular } from '@/types/gym';

export default function DetalleDia() {
  // El parámetro llega como string (o string[]): se valida antes de tratarlo como DiaSemana.
  const { dia } = useLocalSearchParams<{ dia: string }>();
  const { completados, alternarEjercicio, socio } = useGym();

  if (!esDia(dia)) {
    return (
      <SafeAreaView style={estilos.centro}>
        <Stack.Screen options={{ title: 'Día no válido' }} />
        <Text style={estilos.titulo}>Ese día no existe</Text>
        <Link href="/" style={estilos.enlace}>Volver al inicio</Link>
      </SafeAreaView>
    );
  }

  const plan = buscarDia(dia);
  const ejercicios = plan.ejercicios
    .map(buscarEjercicio)
    .filter((e): e is Ejercicio => e !== undefined);

  // Agrupa por grupo muscular conservando el orden de aparición.
  const porGrupo = ejercicios.reduce<Partial<Record<GrupoMuscular, Ejercicio[]>>>((acc, e) => {
    acc[e.grupo] = [...(acc[e.grupo] ?? []), e];
    return acc;
  }, {});
  const grupos = Object.keys(porGrupo) as GrupoMuscular[];
  const hechos = completados[dia];

  return (
    <SafeAreaView style={estilos.pantalla} edges={['bottom', 'left', 'right']}>
      <Stack.Screen options={{ title: `${NOMBRE_DIA[dia]} · ${plan.enfoque}` }} />
      <ScrollView contentContainerStyle={estilos.contenido}>
        <BarraProgreso valor={hechos.length} total={ejercicios.length} color={plan.color} />
        <Temporizador segundos={60} />

        <Text style={estilos.bloque}>Calentamiento inicial: {CALENTAMIENTO_INICIO_MIN} min</Text>
        <Text style={estilos.nota}>Trote, bicicleta o elíptica</Text>

        {grupos.map(g => (
          <View key={g}>
            <Text style={estilos.grupo}>{nombreGrupo(g)}</Text>
            {(porGrupo[g] ?? []).map(e => (
              <ItemEjercicio
                key={e.id}
                ejercicio={e}
                color={plan.color}
                completado={hechos.includes(e.id)}
                alAlternar={() => alternarEjercicio(dia, e.id)}
                advertencia={socio.lesiones.includes(e.grupo)}
              />
            ))}
          </View>
        ))}

        {plan.cardioMin !== undefined && (
          <Text style={estilos.bloque}>Cardio: {plan.cardioMin} min</Text>
        )}
        <Text style={estilos.bloque}>Calentamiento final: {CALENTAMIENTO_FINAL_MIN} min</Text>
        <Text style={estilos.nota}>Trote, bicicleta o elíptica</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  centro: { flex: 1, backgroundColor: COLORES.fondo, alignItems: 'center', justifyContent: 'center', gap: 12 },
  contenido: { padding: 16, paddingBottom: 32 },
  titulo: { color: COLORES.texto, fontSize: 20, fontWeight: '700' },
  enlace: { color: COLORES.primario, fontSize: 16, padding: 12 },
  bloque: { color: COLORES.texto, fontSize: 16, fontWeight: '700', marginTop: 16 },
  nota: { color: COLORES.textoSuave, fontSize: 14, marginBottom: 4 },
  grupo: { color: COLORES.primario, fontSize: 18, fontWeight: '700', marginTop: 16, marginBottom: 8 },
});
