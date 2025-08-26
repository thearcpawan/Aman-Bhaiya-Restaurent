export const translations = {
  en: {
    // Navigation
    nav: {
      title: "Casa Da Peixe & Lapicanha",
      titleMobile: "Casa Da Peixe\n& Lapicanha"
    },
    
    // Hero Section
    hero: {
      title: "Casa Da Peixe & Lapicanha",
      subtitle: "Authentic Portuguese Cuisine, Two Unique Experiences",
      viewMenu: "View Menu"
    },
    
    // Restaurants
    restaurants: {
      "casa-da-peixe": {
        name: "Casa Da Peixe",
        tagline: "Fresh seafood and Portuguese coastal flavors"
      },
      lapicanha: {
        name: "Lapicanha",
        tagline: "Premium grilled meats and traditional flavors"
      }
    },
    
    // Menu Section
    menu: {
      title: {
        "casa-da-peixe": "Fresh Seafood Menu",
        lapicanha: "Premium Meat Menu"
      },
      categories: {
        starters: "Starters",
        mains: "Mains", 
        desserts: "Desserts",
        drinks: "Drinks"
      },
      noItems: "No items added yet"
    },
    
    // Reservations
    reservations: {
      title: {
        "casa-da-peixe": "Make a Reservation",
        lapicanha: "Reserve Your Table"
      },
      preferCall: "Prefer to Call?",
      callDescription: "Call us directly for immediate reservation confirmation",
      call: "Call",
      whatsapp: "WhatsApp",
      availability: {
        "casa-da-peixe": "Available every day • Call or WhatsApp for reservations",
        lapicanha: "Available every day • Call for immediate confirmation"
      },
      restaurantInfo: "Restaurant Information",
      address: "Address:",
      phone: "Phone:",
      whatsappLabel: "WhatsApp:",
      whatsappNumber: "+351 926 091 468",
      callToday: "Call us to make your reservation today!"
    },
    
    // General
    general: {
      language: "Language"
    }
  },
  
  pt: {
    // Navigation
    nav: {
      title: "Casa Da Peixe & Lapicanha",
      titleMobile: "Casa Da Peixe\n& Lapicanha"
    },
    
    // Hero Section
    hero: {
      title: "Casa Da Peixe & Lapicanha",
      subtitle: "Cozinha Portuguesa Autêntica, Duas Experiências Únicas",
      viewMenu: "Ver Ementa"
    },
    
    // Restaurants
    restaurants: {
      "casa-da-peixe": {
        name: "Casa Da Peixe",
        tagline: "Peixe fresco e sabores costeiros portugueses"
      },
      lapicanha: {
        name: "Lapicanha",
        tagline: "Carnes grelhadas premium e sabores tradicionais"
      }
    },
    
    // Menu Section
    menu: {
      title: {
        "casa-da-peixe": "Ementa de Peixe Fresco",
        lapicanha: "Ementa de Carnes Premium"
      },
      categories: {
        starters: "Entradas",
        mains: "Pratos Principais",
        desserts: "Sobremesas", 
        drinks: "Bebidas"
      },
      noItems: "Ainda não foram adicionados pratos"
    },
    
    // Reservations
    reservations: {
      title: {
        "casa-da-peixe": "Fazer Reserva",
        lapicanha: "Reserve a Sua Mesa"
      },
      preferCall: "Prefere Ligar?",
      callDescription: "Ligue-nos diretamente para confirmação imediata da reserva",
      call: "Ligar",
      whatsapp: "WhatsApp",
      availability: {
        "casa-da-peixe": "Disponível todos os dias • Ligue ou WhatsApp para reservas",
        lapicanha: "Disponível todos os dias • Ligue para confirmação imediata"
      },
      restaurantInfo: "Informações do Restaurante",
      address: "Morada:",
      phone: "Telefone:",
      whatsappLabel: "WhatsApp:",
      whatsappNumber: "+351 926 091 468",
      callToday: "Ligue-nos para fazer a sua reserva hoje!"
    },
    
    // General
    general: {
      language: "Idioma"
    }
  }
} as const;

export type Language = keyof typeof translations;