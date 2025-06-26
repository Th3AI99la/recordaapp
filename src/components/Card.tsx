import React from 'react';
import { Card as PaperCard, CardProps } from 'react-native-paper';

// O tipo para nosso componente Card
type CardComponent = (props: CardProps) => React.ReactElement;

// O componente principal
const Card: CardComponent = (props) => {
  return <PaperCard {...props} />;
};

// Atribuindo os subcomponentes estaticamente
Card.Content = PaperCard.Content;
Card.Actions = PaperCard.Actions;
Card.Cover = PaperCard.Cover;
Card.Title = PaperCard.Title;

export default Card;
