import express from "express";
import { thingsController } from "../controllers/things";

export const thingsRouter = express.Router();

thingsRouter.get("/", thingsController.getThings);
thingsRouter.get("/:idThing", thingsController.getThing);
thingsRouter.delete("/:idThing", thingsController.deleteThing);
thingsRouter.post("/", thingsController.createThing);
thingsRouter.patch("/", thingsController.updateThing);
