import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {

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

  const httpServer = createServer(app);
  return httpServer;
}
