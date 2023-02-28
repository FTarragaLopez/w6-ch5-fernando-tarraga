import express from "express";
import bodyParser from "body-parser";
import { thingsRouter } from "./routes/things";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/things", thingsRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
