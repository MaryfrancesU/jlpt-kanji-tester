"use client";
import { getKanjiForSet } from "@/helpers/setHelpers";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import { getStartAndEndIndex } from "@/helpers/setHelpers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import QuizInterface from "./WritingQuizInterface";

const WritingQuiz = () => {
    const { levelKanji, quizLength } = useKanjiContext();
    const params = useParams();
    const { set } = params;

    const setNumber = Number(set.replace("set", ""));
    const {start, end} = getStartAndEndIndex(setNumber, quizLength);

    const [allKanjiWithInfo, setAllKanjiWithInfo] = useState([]);
    
    useEffect(() => {
        const fetchInfo = async () => {
            const results = await getKanjiForSet(start, end, levelKanji);
            setAllKanjiWithInfo(results);
        };
        fetchInfo();
    }, [start, end, levelKanji]);

    return (
        <>
            This is the writing quiz.

            <QuizInterface allKanjiWithInfo={allKanjiWithInfo} />
        </>
    );
};

export default WritingQuiz;
