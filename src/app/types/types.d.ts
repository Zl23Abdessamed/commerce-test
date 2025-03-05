import { StaticImageData } from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  dailyUse: string;
  ingredients: string[];
  price: number;
  images: string[] | StaticImageData[];
};

interface CartItem extends Product {
  quantity: number;
}