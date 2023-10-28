const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('./config.json');
const app = express();

// Define un puerto para tu servidor
const PORT = 3000;

// Ruta para gestionar usuarios
app.use('/users', createProxyMiddleware({
    target: config.usersService.url,
    changeOrigin: true,
    pathRewrite: {
      '^/users': ''
    },
    logLevel: 'debug'
  }))


// Ruta para el servicio de chat
app.use('/chat', createProxyMiddleware({
    target: config.chatService.url,
    pathRewrite: {
      '^/chat': ''
    }
  }))


  
  

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
