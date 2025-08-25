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
    // Initialize with Casa Da Peixe and Lapicanha restaurants
    const casaDaPeixe: Restaurant = {
      id: "casa-da-peixe-id",
      name: "Casa Da Peixe",
      slug: "casa-da-peixe",
      description: "Specializing in the freshest seafood and traditional Portuguese coastal cuisine. Our dishes celebrate the bounty of the sea with authentic recipes passed down through generations of fishermen and coastal cooks.",
      address: "Rua da Ribeira, 89\n4050-513 Porto, Portugal",
      phone: "+351 220 345 678",
      email: "info@casadapeixe.pt",
      hours: "Tuesday - Thursday: 12:00 PM - 10:00 PM\nFriday - Saturday: 12:00 PM - 11:00 PM\nSunday: 12:00 PM - 9:00 PM\nMonday: Closed",
      createdAt: new Date(),
    };

    const lapicanha: Restaurant = {
      id: "lapicanha-id",
      name: "Lapicanha",
      slug: "lapicanha",
      description: "Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.",
      address: "Avenida da República, 245\n1050-186 Lisboa, Portugal",
      phone: "+351 210 654 321",
      email: "reservas@lapicanha.pt",
      hours: "Monday - Thursday: 6:00 PM - 11:00 PM\nFriday - Saturday: 6:00 PM - 12:00 AM\nSunday: 6:00 PM - 10:00 PM",
      createdAt: new Date(),
    };

    this.restaurants.set(casaDaPeixe.id, casaDaPeixe);
    this.restaurants.set(lapicanha.id, lapicanha);

    // Add Casa Da Peixe menu items from the real menu
    this.initializeCasaDaPeixeMenu();
  }

  private initializeCasaDaPeixeMenu() {
    const restaurantId = "casa-da-peixe-id";

    // STARTERS - Couvert, Sopas, Entradas
    const starters = [
      // Couvert
      { name: "Cesto de Pão", price: "1.50€", description: "Fresh bread basket", imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Queijo Seco", price: "4.50€", description: "Portuguese dried cheese", imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Queijo Fresco", price: "6.50€", description: "Fresh Portuguese cheese", imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Azeitonas", price: "2.50€", description: "Portuguese olives", imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Presunto", price: "11.00€", description: "Portuguese cured ham", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Sopas
      { name: "Sopa do Dia", price: "3.00€", description: "Daily soup", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sopa de Peixe", price: "4.50€", description: "Traditional Portuguese fish soup", imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Entradas
      { name: "Camarão ao Alhinho", price: "17.00€", description: "Garlic prawns", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Ameijoas ao Natural", price: "19.00€", description: "Natural clams", imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Mexilhão à Original", price: "19.90€", description: "Original style mussels", imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Taquitos de Choco", price: "12.00€", description: "Cuttlefish strips", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Lingueirão à Bolhão Pato", price: "20.00€", description: "Razor clams Bolhão Pato style", imageUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Salada de Polvo", price: "7.00€", description: "Octopus salad", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco Frito", price: "10.00€", description: "Fried cuttlefish", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // MAINS - Peixe Grelhado, Carne, Tachos & Pratos
    const mains = [
      // Peixe Grelhado à Dose
      { name: "Garoupa", price: "21.00€", description: "Grilled grouper portion", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Dourada", price: "17.00€", description: "Grilled sea bream portion", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Robalo", price: "17.00€", description: "Grilled sea bass portion", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Salmão", price: "18.00€", description: "Grilled salmon portion", imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Peixe Espada", price: "18.00€", description: "Grilled scabbard fish", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sardinhas", price: "15.00€", description: "Grilled sardines", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco Assado", price: "16.00€", description: "Roasted cuttlefish", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Lulas", price: "16.00€", description: "Grilled squid", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Atum", price: "21.00€", description: "Grilled tuna portion", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau", price: "21.00€", description: "Grilled cod portion", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Peixe ao Peso
      { name: "Cantaril", price: "40.00€/KG", description: "Fresh cantaril by weight", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Linguado", price: "60.00€/KG", description: "Fresh sole by weight", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Pregado", price: "40.00€/KG", description: "Fresh turbot by weight", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Dourada do Mar", price: "50.00€/KG", description: "Wild sea bream by weight", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Robalo do Mar", price: "50.00€/KG", description: "Wild sea bass by weight", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Tachos & Pratos
      { name: "Massa de Peixe", price: "35.00€", description: "Fish pasta", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Arroz de Marisco", price: "37.00€", description: "Seafood rice", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cataplana", price: "50.00€", description: "Traditional seafood cataplana", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Atum de Cebolada", price: "24.00€", description: "Tuna with onions", imageUrl: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco à Algarvia", price: "16.00€", description: "Cuttlefish Algarve style", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Polvo à Lagareiro", price: "19.00€", description: "Octopus with olive oil and garlic", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau à Brás", price: "17.00€", description: "Shredded cod with eggs", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Arroz de Gambas", price: "22.50€", description: "Prawn rice", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Caril de Gambas", price: "24.50€", description: "Prawn curry", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau com Manjericão", price: "19.50€", description: "Cod with basil", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Risotto de Camarão", price: "26.50€", description: "Prawn risotto", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Carne
      { name: "Bitoque", price: "12.50€", description: "Portuguese steak with fried egg", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bife à Original", price: "17.90€", description: "Original style steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bife à Portuguesa", price: "18.00€", description: "Portuguese style steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Entrecote", price: "29.90€", description: "Grilled ribeye steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Piano", price: "19.50€", description: "Piano cut steak", imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Menu Prato do Dia
      { name: "Prato do Dia", price: "24.99€", description: "Daily special with drink, dessert & coffee", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // DESSERTS
    const desserts = [
      { name: "Cheesecake Baba de Camelo", price: "4.50€", description: "Camel drool cheesecake", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cheesecake Frutos Vermelhos", price: "4.50€", description: "Red berries cheesecake", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cheesecake Manga", price: "4.50€", description: "Mango cheesecake", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bolo Brigadeiro", price: "4.50€", description: "Brazilian brigadeiro cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bolo de Bolacha", price: "4.50€", description: "Cookie cake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Pudim", price: "4.50€", description: "Portuguese pudding", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Mousse de Chocolate", price: "4.50€", description: "Chocolate mousse", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Mousse de Manga", price: "4.50€", description: "Mango mousse", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Doce da Casa", price: "4.50€", description: "House special dessert", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Fruta", price: "3.50€", description: "Fresh fruit", imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // DRINKS
    const drinks = [
      // Bebidas
      { name: "Água 1.5L", price: "3.00€", description: "Still water 1.5L", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Água com Gás 1L", price: "2.70€", description: "Sparkling water 1L", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Água com Gás", price: "2.00€", description: "Sparkling water", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Ice Tea", price: "2.50€", description: "Iced tea", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Coca-Cola", price: "2.50€", description: "Coca-Cola", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sagres", price: "2.50€", description: "Portuguese beer", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Imperial", price: "2.50€", description: "Draft beer", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Sangrias
      { name: "Sangria Branca 1L", price: "14.90€", description: "White sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sangria Tinta 1L", price: "14.90€", description: "Red sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sangria Espumante 1L", price: "17.90€", description: "Sparkling sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Vinhos
      { name: "Vinho Branco (Jarro)", price: "8.00€/1L", description: "House white wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Vinho Tinto (Jarro)", price: "8.00€/1L", description: "House red wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Ermelinda", price: "12.00€", description: "Portuguese white wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Campo da Vinha", price: "12.00€", description: "Vinho Verde", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Soalheiro", price: "18.00€", description: "Premium Vinho Verde", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Cocktails
      { name: "Caipirinha", price: "6.00€", description: "Brazilian caipirinha", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Mojito", price: "8.00€", description: "Classic mojito", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Marguerita", price: "8.00€", description: "Classic margarita", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Aperol Spritz", price: "6.00€", description: "Italian aperol spritz", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Cafetaria
      { name: "Café", price: "1.20€", description: "Portuguese espresso", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Chá", price: "1.50€", description: "Tea", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Meia de Leite", price: "2.00€", description: "Coffee with milk", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Irish Coffee", price: "5.00€", description: "Irish coffee", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // Add all menu items to storage
    [...starters, ...mains, ...desserts, ...drinks].forEach(item => {
      const id = randomUUID();
      const category = starters.includes(item) ? 'starters' : 
                      mains.includes(item) ? 'mains' : 
                      desserts.includes(item) ? 'desserts' : 'drinks';
      
      const menuItem: MenuItem = {
        id,
        restaurantId,
        name: item.name,
        description: item.description ?? null,
        price: item.price,
        category,
        imageUrl: item.imageUrl ?? null,
        createdAt: new Date(),
      };
      
      this.menuItems.set(id, menuItem);
    });
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
