import QuizPage from '@/components/Quiz/QuizPage';

export default async function Quiz({ params }) {
    const resolvedParams = await params;
    const { mode } = resolvedParams;

    return <QuizPage mode={mode} />;
}