import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        aqiGood: '#00e400',
        aqiModerate: '#ffff00',
        aqiSen: '#ff7e00',
        aqiUnheal: '#ff0000',
        aqiVeryUnheal: '#99004c',
        aqiHazard: '#7e0023',
        humidityWhite: '#FFFFFF',
        humidityLightBlue: '#E6F7FF',
        humidityLightSkyBlue: '#B3E5FC',
        humidityLightBlue2: '#81D4FA',
        humiditySkyBlue: '#4FC3F7',
        humidityDeepSkyBlue: '#29B6F6',
        humidityBlue: '#03A9F4',
        humidityDarkBlue: '#039BE5',
        humidityDarkBlue2: '#0288D1',
        humidityDarkBlue3: '#0277BD',
        humidityNavy: '#000080',
        temperatureVeryCold: '#0000FF',
        temperatureCold: '#00FFFF',
        temperatureModerate: '#00FF00',
        temperatureWarm: '#FFFF00',
        temperatureHot: '#FF0000',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

