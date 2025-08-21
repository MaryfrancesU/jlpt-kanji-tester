"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const LevelsGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(4),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    maxWidth: 700,
    margin: '0 auto',
}));

const LevelCard = styled(Card)(({ theme }) => ({
    minWidth: 260,
    minHeight: 220,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: theme.shadows[6],
    borderRadius: theme.shape.borderRadius * 3,
    background: theme.palette.background.paper,
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.04)',
        boxShadow: theme.shadows[12],
    },
}));

const StyledDialogContent = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[8],
    minWidth: 320,
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
}));

const WritingButton = styled(Button)(({ theme }) => ({
    fontWeight: 600,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius * 2,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

const PronunciationButton = styled(Button)(({ theme }) => ({
    fontWeight: 600,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius * 2,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

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
            <LevelsGrid>
                {levels.map((level) => (
                    <LevelCard key={level} onClick={() => handleCardClick(level)}>
                        <CardActionArea sx={{ width: '100%', height: '100%' }}>
                            <CardContent>
                                <Typography
                                    variant="h2"
                                    component="div"
                                    align="center"
                                    sx={{ fontWeight: 700, fontSize: 64 }}
                                >
                                    {level}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </LevelCard>
                ))}
            </LevelsGrid>

            <Dialog open={open} onClose={handleClose}>
                <StyledDialogContent>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                        Select A Quiz Mode
                    </Typography>
                    <Stack spacing={3} direction="row" justifyContent="center">
                        <Link href={`/${selectedLevel?.toLowerCase()}/writing`}>
                            <WritingButton variant="contained" color="primary">
                                Writing
                            </WritingButton>
                        </Link>
                        <Link href={`/${selectedLevel?.toLowerCase()}/pronunciation`}>
                            <PronunciationButton variant="contained" color="secondary">
                                Pronunciation
                            </PronunciationButton>
                        </Link>
                    </Stack>
                </StyledDialogContent>
            </Dialog>
        </>
    );
};

export default Home;
