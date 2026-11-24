import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { COLORES } from '@/constants/colores';

interface Props extends TextInputProps {
  etiqueta: string;
  error?: string;
}

export function CampoFormulario({ etiqueta, error, style, ...resto }: Props) {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.etiqueta}>{etiqueta}</Text>
      <TextInput
        placeholderTextColor={COLORES.textoSuave}
        style={[estilos.input, error ? estilos.inputError : null, style]}
        {...resto}
      />
      {error ? <Text style={estilos.error}>{error}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { marginBottom: 14 },
  etiqueta: { color: COLORES.texto, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: {
    minHeight: 48, borderWidth: 1, borderColor: COLORES.borde, borderRadius: 10,
    backgroundColor: COLORES.tarjeta, color: COLORES.texto, fontSize: 16, paddingHorizontal: 12,
  },
  inputError: { borderColor: COLORES.error },
  error: { color: COLORES.error, fontSize: 14, marginTop: 4 },
});
