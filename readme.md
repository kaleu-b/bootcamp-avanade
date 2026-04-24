# 📋 App de Tarefas - CRUD Full Stack

Este repositório contém uma aplicação web para gerenciamento de tarefas (CRUD completo), desenvolvida com **Angular + ASP.NET Core + SQL Server**.

---

# 🚀 Tecnologias utilizadas

## 🖥️ Front-end
- Angular
- TypeScript
- HttpClient

## 👾 Back-end
- ASP.NET Core Web API
- Entity Framework Core

## 🧾 Banco de dados
- Microsoft SQL Server

---

# 📦 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- Node.js
- Angular CLI
- .NET SDK
- Docker (recomendado)
- SQL Server

---

# 📁 Estrutura do projeto

```text id="tree1"
bootcamp-avanade/
├── backend/
│   └── api/        -> API ASP.NET Core
│       ├── Program.cs
│       ├── Migrations/ -> SQL
│       ├── appsettings.json
│       └── Tarefa.cs -> Classe Tarefa
│
├── client/
│   └── tarefaApp/  -> Front-end Angular
│       ├── src/
│       │   ├── app/
│       │   ├── main.ts
│       │   └── styles.less
│       ├── angular.json
│       └── package.json
│
```

---

# 💻 Como rodar o projeto

Depois de clonar o projeto com o seguinte comando:

``` bash
git clone https://github.com/kaleu-b/bootcamp-avanade.git
```

## 🏦 1 - Subir o banco de dados (SQL Server)

Rodar com Docker (recomendado)

```bash
docker run -e "ACCEPT_EULA=Y" \
-e "SA_PASSWORD=Senha120345!" \
-p 1433:1433 \
--name sqlserver \
-d mcr.microsoft.com/mssql/server:2022-latest
```

Verificar se está rodando:

```bash
docker ps
```

## 📞 2 - Rodar a API

Certifique-se que você está dentro da pasta do projeto:

```bash
pwd
# Se o resultado for esse, você está na raíz do projeto :)
/home/seu_usuario/bootcamp-avanade/ 
# Caso não esteja:
cd bootcamp-avanade/ # entre na raíz do projeto
```

Depois entre na pasta backend/api com o seguinte comando:

```bash
cd backend/api
```

Instale as dependências:

```bash
dotnet restore
```

Rode as migrations (criação do banco de dados):

```bash
dotnet ef database update
```

Exporte o caminho caso necessário:

```bash
export PATH="$PATH:$HOME/.dotnet/tools"
```

Caso não funcione, tente instalar globalmente as ferramentas dotnet-ef:

```bash
dotnet tool install --global dotnet-ef
```

E tente novamente.

Agora execute a API:

```
dotnet run
```

Agora a API ficará disponível em:

```bash
http://localhost:5097
```

O seu terminal ficará travado, o que é normal. Deixe rodando e abra outra janela para as próximas etapas.

## 📄 3 - Rodar o frontend (Angular)

Volte para a raiz do projeto (bootcamp-avanade/) caso não esteja nela. Para ter certeza de que está na raíz:

```bash
pwd
/home/seu_usuario/bootcamp-avanade/ # resultado esperado
```

Mude para a pasta da aplicação: 

```bash
cd client/tarefaApp
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
ng serve
```

Nesse momento, o seu terminal ficará travado. Acesse no navegador o seguinte endereço:

```
http://localhost:4200
```

# 🏛️ Arquitetura do sistema:
```
Angular (Frontend)
        ↓ HTTP (HttpClient)
ASP.NET Core API
        ↓ Entity Framework Core
SQL Server (Banco de dados)
```
---
# ⚒️ Funcionalidades

- Criar tarefas
- Editar tarefas
- Listar tarefas
- Editar tarefas
- Remover tarefas
- Atualização dinâmica da página

---
# ⁉️ Problemas comuns

## ⚠️ API não conecta no banco:
- Verifique se o docker está rodando.
- Confirme a porta 1433
- Confirme se a senha do usuário sa bate com a senha na API

## ⚠️ Front-end não atualiza

- Verifique se a API está rodando em http://localhost:5097
- Abra o console do navegador (F12)
---
# 🎮 Possíveis funcionalidades futuras

- Filtrar tarefa por status (Pendente/concluída)
- Pesquisar tarefa por ID/Nome