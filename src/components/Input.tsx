import React from 'react';
import { TextInput as PaperTextInput, TextInputProps } from 'react-native-paper';

const Input = (props: TextInputProps) => {
  return <PaperTextInput {...props} style={[{ marginBottom: 10 }, props.style]} />;
};

export default Input;