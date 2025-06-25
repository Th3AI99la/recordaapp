// styles/GlobalStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  // Estilos para cards, inputs e botões serão definidos nos próprios componentes ou aqui se forem globais
});

export default GlobalStyles;
