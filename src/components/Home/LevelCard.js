import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const LevelCard = ({ level, onClick }) => {
    return (
        <Paper
            onClick={onClick}
            elevation={3}
            sx={{
                padding: 2,
                cursor: "pointer",
                textAlign: "center",
                width: 200,
                "&:hover": {
                    transform: "scale(1.04)",
                },
                transition: "transform 0.2s",
            }}
        >
            <Typography variant="h2" component="div" align="center">
                {level}
            </Typography>
        </Paper>
    );
};

export default LevelCard;
