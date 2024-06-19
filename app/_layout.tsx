import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View />;
  }

  return (
    <Stack screenOptions={{
      contentStyle: { backgroundColor: "white" },
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BottomSheet/index"
        options={{
          title: 'Bottom Sheet',
        }}
      />
      <Stack.Screen name="DragToRearrange/index"
        options={{
          title: 'Drag To Rearrange',
        }}
      />
      <Stack.Screen name="SwipeableRow/index"
        options={{
          title: 'Swipeable Row',
        }}
      />
    </Stack>
  );
}

const RootLayoutNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
    </GestureHandlerRootView>
  );
}

export default RootLayoutNav;
