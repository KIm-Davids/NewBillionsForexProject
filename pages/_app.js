import "../styles/globals.css";
import { ThemeProvider } from "../src/components/theme-provider"; // adjust path if needed
import { UserProvider } from "../context/UserContext"; // add this import

export default function App({ Component, pageProps }) {
    return (
        <UserProvider> {/* Wrap everything with UserProvider */}
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </UserProvider>
    );
}
