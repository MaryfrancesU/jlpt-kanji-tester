import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
const Container = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(4),
    maxWidth: 400,
    minHeight: 340,
    margin: '32px auto',
    textAlign: 'center',
    boxShadow: theme.shadows[6],
    background: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

const Meaning = styled('div')({
    fontWeight: "bold",
    fontSize: "1.2em",
    marginBottom: "16px"
});

const StyledButton = styled('button')({
    marginBottom: "16px"
});

const PronunciationDiv = styled('div')({
    marginBottom: "16px"
});

const KanjiDiv = styled('div')({
    marginBottom: "16px",
    fontSize: "2em"
});

const Progress = styled('div')({
    marginTop: "16px",
    fontSize: "0.9em",
    color: "#888"
});

const QuizInterface = ({ allKanjiWithInfo }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        setCurrentIdx((prev) => prev + 1);
        setShowHint(false);
        setShowAnswer(false);
    };

    if (!allKanjiWithInfo.length) {
        return <div>Loading quiz...</div>;
    }

    if (currentIdx >= allKanjiWithInfo.length) {
        return <div>Quiz complete! Well done!</div>;
    }

    const currentKanji = allKanjiWithInfo[currentIdx];
    const hintList = currentKanji.kunyomi.length > 0 ? currentKanji.kunyomi : currentKanji.onyomi;

    return (
        <Container>
            <Meaning>
                {currentKanji.meanings.join(", ")}
            </Meaning>
            {!showHint && (
                <Button variant="contained" color="primary" sx={{ mb: 2, fontWeight: 600, boxShadow: 2 }} onClick={() => setShowHint(true)}>
                    Show Pronunciation Hint
                </Button>
            )}
            {showHint && (
                <PronunciationDiv>
                    <div>
                        <strong>Pronunciation:</strong> {hintList.length ? hintList.join(", ") : "No readings available"}
                    </div>
                </PronunciationDiv>
            )}
            {!showAnswer && (
                <Button variant="contained" color="secondary" sx={{ mb: 2, fontWeight: 600, boxShadow: 2 }} onClick={() => setShowAnswer(true)}>
                    Show Answer
                </Button>
            )}
            {showAnswer && (
                <>
                    <KanjiDiv>
                        {currentKanji.kanji}
                    </KanjiDiv>
                    <Button variant="outlined" color="primary" sx={{ fontWeight: 600, boxShadow: 1 }} onClick={handleNext}>
                        {currentIdx < allKanjiWithInfo.length - 1 ? "Next" : "Finish"}
                    </Button>
                </>
            )}
            <Progress>
                {currentIdx + 1} / {allKanjiWithInfo.length}
            </Progress>
        </Container>
    );
};

export default QuizInterface;
