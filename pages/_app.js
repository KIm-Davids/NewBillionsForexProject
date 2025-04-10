import "../styles/globals.css"
import { ThemeProvider } from "../src/components/theme-provider" // adjust path if needed

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
