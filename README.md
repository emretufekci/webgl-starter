# WebGL Starter

This is a starter template for creating a WebGL application using Express.js.

## Prerequisites

Before running this application, make sure you have the following dependencies installed:

- Node.js
- Express.js
- path
- fs
- https
- selfsigned
- dotenv

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/emretufekci/webgl-starter.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

To start the server, run the following command:

```bash
npm start
```
or
```bash
npm run dev
```

The server will be running on `http://localhost:8080` and `https://localhost:8443` for HTTP and HTTPS respectively.

## HTTPS

If you want to run the server with HTTPS, you need to create a self-signed certificate. You can create a self-signed certificate by running the following command:

```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365 -newkey rsa:2048
```


## Directory Structure

The project has the following directory structure:

```
webgl-starter/
├── Build-WebGL/
│   ├── Build/
│   └── TemplateData/
├── cert.pem
├── key.pem
├── README.md
├── index.html
├── server.js
└── .env
```
PS: The `Build-WebGL` folder is the build folder of a Unity WebGL project. You can copy the contents of this folder to the root directory of the project or change BUILD_WEBGL_DIR from .env file to the path of the build folder.

## Customization

You can customize the server configuration by modifying the `server.js` file. Additionally, you can set environment variables in the `.env` file.

## Credits

This project was created by [emretufekci](https://github.com/emretufekci).
