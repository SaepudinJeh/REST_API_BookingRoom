require("dotenv").config();

const app = require("./app");

require("./configurations/init_mongo");

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
