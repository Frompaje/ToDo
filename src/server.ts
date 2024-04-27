import { app } from "./app";

app.listen(
  {
    port: 3333,
  },
  () => {
    console.log("Server is running on port 3333");
  }
);
