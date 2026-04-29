import { getAssessment } from "@/actions/interview";
import QuizResult from "../../_components/quiz-result";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function AssessmentPage({ params }) {
  const { id } = await params;
  const assessment = await getAssessment(id);

  if (!assessment) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4 mb-8 px-4">
        <Link href="/interview">
          <Button variant="ghost" className="rounded-full h-12 w-12 p-0 bg-white/5 hover:bg-white/10 border border-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Assessment Review</h1>
          <p className="text-white/40 text-sm">Detailed analysis of your past performance</p>
        </div>
      </div>

      <QuizResult result={assessment} hideStartNew={true} />
    </div>
  );
}
