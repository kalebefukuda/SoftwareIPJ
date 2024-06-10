
<a name="readme-top"></a>


<h3 align="center">Projeto Software IPJ</h3>

<p align="center">
  <img src="app/views/assets/imgProjeto.png" alt="Home do Projeto">
</p>


<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

Esse projeto está sendo realizado para a Igreja Presbiteriana de Joinville, com o fim principal de controle de membros da igreja.


### Construído com:


<img align= "center" alt= "HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
    <img align= "center" alt= "CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
    <img align= "center" alt= "Java Script" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">

### Alunos:
* Kalebe Fukuda de Oliveira
* João Paulo Duarte
* Hélio Costa
* Vinicius Zanatta


<!-- GETTING STARTED -->
## Começando

Primeiro passo é a clonagem de repositório.Abra o Visual Code, e em seu terminal coloque o seguinte comando:

  ```sh
  git clone https://github.com/kalebefukuda/SoftwareIPJ.git .
  ```

❗️ATENÇÃO❗️

É necessário ter instalado o Git em sua máquina.

### Pacotes

Para uma instalação completa dos pacotes usados no projeto use o comando:

  ```sh
  npm install --force
  ```

### Banco de dados

Como o projeto ainda está sendo testado localmente, será necessário a inserção do banco no MySql de sua máquina. Copie as queries do arquivo a baixo em seu mysql.

  ```sh
modeloDatabase.sql
  ```

### Alteracao de conexão

Altere os dados de conexão de acordo com a sua conexão local, no arquivo:

  ```sh
config/Connection.js
  ```

### Login e Senha

  ```sh
login: ipj
senha: ipj
  ```

### Para startar:

Execute o comando abaixo em seu terminal:

  ```sh
npm start
  ```

### Lembrando:
Os inserts de membros estão ainda sendo feitos manuais diretos do banco, a função de cadastro de membro ainda não está funcionando.

<!-- LICENSE -->
## Licença

Esse projeto está sob a licença MIT.

