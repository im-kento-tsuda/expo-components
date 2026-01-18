import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColors } from '@im-kento-tsuda/expo-components';
import { HomeScreen } from '../screens/HomeScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { ComponentDetailScreen } from '../screens/ComponentDetailScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const colors = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.foreground,
        headerTitleStyle: {
          color: colors.foreground,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params.categoryId,
          headerBackTitle: '戻る',
        })}
      />
      <Stack.Screen
        name="ComponentDetail"
        component={ComponentDetailScreen}
        options={({ route }) => ({
          title: route.params.componentId,
          headerBackTitle: '戻る',
        })}
      />
    </Stack.Navigator>
  );
}
