"use client"

import "../styles/globals.css"
import { ThemeProvider } from "../src/components/theme-provider" // adjust the path if needed

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </head>
    <body>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
