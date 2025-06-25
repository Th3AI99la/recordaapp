import 'react-native-gesture-handler'; // Certifique-se de que esta linha esteja no topo
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import colors from './styles/colors';

export default function App() {
  // Configuração do tema do React Native Paper (opcional, para personalização avançada)
  const theme = {
    // ... default theme
    colors: {
      primary: colors.primary,
      accent: colors.accent,
      background: colors.background,
      text: colors.textPrimary,
      placeholder: colors.textSecondary,
      // Adicione outras cores conforme necessário para o tema do Paper
    },
  };

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
