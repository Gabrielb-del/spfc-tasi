# E-commerce São Paulo FC

### 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/spfc-tasi.git
cd spfc-tasi
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

> ⚠️ **Importante**: É necessário usar a flag `--legacy-peer-deps` devido a algumas dependências do Material-UI.

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O projeto estará rodando em `http://localhost:3000`

## 🛠️ Construído com

* [React](https://reactjs.org/) - Biblioteca JavaScript para criar interfaces de usuário
* [Material-UI](https://mui.com/) - Framework de UI para React
* [React Router](https://reactrouter.com/) - Roteamento para React
* [Axios](https://axios-http.com/) - Cliente HTTP para requisições à API

## 📦 Estrutura do Projeto

```
src/
├── api/          # Configurações e chamadas à API
├── components/   # Componentes React reutilizáveis
├── contexts/     # Contextos React (Auth, Carrinho)
├── img/         # Imagens e assets
└── pages/       # Páginas da aplicação
```

## 🌟 Funcionalidades

* 🛍️ Catálogo de produtos por categorias
* 🛒 Carrinho de compras
* 👤 Área administrativa
* 📱 Interface responsiva
* 🔐 Autenticação de administrador

## 👥 Área Administrativa

Para acessar a área administrativa, utilize o botão "Login Admin" e insira as credenciais fornecidas.

Funcionalidades disponíveis para administradores:
* Gerenciamento de categorias
* Gerenciamento de produtos
* Visualização de vendas

## 🔄 Fluxo de Compra

1. Navegue pelas categorias
2. Selecione os produtos desejados
3. Adicione ao carrinho
4. Revise seus itens
5. Finalize a compra

## 📝 Notas Adicionais

* O projeto utiliza Context API para gerenciamento de estado global
* Implementação de rotas protegidas para área administrativa
* Sistema de cache para otimização de performance
