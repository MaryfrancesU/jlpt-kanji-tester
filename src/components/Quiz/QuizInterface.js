import BackButton from "./BackButton";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const Interface = styled(Container)(({ theme }) => ({ 
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '32px auto',
    padding: theme.spacing(4),
    boxShadow: theme.shadows[6],
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    minHeight: 340,
}));

const Progress = styled("div")({
    marginTop: "16px",
    fontSize: "0.9em",
    color: "#888",
});

const QuizInterface = ({children, showProgress, showBackButton, currentIndex, numQuestions}) => {
    return( 
        <Interface maxWidth="md">
            {children}

            {showProgress && <Progress>
                {currentIndex + 1} / {numQuestions}
            </Progress>}

            {showBackButton && <BackButton />}
        </Interface>
    );
};

export default QuizInterface;
