import { getKanjiInfo } from "@/api/kanji";

function getStartIndex(setNumber, quizLength) {
    return quizLength * setNumber - quizLength;
}

function getEndIndex(setNumber, quizLength) {
    return quizLength * setNumber;
}

export function getStartAndEndIndex(setNumber, quizLength) {
    return {
        start: getStartIndex(setNumber, quizLength),
        end: getEndIndex(setNumber, quizLength),
    };
}

export async function getKanjiForSet(startIndex, endIndex, levelKanji) {
    const setKanji = levelKanji.slice(startIndex, endIndex);

    const setKanjiWithInfo = await Promise.all(
        setKanji.map(async (kanji) => {
            const info = await getKanjiInfo(kanji);
            return {
                kanji,
                meanings: info.meanings || [],
                kunyomi: info.kun_readings || [],
                onyomi: info.on_readings || [],
            };
        })
    );
    return setKanjiWithInfo;
}
