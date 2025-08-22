import Sets from "@/components/Sets/Sets";
import Typography from "@mui/material/Typography";

export default async function ChooseSetPage({ params }) {
    const resolvedParams = await params;
    const { level, mode } = resolvedParams;

    return (
        <>
            <Typography variant="h2">
                JLPT {level.charAt(0).toUpperCase() + level.slice(1)}{" "}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Typography>

            <Sets  mode={mode} />
        </>
    );
}
