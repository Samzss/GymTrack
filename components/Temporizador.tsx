import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores';
import { Boton } from './Boton';

// RF10: cuenta regresiva de descanso entre series.
export function Temporizador({ segundos = 60 }: { segundos?: number }) {
  const [restante, setRestante] = useState(segundos);
  const [activo, setActivo] = useState(false);

  // Corre solo mientras "activo" sea true. La función que retorna el efecto
  // limpia el intervalo al pausar o al salir de la pantalla (si no, seguiría contando).
  useEffect(() => {
    if (!activo) return;
    const id = setInterval(() => {
      setRestante(r => {
        if (r <= 1) {
          setActivo(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [activo]);

  const iniciar = () => {
    setRestante(segundos);
    setActivo(true);
  };

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>Descanso entre series</Text>
      <Text style={estilos.tiempo}>{restante <= 0 ? '¡Listo!' : `${restante} s`}</Text>
      <Boton titulo={activo ? 'Reiniciar' : 'Iniciar descanso'} alPresionar={iniciar} />
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: { backgroundColor: COLORES.tarjeta, borderRadius: 12, padding: 14, marginVertical: 12, gap: 8 },
  titulo: { color: COLORES.textoSuave, fontSize: 14 },
  tiempo: { color: COLORES.texto, fontSize: 36, fontWeight: '800', textAlign: 'center' },
});
