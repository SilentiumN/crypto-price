/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "440": "440px",
        "456": "456px"
      },
      maxHeight: {
        '50': '200px'
      },
      width: {
        "custom-2": "calc((100% - 16px) / 2)",
        "custom-3": "calc((100% - 32px) / 3)",
        "custom-4": "calc((100% - 48px) / 4)",
        "custom-graph-sm":"20px",
        "custom-graph-md":"34px"
        
      },
      margin: {
        "4.5": "1.125rem"
      },
      borderWidth: {
        "3": "3px"
      }
      
    },
  },
  plugins: [require('tailwindcss-font-inter')],
}
