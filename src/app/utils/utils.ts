import rosemary from "../../../public/rosemary.jpg";
import { Product } from "../types/types";

export const initialProducts: Array<Product> = [
    {
        id: 1,
        name: "Rosemary & Mint",
        description: "Stimulate hair growth and encourage blood circulation while increasing the shine of the hair and making it stronger and longer using pure rosemary essential oil.",
        dailyUse: "Start by shaking the bottle well to ensure the ingredients are mixed. Part your hair and apply a small amount of oil and gently massage your scalp using your fingertips. Once you put the oil, cover your head. Leave the oil for at least 20 minutes or overnight at most and then wash it with shampoo.",
        ingredients: [
            "Rosemary Leaf Oil",
            "Mentha Piperita (Peppermint) Oil",
            "Clove Oil"
        ],
        price: 29.99,
        images: [rosemary]
    }
];


export function createSlugFromName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}