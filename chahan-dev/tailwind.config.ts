import type { Config } from 'tailwindcss'
// import colors from "tailwindcss/colors";

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        '1st': '#3d8d7a',
        '2nd': '#b3d8a8',
        '3rd': '#fbffe4',
        '4th': '#a3d1c6',
        '5th': '#e8f9ff',
        '6th': '#c4d9ff',
        '7th': '#a1e3f9',
        '8th': '#d1f8ef',
      },
    },
  },
  plugins: [],
}
