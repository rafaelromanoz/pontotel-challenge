# SpaceX Launches App - Teste Técnico Pontotel 🚀

Este projeto foi desenvolvido como parte de um **teste técnico** para a empresa **Pontotel**. O aplicativo foi desenvolvido com **React Native**, **Expo** e **TypeScript**, e tem como principal funcionalidade listar lançamentos (missões) da SpaceX, utilizando a API da SpaceX. Além disso, foram implementadas algumas funcionalidades extras, como modo escuro e claro, e autenticação de usuário com **Firebase Auth**.

## Funcionalidades Principais

1. **Listagem de Lançamentos com Paginação**:
   - O aplicativo faz uso da API da SpaceX para listar os lançamentos/missões.
   - A listagem é paginada, permitindo a visualização de mais lançamentos ao rolar a tela.
   - É possível filtrar os lançamentos por nome da missão.

2. **Detalhes do Lançamento**:
   - Ao selecionar um lançamento, o usuário pode visualizar detalhes mais específicos, incluindo:
     - Informações sobre o foguete.
     - Vídeo de lançamento incorporado diretamente no aplicativo.
     - Artigo relacionado ao lançamento, com um link clicável para mais informações.

3. **Autenticação com Firebase Auth**:
   - Foi implementada a funcionalidade de login e cadastro utilizando o Firebase Authentication.
   - O usuário pode se cadastrar ou realizar login para acessar a listagem de lançamentos.

4. **Modo Escuro e Claro**:
   - O aplicativo oferece a alternância entre modo escuro e claro.
   - As cores e o design foram ajustados para garantir uma boa experiência do usuário em ambos os modos.

## Tecnologias Utilizadas

- **React Native**: Para o desenvolvimento do aplicativo mobile.
- **Expo**: Plataforma para simplificar o desenvolvimento, build e deploy.
- **TypeScript**: Para tipagem estática e desenvolvimento mais seguro.
- **React Navigation**: Para navegação entre as telas do aplicativo.
- **Firebase Auth**: Para autenticação de usuários.
- **API da SpaceX**: Para buscar informações sobre os lançamentos e foguetes.

## Extras Implementados

- **Autenticação com Firebase**: O aplicativo só permite acesso à listagem de lançamentos após o login.
- **Dark Mode e Light Mode**: Implementado suporte para modo escuro e claro, com um botão de alternância acessível nas telas principais.

## Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone git@github.com:rafaelromanoz/pontotel-challenge.git
   ```
2. Instale as dependências:
   ```bash
   cd spacex-launches-app
   npm install
   ```
3. Execute o projeto:
   ```bash
   expo start
   ```

## Para executar no celular baixe o Expo Go no seu celular

- Para **Android**: [Baixar Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- Para **iOS**: [Baixar Expo Go](https://apps.apple.com/app/expo-go/id982107779)

## Escaneie o QR Code

- Abra o **Expo Go** no seu celular e escaneie o QR Code que aparece no terminal ou na página do navegador após rodar o comando:
   ```bash
   expo start
   ```

## Estrutura do Projeto

- **`src/`**: Diretório principal contendo os arquivos de código.
  - **`components/`**: Componentes reutilizáveis, como o `LaunchCard` e `SearchInput`.
  - **`screens/`**: Telas principais do aplicativo, como `LaunchListScreen` e `LaunchDetailScreen`.
  - **`store/`**: Configuração do Redux para gerenciamento de estado.
  - **`theme/`**: Arquivos de configuração para modo claro e escuro.
  - **`services/`**: Serviços para chamadas à API da SpaceX e integração com o Firebase.

## Melhorias Futuras

- **Testes Unitários**: Implementar cobertura de testes para componentes e lógica do aplicativo.
- **Melhorar a UI**: Refinar a interface e transições para uma experiência ainda mais fluida e agradável ao usuário.
- **Notificações Push**: Adicionar notificações push para alertar os usuários sobre novos lançamentos da SpaceX.
- **Cache de Dados**: Implementar caching para melhorar o desempenho e reduzir o tempo de carregamento das requisições.
- **Internacionalização**: Adicionar suporte para múltiplos idiomas no aplicativo.

## Conclusão

Este projeto foi desenvolvido com foco em boas práticas de desenvolvimento e uma experiência de usuário fluida e moderna. Durante o desenvolvimento, foram aplicados os princípios de **SOLID** e **Clean Code**, assegurando que o código fosse modular, fácil de entender e de manter. Isso garante que o projeto seja escalável e que novas funcionalidades possam ser adicionadas sem comprometer a estrutura existente.

A separação clara entre componentes, a utilização de Redux para gerenciamento de estado e a organização dos arquivos conforme a responsabilidade de cada módulo são alguns exemplos de como as melhores práticas de código foram implementadas.

O uso do **React Native**, **Expo**, e **Firebase** proporcionou uma solução eficiente e escalável, enquanto a integração com a **API da SpaceX** trouxe dados em tempo real para os lançamentos e informações sobre os foguetes.

Agradeço pela oportunidade de participar do processo seletivo da **Pontotel** e espero que o projeto atenda às expectativas tanto em termos de funcionalidade quanto de qualidade de código.

---

