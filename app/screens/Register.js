// screens/Register.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { registerUser } from '../services/AuthService';

const Register = ({ navigation }) => {
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
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      // Navegar para a tela Home após o cadastro
      navigation.replace('Home');
    } catch (error) {
      Alert.alert("Erro de Cadastro", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Crie sua conta no Recorda</Text>
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
      <Input
        label="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Button title="Cadastrar" onPress={handleRegister} />
      )}
      <Button
        title="Já tem uma conta? Faça Login"
        mode="text"
        onPress={() => navigation.navigate('Login')}
        labelStyle={{ color: colors.primary }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos específicos para a tela de Registro podem ser adicionados aqui
});

export default Register;
