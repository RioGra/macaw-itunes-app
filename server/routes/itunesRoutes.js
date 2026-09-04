import express from "express";
import searchItunes from "../controllers/searchController.js"; // Will make call to iTunes API

const router = express.Router(); // Creates a mini Express app instance for routing

// GET /api/itunes/search?term=...&media=all&limit=(default limit 25)
router.get("/search", searchItunes);

export default router;
