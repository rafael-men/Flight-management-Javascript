# Flight Management System

Este é um sistema de gerenciamento de voos fullstack desenvolvido com Node.js no backend e React com Vite no frontend. A aplicação utiliza JWT (JSON Web Tokens) para autenticação e autorização de usuários.

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para construção de APIs RESTful.
- **JWT (JSON Web Tokens)**: Para autenticação e gerenciamento de sessões.
- **PostgreSQL**: Banco de dados SQL para armazenamento de dados.
- **Bcrypt**: Para criptografia de senhas.

### Frontend
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento moderno.
- **Axios**: Cliente HTTP para fazer requisições à API.
- **React Router**: Para gerenciamento de rotas no frontend.
- **Tailwind CSS**: Framework CSS para estilização.

## Funcionalidades

### Backend
- Autenticação de usuários com JWT.
- CRUD (Create, Read, Update, Delete) de voos.
- Gerenciamento de usuários (registro, login, perfil).
- Validação de dados de entrada.
- Proteção de rotas com middleware de autenticação.

### Frontend
- Interface de usuário responsiva.
- Páginas de login e registro.
- Dashboard para gerenciamento de voos.
- Listagem, criação, edição e exclusão de voos.
- Integração com a API backend.

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/flight-management-system.git
   cd flight-management-system/Backend
2. Instale as dependências:

```bash
npm install
```
3. Inicie o servidor:

```bash
npm start
```

### Frontend

1. Navegue até a pasta do frontend:

```bash
cd Frontend
 ```

2. Instale as dependências:

```bash
npm i
```
3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse a aplicação no navegador: http://localhost:5173
