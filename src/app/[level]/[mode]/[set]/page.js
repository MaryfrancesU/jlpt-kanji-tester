import PronunciationQuiz from '@/components/Pronunciation/PronunciationQuiz';
import WritingQuiz from '@/components/Writing/WritingQuiz';

export default async function QuizPage({ params }) {
    const resolvedParams = await params;
    const { mode } = resolvedParams;

    if (mode === 'pronunciation') {
        return <PronunciationQuiz />;
    }
    if (mode === 'writing') {
        return <WritingQuiz />;
    }
    return <div>Invalid quiz mode.</div>;
}