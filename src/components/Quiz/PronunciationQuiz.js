import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import QuizInterface from "./QuizInterface";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const InputsBox = styled(Box)(({ theme }) => ({
    height: 200,
    width: "100%",

    [theme.breakpoints.down("sm")]: {
        height: 250,
    },
}));

const InputSection = styled(Box)({
    marginBottom: "16px",

    "& input": {
        marginLeft: 8,
        padding: 4,
    },
});

const AnswerDiv = styled(Box)({
    marginTop: 8,
});

const AnswerSpan = styled("span", {
    shouldForwardProp: (prop) => prop !== "correct",
})(({ correct }) => ({
    color: correct ? "green" : undefined,
    marginRight: 6,
}));

const PronunciationQuiz = ({ allKanjiWithInfo }) => {
    const onInputRef = React.useRef(null);
    const kunInputRef = React.useRef(null);
    const [onInput, setOnInput] = useState("");
    const [kunInput, setKunInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setKunInput("");
        setOnInput("");
        setShowAnswers(false);
    };

    const currentKanji = allKanjiWithInfo[currentIndex];
    const kunyomi = currentKanji?.kunyomi || [];
    const onyomi = currentKanji?.onyomi || [];

    useEffect(() => {
        if (kunyomi.length > 0) {
            if (kunInputRef.current) kunInputRef.current.focus();
        } else {
            if (onInputRef.current) onInputRef.current.focus();
        }
    }, [currentIndex, kunyomi.length]);

     if (!allKanjiWithInfo.length) {
        return <CircularProgress />;
    }

    if (currentIndex >= allKanjiWithInfo.length) {
        return <QuizInterface showBackButton> Quiz complete! Well done! </QuizInterface>;
    }

    const normalizeKun = (str) =>
        str.trim().replace(/\s+/g, "").replace(/\./g, "");

    //if user types in hiragana for onyomi, still treat it as correct
    const kataToHira = (str) =>
        str.replace(/[\u30a1-\u30f6]/g, (ch) =>
            String.fromCharCode(ch.charCodeAt(0) - 0x60)
        );
    const normalizeOn = (str) => kataToHira(str.trim().replace(/\s+/g, ""));

    const kunUserAnswers = kunInput
        .split(",")
        .map(normalizeKun)
        .filter(Boolean);
    const onUserAnswers = onInput.split(",").map(normalizeOn).filter(Boolean);

    const isCorrectKun = (userArr, answerArr) =>
        answerArr.map((ans) => userArr.includes(normalizeKun(ans)));
    const isCorrectOn = (userArr, answerArr) =>
        answerArr.map((ans) => userArr.includes(normalizeOn(ans)));

    const kunCorrect = isCorrectKun(kunUserAnswers, kunyomi);
    const onCorrect = isCorrectOn(onUserAnswers, onyomi);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAnswers(true);
    };


    return (
        <QuizInterface
            showProgress
            currentIndex={currentIndex}
            numQuestions={allKanjiWithInfo.length}
        >
            <form onSubmit={handleSubmit}>
                <Typography variant="h2" component="div">
                    {currentKanji.kanji}
                </Typography>

                <InputsBox>
                    {kunyomi.length > 0 && (
                        <InputSection>
                            <Typography fontWeight={700} component="span">
                                Kunyomi:
                            </Typography>
                            <input
                                ref={kunInputRef}
                                type="text"
                                value={kunInput}
                                onChange={(e) => setKunInput(e.target.value)}
                                disabled={showAnswers}
                                placeholder="Enter kunyomi, comma separated"
                            />
                            {showAnswers && (
                                <AnswerDiv>
                                    {kunyomi.map((k, i) => (
                                        <AnswerSpan
                                            key={k}
                                            correct={kunCorrect[i]}
                                        >
                                            {k}
                                            {i < kunyomi.length - 1 ? "," : ""}
                                        </AnswerSpan>
                                    ))}
                                </AnswerDiv>
                            )}
                        </InputSection>
                    )}

                    {onyomi.length > 0 && (
                        <InputSection>
                            <Typography fontWeight={700} component="span">
                                Onyomi:
                            </Typography>
                            <input
                                ref={onInputRef}
                                type="text"
                                value={onInput}
                                onChange={(e) => setOnInput(e.target.value)}
                                disabled={showAnswers}
                                placeholder="Enter onyomi, comma separated"
                            />
                            {showAnswers && (
                                <AnswerDiv>
                                    {onyomi.map((o, i) => (
                                        <AnswerSpan
                                            key={o}
                                            correct={onCorrect[i]}
                                        >
                                            {o}
                                            {i < onyomi.length - 1 ? "," : ""}
                                        </AnswerSpan>
                                    ))}
                                </AnswerDiv>
                            )}
                        </InputSection>
                    )}
                </InputsBox>

                {!showAnswers && (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 600, boxShadow: 2, mt: 2 }}
                    >
                        Submit
                    </Button>
                )}
                {showAnswers && (
                    <Button
                        onClick={handleNext}
                        variant="outlined"
                        color="secondary"
                        sx={{ fontWeight: 600, boxShadow: 1, mt: 2 }}
                    >
                        {currentIndex < allKanjiWithInfo.length - 1
                            ? "Next"
                            : "Finish"}
                    </Button>
                )}
            </form>
        </QuizInterface>
    );
};

export default PronunciationQuiz;
