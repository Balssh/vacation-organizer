import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="grid grid-cols-12 px-5 my-5">
            {/* Header */}
            <div className="col-span-8 col-start-3 border border-zinc-900">
                <Component {...pageProps} />
            </div>
            {/* Main thing */}
        </div>
    );
}
