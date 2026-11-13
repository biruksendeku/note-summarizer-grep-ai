import "dotenv/config";
import app from "./src/app.js";
const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
  console.log(`${NODE_ENV} server started on ${PORT}...`);
});
