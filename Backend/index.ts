const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || '';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const healthMetricRoutes = require('./routes/HMroutes');
const resourceRoutes = require('./routes/ResourceRoutes');
const symptomLogRoutes = require('./routes/SLroutes');

app.use('/api/health-metrics', healthMetricRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/symptom-logs', symptomLogRoutes);

app.get('/', (_req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
