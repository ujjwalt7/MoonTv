import RootLayout from "@/components/layout";
import "@/styles/globals.css";
import { UserProvider } from '../context/UserContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <RootLayout>
      <Component {...pageProps} />
      </RootLayout>
    </UserProvider>
  );
}
