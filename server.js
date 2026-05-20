const express = require('express');
const app = express();
const requestsRouter = require('./routes/requests');

const PORT = 3000;

app.use(express.json());

app.use('/api/requests', requestsRouter);

app.listen(PORT, () => {
    console.log(`Сервер моделирования сетей запущен на порту ${PORT}`);
    console.log(`URL: http://localhost:${PORT}/api/requests`);
});