import cloudinary from "../config/cloudinary.js";
import {
  createItem,
  deleteItem,
  getFilteredItems,
  getItemById,
  getMyItems,
  updateItem,
} from "../queries/itemQueries.js";

export const itemCreator = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      lng,
      lat,
      price,
      rental_rate,
      is_rental,
    } = req.body;
    const userId = req.user.id;
    const images = [];

    if (req.file) {
      const { path } = req.file;
      const result = await cloudinary.uploader.upload(path);
      images.push(result.secure_url);
    }

    const item = await createItem(
      title,
      description,
      category,
      lng,
      lat,
      images,
      userId,
      price,
      rental_rate,
      is_rental
    );
    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Item creation failed" });
  }
};

export const itemGetterById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await getItemById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get item" });
  }
};

export const ItemsGetter = async (req, res) => {
  try {
    const filters = {
      searchTerm: req.query.search,
      categories: req.query.categories?.split(","),
      status: req.query.status,
      lng: req.query.lng ? parseFloat(req.query.lng) : undefined,
      lat: req.query.lat ? parseFloat(req.query.lat) : undefined,
      maxDistance: req.query.maxDistance
        ? parseInt(req.query.maxDistance)
        : 10000, // Default 10km
      sortBy: req.query.sortBy || "created_at", // Default sort by creation date
      sortOrder: req.query.sortOrder || "desc", // Default descending
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      isRental:
        req.query.isRental !== undefined
          ? req.query.isRental === "true"
          : undefined,
    };

    const items = await getFilteredItems(filters);
    res.json(items);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};
export const itemUpdater = async (req, res) => {
  const itemId = req.params.id;
  const { title, description, category, price, rental_rate, is_rental } =
    req.body;
  const item = await updateItem(
    itemId,
    title,
    description,
    category,
    price,
    rental_rate,
    is_rental
  );
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
};

export const itemDeleter = async (req, res) => {
  const itemId = req.params.id;
  const item = await deleteItem(itemId);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
};

export const getUserItems = async (req, res) => {
  const userId = req.user.id;
  const items = await getMyItems(userId);
  if (!items) {
    return res.status(404).json({ message: "Items not found" });
  }
  res.json(items);
};
