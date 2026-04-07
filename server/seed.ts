import { db } from "./db";
import { restaurants, menuItems } from "@shared/schema";
import { randomUUID } from "crypto";

export async function seedDatabase() {
  const existing = await db.select().from(restaurants).limit(1);
  if (existing.length > 0) return;

  console.log("Seeding database with initial restaurant data...");

  const casaDaPeixeId = "casa-da-peixe-id";
  const lapicanhaId = "lapicanha-id";

  await db.insert(restaurants).values([
    {
      id: casaDaPeixeId,
      name: "Original's Casa de Peixe",
      slug: "casa-da-peixe",
      description: "Specializing in the freshest seafood and traditional Portuguese coastal cuisine. Our dishes celebrate the bounty of the sea with authentic recipes passed down through generations of fishermen and coastal cooks.",
      address: "Largo José Afonso 64, 2900-633\nSetúbal, Portugal",
      phone: "+351 926 091 468",
      email: "info@casadapeixe.pt",
      hours: "Tuesday - Thursday: 12:00 PM - 10:00 PM\nFriday - Saturday: 12:00 PM - 11:00 PM\nSunday: 12:00 PM - 9:00 PM\nMonday: Closed",
    },
    {
      id: lapicanhaId,
      name: "Lapicanha",
      slug: "lapicanha",
      description: "Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.",
      address: "Rua José Afonso n 69\nSetúbal, Portugal",
      phone: "+351 915 214 437",
      email: "reservas@lapicanha.pt",
      hours: "Monday - Thursday: 6:00 PM - 11:00 PM\nFriday - Saturday: 6:00 PM - 12:00 AM\nSunday: 6:00 PM - 10:00 PM",
    },
  ]);

  const casaStarters = [
    { name: "Cesto de Pão", price: "1.50€", description: "Fresh bread basket", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Queijo Seco", price: "4.50€", description: "Portuguese dried cheese", imageUrl: "https://images.unsplash.com/photo-1589881133595-0d8fef2447b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Queijo Fresco", price: "6.50€", description: "Fresh Portuguese cheese", imageUrl: "https://images.unsplash.com/photo-1607893378714-007fd47c8719?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Azeitonas", price: "2.50€", description: "Portuguese olives", imageUrl: "https://images.unsplash.com/photo-1611735341450-74d61e660ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Presunto", price: "11.00€", description: "Portuguese cured ham", imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sopa do Dia", price: "3.00€", description: "Daily soup", imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sopa de Peixe", price: "4.50€", description: "Traditional Portuguese fish soup", imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Camarão ao Alhinho", price: "17.00€", description: "Garlic prawns", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Ameijoas ao Natural", price: "19.00€", description: "Natural clams", imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Mexilhão à Original", price: "19.90€", description: "Original style mussels", imageUrl: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Taquitos de Choco", price: "12.00€", description: "Cuttlefish strips", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Lingueirão à Bolhão Pato", price: "20.00€", description: "Razor clams Bolhão Pato style", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Salada de Polvo", price: "7.00€", description: "Octopus salad", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Choco Frito", price: "10.00€", description: "Fried cuttlefish", imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const casaMains = [
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
    { name: "Cantaril", price: "40.00€/KG", description: "Fresh cantaril by weight", imageUrl: "https://images.unsplash.com/photo-1565299585323-38174c4a6c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Linguado", price: "60.00€/KG", description: "Fresh sole by weight", imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Pregado", price: "40.00€/KG", description: "Fresh turbot by weight", imageUrl: "https://images.unsplash.com/photo-1571197119282-621c1afec1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Dourada do Mar", price: "50.00€/KG", description: "Wild sea bream by weight", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Robalo do Mar", price: "50.00€/KG", description: "Wild sea bass by weight", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
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
    { name: "Bitoque", price: "12.50€", description: "Portuguese steak with fried egg", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Bife à Original", price: "17.90€", description: "Original style steak", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Bife à Portuguesa", price: "18.00€", description: "Portuguese style steak", imageUrl: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Entrecote", price: "29.90€", description: "Grilled ribeye steak", imageUrl: "https://images.unsplash.com/photo-1615479200622-878c54fa7b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Piano", price: "19.50€", description: "Piano cut steak", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Prato do Dia", price: "24.99€", description: "Daily special with drink, dessert & coffee", imageUrl: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const casaDesserts = [
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

  const casaDrinks = [
    { name: "Água 1.5L", price: "3.00€", description: "Still water 1.5L", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Água com Gás 1L", price: "2.70€", description: "Sparkling water 1L", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Ice Tea", price: "2.50€", description: "Iced tea", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Coca-Cola", price: "2.50€", description: "Coca-Cola", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sagres", price: "2.50€", description: "Portuguese beer", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Imperial", price: "2.50€", description: "Draft beer", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sangria Branca 1L", price: "14.90€", description: "White sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sangria Tinta 1L", price: "14.90€", description: "Red sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Sangria Espumante 1L", price: "17.90€", description: "Sparkling sangria 1L", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Vinho Branco (Jarro)", price: "8.00€/1L", description: "House white wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Vinho Tinto (Jarro)", price: "8.00€/1L", description: "House red wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Ermelinda", price: "12.00€", description: "Portuguese white wine", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Campo da Vinha", price: "12.00€", description: "Vinho Verde", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Soalheiro", price: "18.00€", description: "Premium Vinho Verde", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Caipirinha", price: "6.00€", description: "Brazilian caipirinha", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Mojito", price: "8.00€", description: "Classic mojito", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Marguerita", price: "8.00€", description: "Classic margarita", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Aperol Spritz", price: "6.00€", description: "Italian aperol spritz", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Café", price: "1.20€", description: "Portuguese espresso", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Chá", price: "1.50€", description: "Tea", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Meia de Leite", price: "2.00€", description: "Coffee with milk", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "Irish Coffee", price: "5.00€", description: "Irish coffee", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const lapiStarters = [
    { name: "CESTO DE PÃO 2 UNIDADES", price: "1.50€", description: "BREAD BASKET 2 UNITS", imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "QUEIJO SECO", price: "4.50€", description: "DRY CHEESE", imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "QUEIJO AMANTEIGADO", price: "6.50€", description: "BUTTERY CHEESE", imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "AZEITONAS", price: "3.50€", description: "OLIVES", imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CREPES LA PICANHA", price: "5.00€", description: "SPRINGROLES", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "MANTEIGA", price: "1.00€", description: "BUTTER", imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PRESUNTO", price: "10.00€", description: "HAM", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PICA PAU", price: "4.50€", description: "WOODPECKER COOKED PICANHA WITH SAUCE", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const lapiMains = [
    { name: "HAMBURGER NO PRATO", price: "14.90€", description: "ARROZ, BATATA FRITA E FEIJÃO", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "HAMBURGUER VEGANO", price: "15.90€", description: "ARROZ E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1525059696034-4967a729002e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "HAMBURGER LA PICANHA", price: "15.90€", description: "HAMBURGUER NO PÃO, CEBOLA FRITA, BACON, QUEIJO CHEDDAR E TOMATE, ACOMPANHA BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "ESPETADA DE PICANHA", price: "15.90€", description: "NACOS DE PICANHA GRELHADO, COM CHOURIÇO, ACOMPANHA COM ARROZ E BATATA FRITA", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "FRANGO À LA PICANHA", price: "18.90€", description: "PEITO DE FRANGO RECHEADO COM BACON, CHEDDAR, ACOMPANHA COM MOLHO DE ALHO COM ERVAS, ARROZ, SALADA E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "BIFE DE FRANGO", price: "15.90€", description: "BIFE DE FRANGO GRELHADO ACOMPANHA COM ARROZ E BATATA FRITA", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PICANHA Á DISCRIÇÃO", price: "19.50€", description: "ARROZ, FEIJÃO, BATATAS FRITAS, SALADA E FAROFA", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PREMIUM ENTRECÔTE (350G)", price: "24.90€", description: "ARROZ, FEIJÃO E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PREMIUM PICANHA (350G)", price: "24.90€", description: "BATATAS FRITAS, ARROZ, FEIJÃO", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PICANHA NO PRATO (MENU EXECUTIVO)", price: "15.00€", description: "ARROZ FEIJÃO E BATATAS FRITAS COM DIREITO A UMA BEBIDA E UM CAFÉ", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "FRANGO Á LA PICANHA (MENU INFANTIL)", price: "10.50€", description: "ARROZ E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PICANHA NO PRATO (MENU INFANTIL)", price: "10.50€", description: "ARROZ E BATATAS FRITAS", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const lapiDesserts = [
    { name: "CHEESECAKE OREO", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CHEESECAKE FRUTOS VERMELHOS", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CHEESECAKE CARAMELO SALGADO", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "BOLO BRIGADEIRO", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CHEESECAKE LIMA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "BOLO DE BOLACHA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PETIT GATEAU C/ GELADO", price: "5.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "PUDIM", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "MUSSE DE CHOCOLATE", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1541365087197-90ba01e2ba7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "DOCE DA CASA", price: "4.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "BOLA DE GELADO", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const lapiDrinks = [
    { name: "CAFÉ", price: "1.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "DESCAFEINADO", price: "1.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CHA", price: "1.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "MEIA DE LEITE", price: "2.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "IRISH COFFE", price: "5.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "ÁGUA PURIFICADA", price: "2.70€", description: "", imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "COCA-COLA", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "SAGRES", price: "2.20€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "IMPERIAL HEINEKEN", price: "2.50€", description: "", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "DONA ERMELINDA", price: "12.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "HERDADE DOS GROUS", price: "20.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "ASSOBIO", price: "10.00€", description: "VINHO TINTO", imageUrl: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "SANGRIA BRANCA 1L", price: "14.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "SANGRIA TINTA 1L", price: "14.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "SANGRIA ESPUMANTE 1L", price: "17.90€", description: "", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "CAIPIRINHA", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "MOJITO", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "APÉROL SPRITZ", price: "6.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { name: "MARGUERITA", price: "8.00€", description: "", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
  ];

  const buildItems = (
    items: { name: string; price: string; description: string; imageUrl: string }[],
    restaurantId: string,
    category: string
  ) =>
    items.map((item) => ({
      id: randomUUID(),
      restaurantId,
      name: item.name,
      description: item.description || null,
      price: item.price,
      category,
      imageUrl: item.imageUrl || null,
    }));

  const allMenuItems = [
    ...buildItems(casaStarters, casaDaPeixeId, "starters"),
    ...buildItems(casaMains, casaDaPeixeId, "mains"),
    ...buildItems(casaDesserts, casaDaPeixeId, "desserts"),
    ...buildItems(casaDrinks, casaDaPeixeId, "drinks"),
    ...buildItems(lapiStarters, lapicanhaId, "starters"),
    ...buildItems(lapiMains, lapicanhaId, "mains"),
    ...buildItems(lapiDesserts, lapicanhaId, "desserts"),
    ...buildItems(lapiDrinks, lapicanhaId, "drinks"),
  ];

  await db.insert(menuItems).values(allMenuItems);

  console.log(`Database seeded: 2 restaurants, ${allMenuItems.length} menu items.`);
}
