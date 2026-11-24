import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormularioMedida } from '@/components/FormularioMedida';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { calcularImc, clasificarImc } from '@/utils/imc';

export default function Medidas() {
  const { medidas, agregarMedida } = useGym();
  // Más reciente primero: el contexto agrega al inicio, pero el usuario puede cargar meses antiguos.
  const historial = [...medidas].sort((a, b) => b.mes.localeCompare(a.mes));
  const actual = historial[0];
  const anterior = historial[1];

  const imc = actual ? calcularImc(actual.pesoKg, actual.estaturaM) : null;
  const diferencia = actual && anterior ? actual.pesoKg - anterior.pesoKg : null;

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          <Text style={estilos.titulo}>Medidas</Text>

          {actual && imc !== null ? (
            <View style={estilos.resumen}>
              <Text style={estilos.nota}>Último registro: {actual.mes}</Text>
              <Text style={estilos.imc}>IMC {imc.toFixed(1)}</Text>
              <Text style={estilos.dato}>{clasificarImc(imc)}</Text>
              {diferencia !== null && (
                <Text style={estilos.dato}>
                  Cambio frente a {anterior?.mes}: {diferencia > 0 ? '+' : ''}
                  {diferencia.toFixed(1).replace('.', ',')} kg
                </Text>
              )}
            </View>
          ) : (
            <Text style={estilos.nota}>Aún no hay medidas registradas.</Text>
          )}

          <FormularioMedida mesesExistentes={medidas.map(m => m.mes)} alGuardar={agregarMedida} />

          <Text style={estilos.seccion}>Historial</Text>
          {historial.map(m => (
            <View key={m.mes} style={estilos.fila}>
              <Text style={estilos.dato}>{m.mes}</Text>
              <Text style={estilos.nota}>
                {m.pesoKg} kg · {m.estaturaM} m · IMC {calcularImc(m.pesoKg, m.estaturaM).toFixed(1)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  titulo: { color: COLORES.texto, fontSize: 26, fontWeight: '800', marginBottom: 12 },
  resumen: { backgroundColor: COLORES.tarjeta, borderRadius: 12, padding: 16, marginBottom: 12 },
  imc: { color: COLORES.primario, fontSize: 34, fontWeight: '800' },
  dato: { color: COLORES.texto, fontSize: 16 },
  nota: { color: COLORES.textoSuave, fontSize: 14 },
  seccion: { color: COLORES.primario, fontSize: 18, fontWeight: '700', marginTop: 24, marginBottom: 8 },
  fila: { backgroundColor: COLORES.tarjeta, borderRadius: 10, padding: 12, marginBottom: 8, minHeight: 44 },
});
