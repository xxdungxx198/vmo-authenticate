module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // Text size
    fontSize: {
      // Pixel
      "5px": "5px",
      "10px": "10px",
      "12px": "12px",
      "15px": "15px",
      "18px": "18px",
      "20px": "20px",
      "25px": "25px",
      "30px": "30px",
      "35px": "35px",
      "40px": "40px",
      "45px": "45px",
      "50px": "50px",
      "55px": "55px",
      "60px": "60px",
      // Rem
      xs: ".75rem",
      sm: ".875rem",
      md: ".875rem",
      lg: "1rem",
      xl: "1.125rem",
      "1xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    // Responsive
    screens: {
      xxs: "320px",
      xs: "375px",
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    // Text color
    textColor: {
      discord: "#99aab5",
      forgot: "#00AFF4",
      google: "#ea4335",
      github: "#211F1F",
    },

    // Font family
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },

    // Background color
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#3490dc",
      secondary: "#ffed4a",
      danger: "#e3342f",
      discord: "#2c2f33",
      input: "#23272a",
      button: "#5865F2",
      buttonHover: "#1021d5",
      facebook: "#5890FF",
      light: "#ebedef",
    }),
    extend: {
      backgroundImage: (theme) => ({
        discord_img: "url('https://i.redd.it/y1ostvqnr4711.jpg')",
        discord_img2: "url('https://i.imgur.com/icxRhjX.jpg')",
      }),
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["active"]),
    textColor: ({ after }) => after(["active", "hover"]),
  },
  variantOrder: [
    "first",
    "last",
    "odd",
    "even",
    "visited",
    "checked",
    "group-hover",
    "group-focus",
    "focus-within",
    "hover",
    "focus",
    "focus-visible",
    "active",
    "disabled",
  ],
  plugins: [],
};
