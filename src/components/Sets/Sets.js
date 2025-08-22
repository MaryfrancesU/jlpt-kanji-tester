"use client";
import SetLink from "./SetLink";
import SetModal from "./SetModal";
import Grid from "@mui/material/Grid";
import { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { useKanjiContext } from "@/context/LevelKanjiContext";

const Sets = ({ mode }) => {
    const [open, setOpen] = useState(false);
    const quizLengths = [20, 30, 40, 60, 80];
    const [setNumber, setSetNumber] = useState(null);

    const { levelKanji, quizLength, setQuizLength } = useKanjiContext();
    const totalCount = levelKanji.length;

    const allSets = useMemo(() => {
        let result = [];
        const numSets = Math.ceil(totalCount / quizLength);

        for (let i = 1; i <= numSets; i++) {
            result.push({ label: `Set ${i}`, number: i });
        }

        return result;
    }, [quizLength, totalCount]);

    const handleViewKanji = (setNumber) => {
        setOpen(true);
        setSetNumber(setNumber);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Typography>
                Study in sets of
                <select
                    value={quizLength}
                    style={{ marginLeft: "8px" }}
                    onChange={(e) => setQuizLength(Number(e.target.value))}
                >
                    {quizLengths.map((val) => (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    ))}
                </select>
            </Typography>

            <Grid container spacing={2} columns={8}>
                {allSets.map((item) => (
                    <SetLink
                        key={item.label}
                        mode={mode}
                        number={item.number}
                        label={item.label}
                        handleViewKanji={handleViewKanji}
                    />
                ))}
            </Grid>

            <SetModal
                open={open}
                handleClose={handleCloseModal}
                setNumber={setNumber}
            />
        </>
    );
};

export default Sets;
