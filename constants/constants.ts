export const STEPS = [
  {
    title: "Community",
    desc: "Create a Hive community",
  },
  {
    title: "Logos",
    desc: "Upload an ICO file for your logo",
  },
  {
    title: "Colors",
    desc: "Selected a preferred colour scheme",
  },
  {
    title: "Details",
    desc: "Enter basic details about the community",
  },
  {
    title: "Enjoy!",
    desc: "We'll take the rest from there!",
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

export const VIDEO_RESOURCES = [
  {
    reason: "Server purchase",
    link: "https://www.privex.io/",
    videoStamp: "00:20",
  },
  {
    reason: "SSH access to server",
    link: "https://phoenixnap.com/kb/linux-ssh-commands",
    videoStamp: "00:56",
  },
  {
    reason: "GIT install",
    link: "sudo apt-get install git",
    videoStamp: "01:00",
  },
  {
    reason: "DOCKER install",
    link: "sudo apt-get install docker",
    videoStamp: "01:00",
  },
  {
    reason: "DOCKER-COMPOSE install",
    link: "https://docs.docker.com/compose/install/",
    videoStamp: "01:00",
  },
];