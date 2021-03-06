const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { port, databaseUrl, databaseUser, databaseKey } = require('./config');
const { setupWebsocket } = require ('./websocket');

const routes = require('./routes');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(`mongodb+srv://${databaseUser}:${databaseKey}@${databaseUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(routes);


server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});