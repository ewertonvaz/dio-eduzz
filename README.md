# Mentoria Eduzz

Este repositório está sendo atualizado ao longo das lives e do bootcamp.

## Como Codar

Se estiver usando o VSCode abra o arquivo: **workspace.code-workspace**.

## Pastas e arquivos

**/api** : nesta pasta está o código da API. Na subpasta **/dist** já está o código em Javascript que vai ser interpretado pelo servidor Node.js.

**/front**: código do front end do aplicativo.

**docker-compose.yml** : arquivo contendo as definições dos serviços e containers do Docker. Estão configurados o Node, MySQL e RabitMQ.

## API

Copiar / renomear o arquivo **api\src\settings.example.ts** para **api\src\settings.ts** e incluir neste último o seu token SendGrid.

Usar o shell na pasta  **\api**  e executar os comandos:

```
yarn start
yarn build
```

Em seguida para ativar a API abrir o shell na pasta raiz e executar o comando :

```
docker-compose up -d
```

Aguardar a inicialização dos containers, principlamente o do MySQL, e depois executar o comando:

```
docker exec -i mysql sh -c 'exec mysql -u root -p"$MYSQL_ROOT_PASSWORD" < /mnt/app/script-mysql.sql'
```

O comando acima irá criar o banco de dados e as tabelas do sistema.

A subpasta **/api/dist** contém o código do servidor da API que será executado pelo servidor node.

No caso de serem feitas alterações na API será necessário fazer novamente o build executando o comando

```
yarn build
```

E em seguida reiniciar o container correspondente ao node-server.

## Front End

Entrar na pasta ./front e nela executar os comandos:

```
yarn install

yarn start
```

## Implementações

Durante o bootcamp, como exercício, fiz algumas alterções no código original para implelemntar o seguinte:

* Validação de email do usuário;
* Exibição do nome de usuário logado no front end.



Parece pouco, mas deu um trabalhão, hehehe.