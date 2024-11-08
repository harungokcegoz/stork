import { Name } from "../models/types";

export const mockNames: Name[] = [
  {
    id: "1",
    name: "Sophia",
    origin: "Greek",
    meaning: "Wisdom",
    religion: "Christianity",
    pronunciation: "soh-FEE-ah",
    variants: ["Sofia", "Sophie"],
    gender: "female",
  },
  {
    id: "2",
    name: "Muhammad",
    origin: "Arabic",
    meaning: "Praised One",
    religion: "Islam",
    pronunciation: "moo-HAM-mad",
    variants: ["Mohammed", "Mohammad"],
    gender: "male",
  },
  {
    id: "3",
    name: "Noah",
    origin: "Hebrew",
    meaning: "Rest, Comfort",
    religion: "Judaism",
    pronunciation: "NOH-ah",
    variants: ["Noe", "Noach"],
    gender: "unisex",
  },
  {
    id: "4",
    name: "Emma",
    origin: "Germanic",
    meaning: "Universal",
    pronunciation: "EM-ma",
    variants: ["Em", "Emmy"],
    gender: "female",
  },
  {
    id: "5",
    name: "Liam",
    origin: "Irish",
    meaning: "Strong-willed warrior",
    pronunciation: "LEE-am",
    variants: ["William", "Uilliam"],
    gender: "male",
  },
  // Adding more diverse names...
  {
    id: "6",
    name: "Aisha",
    origin: "Arabic",
    meaning: "Living, Prosperous",
    religion: "Islam",
    pronunciation: "AY-shah",
    variants: ["Ayesha", "Aiesha"],
    gender: "female",
  },
  {
    id: "7",
    name: "Chen",
    origin: "Chinese",
    meaning: "Morning",
    pronunciation: "CHEN",
    variants: ["Chén"],
    gender: "unisex",
  },
];

// Generate more names programmatically
const genders: ("male" | "female" | "unisex")[] = ["male", "female", "unisex"];
const origins = [
  "Greek",
  "Latin",
  "Hebrew",
  "Arabic",
  "Celtic",
  "Germanic",
  "Japanese",
  "Chinese",
];
const religions: (Religion | undefined)[] = ["Christianity", "Islam", "Judaism", "Buddhism", undefined];

const additionalNames: Name[] = Array.from({ length: 43 }, (_, i) => ({
  id: String(i + 8),
  name: `Name${i + 8}`,
  origin: origins[Math.floor(Math.random() * origins.length)],
  meaning: `Meaning for Name${i + 8}`,
  religion: religions[Math.floor(Math.random() * religions.length)],
  pronunciation: `Pronunciation${i + 8}`,
  variants: [`Variant1-${i + 8}`, `Variant2-${i + 8}`],
  gender: genders[Math.floor(Math.random() * genders.length)],
}));

export const allMockNames: Name[] = [...mockNames, ...additionalNames];
