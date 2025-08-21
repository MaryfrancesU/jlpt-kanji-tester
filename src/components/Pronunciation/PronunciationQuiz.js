"use client";
import { getKanjiInfo } from "@/api/kanji";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import { getStartAndEndIndex } from "@/helpers/setHelpers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuizInterface from "./PronunciationQuizInterface";

const PronunciationQuiz = () => {
     const { levelKanji, quizLength } = useKanjiContext();
        const params = useParams();
        const { set } = params;
    
        const setNumber = Number(set.replace("set", ""));
        const {start, end} = getStartAndEndIndex(setNumber, quizLength);
        const setKanji = levelKanji.slice(start, end);
    
        const [allKanjiWithInfo, setAllKanjiWithInfo] = useState([]);
        
        useEffect(() => {
            const fetchInfo = async () => {
                const results = await Promise.all(
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
                setAllKanjiWithInfo(results);
            };
            fetchInfo();
        }, [setKanji]);

    return (
        <>
            <div>This is the pronunciation quiz.</div>
            <QuizInterface allKanjiWithInfo={allKanjiWithInfo} />
        </>
    );
}

export default PronunciationQuiz;