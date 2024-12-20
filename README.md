
# LapexMAD / Sindusmad - Projeto

Este repositório contém os códigos do projeto **LapexMAD 2.0**, incluindo frontend e backend, para gerenciar e analisar dados relacionados à produção e exportação de madeira no estado do Mato Grosso.

## Estrutura do Repositório

```plaintext
LapexMad2.0/
├── frontend/        # Código do frontend (Vue.js)
└── backend/         # Código do backend (Express.js)
```

## Frontend

O frontend foi desenvolvido utilizando Vue.js 3 e outras tecnologias modernas. Para mais detalhes sobre o frontend, consulte o arquivo [README.md na pasta frontend](./frontend/README.md).

## Backend

O backend utiliza Express.js e MySQL, com suporte para APIs RESTful. Para mais informações sobre o backend, veja o arquivo [README.md na pasta backend](./backend/README.md).

---

# LapexMAD / Sindusmad - Frontend

## Tecnologias

- **Framework**: Vue.js 3 (Composition API)
- **Estilo**: Vuetify 3
- **Gerenciamento de estado**: Pinia
- **Gerenciamento de rotas**: Vue Router
- **Construção**: Bun

## Configuração

### Instalação

1. Navegue para a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   bun install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   bun dev
   ```

4. Para gerar o build para produção:
   ```bash
   bun build
   ```

## Estrutura do Projeto Frontend

```plaintext
src/
├── assets/          # Imagens e arquivos estáticos
├── components/      # Componentes reutilizáveis
├── pages/           # Páginas do aplicativo
├── store/           # Pinia stores
├── router/          # Configuração de rotas
└── main.js          # Arquivo principal da aplicação
```

---

# LapexMAD / Sindusmad - Backend

## Tecnologias

- **Linguagem**: JavaScript (ES Modules)
- **Framework**: Express.js
- **Banco de Dados**: MySQL
- **Outras Ferramentas**:
  - Sequelize (ORM)
  - Nodemon (para desenvolvimento)
  - JWT (para autenticação)

## Configuração

### Instalação

1. Navegue para a pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na pasta `backend` e adicione:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=sindusmad
   JWT_SECRET=sua_chave_secreta
   ```

4. Configure o banco de dados:
   ```sql
   CREATE DATABASE sindusmad;
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto Backend

```plaintext
src/
├── config/          # Configuração do banco de dados e outros serviços
├── controllers/     # Lógica de negócio e controle das rotas
├── middlewares/     # Funções de middleware (ex.: autenticação)
├── models/          # Modelos Sequelize para banco de dados
├── routes/          # Configuração das rotas
└── app.js           # Arquivo principal da aplicação
```
