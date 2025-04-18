import express from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";

import { getUserItems, itemCreator, itemDeleter,itemGetterById, ItemsGetter, itemUpdater } from "../controllers/itemController.js";
import upload from "../middlewares/upload.js";
const itemRouter = express.Router();


itemRouter.get("/", ItemsGetter);
itemRouter.get("/:id",itemGetterById)
itemRouter.use(authMiddleware);
itemRouter.post("/", upload.single("image"), itemCreator);
itemRouter.put("/:id",itemUpdater);
itemRouter.delete("/:id",itemDeleter);
itemRouter.get("/my/items",getUserItems);

export default itemRouter;