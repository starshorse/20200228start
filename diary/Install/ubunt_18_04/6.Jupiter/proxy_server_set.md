http-proxy-middleware 
================
/*
 37 Build a Node.js Proxy Server in Under 10 minutes!
 38 npm install http-proxy-middleware morgan --save-dev 
 39 
 40 
 42 app.js 
 43 const express = require('express');
 44 const morgan = require("morgan");
 45 const { createProxyMiddleware } = require('http-proxy-middleware');
 46 // Configuration
 47 
 48 const PORT = 3001;
 49 const HOST = "localhost";
 50 const API_SERVICE_URL = "http://ezoffice365.com:5000";
 51 // Info GET endpoint
 52 var app = express() 
 53     app.use( logger('dev')) 
 54     app.get('/info', (req, res, next) => {
 55        res.send('This is a proxy service which proxies to Billing and Account APIs.');
 56     });
 57 // Proxy endpoints
 58     app.use('/Hermes', createProxyMiddleware({
 59        target: API_SERVICE_URL,
 60        changeOrigin: true,
 61        pathRewrite: {
 62            [`^/Hermes`]: '',
 63        },
 64     }));
 65 */

