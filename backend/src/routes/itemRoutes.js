import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  getUserItems,
  itemCreator,
  itemDeleter,
  itemGetterById,
  ItemsGetter,
  itemUpdater,
} from "../controllers/itemController.js";
import upload from "../middlewares/upload.js";
const itemRouter = express.Router();

itemRouter.get("/", ItemsGetter);
itemRouter.use(authMiddleware);
itemRouter.get("/my/items", getUserItems);
itemRouter.post("/", upload.single("image"), itemCreator);
itemRouter.put("/:id", itemUpdater);
itemRouter.delete("/:id", itemDeleter);
itemRouter.get("/:id", itemGetterById);

export default itemRouter;
