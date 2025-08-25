import express, { type Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertMenuItemSchema, insertReservationSchema, insertGalleryPhotoSchema } from "@shared/schema";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use("/uploads", express.static(uploadDir));

  // Restaurants
  app.get("/api/restaurants", async (req, res) => {
    try {
      const restaurants = await storage.getRestaurants();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurants" });
    }
  });

  app.get("/api/restaurants/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const restaurant = await storage.getRestaurantBySlug(slug);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurant" });
    }
  });

  // Menu Items
  app.get("/api/restaurants/:restaurantId/menu", async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const menuItems = await storage.getMenuItems(restaurantId);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.post("/api/restaurants/:restaurantId/menu", upload.single("image"), async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const data = {
        restaurantId,
        name: req.body.name,
        description: req.body.description || undefined,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      };

      const validatedData = insertMenuItemSchema.parse(data);
      const menuItem = await storage.createMenuItem(validatedData);
      res.status(201).json(menuItem);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create menu item" });
      }
    }
  });

  app.patch("/api/menu/:id/image", upload.single("image"), async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const updated = await storage.updateMenuItem(id, { imageUrl });
      
      if (!updated) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update menu item image" });
    }
  });

  // Reservations
  app.get("/api/restaurants/:restaurantId/reservations", async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const reservations = await storage.getReservations(restaurantId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.post("/api/restaurants/:restaurantId/reservations", async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const data = {
        restaurantId,
        ...req.body,
      };

      const validatedData = insertReservationSchema.parse(data);
      const reservation = await storage.createReservation(validatedData);
      res.status(201).json(reservation);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create reservation" });
      }
    }
  });

  // Gallery Photos
  app.get("/api/restaurants/:restaurantId/gallery", async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const photos = await storage.getGalleryPhotos(restaurantId);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery photos" });
    }
  });

  app.post("/api/restaurants/:restaurantId/gallery", upload.single("image"), async (req, res) => {
    try {
      const { restaurantId } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      const data = {
        restaurantId,
        imageUrl: `/uploads/${req.file.filename}`,
        title: req.body.title || undefined,
        description: req.body.description || undefined,
      };

      const validatedData = insertGalleryPhotoSchema.parse(data);
      const photo = await storage.createGalleryPhoto(validatedData);
      res.status(201).json(photo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to upload photo" });
      }
    }
  });

  app.delete("/api/gallery/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteGalleryPhoto(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Photo not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete photo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
