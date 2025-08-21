/*
    This layout.js file wraps all pages and routes under the app directory, including:
        - app/page.js
        - app/[level]/[mode]/page.js
        - app/[level]/[mode]/[set]/page.js
*/

export const metadata = {
    title: "JLPT KANJI TESTER",
    description: "Practice JLPT kanji quizzes by level.",
    icons: {
        icon: "/favicon.ico",
    },
};

import MuiClientProvider from "../mui-client";
import AppHeader from "../components/AppHeader/AppHeader";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({ children }) {
    return (
        <html lang="en" id="root">
            <head>
                <title>JLPT KANJI TESTER</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="JlptKanjiTester"
                />
                <link rel="stylesheet" href="/fonts.css" />
            </head>
            <body>
                <AppRouterCacheProvider>
                    <MuiClientProvider>
                        <AppHeader />
                        {children}
                    </MuiClientProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
