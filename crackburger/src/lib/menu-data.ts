import burgerImg from "@/assets/item-burger.jpg";
import comboImg from "@/assets/item-combo.jpg";
import sidesImg from "@/assets/item-sides.jpg";
import dipsImg from "@/assets/item-dips.jpg";
import shakesImg from "@/assets/item-shakes.jpg";
import dessertsImg from "@/assets/item-desserts.jpg";
import drinksImg from "@/assets/item-drinks.jpg";
import shirtImg from "@/assets/swag-shirt.jpg";
import hatImg from "@/assets/swag-hat.jpg";

/**
 * CONTENT SOURCE OF TRUTH: crackburger.ca
 * Item names/prices below mirror the live ordering list for this demo.
 * Verify against the live POS/menu before production handoff.
 */

export type Tier = "single" | "double";

export type Burger = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  prices: Record<Tier, number>;
  tags?: string[];
};

export type SimpleItem = {
  id: string;
  name: string;
  blurb: string;
  price: number;
};

export type Combo = {
  id: string;
  name: string;
  blurb: string;
  includes: string[];
  price: number;
  saves: number;
  image: string;
};

export const burgers: Burger[] = [
  {
    id: "the-crack",
    name: "The Crack",
    blurb:
      "Our namesake smash: seared-thin beef, American cheese, pickles, diced onion and crack sauce on a toasted brioche bun.",
    image: burgerImg,
    prices: { single: 9.99, double: 13.49 },
    tags: ["Most ordered"],
  },
  {
    id: "bacon-smash",
    name: "Bacon Smash",
    blurb:
      "Double-cured crispy bacon, melted cheddar, smoked aioli and caramelized onion over a lacy-edged smash patty.",
    image: burgerImg,
    prices: { single: 11.49, double: 14.99 },
  },
  {
    id: "spicy-crack",
    name: "Spicy Crack",
    blurb:
      "Jalapeño relish, chipotle crack sauce, pepper jack and crispy onion. Heat that builds instead of shouting.",
    image: burgerImg,
    prices: { single: 10.99, double: 14.49 },
    tags: ["Hot"],
  },
  {
    id: "mushroom-swiss",
    name: "Mushroom Swiss",
    blurb:
      "Butter-seared cremini mushrooms, nutty Swiss and garlic aioli. The grown-up order.",
    image: burgerImg,
    prices: { single: 11.29, double: 14.79 },
  },
  {
    id: "classic-cheese",
    name: "Classic Cheeseburger",
    blurb:
      "No detours. Beef, cheese, ketchup, mustard, pickle. Exactly what a backyard grill smells like.",
    image: burgerImg,
    prices: { single: 8.99, double: 12.49 },
  },
];

export const combos: Combo[] = [
  {
    id: "combo-crack",
    name: "The Crack Combo",
    blurb: "Our namesake smash, fries and a drink.",
    includes: ["The Crack (single)", "Regular fries", "Fountain drink"],
    price: 16.49,
    saves: 2.5,
    image: comboImg,
  },
  {
    id: "combo-bacon",
    name: "Bacon Smash Combo",
    blurb: "Bacon Smash, fries and a drink.",
    includes: ["Bacon Smash (single)", "Regular fries", "Fountain drink"],
    price: 17.99,
    saves: 2.5,
    image: comboImg,
  },
  {
    id: "combo-double-up",
    name: "Double Up Combo",
    blurb: "Any double smash, fries and a shake.",
    includes: ["Any double burger", "Regular fries", "Hand-spun shake"],
    price: 23.49,
    saves: 3.5,
    image: comboImg,
  },
];

export const sides: SimpleItem[] = [
  { id: "fries", name: "Crack Fries", blurb: "Seasoned, double-fried.", price: 4.99 },
  { id: "loaded-fries", name: "Loaded Fries", blurb: "Cheese sauce, bacon, scallion.", price: 8.49 },
  { id: "onion-rings", name: "Onion Rings", blurb: "Beer-battered.", price: 5.99 },
  { id: "chicken-tenders", name: "Chicken Tenders", blurb: "Three piece, hand-breaded.", price: 7.99 },
];

export const dips: SimpleItem[] = [
  { id: "dip-crack", name: "Crack Sauce", blurb: "The house dip.", price: 1.0 },
  { id: "dip-garlic", name: "Garlic Aioli", blurb: "", price: 1.0 },
  { id: "dip-chipotle", name: "Chipotle Mayo", blurb: "", price: 1.0 },
  { id: "dip-bbq", name: "Smoky BBQ", blurb: "", price: 1.0 },
];

export const desserts: SimpleItem[] = [
  { id: "brownie", name: "Fudge Brownie", blurb: "Warm, with vanilla ice cream.", price: 6.49 },
  { id: "cookie", name: "Skillet Cookie", blurb: "Brown butter chocolate chunk.", price: 5.49 },
];

export const shakes: SimpleItem[] = [
  { id: "shake-vanilla", name: "Vanilla Shake", blurb: "Hand-spun thick.", price: 6.99 },
  { id: "shake-chocolate", name: "Chocolate Shake", blurb: "", price: 6.99 },
  { id: "shake-oreo", name: "Cookies & Cream Shake", blurb: "", price: 7.49 },
];

export const drinks: SimpleItem[] = [
  { id: "pop", name: "Canned Pop", blurb: "Coke, Diet Coke, Sprite, Ginger Ale.", price: 2.49 },
  { id: "water", name: "Bottled Water", blurb: "", price: 2.0 },
  { id: "sparkling", name: "Sparkling Water", blurb: "", price: 2.99 },
];

export const swag: SimpleItem[] = [
  { id: "shirt", name: "Crack Burger Shirt", blurb: "Black cotton tee, badge print.", price: 30 },
  { id: "hat", name: "Crack Burger Hat", blurb: "Black snapback, embroidered badge.", price: 25 },
];

export const swagImages: Record<string, string> = {
  shirt: shirtImg,
  hat: hatImg,
};

export const giftCardAmounts = [25, 50, 75, 100] as const;

export const categoryImages = {
  burgers: burgerImg,
  combos: comboImg,
  sides: sidesImg,
  dips: dipsImg,
  desserts: dessertsImg,
  shakes: shakesImg,
  drinks: drinksImg,
};

export const menuSections = [
  { id: "smash-burgers", label: "Smash Burgers" },
  { id: "combos", label: "Combos" },
  { id: "sides", label: "Sides" },
  { id: "dips", label: "Dips" },
  { id: "desserts", label: "Desserts" },
  { id: "shakes", label: "Shakes" },
  { id: "drinks", label: "Drinks" },
  { id: "swag", label: "Swag" },
];

export const BACKSTORY_OPENING =
  "It all began on one of those rare summer afternoons\u2026";

/**
 * The full backstory narrative from crackburger.ca must be pasted here
 * word-for-word before launch. Presentation changes; copy does not.
 */
export const BACKSTORY_PARAGRAPHS: string[] = [
  "It all began on one of those rare summer afternoons\u2014the kind where the air smells like charcoal and cut grass, and nobody has anywhere better to be. A backyard, a flat-top, a stack of paper-thin patties, and a group of friends who could not stop eating.",
  "The first smash hit the steel and crackled. Edges went lacy and dark, cheese folded over the top, and the buns toasted in the drippings. Somebody said it should be illegal. Somebody else said it was addictive. The name stuck before the plates were cleared.",
  "That is still the whole idea. No shortcuts, no fuss\u2014just fresh beef pressed hard onto a hot flat-top, house sauce, and a bun built to hold it all together. Smashingly addictive, every single time.",
];
