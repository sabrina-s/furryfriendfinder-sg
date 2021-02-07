const app = require("./app");
const PORT = process.env.PORT || 5000;
require("./config/db");

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
