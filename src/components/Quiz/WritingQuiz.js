import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import QuizInterface from "./QuizInterface";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Meaning = styled(Typography)(({ theme }) => ({
    height: 50,
    width: "100%%",
    overflowY: "overlay",
    textOverflow: "ellipsis",

    [theme.breakpoints.down("sm")]: {
        height: 100,
    },
}));

const HintBox = styled(Box)(({ theme }) => ({
    height: 50,
    width: "75%",
    overflowY: "overlay",
    textOverflow: "ellipsis",

    [theme.breakpoints.down("sm")]: {
        height: 70,
        width: "100%",
    },
}));

const WritingQuizInterface = ({ allKanjiWithInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setShowHint(false);
        setShowAnswer(false);
    };

    if (!allKanjiWithInfo.length) {
        return <CircularProgress />;
    }

    if (currentIndex >= allKanjiWithInfo.length) {
        return <QuizInterface> Quiz complete! Well done! </QuizInterface>;
    }

    const currentKanji = allKanjiWithInfo[currentIndex];
    const hintList =
        currentKanji.kunyomi.length > 0
            ? currentKanji.kunyomi
            : currentKanji.onyomi;

    return (
        <QuizInterface
            showProgress
            currentIndex={currentIndex}
            numQuestions={allKanjiWithInfo.length}
        >
            <Stack spacing={2} alignItems="center">
                <Meaning variant="h3">
                    {currentKanji.meanings.join(", ")}
                </Meaning>

                <HintBox>
                    {!showHint && (
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontWeight: 600, boxShadow: 2 }}
                            onClick={() => setShowHint(true)}
                        >
                            Show Pronunciation Hint
                        </Button>
                    )}

                    {showHint && (
                        <>
                            <strong>Pronunciation:</strong>{" "}
                            {hintList.length
                                ? hintList.join(", ")
                                : "No readings available"}
                        </>
                    )}
                </HintBox>

                <Box>
                    {!showAnswer && (
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ fontWeight: 600, boxShadow: 2, mt: "70px"}}
                            onClick={() => setShowAnswer(true)}
                        >
                            Show Answer
                        </Button>
                    )}

                    {showAnswer && (
                        <>
                            <Typography variant="h2" component="div">
                                {currentKanji.kanji}
                            </Typography>

                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{ fontWeight: 600, boxShadow: 1 }}
                                onClick={handleNext}
                            >
                                {currentIndex < allKanjiWithInfo.length - 1
                                    ? "Next"
                                    : "Finish"}
                            </Button>
                        </>
                    )}
                </Box>
            </Stack>
        </QuizInterface>
    );
};

export default WritingQuizInterface;
