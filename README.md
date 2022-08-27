# Teste de Ponto Eletrônico - criado em Angular

Este projeto foi criado utilizando [Angular CLI](https://github.com/angular/angular-cli), versão 13.2.3.

## Servidor de desenvolvimento

No prompt, navegue até a página do projeto `teste-ponto-eletronico-angular` e execute o comando `npm i` para instalar todas as dependências do projeto e em seguida execute o comando `ng serve -o` para iniciar um servidor de desenvolvimento. Com este comando a página será aberta automaticamente no navegador principal. Caso não abra, basta acessar o link `http://localhost:4200/`. 

Se preferir, execute o comando `ng serve` e acesse o link `http://localhost:4200/`.

A aplicação será recarregada automaticamente toda vez que alguma modificação feita em algum arquivo for salva.

## Build

Execute o comando `ng build` para gerar a build do projeto. Os arquivos gerados durante a build serão armazenados na pasta `dist/`.

## Acessando a aplicação

A aplicação possui quatro usuários previamente cadastrados. Há uma validação que não permite que as páginas internas sejam acessadas se o usuário não realizar o login prévio.

A aplicação não utiliza nenhum serviço de API e nenhum banco de dados, sendo feita a armazenagem dos dados diretamente em cache no navegador. Todas as alterações que forem feitas dentro da aplicação, ficarão disponíveis enquanto o cache do navegador não for limpo. As informações de ponto realizado associadas aos usuários estarão disponíveis enquanto o usuário permanecer logado, caso seja executado o logout, os pontos modificados serão limpos e a sessão será reiniciada.

## Usuários de teste

Para realizar o acesso à aplicação, é necessário entrar com o e-mail cadastrado para o usuário. Os e-mails disponíveis de antemão são:
- `johndoe@email.com`
- `janedoe@email.com`
- `morgan3man@email.com`
- `gsimmons@email.com`

As senhas de todos os usuários é `123`. É possível cadastrar novos usuários, internamente na aplicação, que serão salvos no `localstorage`, em cache no navegador e a senha padrão para os novos usuários também será `123`.

## Site da aplicação

A aplicação está disponível para acesso no endereço [`https://teste-ponto-eletronico.web.app`](https://teste-ponto-eletronico.web.app), hospedado no serviço `Firebase`, do Google.
