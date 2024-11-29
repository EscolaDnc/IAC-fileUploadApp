// backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./routes/upload');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
