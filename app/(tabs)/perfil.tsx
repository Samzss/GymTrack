import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Boton } from '@/components/Boton';
import { CampoFormulario } from '@/components/CampoFormulario';
import { COLORES } from '@/constants/colores';
import { useGym } from '@/context/GymContext';
import { GRUPOS } from '@/data/ejercicios';
import type { GrupoMuscular } from '@/types/gym';

export default function Perfil() {
  const { socio, setSocio } = useGym();
  const [nombre, setNombre] = useState(socio.nombre);
  const [edad, setEdad] = useState(String(socio.edad));
  const [objetivo, setObjetivo] = useState(socio.objetivo);
  const [observaciones, setObservaciones] = useState(socio.observaciones.join('\n'));
  const [lesiones, setLesiones] = useState<GrupoMuscular[]>(socio.lesiones);
  const [errores, setErrores] = useState<{ nombre?: string; edad?: string }>({});

  const alternarLesion = (g: GrupoMuscular) =>
    setLesiones(prev => (prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]));

  const guardar = () => {
    const nuevos: { nombre?: string; edad?: string } = {};
    if (nombre.trim() === '') nuevos.nombre = 'El nombre no puede estar vacío';
    // Number('') da 0 y Number('4a') da NaN: primero se exige que sean solo dígitos.
    const textoEdad = edad.trim();
    const edadNum = Number(textoEdad);
    if (!/^\d+$/.test(textoEdad) || edadNum < 14 || edadNum > 90) {
      nuevos.edad = 'La edad debe ser un entero entre 14 y 90';
    }
    setErrores(nuevos);
    if (nuevos.nombre || nuevos.edad) return;

    setSocio({
      ...socio,
      nombre: nombre.trim(),
      edad: edadNum,
      objetivo: objetivo.trim(),
      observaciones: observaciones.split('\n').map(l => l.trim()).filter(l => l !== ''),
      lesiones,
    });
    Alert.alert('Perfil guardado', 'Tus datos se actualizaron correctamente.');
  };

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={estilos.contenido} keyboardShouldPersistTaps="handled">
          <Text style={estilos.titulo}>Perfil</Text>
          <Text style={estilos.nota}>Plan asignado el {socio.fechaAsignacion}</Text>

          <CampoFormulario etiqueta="Nombre" value={nombre} onChangeText={setNombre} error={errores.nombre} />
          <CampoFormulario etiqueta="Edad" value={edad} onChangeText={setEdad}
            keyboardType="numeric" error={errores.edad} />
          <CampoFormulario etiqueta="Objetivo" value={objetivo} onChangeText={setObjetivo} />
          <CampoFormulario etiqueta="Observaciones médicas (una por línea)" value={observaciones}
            onChangeText={setObservaciones} multiline style={estilos.multilinea} />

          <Text style={estilos.etiqueta}>Lesiones por grupo muscular</Text>
          <View style={estilos.chips}>
            {GRUPOS.map(g => {
              const activo = lesiones.includes(g.id);
              return (
                <Pressable key={g.id} onPress={() => alternarLesion(g.id)}
                  style={[estilos.chip, activo && estilos.chipActivo]}>
                  <Text style={[estilos.chipTexto, activo && estilos.chipTextoActivo]}>{g.nombre}</Text>
                </Pressable>
              );
            })}
          </View>

          <Boton titulo="Guardar perfil" alPresionar={guardar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 16, paddingBottom: 40 },
  titulo: { color: COLORES.texto, fontSize: 26, fontWeight: '800' },
  nota: { color: COLORES.textoSuave, fontSize: 14, marginBottom: 14 },
  etiqueta: { color: COLORES.texto, fontSize: 14, fontWeight: '600', marginBottom: 8 },
  multilinea: { minHeight: 90, textAlignVertical: 'top', paddingTop: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip: {
    minHeight: 44, paddingHorizontal: 14, justifyContent: 'center', borderRadius: 22,
    borderWidth: 1, borderColor: COLORES.borde, backgroundColor: COLORES.tarjeta,
  },
  chipActivo: { backgroundColor: COLORES.advertencia, borderColor: COLORES.advertencia },
  chipTexto: { color: COLORES.texto, fontSize: 14 },
  chipTextoActivo: { color: '#0F172A', fontWeight: '700' },
});
