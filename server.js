const express = require('express');
require('dotenv').config();
const classesRoutes = require('./routes/classes');

// Running express server
const app = express();
const port = process.env.PORT || 8000;

// route middlewares
app.use('/classes', classesRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});
