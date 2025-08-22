import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const BackButton = () => {
    return (
        <Box mt={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.history.back()}
            >
                Back to Previous Page
            </Button>
        </Box>
    );
};

export default BackButton;
