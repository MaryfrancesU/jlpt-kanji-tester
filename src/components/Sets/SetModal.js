import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useKanjiContext } from "@/context/LevelKanjiContext";
import { getKanjiForSet, getStartAndEndIndex } from "@/helpers/setHelpers";

const SetModal = ({ open, handleClose, setNumber }) => {
    const { levelKanji, quizLength } = useKanjiContext();
    const [allKanjiWithInfo, setAllKanjiWithInfo] = useState([]);
    const { start, end } = getStartAndEndIndex(setNumber, quizLength);

    useEffect(() => {
        setAllKanjiWithInfo([]);
        const fetchInfo = async () => {
            const results = await getKanjiForSet(start, end, levelKanji);
            setAllKanjiWithInfo(results);
        };
        fetchInfo();
    }, [ start, end, levelKanji]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h2"> Set {setNumber} Kanji </DialogTitle>

            <DialogContent sx={{ sm: {width: "55vw"}, md: {width: "45vw"} }}>
                {allKanjiWithInfo.length > 0 ? (
                    <>
                        <ol>
                            {allKanjiWithInfo.map((item, index) => (
                                <li key={index}>
                                    {item.kanji}
                                    <ul>
                                        <li> {item.meanings.join(", ")} </li>
                                        {item.kunyomi.length > 0 && (
                                            <li> {item.kunyomi.join(", ")} </li>
                                        )}
                                        {item.onyomi.length > 0 && (
                                            <li> {item.onyomi.join(", ")} </li>
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ol>
                    </>
                ) : (
                    <CircularProgress />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SetModal;
