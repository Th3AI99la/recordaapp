// screens/Login.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { loginUser } from '../services/AuthService';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await loginUser(email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      // Navegar para a tela Home após o login
      navigation.replace('Home'); 
    } catch (error) {
      Alert.alert("Erro de Login", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Bem-vindo ao Recorda</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
      <Button
        title="Não tem uma conta? Cadastre-se"
        mode="text"
        onPress={() => navigation.navigate('Register')}
        labelStyle={{ color: colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos específicos para a tela de Login podem ser adicionados aqui
});

export default Login;
