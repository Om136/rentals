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
// Public: browsing and viewing item details
itemRouter.get("/:id", itemGetterById);

// Protected: user-owned item management
itemRouter.get("/my/items", authMiddleware, getUserItems);
itemRouter.post("/", authMiddleware, upload.single("image"), itemCreator);
itemRouter.put("/:id", authMiddleware, itemUpdater);
itemRouter.delete("/:id", authMiddleware, itemDeleter);

export default itemRouter;
