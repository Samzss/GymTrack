import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores';
import type { Ejercicio } from '@/types/gym';

const IMAGEN_RESERVA = require('@/assets/images/ejercicios/ejercicio.png');

interface Props {
  ejercicio: Ejercicio;
  color?: string;
  completado?: boolean;
  // Si se entrega, aparece el check para marcar la sesión (RF06).
  alAlternar?: () => void;
  // RF09: el grupo del ejercicio coincide con una lesión del socio.
  advertencia?: boolean;
}

export function ItemEjercicio({ ejercicio, color = COLORES.primario, completado, alAlternar, advertencia }: Props) {
  return (
    <View style={[estilos.fila, { borderLeftColor: color }]}>
      {alAlternar && (
        <Pressable
          onPress={alAlternar}
          style={estilos.check}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: !!completado }}
          accessibilityLabel={`Marcar ${ejercicio.nombre}`}>
          <Ionicons
            name={completado ? 'checkmark-circle' : 'ellipse-outline'}
            size={30}
            color={completado ? COLORES.exito : COLORES.textoSuave}
          />
        </Pressable>
      )}
      <Link href={{ pathname: '/ejercicio/[id]', params: { id: ejercicio.id } }} asChild>
        <Pressable style={StyleSheet.flatten(estilos.info)}>
          <View style={estilos.contenido}>
            <Image
              source={ejercicio.imagen ?? IMAGEN_RESERVA}
              style={estilos.miniatura}
              resizeMode="cover"
            />
            <View style={estilos.textos}>
              <Text style={[estilos.nombre, completado && estilos.tachado]}>{ejercicio.nombre}</Text>
              <Text style={estilos.detalle}>
                {ejercicio.series} × {ejercicio.repeticiones}
              </Text>
              {advertencia && (
                <Text style={estilos.aviso}>⚠ Tienes una lesión en este grupo: consulta a tu entrenador</Text>
              )}
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row', alignItems: 'center', minHeight: 56,
    backgroundColor: COLORES.tarjeta, borderRadius: 10, borderLeftWidth: 6,
    marginBottom: 8, paddingRight: 12,
  },
  check: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1, paddingVertical: 10, paddingLeft: 10, minHeight: 44, justifyContent: 'center' },
  contenido: { flexDirection: 'row', alignItems: 'center' },
  miniatura: { width: 72, height: 72, borderRadius: 8, backgroundColor: COLORES.borde },
  textos: { flex: 1, paddingLeft: 10 },
  nombre: { color: COLORES.texto, fontSize: 16, fontWeight: '600' },
  tachado: { textDecorationLine: 'line-through', color: COLORES.textoSuave },
  detalle: { color: COLORES.textoSuave, fontSize: 14 },
  aviso: { color: COLORES.advertencia, fontSize: 14, marginTop: 4 },
});
