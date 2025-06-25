import 'react-native-gesture-handler'; // Certifique-se de que esta linha esteja no topo
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './app/AppNavigator'; // Updated path
import colors from './styles/colors';

export default function App() {
  const theme = {
    colors: {
      primary: colors.primary,
      accent: colors.accent,
      background: colors.background,
      text: colors.textPrimary,
      placeholder: colors.textSecondary,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
