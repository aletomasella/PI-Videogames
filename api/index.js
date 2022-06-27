const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const PORT = 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || PORT, () => {
    console.log("%s listening at " + PORT); // eslint-disable-line no-console
  });
});
