import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await main();
  await seedSuperAdmin();
})();
