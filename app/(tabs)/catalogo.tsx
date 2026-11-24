import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemEjercicio } from '@/components/ItemEjercicio';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { EJERCICIOS, GRUPOS } from '@/data/ejercicios';
import { normalizar } from '@/utils/texto';

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const { socio } = useGym();
  const { width } = useWindowDimensions();
  // 2 columnas en vertical; 3 cuando el ancho supera 600 (horizontal o tablet).
  const columnas = width > 600 ? 3 : 2;

  const consulta = normalizar(busqueda.trim());
  const resultados = consulta
    ? EJERCICIOS.filter(e => normalizar(e.nombre).includes(consulta))
    : [];

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Catálogo</Text>
        <TextInput
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Buscar ejercicio…"
          placeholderTextColor={COLORES.textoSuave}
          style={estilos.input}
          autoCorrect={false}
        />

        {consulta ? (
          <View style={estilos.resultados}>
            <Text style={estilos.nota}>{resultados.length} resultado(s)</Text>
            {resultados.map(e => (
              <ItemEjercicio key={e.id} ejercicio={e} advertencia={socio.lesiones.includes(e.grupo)} />
            ))}
          </View>
        ) : (
          <View style={estilos.cuadricula}>
            {GRUPOS.map(g => (
              <View key={g.id} style={{ width: `${100 / columnas}%`, padding: 6 }}>
                <Link href={{ pathname: '/grupo/[grupo]', params: { grupo: g.id } }} asChild>
                  <Pressable style={StyleSheet.flatten(estilos.tarjeta)}>
                    <Text style={estilos.nombre}>{g.nombre}</Text>
                    <Text style={estilos.nota}>
                      {EJERCICIOS.filter(e => e.grupo === g.id).length} ejercicios
                    </Text>
                  </Pressable>
                </Link>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 12, paddingBottom: 32 },
  titulo: { color: COLORES.texto, fontSize: 26, fontWeight: '800', marginHorizontal: 4, marginBottom: 10 },
  input: {
    minHeight: 48, borderWidth: 1, borderColor: COLORES.borde, borderRadius: 10, marginHorizontal: 4,
    backgroundColor: COLORES.tarjeta, color: COLORES.texto, fontSize: 16, paddingHorizontal: 12, marginBottom: 10,
  },
  cuadricula: { flexDirection: 'row', flexWrap: 'wrap' },
  tarjeta: {
    minHeight: 84, backgroundColor: COLORES.tarjeta, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: COLORES.borde, justifyContent: 'center',
  },
  nombre: { color: COLORES.texto, fontSize: 18, fontWeight: '700' },
  nota: { color: COLORES.textoSuave, fontSize: 14, marginBottom: 6 },
  resultados: { marginHorizontal: 4 },
});
