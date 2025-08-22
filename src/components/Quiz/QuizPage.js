"use client";
import { getKanjiForSet } from "@/helpers/setHelpers";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import { getStartAndEndIndex } from "@/helpers/setHelpers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import WritingQuiz from "./WritingQuiz";
import PronunciationQuiz from "./PronunciationQuiz";


const QuizPage = ({ mode }) => {
    const { levelKanji, quizLength } = useKanjiContext();
    const params = useParams();
    const { set } = params;

    const setNumber = Number(set.replace("set", ""));
    const { start, end } = getStartAndEndIndex(setNumber, quizLength);

    const [allKanjiWithInfo, setAllKanjiWithInfo] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
            const results = await getKanjiForSet(start, end, levelKanji);
            setAllKanjiWithInfo(results);
        };
        fetchInfo();
    }, [start, end, levelKanji]);

    if (mode === "pronunciation") {
        return (
            <>
                <Typography> This is the pronunciation quiz. </Typography>
                <Typography>
                    Type in as many pronunciations as you can think of!
                </Typography>

                <PronunciationQuiz allKanjiWithInfo={allKanjiWithInfo} />
            </>
        );
    }

    if (mode === "writing") {
        return <>
            <Typography> This is the writing quiz. </Typography>
            <Typography> Hope you have a pencil and paper ready! </Typography>

            <WritingQuiz allKanjiWithInfo={allKanjiWithInfo} />
        </>;
    }

    return <div>Invalid quiz mode.</div>;
};

export default QuizPage;
