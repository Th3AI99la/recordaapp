// components/Button.js
import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import colors from '../styles/colors';

const Button = ({ title, onPress, mode = 'contained', style, labelStyle, ...rest }) => {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[{ backgroundColor: colors.primary, marginVertical: 8 }, style]}
      labelStyle={[{ color: colors.white, paddingVertical: 4 }, labelStyle]}
      {...rest}
    >
      {title}
    </PaperButton>
  );
};

export default Button;
