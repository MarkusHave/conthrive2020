const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;
const db = require('./models/index');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => console.log('Error' + err));

app.get('/api/image/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'images', req.params.name));
});

app.use('/api/images', require('./routes/imageRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
