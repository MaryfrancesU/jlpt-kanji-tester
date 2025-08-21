"use client";
import { useState } from "react";
import LevelCard from "./LevelCard";
import ModeModal from "./ModeModal";
import Stack from "@mui/material/Stack";

const Home = () => {
    const levels = ["N5", "N4", "N3", "N2", "N1"];
    const [open, setOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(null);

    const handleCardClick = (level) => {
        setSelectedLevel(level);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLevel(null);
    };

    return (
        <>
            <Stack
                direction={{ sm: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                {levels.map((level) => (
                    <LevelCard
                        key={level}
                        level={level}
                        onClick={() => handleCardClick(level)}
                    />
                ))}
            </Stack>

            <ModeModal
                open={open}
                handleClose={handleClose}
                level={selectedLevel?.toLowerCase()}
            />
        </>
    );
};

export default Home;
