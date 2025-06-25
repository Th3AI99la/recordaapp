# Recorda App

"Recorda" é um aplicativo mobile desenvolvido em React Native que permite aos usuários registrar locais visitados, adicionar fotos, descrever experiências e manter um mural pessoal de suas viagens. O backend é totalmente integrado com Firebase para autenticação, armazenamento de dados (Firestore) e upload de imagens (Storage).

## Funcionalidades

*   **Autenticação de Usuários:** Login e Cadastro com Firebase Authentication.
*   **Registro de Viagens:** Crie novos registros de viagens com título, descrição, cidade/país, data e uma foto.
*   **Upload de Imagens:** As fotos das viagens são armazenadas no Firebase Storage.
*   **Mural Pessoal:** Visualize todas as suas viagens registradas em um feed organizado.
*   **Edição e Exclusão:** Gerencie seus registros de viagem, editando ou excluindo-os a qualquer momento.
*   **Navegação Intuitiva:** Utiliza React Navigation para uma experiência de usuário fluida.
*   **Sistema de Design:** Interface padronizada com React Native Paper, garantindo responsividade e usabilidade.

## Estrutura do Projeto

```
.recorda/
├── assets/                 # Imagens, ícones, fontes
│   ├── fonts/
│   └── images/
├── components/             # Componentes de UI reutilizáveis (Botões, Inputs, Cards)
│   ├── Button.js
│   ├── Card.js
│   └── Input.js
├── navigation/             # Configuração do React Navigation
│   └── AppNavigator.js
├── screens/                # Telas principais do aplicativo
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   └── TripForm.js
├── services/               # Lógica de integração com Firebase
│   ├── AuthService.js
│   ├── firebaseConfig.js
│   ├── FirestoreService.js
│   └── StorageService.js
├── styles/                 # Estilos e temas globais
│   ├── colors.js
│   └── GlobalStyles.js
├── utils/                  # Funções utilitárias e auxiliares
│   └── helpers.js
├── App.js                  # Componente raiz do aplicativo
├── package.json            # Dependências e scripts do projeto
├── README.md               # Este arquivo
└── tsconfig.json
```

## Tecnologias Utilizadas

*   **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
*   **Firebase:**
    *   **Authentication:** Gerenciamento de usuários (email/senha).
    *   **Firestore:** Banco de dados NoSQL para armazenar dados das viagens.
    *   **Storage:** Armazenamento de arquivos (imagens).
*   **React Navigation:** Solução de navegação para aplicativos React Native.
*   **React Native Paper:** Biblioteca de UI com componentes personalizáveis e aderência ao Material Design.
*   **Expo ImagePicker:** Para seleção de imagens da galeria.
*   **@react-native-community/datetimepicker:** Para seleção de datas.

## Configuração e Execução do Projeto

### Pré-requisitos

Certifique-se de ter o Node.js, npm (ou Yarn) e o Expo CLI instalados em sua máquina.

*   [Node.js](https://nodejs.org/en/download/)
*   [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/recorda-app.git # Substitua pelo seu repositório
cd recorda-app
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar o Firebase

1.  **Crie um Projeto Firebase:** Vá para o [Console do Firebase](https://console.firebase.google.com/) e crie um novo projeto.
2.  **Habilitar Serviços:**
    *   Vá em `Authentication` -> `Get Started` -> `Email/Password` e habilite-o.
    *   Vá em `Firestore Database` -> `Create database` -> Escolha `Start in production mode` (você pode ajustar as regras de segurança depois) e selecione a localização.
    *   Vá em `Storage` -> `Get Started` (você pode ajustar as regras de segurança depois).
3.  **Adicionar Aplicativo Web ao Firebase:** No seu projeto Firebase, clique em `Adicionar aplicativo` e selecione o ícone `Web` (`</>`). Siga as instruções para registrar seu aplicativo e copie as configurações do Firebase.
4.  **Atualizar `firebaseConfig.js`:** Abra o arquivo `services/firebaseConfig.js` e substitua os placeholders (`SUA_API_KEY`, `SEU_AUTH_DOMAIN`, etc.) com as credenciais que você obteve do Firebase.

    ```javascript
    // services/firebaseConfig.js
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_AUTH_DOMAIN",
      projectId: "SEU_PROJECT_ID",
      storageBucket: "SEU_STORAGE_BUCKET",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID"
    };
    ```

5.  **Regras de Segurança do Firestore (Exemplo Básico - Ajuste conforme Necessário):**

    Vá em `Firestore Database` -> `Rules` e adicione as seguintes regras para permitir leitura/escrita autenticada:

    ```firestore
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /trips/{tripId} {
          allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
        }
      }
    }
    ```

6.  **Regras de Segurança do Storage (Exemplo Básico - Ajuste conforme Necessário):**

    Vá em `Storage` -> `Rules` e adicione as seguintes regras para permitir upload/leitura autenticada:

    ```firebase
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /trip_images/{userId}/{fileName} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```

### 4. Rodar o Aplicativo

Para rodar o aplicativo em seu emulador/simulador ou dispositivo físico:

```bash
npm start
# ou
yarn start
```

Isso iniciará o servidor de desenvolvimento do Expo. Você pode então escanear o código QR com o aplicativo Expo Go no seu celular ou escolher um emulador/simulador para rodar.

### 5. Publicar Versão Web com Firebase Hosting (Opcional)

O React Native pode ser executado na web via Expo. Para publicar seu aplicativo Recorda na web usando o Firebase Hosting:

1.  **Instalar Firebase CLI:**

    ```bash
npm install -g firebase-tools
    ```

2.  **Fazer Login no Firebase:**

    ```bash
firebase login
    ```

3.  **Inicializar Projeto Firebase:**

    No diretório raiz do seu projeto `recorda-app`:

    ```bash
firebase init hosting
    ```

    Siga as instruções:
    *   `Are you ready to proceed? (Y/n)`: `Y`
    *   `Which Firebase project do you want to use?`: Selecione o projeto Firebase que você criou para o Recorda.
    *   `What do you want to use as your public directory?`: Digite `web-build` (este será o diretório onde o Expo gerará os arquivos web).
    *   `Configure as a single-page app (rewrite all urls to /index.html)?`: `Y`
    *   `Set up automatic builds and deploys with GitHub?`: `N` (ou `Y` se quiser integrar com GitHub Actions)

4.  **Gerar a Build Web do Expo:**

    Certifique-se de que o Expo esteja configurado para web. No `package.json`, você pode ter um script `web`.
    Gere a build web:

    ```bash
npx expo export:web
    ```

    Isso criará a pasta `web-build` com os arquivos estáticos do seu aplicativo web.

5.  **Publicar no Firebase Hosting:**

    ```bash
firebase deploy --only hosting
    ```

    Após a conclusão, o Firebase CLI fornecerá a URL do seu aplicativo web hospedado.

## Considerações Finais

*   **Responsividade e Usabilidade:** Os componentes do React Native Paper e a estrutura flexível do React Native contribuem para um aplicativo responsivo em diferentes tamanhos de tela e com boa usabilidade.
*   **Código Comentado:** O código está comentado para facilitar a compreensão e futuras manutenções.
*   **Melhorias Futuras:** Você pode expandir este projeto adicionando mais funcionalidades, como filtros de viagens, visualização de mapa, tags, etc.

---