import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { loginUser } from '../services/AuthService';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(email, password);
      // O AppNavigator irá lidar com a mudança de tela automaticamente
    } catch (error: any) {
      Alert.alert("Erro de Login", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Bem-vindo ao Recorda</Text>
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} children={undefined} />
      )}
      <Button title="Não tem uma conta? Cadastre-se" mode="text" onPress={() => navigation.navigate('Register')} children={undefined} />
    </View>
  );
};

export default LoginScreen;