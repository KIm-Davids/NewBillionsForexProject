// import "../styles/globals.css";
// import { ThemeProvider } from "../src/components/theme-provider"; // adjust path if needed
// import { UserProvider } from "../src/context/UserContext"; // add this import
//
// export default function App({ Component, pageProps }) {
//     return (
//         <UserProvider> {/* Wrap everything with UserProvider */}
//             <ThemeProvider>
//                 <Component {...pageProps} />
//             </ThemeProvider>
//         </UserProvider>
//     );
// }


// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        // Redirect all routes to /404
        router.replace('/404');
    }, [router]);

    return <Component {...pageProps} />;
}

export default MyApp;
