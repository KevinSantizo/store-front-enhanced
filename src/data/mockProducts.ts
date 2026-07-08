export type ProductPresentation = {
  id: number;
  name: string;
  unitQuantity: number;
  price: number;
};

export type Product = {
  id: number;
  internalCode: string;
  barcode?: string;
  name: string;
  category: string;
  stock: number;
  baseUnit: string;
  presentations: ProductPresentation[];
};

export const mockProducts: Product[] = [
  {
    id: 1,
    internalCode: "COC-3L",
    barcode: "740100000001",
    name: "Coca-Cola 3 Litros",
    category: "Bebidas",
    stock: 120,
    baseUnit: "UNIT",
    presentations: [
      { id: 1, name: "Unidad", unitQuantity: 1, price: 18 },
      { id: 2, name: "Caja", unitQuantity: 6, price: 95 },
    ],
  },
  {
    id: 2,
    internalCode: "HUE-001",
    name: "Huevos",
    category: "Abarrotes",
    stock: 1080,
    baseUnit: "UNIT",
    presentations: [
      { id: 3, name: "Unidad", unitQuantity: 1, price: 1 },
      { id: 4, name: "Cartón", unitQuantity: 30, price: 30 },
      { id: 5, name: "Caja", unitQuantity: 360, price: 300 },
    ],
  },
  {
    id: 3,
    internalCode: "TOM-LB",
    name: "Tomate",
    category: "Frutas y Verduras",
    stock: 50.5,
    baseUnit: "LB",
    presentations: [{ id: 6, name: "Libra", unitQuantity: 1, price: 6 }],
  },
  {
    id: 4,
    internalCode: "ARR-1LB",
    barcode: "740100000002",
    name: "Arroz 1 lb",
    category: "Abarrotes",
    stock: 200,
    baseUnit: "UNIT",
    presentations: [{ id: 7, name: "Unidad", unitQuantity: 1, price: 5 }],
  },
];