import pool from "../config/dbConfig.js";

export const createItem = async (
  title,
  description,
  category,
  lng,
  lat,
  images,
  userId,
  price,
  rentalRate,
  isRental
) => {
  try {
    const result = await pool.query(
      `INSERT INTO items (title, description, category, location, images, user_id, price, rental_rate, is_rental) 
             VALUES ($1, $2, $3, ST_SetSRID(ST_MakePoint($4, $5), 4326), $6, $7, $8, $9, $10) 
             RETURNING *`,
      [
        title,
        description,
        category,
        lng,
        lat,
        images,
        userId,
        price,
        rentalRate,
        isRental,
      ]
    );

    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (itemId) => {
 
  const result = await pool.query(
    `SELECT 
      id, title, description, category, 
      ST_X(location::geometry) AS lng,
      ST_Y(location::geometry) AS lat,
      images, user_id, status, created_at,
      price, rental_rate, is_rental
     FROM items WHERE id = $1`,
    [itemId]
  );
  return result.rows[0];
};

export const getFilteredItems = async (filters) => {
  let query = `
    SELECT 
      id, title, description, category,
      images, status, created_at,
      price, rental_rate, is_rental
  `;

  const params = [];

  // Add location fields only if lng/lat are provided
  if (filters.lng && filters.lat) {
    query += `,
      ST_X(location::geometry) AS lng,
      ST_Y(location::geometry) AS lat,
      ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      ) AS distance
    `;
    params.push(filters.lng, filters.lat);
  }

  query += `
    FROM items
    WHERE 1=1
  `;

  // Text search
  if (filters.searchTerm) {
    query += ` AND (title ILIKE $${params.length + 1} OR description ILIKE $${
      params.length + 1
    })`;
    params.push(`%${filters.searchTerm}%`);
  }

  // Category filter
  if (filters.categories?.length > 0) {
    query += ` AND LOWER(category) = ANY($${params.length + 1})`;
    params.push(filters.categories.map((c) => c.toLowerCase()));
  }

  // Status filter
  if (filters.status) {
    query += ` AND status = $${params.length + 1}`;
    params.push(filters.status);
  }

  // Location-based filter
  if (filters.lng && filters.lat) {
    query += `
      AND ST_DWithin(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
        $${params.length + 1}
      )
    `;
    params.push(filters.maxDistance);
  }

  // Sorting
  if (filters.sortBy === "nearest" && filters.lng && filters.lat) {
    query += ` ORDER BY distance`;
  } else {
    query += ` ORDER BY created_at DESC`;
  }

  const result = await pool.query(query, params);
  return result.rows;
};

export const updateItem = async (
  itemId,
  title,
  description,
  category,
  price,
  rentalRate,
  isRental
) => {
  const result = await pool.query(
    `UPDATE items SET title = $1, description = $2, category = $3, price = $4, rental_rate = $5, is_rental = $6 WHERE id = $7 RETURNING *`,
    [title, description, category, price, rentalRate, isRental, itemId]
  );
  return result.rows[0];
};

export const deleteItem = async (itemId) => {
  const result = await pool.query(
    `DELETE FROM items WHERE id = $1 RETURNING *`,
    [itemId]
  );
  return result.rows[0];
};

export const getMyItems = async (userId) => {
  const result = await pool.query(
    `SELECT id, title, description, category, images, status, created_at, price, rental_rate, is_rental FROM items WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};
