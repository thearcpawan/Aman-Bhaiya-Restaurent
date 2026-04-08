import { type Restaurant, type MenuItem, type Reservation, type GalleryPhoto, type InsertRestaurant, type InsertMenuItem, type InsertReservation, type InsertGalleryPhoto } from "../shared/schema";
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
    // Initialize with Original's Casa de Peixe and Lapicanha restaurants
    const casaDaPeixe: Restaurant = {
      id: "casa-da-peixe-id",
      name: "Original's Casa de Peixe",
      slug: "casa-da-peixe",
      description: "Specializing in the freshest seafood and traditional Portuguese coastal cuisine. Our dishes celebrate the bounty of the sea with authentic recipes passed down through generations of fishermen and coastal cooks.",
      address: "Largo José Afonso 64, 2900-633\nSetúbal, Portugal",
      phone: "+351 926 091 468",
      email: "info@casadapeixe.pt",
      hours: "Tuesday - Thursday: 12:00 PM - 10:00 PM\nFriday - Saturday: 12:00 PM - 11:00 PM\nSunday: 12:00 PM - 9:00 PM\nMonday: Closed",
      createdAt: new Date(),
    };

    const lapicanha: Restaurant = {
      id: "lapicanha-id",
      name: "Lapicanha",
      slug: "lapicanha",
      description: "Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.",
      address: "Rua José Afonso n 69\nSetúbal, Portugal",
      phone: "+351 915 214 437",
      email: "reservas@lapicanha.pt",
      hours: "Monday - Thursday: 6:00 PM - 11:00 PM\nFriday - Saturday: 6:00 PM - 12:00 AM\nSunday: 6:00 PM - 10:00 PM",
      createdAt: new Date(),
    };

    this.restaurants.set(casaDaPeixe.id, casaDaPeixe);
    this.restaurants.set(lapicanha.id, lapicanha);

    // Add Original's Casa de Peixe menu items from the real menu
    this.initializeCasaDaPeixeMenu();
    
    // Add Lapicanha menu items from the real menu
    this.initializeLapicanhaMenu();
  }

  private initializeCasaDaPeixeMenu() {
    const restaurantId = "casa-da-peixe-id";

    // STARTERS - Couvert, Sopas, Entradas
    const starters = [
      // Couvert
      { name: "Cesto de Pão", price: "1.50€", description: "Fresh bread basket", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Queijo Seco", price: "4.50€", description: "Portuguese dried cheese", imageUrl: "https://images.unsplash.com/photo-1589881133595-0d8fef2447b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Queijo Fresco", price: "6.50€", description: "Fresh Portuguese cheese", imageUrl: "https://images.unsplash.com/photo-1607893378714-007fd47c8719?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Azeitonas", price: "2.50€", description: "Portuguese olives", imageUrl: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Presunto", price: "11.00€", description: "Portuguese cured ham", imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Sopas
      { name: "Sopa do Dia", price: "3.00€", description: "Daily soup", imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sopa de Peixe", price: "4.50€", description: "Traditional Portuguese fish soup", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Entradas
      { name: "Camarão ao Alhinho", price: "17.00€", description: "Garlic prawns", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Ameijoas ao Natural", price: "19.00€", description: "Natural clams", imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Mexilhão à Original", price: "19.90€", description: "Original style mussels", imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Taquitos de Choco", price: "12.00€", description: "Cuttlefish strips", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Lingueirão à Bolhão Pato", price: "20.00€", description: "Razor clams Bolhão Pato style", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Salada de Polvo", price: "7.00€", description: "Octopus salad", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco Frito", price: "10.00€", description: "Fried cuttlefish", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // MAINS - Peixe Grelhado, Carne, Tachos & Pratos
    const mains = [
      // Peixe Grelhado à Dose
      { name: "Garoupa", price: "21.00€", description: "Grilled grouper portion", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Dourada", price: "17.00€", description: "Grilled sea bream portion", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Robalo", price: "17.00€", description: "Grilled sea bass portion", imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Salmão", price: "18.00€", description: "Grilled salmon portion", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Peixe Espada", price: "18.00€", description: "Grilled scabbard fish", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Sardinhas", price: "15.00€", description: "Grilled sardines", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco Assado", price: "16.00€", description: "Roasted cuttlefish", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Lulas", price: "16.00€", description: "Grilled squid", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Atum", price: "21.00€", description: "Grilled tuna portion", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau", price: "21.00€", description: "Grilled cod portion", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Peixe ao Peso
      { name: "Cantaril", price: "40.00€/KG", description: "Fresh cantaril by weight", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Linguado", price: "60.00€/KG", description: "Fresh sole by weight", imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Pregado", price: "40.00€/KG", description: "Fresh turbot by weight", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Dourada do Mar", price: "50.00€/KG", description: "Wild sea bream by weight", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Robalo do Mar", price: "50.00€/KG", description: "Wild sea bass by weight", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Tachos & Pratos
      { name: "Massa de Peixe", price: "35.00€", description: "Fish pasta", imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Arroz de Marisco", price: "37.00€", description: "Seafood rice", imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f44ac3b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cataplana", price: "50.00€", description: "Traditional seafood cataplana", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Atum de Cebolada", price: "24.00€", description: "Tuna with onions", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Choco à Algarvia", price: "16.00€", description: "Cuttlefish Algarve style", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Polvo à Lagareiro", price: "19.00€", description: "Octopus with olive oil and garlic", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau à Brás", price: "17.00€", description: "Shredded cod with eggs", imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Arroz de Gambas", price: "22.50€", description: "Prawn rice", imageUrl: "https://images.unsplash.com/photo-1512058454905-6f5d5f7045c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Caril de Gambas", price: "24.50€", description: "Prawn curry", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bacalhau com Manjericão", price: "19.50€", description: "Cod with basil", imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Risotto de Camarão", price: "26.50€", description: "Prawn risotto", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Carne
      { name: "Bitoque", price: "12.50€", description: "Portuguese steak with fried egg", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bife à Original", price: "17.90€", description: "Original style steak", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Bife à Portuguesa", price: "18.00€", description: "Portuguese style steak", imageUrl: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Entrecote", price: "29.90€", description: "Grilled ribeye steak", imageUrl: "https://images.unsplash.com/photo-1615479200622-878c54fa7b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Piano", price: "19.50€", description: "Piano cut steak", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Menu Prato do Dia
      { name: "Prato do Dia", price: "24.99€", description: "Daily special with drink, dessert & coffee", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // DESSERTS
    const desserts = [
      { name: "Cheesecake Baba de Camelo", price: "4.50€", description: "Camel drool cheesecake", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cheesecake Frutos Vermelhos", price: "4.50€", description: "Red berries cheesecake", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "Cheesecake Manga", price: "4.50€", description: "Mango cheesecake", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
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

  private initializeLapicanhaMenu() {
    const restaurantId = "lapicanha-id";

    // STARTERS - ENTRADAS
    const starters = [
      { name: "CESTO DE PÃO 2 UNIDADES", price: "1.50€", description: "BREAD BASKET 2 UNITS", imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "QUEIJO SECO", price: "4.50€", description: "DRY CHEESE", imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "QUEIJO AMANTEIGADO", price: "6.50€", description: "BUTTERY CHEESE", imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "AZEITONAS", price: "3.50€", description: "OLIVES", imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CREPES LA PICANHA", price: "5.00€", description: "SPRINGROLES", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MANTEIGA", price: "1.00€", description: "BUTTER", imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PRESUNTO", price: "10.00€", description: "HAM", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PICA PAU", price: "4.50€", description: "WOODPECKER COOKED PICANHA WITH SAUCE", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // MAINS - PRATOS
    const mains = [
      { name: "HAMBURGER NO PRATO", price: "14.90€", description: "ARROZ, BATATA FRITA E FEIJÃO", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HAMBURGUER VEGANO", price: "15.90€", description: "ARROZ E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1525059696034-4967a729002e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HAMBURGER LA PICANHA", price: "15.90€", description: "HAMBURGUER NO PÃO, CEBOLA FRITA, BACON, QUEIJO CHEDDAR E TOMATE, ACOMPANHA BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ESPETADA DE PICANHA", price: "15.90€", description: "NACOS DE PICANHA GRELHADO, COM CHOURIÇO, ACOMPANHA COM ARROZ E BATATA FRITA - GRILLED PICANHA STEAKS WITH CHORIZO, SERVED WITH RICE AND FRENCH FRIES", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "FRANGO À LA PICANHA", price: "18.90€", description: "PEITO DE FRANGO RECHEADO COM BACON, CHEDDAR, ACOMPANHA COM MOLHO DE ALHO COM ERVAS, ARROZ, SALADA E BATATAS FRITAS - CHICKEN FILLET STUFFED WITH BACON, CHEDDAR, SERVED WITH GARLIC SAUCE WITH HERBS, RICE, SALAD AND FRENCH FRIES", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BIFE DE FRANGO", price: "15.90€", description: "BIFE DE FRANGO GRELHADO ACOMPANHA COM ARROZ E BATATA FRITA - GRILLED CHICKEN STEAK SERVED WITH RICE AND FRENCH FRIES", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PICANHA Á DISCRIÇÃO", price: "19.50€", description: "ARROZ, FEIJÃO, BATATAS FRITAS, SALADA E FAROFA - RICE, BEANS, FRIES, SALAD AND FAROFA", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PREMIUM ENTRECÔTE (350G)", price: "24.90€", description: "ARROZ, FEIJÃO E BATATAS FRITAS - RICE, BEANS AND FRIES", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PREMIUM PICANHA (350G)", price: "24.90€", description: "BATATAS FRITAS, ARROZ, FEIJÃO - RICE, BEANS AND FRIES", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PICANHA NO PRATO (MENU EXECUTIVO)", price: "15.00€", description: "ARROZ FEIJÃO E BATATAS FRITAS COM DIREITO A UMA BEBIDA E UM CAFÉ (SUMO, ÁGUA OU IMPERIAL) - RICE, BEANS AND FRIES, WITH A DRINK AND A COFFEE (JUICE, WATER OR BEER). DE SEGUNDA A SEXTA AOS ALMOÇOS, EXCETO FERIADOS", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "FRANGO Á LA PICANHA (MENU INFANTIL)", price: "10.50€", description: "ARROZ E BATATAS FRITAS - O MENU INFATIL É APLICADO PARA CRIANÇAS DE 4 A 9 ANOS", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PICANHA NO PRATO (MENU INFANTIL)", price: "10.50€", description: "ARROZ E BATATAS FRITAS - O MENU INFATIL É APLICADO PARA CRIANÇAS DE 4 A 9 ANOS", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // DESSERTS - SOBREMESAS
    const desserts = [
      { name: "CHEESECAKE OREO", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CHEESECAKE FRUTOS VERMELHOS", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CHEESECAKE CARAMELO SALGADO", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BOLO BRIGADEIRO", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CHEESECAKE LIMA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BOLO DE BOLACHA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PETIT GATEAU C/ GELADO", price: "5.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIXA LISBOETAS", price: "13.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PUDIM", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MUSSE DE CHOCOLATE", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "DOCE DA CASA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BOLA DE GELADO", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    ];

    // DRINKS - CAFETÁRIA, BEBIDAS, VINHOS, SANGRIAS, BEBIDAS ALCOOLICAS, COCKTAILS
    const drinks = [
      // Cafetária
      { name: "CAFÉ", price: "1.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "DESCAFEINADO", price: "1.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CHA", price: "1.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ABATANADO", price: "1.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MEIA DE LEITE", price: "2.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "IRISH COFFE", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAFÉ BOMBOM", price: "6.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Bebidas
      { name: "ÁGUA PURIFICADA", price: "2.70€", description: "", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ÁGUAS COM GAS PURIFICADA", price: "2.70€", description: "", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ÀGUA COM GÁS", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ÁGUA GARRAFA 0.50CL", price: "1.70€", description: "", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ICE TEA", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "COCA-COLA", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "GUARANA", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SUMOL", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "COMPAL", price: "2.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SAGRES", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SAGRES PRETA", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SAGRES ZERO", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SAGRES BOHEMIA", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BANDIDA DO POMAR", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CANECA HEINEKEN", price: "4.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "IMPERIAL HEINEKEN", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Vinho Tinto
      { name: "DONA ERMELINDA", price: "12.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "DONA ERMELINDA RESERVA", price: "15.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ERMELINDA SYRAH RESERVA", price: "16.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "QUINTA DA MIMOSA", price: "17.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HERDADE DOS GROUS", price: "20.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HERDADE DOS GROUS RESERVA", price: "45.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ASSOBIO", price: "10.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MONTE VELHO", price: "12.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CARM", price: "13.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CARM RESERVA", price: "22.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIADO", price: "12.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "TOURINGA NACIONAL", price: "17.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ALTITUDE RESERVA", price: "25.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PAI CHÃO", price: "90.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PAPA FIGOS", price: "15.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CARTUXA", price: "35.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Vinho Branco
      { name: "DONA ERMELINDA RESERVA (BRANCO)", price: "15.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HERDADE DOS GROUS (BRANCO)", price: "20.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ASSOBIO (BRANCO)", price: "12.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MONTE VELHO (BRANCO)", price: "12.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIADO (BRANCO)", price: "12.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "TOURINGA NACIONAL (BRANCO)", price: "17.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "PAPA FIGOS (BRANCO)", price: "15.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "ALTITUDE RESERVA (BRANCO)", price: "27.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "HERDADE DOS GROUS RESERVA (BRANCO)", price: "30.00€", description: "VINHO BRANCO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Vinho Rosé
      { name: "MATEUS", price: "12.00€", description: "VINHO ROSÉ", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIADO ROSÉ", price: "10.00€", description: "VINHO ROSÉ", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Sangrias
      { name: "SANGRIA BRANCA 1L", price: "14.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA BRANCA 2L", price: "21.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA TINTA 1L", price: "14.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA TINTA 2L", price: "21.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA ESPUMANTE 1L", price: "17.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA ESPUMANTE 2L", price: "24.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA FRUTOS VERMELHOS 1L", price: "17.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA FRUTOS VERMELHOS 2L", price: "24.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA MANGA E MARACUJÁ 1L", price: "17.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA MANGA E MARACUJÁ 2L", price: "24.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA TROPICAL 1L", price: "17.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "SANGRIA TROPICAL 2L", price: "24.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Bebidas Alcoolicas
      { name: "MOSCATEL", price: "3.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "LICOR BEIRÃO", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "AMENDOA AMARGA", price: "3.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CRF", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "VELHO TERRA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MALIBU", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BAILYEIS", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MACIEIRA", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "LOGAN", price: "10.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BUSHMILLS", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "FAMOUS GROUSE", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "JAMENSON", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CUTTY SARK", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "J&B 15 ANOS RESERVA", price: "12.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      
      // Cocktails
      { name: "COCKTAIL SEM ÁLCOOL", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIPIRINHA", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "CAIPIBLACK", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MARGUERITA", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MOJITO", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "APÉROL SPRITZ", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "MARTINI", price: "3.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BOMBAY", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BEEFEATER PINK", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "BEEFEATER", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
      { name: "TANQUERAY", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
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
