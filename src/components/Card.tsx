import React from 'react';
import { Card as PaperCard, CardProps } from 'react-native-paper';

const Card = (props: CardProps) => {
  return <PaperCard {...props} />;
};

Card.Cover = PaperCard.Cover;

export default Card;