// components/Input.js
import React from 'react';
import { TextInput as PaperTextInput } from 'react-native-paper';
import colors from '../styles/colors';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, style, ...rest }) => {
  return (
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      mode="outlined"
      outlineColor={colors.border}
      activeOutlineColor={colors.primary}
      style={[{ marginVertical: 8, backgroundColor: colors.white }, style]}
      theme={{
        colors: {
          placeholder: colors.textSecondary,
          text: colors.textPrimary,
          primary: colors.primary,
          background: colors.white,
        },
      }}
      {...rest}
    />
  );
};

export default Input;
