const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const loginRoutes = require('./routes/route.login');
const cors = require('cors');
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
   origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,  
}));

app.use('/api', loginRoutes); 

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
