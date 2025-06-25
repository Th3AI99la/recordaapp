// utils/helpers.js

// Função para formatar a data (ex: DD/MM/YYYY)
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é baseado em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Outras funções utilitárias podem ser adicionadas aqui
