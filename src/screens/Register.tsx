import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import { registerUser } from '../services/AuthService';
import colors from '../styles/colors';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
    } catch (error: any) {
      Alert.alert("Erro de Cadastro", error.message || "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.formContainer}>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>É rápido e fácil.</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Input label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      
      <Button
        title={loading ? "Cadastrando..." : "Cadastrar"}
        onPress={handleRegister}
        disabled={loading}
        style={{ marginTop: 20 }} children={undefined}      />
      <Button
        title="Voltar para o Login"
        mode="text"
        onPress={() => navigation.goBack()}
        textColor={colors.primary} children={undefined}      />
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 32,
        textAlign: 'center',
    },
});


export default RegisterScreen;
