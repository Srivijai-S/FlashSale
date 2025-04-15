import { nanoid } from "nanoid";
import { FiTruck } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import { SiMoneygram } from "react-icons/si";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
  FaDribbble,
} from "react-icons/fa";

import { BsFillGridFill, BsGrid3X3GapFill, BsListUl } from "react-icons/bs";

export const singleProductSocials = [
  { id: nanoid(), Icon: FaFacebookF, url: "www/facebook.com" },
  { id: nanoid(), Icon: FaDribbble, url: "www/facebook.com" },
  { id: nanoid(), Icon: FaPinterestP, url: "www/facebook.com" },
  { id: nanoid(), Icon: FaTwitter, url: "www/facebook.com" },
  { id: nanoid(), Icon: FaLinkedinIn, url: "www/facebook.com" },
];

export const viewToggleButtons = [
  { id: nanoid(), Icon: BsGrid3X3GapFill, view: "GRID" },
  { id: nanoid(), Icon: BsFillGridFill, view: "GRID2" },
  { id: nanoid(), Icon: BsListUl, view: "LIST" },
];
export const homeService = [
  {
    id: nanoid(),
    Icon: FiTruck,
    heading: "Free Shipping",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: SiMoneygram,
    heading: "Support 24/7",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: RiMoneyDollarCircleLine,
    heading: "Money Return",
    description: "Free Shipping on all Order",
  },
  {
    id: nanoid(),
    Icon: TbDiscount2,
    heading: "Order Discount",
    description: "Free Shipping on all Order",
  },
];

export const pages = [
  { text: "About", url: "/about" },
  { text: "Products", url: "/Products" },
  { text: "Home", url: "/" },
  { text: "Cart", url: "/cart" },
  { text: "Register", url: "/register" },
  { text: "Login", url: "/login" },
  { text: "Profile", url: "/profile" },
  { text: "Checkout", url: "/checkout" },
];
