import Link from "next/link";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const SetCard = styled(Grid)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    boxShadow: theme.shadows[1],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,

    "& a": {
        textDecoration: "none",
    },

    "&:hover": {
        boxShadow: theme.shadows[3],
    },
}));

const ViewKanjiText = styled(Typography)(({ theme }) => ({
    cursor: "pointer",

    "&:hover": {
        color: theme.palette.secondary.main,
    },
}));

const SetLink = ({ mode, number, label, handleViewKanji }) => {
    return (
        <SetCard size={{ xs: 8, sm: 4, md: 2 }}>
            <Link href={{ pathname: `${mode}/set${number}` }}>
                <Typography variant="h3" fontWeight={700}>
                    {label}
                </Typography>
            </Link>

            <ViewKanjiText
                variant="body2"
                color="textSecondary"
                onClick={() => handleViewKanji(number)}
            >
                View Kanji
            </ViewKanjiText>

        </SetCard>
    );
};

export default SetLink;
