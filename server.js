require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() =>
    console.log('Database Authenticated')
  )
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 8050;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
