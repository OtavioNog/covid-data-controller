# 📌 Controle de casos de covid

![GitHub repo size](https://img.shields.io/github/repo-size/OtavioNog/covid-data-controller?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/OtavioNog/covid-data-controller?style=for-the-badge)

<img src="frontend/public/Hospital.gif" alt="gif">

> Sistema de gerenciamento de casos de covid-19, possui o objetivo de atuar como uma ferramenta auxiliar médica na criação e observação de casos relacionados ao patógeno SARS-CoV-2.

## 🛠️ Ajustes e melhorias

Ressaltando que o projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Create
- [x] Read
- [ ] Update
- [x] Delete
- [x] Diagnostic

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou a versão mais recente do php, composer, npm e git
* Você tem uma máquina `<Windows / Linux / Mac>`.

## 🚀 Instalando em sua máquina

Para instalar, siga as etapas abaixo.

1º passo: Clone o repositório:
```
git clone https://github.com/OtavioNog/covid-data-controller
```

2º passo: Após acessar o diretório raiz, entre no diretório da API Laravel:
```
cd ./covid-data-analyzer
```

3º passo: Realize a instalação das dependências do php:
```
composer install
```

4º passo: Faça uma cópia do arquivo `.env` e preencha com seu BD:
```
cp .env.example .env
```

5º passo: Gere uma chave para tornar possível o Laravel interagir com o BD:
```
php artisan key:generate
```

6º passo: Inicie a API Laravel:
```
php artisan serve
```

7º passo: Vá até o diretório da API react:
```
cd ./frontend
```

8º passo: Realize a instalação das dependências do react:
```
npm install
```

9º passo: Inicie a API React:
```
npm run dev
```

10º passo: Aproveite <3

PS: Caso ocorra algum erro na instalação das dependências do React, por favor tente o código abaixo:
```
npm install --force
```

Pedro Otavio | since `2021`
