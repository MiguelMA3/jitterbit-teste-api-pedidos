# Jitterbit Orders API (Teste Técnico)

Este projeto implementa uma API simples para Gerenciamento de Pedidos (CRUD - Create, Read, Update, Delete) em **Node.js** utilizando o framework **Express** e o banco de dados **MongoDB** com o ODM **Mongoose**, conforme o desafio proposto no teste técnico.

-----

## 🚀 Funcionalidade Chave: Mapeamento de Dados

O requisito principal do desafio é realizar a **transformação/mapeamento** dos dados recebidos no *payload* da requisição (formato de origem) para o formato de persistência no banco de dados (formato de destino).

### ⚙️ Mapeamento Implementado

A função de mapeamento (`mapIncomingOrder` em `orderController.js`) realiza as seguintes transformações:

| Campo de Entrada (Body) | Campo de Destino (MongoDB) | Transformação |
| :--- | :--- | :--- |
| `numeroPedido` | `orderId` | Mapeamento direto (String) |
| `valor Total` | `value` | Mapeamento direto (Number) |
| `dataCriacao` | `creationDate` | Converte a string ISO 8601 em objeto `Date` |
| `items[].idItem` | `items[].productId` | Converte de String para Number (Integer) |
| `items[].quantidadeltem` | `items[].quantity` | Mapeamento direto (Number) |
| `items[].valorltem` | `items[].price` | Mapeamento direto (Number) |

-----

## 🛠️ Tecnologias Utilizadas

  * **Node.js**
  * **Express**: Framework web
  * **Mongoose**: ODM para MongoDB
  * **MongoDB Atlas**: Banco de dados NoSQL
  * **Dotenv**: Gerenciamento de variáveis de ambiente
  * **Swagger-JSdoc & Swagger-UI-Express**: Documentação da API

-----

## ⚙️ Configuração e Execução

### Pré-requisitos

  * Node.js (versão compatível com `package.json`)
  * MongoDB (local ou remoto/Atlas)

### 💻 Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/MiguelMA3/jitterbit-teste-api-pedidos
    cd jitterbit-teste-api-pedidos
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Verifique o arquivo de variáveis de ambiente `.env` na raiz do projeto e configure as chaves de conexão com o MongoDB e a porta do servidor:
    ```ini
    PORT=3000
    MONGODB_URI="<sua_string_de_conexão_mongodb>"
    ```

### ▶️ Como Executar

Execute o servidor com o comando:

```bash
npm start
```

A aplicação será iniciada em `http://localhost:3000`(ou na porta definida em `PORT`)

-----

## 🌐 Endpoints da API (CRUD)

O prefixo de todas as rotas é `/order`. O parâmetro `:orderId` refere-se ao campo `orderId` (o número do pedido transformado).

| Operação | Método | URL | Descrição | Status de Sucesso | Requisito |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Criar Pedido** | `POST` | `/order` | Cria um novo pedido, aplicando o mapeamento de dados antes de salvar. | `201 Created` | Obrigatório |
| **Obter Pedido** | `GET` | `/order/:orderId` | Retorna os detalhes de um pedido específico. | `200 OK` | Obrigatório |
| **Listar Pedidos** | `GET` | `/order/list` | Retorna todos os pedidos registrados no banco de dados. | `200 OK` | Opcional |
| **Atualizar Pedido** | `PUT` | `/order/:orderId` | Atualiza um pedido existente pelo seu ID, aplicando o mapeamento de dados. | `200 OK` | Opcional |
| **Excluir Pedido** | `DELETE` | `/order/:orderId` | Remove um pedido pelo seu ID. | `204 No Content` | Opcional |

### Exemplo de Request (Criação)

**URL:** `POST http://localhost:3000/order`
**Header:** `Content-Type: application/json`

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valor Total": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```
*Este é o formato de entrada esperado antes do mapeamento.*

-----

### 📄 Documentação da API
A documentação interativa da API foi implementada usando **Swagger/OpenAPI 3.0**.

Após iniciar o servidor, a documentação estará acessível em:
`http://localhost:3000/api-docs`

-----

### 🛡️ Tratamento de Erros

A API possui tratamento de erros robusto, incluindo:
- **Validação de Schema/Tipos:** Garantida pelo Mongoose.
- **ID Duplicado (POST):** Retorna `400 Bad Request` com mensagem clara se o orderId já existir.
- **Recurso Não Encontrado (GET, PUT, DELETE):** Retorna `404 Not Found`.
- **Erros Internos:** Retorna `500 Internal Server` Error para erros não previstos (como falha de conexão com o banco de dados).