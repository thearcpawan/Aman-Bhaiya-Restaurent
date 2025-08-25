import { type Restaurant, type MenuItem, type Reservation, type GalleryPhoto, type InsertRestaurant, type InsertMenuItem, type InsertReservation, type InsertGalleryPhoto } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  getRestaurantBySlug(slug: string): Promise<Restaurant | undefined>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Menu Items
  getMenuItems(restaurantId: string): Promise<MenuItem[]>;
  getMenuItemsByCategory(restaurantId: string, category: string): Promise<MenuItem[]>;
  createMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | undefined>;
  deleteMenuItem(id: string): Promise<boolean>;
  
  // Reservations
  getReservations(restaurantId: string): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: string, status: string): Promise<Reservation | undefined>;
  
  // Gallery Photos
  getGalleryPhotos(restaurantId: string): Promise<GalleryPhoto[]>;
  createGalleryPhoto(photo: InsertGalleryPhoto): Promise<GalleryPhoto>;
  deleteGalleryPhoto(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<string, Restaurant>;
  private menuItems: Map<string, MenuItem>;
  private reservations: Map<string, Reservation>;
  private galleryPhotos: Map<string, GalleryPhoto>;

  constructor() {
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.reservations = new Map();
    this.galleryPhotos = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize with Porto and Lisboa restaurants
    const porto: Restaurant = {
      id: "porto-id",
      name: "Restaurante Porto",
      slug: "porto",
      description: "Nestled in the heart of the city, Restaurante Porto brings the authentic flavors of Northern Portugal to your table. Our family recipes, passed down through generations, celebrate the rich culinary heritage of Porto.",
      address: "Rua das Flores, 123\n4000-123 Porto, Portugal",
      phone: "+351 220 123 456",
      email: "porto@casadossabores.pt",
      hours: "Tuesday - Thursday: 12:00 PM - 10:00 PM\nFriday - Saturday: 12:00 PM - 11:00 PM\nSunday: 12:00 PM - 9:00 PM\nMonday: Closed",
      createdAt: new Date(),
    };

    const lisboa: Restaurant = {
      id: "lisboa-id",
      name: "Restaurante Lisboa",
      slug: "lisboa",
      description: "Experience the vibrant culinary scene of Lisbon in our contemporary restaurant. We blend traditional Portuguese flavors with modern techniques to create an unforgettable dining experience.",
      address: "Avenida da Liberdade, 456\n1250-096 Lisboa, Portugal",
      phone: "+351 210 987 654",
      email: "lisboa@casadossabores.pt",
      hours: "Monday - Thursday: 6:00 PM - 11:00 PM\nFriday - Saturday: 6:00 PM - 12:00 AM\nSunday: 6:00 PM - 10:00 PM",
      createdAt: new Date(),
    };

    this.restaurants.set(porto.id, porto);
    this.restaurants.set(lisboa.id, lisboa);
  }

  // Restaurants
  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
    return Array.from(this.restaurants.values()).find(r => r.slug === slug);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = {
      ...insertRestaurant,
      id,
      createdAt: new Date(),
    };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  // Menu Items
  async getMenuItems(restaurantId: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(item => item.restaurantId === restaurantId);
  }

  async getMenuItemsByCategory(restaurantId: string, category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.restaurantId === restaurantId && item.category === category
    );
  }

  async createMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const menuItem: MenuItem = {
      ...insertMenuItem,
      description: insertMenuItem.description ?? null,
      imageUrl: insertMenuItem.imageUrl ?? null,
      id,
      createdAt: new Date(),
    };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | undefined> {
    const existing = this.menuItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.menuItems.set(id, updated);
    return updated;
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    return this.menuItems.delete(id);
  }

  // Reservations
  async getReservations(restaurantId: string): Promise<Reservation[]> {
    return Array.from(this.reservations.values()).filter(res => res.restaurantId === restaurantId);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = randomUUID();
    const reservation: Reservation = {
      ...insertReservation,
      specialRequests: insertReservation.specialRequests ?? null,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);
    return reservation;
  }

  async updateReservationStatus(id: string, status: string): Promise<Reservation | undefined> {
    const existing = this.reservations.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.reservations.set(id, updated);
    return updated;
  }

  // Gallery Photos
  async getGalleryPhotos(restaurantId: string): Promise<GalleryPhoto[]> {
    return Array.from(this.galleryPhotos.values()).filter(photo => photo.restaurantId === restaurantId);
  }

  async createGalleryPhoto(insertGalleryPhoto: InsertGalleryPhoto): Promise<GalleryPhoto> {
    const id = randomUUID();
    const photo: GalleryPhoto = {
      ...insertGalleryPhoto,
      title: insertGalleryPhoto.title ?? null,
      description: insertGalleryPhoto.description ?? null,
      id,
      createdAt: new Date(),
    };
    this.galleryPhotos.set(id, photo);
    return photo;
  }

  async deleteGalleryPhoto(id: string): Promise<boolean> {
    return this.galleryPhotos.delete(id);
  }
}

export const storage = new MemStorage();
