import { ItemRarity } from "./types";

export interface ItemRarityInterface {
    Common: {
        name: ItemRarity;
        maxFindRate: number;
    },
    Uncommon: {
        name: ItemRarity;
        maxFindRate: number;
    },
    Rare: {
        name: ItemRarity;
        maxFindRate: number;
    },
    VeryRare: {
        name: ItemRarity;
        maxFindRate: number;
    },
    Legendary: {
        name: ItemRarity;
        maxFindRate: number;
    }
};