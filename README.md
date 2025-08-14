# API GymPass

## Descrição

Esse projeto foi feito durante o módulo de API Node.js com SOLID, o objetivo é ser uma aplicação no estilo GymPass, onde é possivel, cadastrar academias e usuários membros podem fazer checkin através do aplicativo em academias próximas e os administradores das academias validar esse checkin

## Tecnologias utilizadas

- 🪢 Node.JS
- 🐆 Fastify
- 🐘 Postgres
- 🔺 prisma
- ⚡ vitest

## Como rodar esse projeto

- Clone o repositório com `https://github.com/JoaoGuilherme2909/api-solid-node`.

- Vá até a pasta onde ele foi clonado e use o comando `npm i` para instalar os pacotes do projeto.

- Depois, crie na raiz do projeto um arquivo chamado `.env`.

- Nesse arquivo `.env`, você deve criar duas variáveis iguais às do `.env.example`.

- Agora, use o comando `docker compose up -d` para subir os serviços de banco de dados.

- Com tudo isso feito, use o comando `npx prisma migrate dev`. Esse comando irá criar no Postgres todas as tabelas definidas no `schema.prisma`.

- A partir daí, use os comandos `npm run dev`, `npm run test` e `npm run test:e2e` para executar o projeto, os testes unitários e os testes end-to-end.

### Feito com ❤️ e Node.js por João Guilherme dos Santos