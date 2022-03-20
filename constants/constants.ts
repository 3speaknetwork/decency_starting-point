export const STEPS = [
  {
    title: "Community",
    desc: "Create a Hive community (if you don't already have one)",
  },
  {
    title: "Logos",
    desc: "Upload an ICO (icon/ image/ logo)  file for the community metadata tags",
  },
  {
    title: "Colours",
    desc: "Selected a preferred colour scheme",
  },
  {
    title: "Community Details",
    desc: "Enter basic info and details about the community you created (or already had)",
  },
  {
    title: "Enjoy!",
    desc: "Run our docker image from your server and point it to your URL and you have your own social media site!",
  },
];

export enum ColorSchemes {
  SkyBlue = "sky_blue",
  DuskYellow = "dusk_yellow",
  BurningRed = "burning_red",
}

export const shcemes = {
  [ColorSchemes.SkyBlue]: {
    primary: "#1C658C",
    secondary: "#398AB9",
    accents: "#D8D2CB",
  },
  [ColorSchemes.DuskYellow]: {
    primary: "#FFF89A",
    secondary: "#FFC900",
    accents: "#086E7D",
  },
  [ColorSchemes.BurningRed]: {
    primary: "#F90716",
    secondary: "#FF5403",
    accents: "#FFCA03",
  },
};

export const placeholder =
  "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

export const SERVERS = [
  "https://rpc.ecency.com",
  "https://api.hive.blog",
  "https://api.deathwing.me",
  "https://rpc.ausbit.dev",
  "https://hived.emre.sh",
];
