require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 8050;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
