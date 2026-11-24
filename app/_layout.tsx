import { Stack } from 'expo-router';
import { GymProvider } from '@/context/GymContext';
import { COLORES } from '@/constants/colores';

export default function RootLayout() {
  return (
    <GymProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORES.tarjeta },
          headerTintColor: COLORES.texto,
          contentStyle: { backgroundColor: COLORES.fondo },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GymProvider>
  );
}
