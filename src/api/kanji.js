//https://kanjiapi.dev/#!/documentation

export async function getKanjiByLevel(level) {
    const url = `https://kanjiapi.dev/v1/kanji/jlpt-${level}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch kanji for JLPT level ${level}`);
    }
    return await response.json();
}

export async function getKanjiInfo(kanji) {
    const response = await fetch(`https://kanjiapi.dev/v1/kanji/${kanji}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch info for ${kanji}`);
    }
    return await response.json();
}

export async function getKanjiKunyomi(kanji) {
    const kanjiInfo = await getKanjiInfo(kanji);
    return kanjiInfo.kun_readings;
}

export async function getKanjiOnyomi(kanji) {
    const kanjiInfo = await getKanjiInfo(kanji);
    return kanjiInfo.on_readings;
}

export async function getKanjiMeaning(kanji) {
    const kanjiInfo = await getKanjiInfo(kanji);
    return kanjiInfo.meanings;
}
