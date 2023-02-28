import fs from "fs";
import { Request, Response } from "express";

const THINGS_FILE_PATH = "./things.json";

export const thingsController = {
  getThings: (req: Request, res: Response) => {
    const things = readThings();
    res.json(things);
  },
  getThing: (req: Request, res: Response) => {
    const { idThing } = req.params;
    const things = readThings();
    const thing = things.find((t: any) => t.id === idThing);
    if (thing) {
      res.json(thing);
    } else {
      res.sendStatus(404);
    }
  },
  deleteThing: (req: Request, res: Response) => {
    const { idThing } = req.params;
    const things = readThings();
    const index = things.findIndex((t: any) => t.id === idThing);
    if (index !== -1) {
      things.splice(index, 1);
      writeThings(things);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
  createThing: (req: Request, res: Response) => {
    const { name } = req.body;
    const things = readThings();
    const id = generateId();
    const newThing = { id, name };
    things.push(newThing);
    writeThings(things);
    res.status(201).json(newThing);
  },
  updateThing: (req: Request, res: Response) => {
    const { id, name } = req.body;
    const things = readThings();
    const index = things.findIndex((t: any) => t.id === id);
    if (index !== -1) {
      things[index].name = name;
      writeThings(things);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};

function readThings() {
  const data = fs.readFileSync(THINGS_FILE_PATH, "utf8");
  return JSON.parse(data).things;
}

function writeThings(things: any[]) {
  const data = JSON.stringify({ things });
  fs.writeFileSync(THINGS_FILE_PATH, data);
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
