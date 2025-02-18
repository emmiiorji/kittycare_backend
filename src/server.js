const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const corsOptions = require('./config/corsOptions');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);
app.get('/', (req, res) => {
    res.send('Server is up and running! 😸');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
