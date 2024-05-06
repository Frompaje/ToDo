import { app } from "./app";
import { env } from "./controllers/env";

app.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log("Server is running on port 3333");
  }
);
