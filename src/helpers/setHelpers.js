export function getStartIndex(setNumber, quizLength) {
    return (quizLength * setNumber) - quizLength;
}

export function getEndIndex(setNumber, quizLength) {
    return (quizLength * setNumber);
}

export function getStartAndEndIndex(setNumber, quizLength) {
    return {
        start: getStartIndex(setNumber, quizLength),
        end: getEndIndex(setNumber, quizLength)
    };
}