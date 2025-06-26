# 📌 Recorda - Seu Mural de Viagens Digital

## 📖 Sobre

**Recorda** é um diário digital para registrar suas viagens. Desenvolvido como um projeto acadêmico, o aplicativo permite que você salve memórias, detalhes e fotos de suas aventuras de forma prática e organizada.

## ✨ Funcionalidades

- Cadastro e login de usuários
- Adicionar, editar e excluir registros de viagem
- Adicionar uma foto para cada viagem (salva localmente no dispositivo)
- Atualização automática da lista de viagens

## 🚀 Como Executar

### 1. Pré-requisitos

- Node.js instalado em sua máquina
- Expo CLI (caso deseje testar em dispositivos móveis)

### 2. Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/RecordaAppTS.git

# Acesse a pasta do projeto
cd RecordaAppTS

# Instale as dependências
npm install

3. Configurar o Firebase
Crie um projeto no Firebase.

Ative os serviços:

Authentication

Firestore Database

Copie as credenciais de configuração da Web.

Cole no arquivo src/services/firebaseConfig.ts, substituindo o conteúdo padrão pelas suas credenciais.


4. Rodar o Aplicativo
bash
Copiar
Editar
# Para a versão web
npx expo start --web

# Para executar no celular (emulador ou dispositivo real)
npx expo run:android
# ou
npx expo run:ios