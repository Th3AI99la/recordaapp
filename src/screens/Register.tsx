import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import { registerUser } from '../services/AuthService';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      // O AppNavigator irá lidar com a mudança de tela
    } catch (error: any) {
      Alert.alert("Erro de Cadastro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Crie sua conta no Recorda</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Input label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
      <Button title="Já tem uma conta? Faça Login" mode="text" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegisterScreen;