import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { COLORES } from '@/constants/colores';

type IconoNombre = ComponentProps<typeof Ionicons>['name'];

const PESTANAS: { name: string; titulo: string; icono: IconoNombre }[] = [
  { name: 'index', titulo: 'Inicio', icono: 'calendar' },
  { name: 'catalogo', titulo: 'Catálogo', icono: 'barbell' },
  { name: 'medidas', titulo: 'Medidas', icono: 'body' },
  { name: 'perfil', titulo: 'Perfil', icono: 'person' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // cada pantalla usa su propio SafeAreaView
        tabBarActiveTintColor: COLORES.primario,
        tabBarInactiveTintColor: COLORES.textoSuave,
        tabBarStyle: { backgroundColor: COLORES.tarjeta, borderTopColor: COLORES.borde },
        tabBarLabelStyle: { fontSize: 14 },
      }}>
      {PESTANAS.map(p => (
        <Tabs.Screen
          key={p.name}
          name={p.name}
          options={{
            title: p.titulo,
            tabBarIcon: ({ color, size }) => <Ionicons name={p.icono} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
