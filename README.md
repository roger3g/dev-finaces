<h1 align="center">
  <img alt="Ícone do projeto" title="" src=".github/logo.svg" width="400px" />
</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=author&message=roger3g&color=2D4A22&labelColor=49aa26" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=languages&message=3&color=2D4A22&labelColor=49aa26" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=2D4A22&labelColor=49aa26" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=version&message=1.0.0&color=2D4A22&labelColor=49aa26" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=platform&message=web&color=2D4A22&labelColor=49aa26" style="display: inline;">
</p>

<div align="center">
  <img src=".github/deskt.svg" alt="Exemplo da interface no desktop" style="width: 100%;">  
</div>

## 📌 Table of Contents

- [Technology](#-technology)
- [Project](#-project)
- [Layout](#-layout)
- [Updates](#-updates)
- [Implementation ideas](#-implementation-ideas)
- [Directory structure](#-directory-structure)
- [Installation](#-installation)
- [How to contribute](#-how-to-contribute)
- [License](#-license)

## 🛠 Technology

- **Front-End**
  - [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
  - [SASS](https://sass-lang.com/)
  - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/Javascript)
  
- **Back-End**
  - [Node.js](https://nodejs.org/en/)
  
## 💻 Project

System to help people control their finances.

## 🔖 Layout

You can view the layout of this project by clicking [here](https://devfinances.herokuapp.com/)

## ⬆ Updates

This project is being the basis for my learning, so I make constant changes to it.

## 💡 Implementation ideas

- [X] Add dark-mode and light-mode
- [X] Save the theme to storage
- [X] Change the color of the card-total depending on the color
- [ ] Add custom error message
- [ ] Refactor.
- [ ] Improve responsiveness;

## 📂 Directory structure

```
|-- .github/
|-- public/
  |-- assets/
  |-- pages/
  |-- scripts/
  |-- styles/
    |-- css/
    |-- scss/
  |-- index.html
|-- src/
  |-- server.js
|-- .gitignore
|-- LICENSE.md
|-- package.json
|-- README.md
```

## ⬇ Installation

You will need [Nodejs](https://nodejs.org/en/) and [git](https://git-scm.com/) installed on your machine. Then, you can run the scripts below:

```bash
# Clone this repository
$ git clone https://github.com/roger3g/dev-finances.git

# Access the project folder in the cmd/terminal
$ cd dev-finances

# Install the dependencies
$ npm install

# Run the sass (It is important that you have sass installed)
$ npm run dev:sass

# Run the application in development mode
$ npm run dev:server

# The port that the server will open will be shown on the console
```

## 🤔 How to contribute

1. Fork this repository;
2. Create a branch with your feature: **`git checkout -b my-feature`**;
3. Commit your changes: **`git commit -m 'feat: My new feature'`**;
4. Push to your branch: **`git push origin my-feature`**.

After the merge of your pull request is done, you can delete your branch.

## 📝 License

This project is under the MIT license. See the archive [LICENSE](LICENSE.md) for more details.
