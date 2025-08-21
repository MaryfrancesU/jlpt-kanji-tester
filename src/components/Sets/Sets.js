"use client";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { styled } from "@mui/material/styles";
const StyledSelect = styled('select')({
    marginLeft: 8,
});

const Sets = () => {
    const params = useParams();
    const { level, mode } = params;

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

    return (
        <>
            <h1>
                JLPT {level.charAt(0).toUpperCase() + level.slice(1)} {mode}
            </h1>

            <Link href={`${mode}/all`}>
                <Button variant="contained" color="primary" sx={{ boxShadow: 3, borderRadius: 2, px: 3, py: 1, fontWeight: 600 }}>
                    Study All
                </Button>
            </Link>

            <label>
                Study in sets of
                <StyledSelect
                    value={quizLength}
                    onChange={e => setQuizLength(Number(e.target.value))}
                >
                    {[20, 30, 40, 60, 80].map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </StyledSelect>
            </label>

            {allSets.map((item) => (
                <Box key={item.label} sx={{ boxShadow: 2, borderRadius: 2, my: 2, p: 1, background: 'white', display: 'inline-block' }}>
                    <Link href={{pathname: `${mode}/set${item.number}`}}>
                        <Button variant="outlined" color="secondary" sx={{ fontWeight: 600, px: 3, py: 1 }}>
                            {item.label}
                        </Button>
                    </Link>
                </Box>
            ))}
        </>
    );
};

export default Sets;
