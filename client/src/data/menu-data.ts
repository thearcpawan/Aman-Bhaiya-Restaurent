export interface StaticMenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  createdAt: Date;
}

const cdp = "casa-da-peixe-id";
const lap = "lapicanha-id";

export const casaDaPeixeMenuItems: StaticMenuItem[] = [
  // STARTERS
  { id: "cdp-s1", restaurantId: cdp, name: "Cesto de Pão", price: "1.50€", description: "Fresh bread basket", category: "starters", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s2", restaurantId: cdp, name: "Queijo Seco", price: "4.50€", description: "Portuguese dried cheese", category: "starters", imageUrl: "https://images.unsplash.com/photo-1589881133595-0d8fef2447b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s3", restaurantId: cdp, name: "Queijo Fresco", price: "6.50€", description: "Fresh Portuguese cheese", category: "starters", imageUrl: "https://images.unsplash.com/photo-1607893378714-007fd47c8719?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s4", restaurantId: cdp, name: "Azeitonas", price: "2.50€", description: "Portuguese olives", category: "starters", imageUrl: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s5", restaurantId: cdp, name: "Presunto", price: "11.00€", description: "Portuguese cured ham", category: "starters", imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s6", restaurantId: cdp, name: "Sopa do Dia", price: "3.00€", description: "Daily soup", category: "starters", imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s7", restaurantId: cdp, name: "Sopa de Peixe", price: "4.50€", description: "Traditional Portuguese fish soup", category: "starters", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s8", restaurantId: cdp, name: "Camarão ao Alhinho", price: "17.00€", description: "Garlic prawns", category: "starters", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s9", restaurantId: cdp, name: "Ameijoas ao Natural", price: "19.00€", description: "Natural clams", category: "starters", imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s10", restaurantId: cdp, name: "Mexilhão à Original", price: "19.90€", description: "Original style mussels", category: "starters", imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s11", restaurantId: cdp, name: "Salada de Polvo", price: "7.00€", description: "Octopus salad", category: "starters", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-s12", restaurantId: cdp, name: "Choco Frito", price: "10.00€", description: "Fried cuttlefish", category: "starters", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // MAINS
  { id: "cdp-m1", restaurantId: cdp, name: "Garoupa", price: "21.00€", description: "Grilled grouper portion", category: "mains", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m2", restaurantId: cdp, name: "Dourada", price: "17.00€", description: "Grilled sea bream portion", category: "mains", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m3", restaurantId: cdp, name: "Robalo", price: "17.00€", description: "Grilled sea bass portion", category: "mains", imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m4", restaurantId: cdp, name: "Salmão", price: "18.00€", description: "Grilled salmon portion", category: "mains", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m5", restaurantId: cdp, name: "Sardinhas", price: "15.00€", description: "Grilled sardines", category: "mains", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m6", restaurantId: cdp, name: "Bacalhau", price: "21.00€", description: "Grilled cod portion", category: "mains", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m7", restaurantId: cdp, name: "Arroz de Marisco", price: "37.00€", description: "Seafood rice", category: "mains", imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f44ac3b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m8", restaurantId: cdp, name: "Cataplana", price: "50.00€", description: "Traditional seafood cataplana", category: "mains", imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m9", restaurantId: cdp, name: "Polvo à Lagareiro", price: "19.00€", description: "Octopus with olive oil and garlic", category: "mains", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m10", restaurantId: cdp, name: "Bacalhau à Brás", price: "17.00€", description: "Shredded cod with eggs", category: "mains", imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m11", restaurantId: cdp, name: "Bitoque", price: "12.50€", description: "Portuguese steak with fried egg", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-m12", restaurantId: cdp, name: "Prato do Dia", price: "24.99€", description: "Daily special with drink, dessert & coffee", category: "mains", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // DESSERTS
  { id: "cdp-d1", restaurantId: cdp, name: "Cheesecake Baba de Camelo", price: "4.50€", description: "Camel drool cheesecake", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-d2", restaurantId: cdp, name: "Cheesecake Frutos Vermelhos", price: "4.50€", description: "Red berries cheesecake", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-d3", restaurantId: cdp, name: "Pudim", price: "4.50€", description: "Portuguese pudding", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-d4", restaurantId: cdp, name: "Mousse de Chocolate", price: "4.50€", description: "Chocolate mousse", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // DRINKS
  { id: "cdp-dr1", restaurantId: cdp, name: "Água", price: "2.00€", description: "Still water", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-dr2", restaurantId: cdp, name: "Sagres", price: "2.50€", description: "Portuguese beer", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-dr3", restaurantId: cdp, name: "Sangria Branca 1L", price: "14.90€", description: "White sangria 1L", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-dr4", restaurantId: cdp, name: "Vinho Branco (Jarro)", price: "8.00€/1L", description: "House white wine", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-dr5", restaurantId: cdp, name: "Café", price: "1.20€", description: "Portuguese espresso", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "cdp-dr6", restaurantId: cdp, name: "Caipirinha", price: "6.00€", description: "Brazilian caipirinha", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
];

export const lapicanhaMenuItems: StaticMenuItem[] = [
  // STARTERS
  { id: "lap-s1", restaurantId: lap, name: "CESTO DE PÃO", price: "1.50€", description: "BREAD BASKET", category: "starters", imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-s2", restaurantId: lap, name: "QUEIJO SECO", price: "4.50€", description: "DRY CHEESE", category: "starters", imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-s3", restaurantId: lap, name: "AZEITONAS", price: "3.50€", description: "OLIVES", category: "starters", imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-s4", restaurantId: lap, name: "PRESUNTO", price: "10.00€", description: "HAM", category: "starters", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-s5", restaurantId: lap, name: "PICA PAU", price: "4.50€", description: "COOKED PICANHA WITH SAUCE", category: "starters", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // MAINS
  { id: "lap-m1", restaurantId: lap, name: "PICANHA Á DISCRIÇÃO", price: "19.50€", description: "Rice, beans, fries, salad and farofa", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m2", restaurantId: lap, name: "PREMIUM PICANHA (350G)", price: "24.90€", description: "Rice, beans and fries", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m3", restaurantId: lap, name: "PREMIUM ENTRECÔTE (350G)", price: "24.90€", description: "Rice, beans and fries", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m4", restaurantId: lap, name: "ESPETADA DE PICANHA", price: "15.90€", description: "Grilled picanha steaks with chorizo, served with rice and fries", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m5", restaurantId: lap, name: "FRANGO À LA PICANHA", price: "18.90€", description: "Chicken fillet stuffed with bacon & cheddar", category: "mains", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m6", restaurantId: lap, name: "HAMBURGER LA PICANHA", price: "15.90€", description: "Burger with fried onion, bacon, cheddar and tomato, served with fries", category: "mains", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-m7", restaurantId: lap, name: "PICANHA NO PRATO (MENU EXECUTIVO)", price: "15.00€", description: "Rice, beans, fries + drink & coffee (Mon–Fri lunch)", category: "mains", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // DESSERTS
  { id: "lap-d1", restaurantId: lap, name: "CHEESECAKE OREO", price: "5.00€", description: "", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-d2", restaurantId: lap, name: "CHEESECAKE FRUTOS VERMELHOS", price: "4.50€", description: "", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-d3", restaurantId: lap, name: "PUDIM", price: "4.50€", description: "", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-d4", restaurantId: lap, name: "MUSSE DE CHOCOLATE", price: "4.50€", description: "", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-d5", restaurantId: lap, name: "PETIT GATEAU C/ GELADO", price: "5.50€", description: "", category: "desserts", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  // DRINKS
  { id: "lap-dr1", restaurantId: lap, name: "CAFÉ", price: "1.20€", description: "", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-dr2", restaurantId: lap, name: "SAGRES", price: "2.20€", description: "", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-dr3", restaurantId: lap, name: "COCA-COLA", price: "2.20€", description: "", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-dr4", restaurantId: lap, name: "DONA ERMELINDA", price: "12.00€", description: "VINHO TINTO", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-dr5", restaurantId: lap, name: "SANGRIA BRANCA 1L", price: "13.00€", description: "", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
  { id: "lap-dr6", restaurantId: lap, name: "MOJITO", price: "7.00€", description: "", category: "drinks", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250", createdAt: new Date() },
];
