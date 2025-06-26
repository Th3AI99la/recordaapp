import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  title: string;
}

const Button = ({ title, ...props }: CustomButtonProps) => {
  return (
    <PaperButton {...props} mode={props.mode || 'contained'} style={[{ marginVertical: 5 }, props.style]}>
      {title}
    </PaperButton>
  );
};

export default Button;