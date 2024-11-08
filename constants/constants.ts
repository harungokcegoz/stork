import boyBg from "../assets/images/card-bg/boy.png";
import girlBg from "../assets/images/card-bg/girl.png";
import unisexBg from "../assets/images/card-bg/unisex.png";
export const BACKGROUND_IMAGES = {
  male: boyBg,
  female: girlBg,
  unisex: unisexBg,
} as const;

export const BACKGROUND_COLORS = {
  male: "#bde0fe",
  female: "#ffc8dd",
  unisex: "$gray3",
} as const;
