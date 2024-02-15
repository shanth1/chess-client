# Vanilla JS Client Microservices Reactive App Template

[Russian version](README.ru.md)

## Table of contents
- [Vanilla JS Client Microservices Reactive App Template](#vanilla-js-client-microservices-reactive-app-template)
  - [Table of contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Development Scripts](#development-scripts)
    - [Environment Configuration](#environment-configuration)
  - [Project Structure](#project-structure)
  - [State Management](#state-management)
  - [Building for Production](#building-for-production)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview
This project serves as a template for building client microservices reactive applications using vanilla JavaScript. It provides a foundation for setting up a reactive single-page application (SPA) without the need for external libraries when they are not necessary. Developers can fork this repository to create feature-rich, maintainable, and scalable web applications.

## Features
- Build system leveraging Webpack and Babel for modern JavaScript development
- Pre-configured Webpack for easy development and production builds
- A Redux-like state manager for predictable state management
- Pre-defined scripts for development, deployment, and bundle analysis
- Support for CSS, SASS, SCSS, and CSS Modules
- Production build configured with a set of favicons

## Getting Started

### Prerequisites
Before you begin, ensure you have installed:
- Node.js
- npm or Yarn

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/shanth1/microservices_template.git
```
```bash
cd microservices_template
```
```bash
npm install
```

To quickly create an `.env` file based on the `example.env`, run:
```bash
make env
```


## Usage

### Development Scripts

Use the following npm scripts for development and production:

- `npm start`: Start the development server.
- `npm run build:dev`: Create a development build.
- `npm run build:prod`: Create a production build.
- `npm run build:prod-analyze`: Analyze the production bundle with a server.

### Environment Configuration
Webpack can be configured by modifying functions in the `config` folder and by setting environment variables via `.env` files.

## Project Structure

The project is structured as follows:

- `public/`: Contains icons, `index.html` (with a root div for mounting modules).
- `config/`: Contains Webpack configuration files.
- `src/`:
  - `app/`: Contains the setup for the Redux-like state manager, including `actions`, `reducers`, `store`, and `index.js`.
  - `modules/`: Holds the individual modules that compose the SPA.
  - `shared/`: For reusable components across modules.
  - `normalize.css`: A CSS file for consistent styling across browsers.
  - `index.js`: The entry point that mounts all modules to the root div.

## State Management
The `src/app/` directory contains all the necessary setup for our Redux-like state manager. It provides a predictable and easy-to-understand way to manage and update the application's state.

## Building for Production
To create a production-ready build, run:

```bash
npm run build:prod
```

Webpack will bundle all assets and outputs them to the `dist/` directory. It also prepares a set of production-ready favicons based on the icons provided in the `public/` folder.

## Contributing
We welcome contributions! Please feel free to fork this repository, make your changes, and submit a pull request.

## License
This project is open source and available under the [MIT License](LICENSE).



