import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

// O componente agora aceita a prop 'title' para conveniência, mas também 'children'
// que é o padrão do react-native-paper, resolvendo o erro.
const Button = ({ title, children, ...props }: ButtonProps & { title?: string }) => {
  return (
    <PaperButton
      {...props}
      mode={props.mode || 'contained'}
      style={[{ marginVertical: 5 }, props.style]}
    >
      {title || children}
    </PaperButton>
  );
};

export default Button;
