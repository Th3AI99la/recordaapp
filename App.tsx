import 'react-native-gesture-handler';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator'; // Caminho atualizado
import colors from './src/styles/colors'; // Caminho atualizado

const theme = {
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}