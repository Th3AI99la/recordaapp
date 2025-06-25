// components/Card.js
import React from 'react';
import { Card as PaperCard, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import colors from '../styles/colors';

const Card = ({ children, style, onPress, title, paragraph, ...rest }) => {
  return (
    <PaperCard style={[styles.card, style]} onPress={onPress} {...rest}>
      <PaperCard.Content>
        {title && <Title style={styles.title}>{title}</Title>}
        {paragraph && <Paragraph style={styles.paragraph}>{paragraph}</Paragraph>}
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.textPrimary,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default Card;
