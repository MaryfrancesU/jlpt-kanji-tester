import Link from "next/link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

const ModeModal = ({ open, handleClose, level }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h2">Select A Quiz Mode</DialogTitle>

            <DialogContent>
                <Typography>
                    Writing mode will show you a kanji&apos;s English definition and
                    requires you to write it out on a separate piece of paper.
                    You can get one pronunciation hint before you reveal the
                    answer.
                </Typography>

                <Typography>
                    Pronunciation mode will show you a kanji and requires you
                    to type in at least one of its pronunciations.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Link href={`/${level}/writing`}>
                    <Button variant="contained" color="primary">
                        Writing
                    </Button>
                </Link>
                <Link href={`/${level}/pronunciation`}>
                    <Button variant="contained" color="secondary">
                        Pronunciation
                    </Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default ModeModal;
