import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  hours: text("hours").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: text("restaurant_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  category: text("category").notNull(), // starters, mains, desserts, drinks
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: text("restaurant_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  specialRequests: text("special_requests"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryPhotos = pgTable("gallery_photos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  restaurantId: text("restaurant_id").notNull(),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRestaurantSchema = createInsertSchema(restaurants).pick({
  name: true,
  slug: true,
  description: true,
  address: true,
  phone: true,
  email: true,
  hours: true,
});

export const insertMenuItemSchema = createInsertSchema(menuItems).pick({
  restaurantId: true,
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
});

export const insertReservationSchema = createInsertSchema(reservations).pick({
  restaurantId: true,
  name: true,
  email: true,
  date: true,
  time: true,
  guests: true,
  specialRequests: true,
});

export const insertGalleryPhotoSchema = createInsertSchema(galleryPhotos).pick({
  restaurantId: true,
  imageUrl: true,
  title: true,
  description: true,
});

export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type InsertGalleryPhoto = z.infer<typeof insertGalleryPhotoSchema>;

export type Restaurant = typeof restaurants.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
