import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledForm = styled('form')(({ theme }) => ({
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

const KanjiDiv = styled('div')({
    fontWeight: "bold",
    fontSize: "2.5em",
    marginBottom: "24px"
});

const SectionDiv = styled('div')({
    marginBottom: "16px"
});

const StyledLabel = styled('label')({
    fontWeight: "bold"
});

const StyledInput = styled('input')({
    marginLeft: 8,
    padding: 4
});

const AnswerDiv = styled('div')({
    marginTop: 8
});

const AnswerSpan = styled('span', {
    shouldForwardProp: (prop) => prop !== 'correct',
})(({ correct }) => ({
    color: correct ? 'green' : undefined,
    marginRight: 6
}));

const StyledButton = styled('button')({
    margin: "16px auto 0 auto"
});

const Progress = styled('div')({
    marginTop: "16px",
    fontSize: "0.9em",
    color: "#888"
});
import React, { useState } from "react";

const PronunciationQuiz = ({ allKanjiWithInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [kunInput, setKunInput] = useState("");
    const [onInput, setOnInput] = useState("");
    const [showAnswers, setShowAnswers] = useState(false);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setKunInput("");
        setOnInput("");
        setShowAnswers(false);
    };

    if (!allKanjiWithInfo.length) {
        return <div>Loading quiz...</div>;
    }

    if (currentIndex >= allKanjiWithInfo.length) {
        return <div>Quiz complete! Well done!</div>;
    }

    const currentKanji = allKanjiWithInfo[currentIndex];
    const kunyomi = currentKanji.kunyomi || [];
    const onyomi = currentKanji.onyomi || [];


    const normalizeKun = (str) => str.trim().replace(/\s+/g, "").replace(/\./g, "");
    // Convert katakana to hiragana for comparison
    const kataToHira = (str) => str.replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
    const normalizeOn = (str) => kataToHira(str.trim().replace(/\s+/g, ""));

    const kunUserAnswers = kunInput.split(",").map(normalizeKun).filter(Boolean);
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
        <StyledForm onSubmit={handleSubmit}>
            <KanjiDiv>
                {currentKanji.kanji}
            </KanjiDiv>
            {kunyomi.length > 0 && (
                <SectionDiv>
                    <StyledLabel>Kunyomi:</StyledLabel>
                    <StyledInput
                        type="text"
                        value={kunInput}
                        onChange={e => setKunInput(e.target.value)}
                        disabled={showAnswers}
                        placeholder="Enter kunyomi, comma separated"
                    />
                    {showAnswers && (
                        <AnswerDiv>
                            {kunyomi.map((k, i) => (
                                <AnswerSpan key={k} correct={kunCorrect[i]}>{k}{i < kunyomi.length - 1 ? ',' : ''}</AnswerSpan>
                            ))}
                        </AnswerDiv>
                    )}
                </SectionDiv>
            )}
            {onyomi.length > 0 && (
                <SectionDiv>
                    <StyledLabel>Onyomi:</StyledLabel>
                    <StyledInput
                        type="text"
                        value={onInput}
                        onChange={e => setOnInput(e.target.value)}
                        disabled={showAnswers}
                        placeholder="Enter onyomi, comma separated"
                    />
                    {showAnswers && (
                        <AnswerDiv>
                            {onyomi.map((o, i) => (
                                <AnswerSpan key={o} correct={onCorrect[i]}>{o}{i < onyomi.length - 1 ? ',' : ''}</AnswerSpan>
                            ))}
                        </AnswerDiv>
                    )}
                </SectionDiv>
            )}
            {!showAnswers && (
                <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 600, boxShadow: 2, mt: 2 }}>
                    Submit
                </Button>
            )}
            {showAnswers && (
                <Button onClick={handleNext} variant="outlined" color="secondary" sx={{ fontWeight: 600, boxShadow: 1, mt: 2 }}>
                    {currentIndex < allKanjiWithInfo.length - 1 ? "Next" : "Finish"}
                </Button>
            )}
            <Progress>
                {currentIndex + 1} / {allKanjiWithInfo.length}
            </Progress>
        </StyledForm>
    );
};

export default PronunciationQuiz;
