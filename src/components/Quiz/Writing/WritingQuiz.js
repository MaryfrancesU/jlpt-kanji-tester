"use client";
import { getKanjiForSet } from "@/helpers/setHelpers";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import { getStartAndEndIndex } from "@/helpers/setHelpers";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import WritingQuizInterfact from "./WritingQuizInterface";
import Typography from "@mui/material/Typography";

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
            <Typography> This is the writing quiz. </Typography>
            <Typography> Hope you have a pencil and paper ready! </Typography>

            <WritingQuizInterfact allKanjiWithInfo={allKanjiWithInfo} />
        </>
    );
};

export default WritingQuiz;
