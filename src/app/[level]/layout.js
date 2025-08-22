/*
    This layout.js file wraps all pages and routes under the [level] directory. That is:
        - app/[level]/[mode]/page.js
        - app/[level]/[mode]/[set]/page.js
    That is, the LevelKanjiProvider context is available to the Sets and Quiz components.
*/

import { LevelKanjiProvider } from "@/context/LevelKanjiContext";
import { getKanjiByLevel } from "@/api/kanji";

export default async function LevelLayout({ children, params }) {
    let kanjiForLevel = null;
    const resolvedParams = await params;
    const level = resolvedParams.level.replace(/^n/i, "");

    if (level) {
        kanjiForLevel = await getKanjiByLevel(level);
    }

    return (
        <div id="level-layout" style={{ padding: "16px" }}>
            <LevelKanjiProvider levelKanji={kanjiForLevel}>{children}</LevelKanjiProvider>
        </div>
    );
}
