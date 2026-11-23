import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CodeForm from "./components/CodeForm/CodeForm";
import AnalysisResult, {
  type AnalysisResultProps,
} from "./components/AnalysisResult/AnalysisResult";

function App() {
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultProps | null>(null);

  return (
    <>
      <Header />
      <CodeForm onAnalyze={setAnalysisResult} />
      {analysisResult && (
        <AnalysisResult
          title={analysisResult.title}
          problem={analysisResult.problem}
          explanation={analysisResult.explanation}
          solution={analysisResult.solution}
          submittedCode={analysisResult.submittedCode}
          correctedCode={analysisResult.correctedCode}
        />
      )}
    </>
  );
}

export default App;
