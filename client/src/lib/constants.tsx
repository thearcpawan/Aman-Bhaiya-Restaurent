export const RESTAURANTS = {
  "casa-da-peixe": {
    name: "Casa Da Peixe",
    slug: "casa-da-peixe",
    tagline: "Fresh seafood and Portuguese coastal flavors",
    heroImage: "https://images.unsplash.com/photo-1567521464027-f127ff144326?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
  lapicanha: {
    name: "Lapicanha", 
    slug: "lapicanha",
    tagline: "Premium grilled meats and traditional flavors",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
  },
} as const;

export const MENU_CATEGORIES = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Mains" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
] as const;

export const RESERVATION_TIMES = [
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
];

export const GUEST_OPTIONS = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3", label: "3 people" },
  { value: "4", label: "4 people" },
  { value: "5", label: "5 people" },
  { value: "6", label: "6 people" },
  { value: "7", label: "7+ people" },
];
