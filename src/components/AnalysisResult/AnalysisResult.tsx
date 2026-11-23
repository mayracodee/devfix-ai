import "./AnalysisResult.css";

export interface AnalysisResultProps {
  title: string;
  problem: string;
  explanation: string;
  solution: string;
  submittedCode: string;
  correctedCode: string;
}

function AnalysisResult({
  title,
  problem,
  explanation,
  solution,
  submittedCode,
  correctedCode,
}: AnalysisResultProps) {
  return (
    <section className="analysis-result">
      <h2>{title}</h2>

      <div>
        <h3>Problema identificado</h3>
        <p>{problem}</p>
      </div>

      <div>
        <h3>Explicação</h3>
        <p>{explanation}</p>
      </div>

      <div>
        <h3>Possível solução</h3>
        <p>{solution}</p>
      </div>

      <div>
        <h3>Código enviado</h3>

        <pre>
          <code>{submittedCode}</code>
        </pre>
      </div>

      <div>
        <h3>Código corrigido</h3>
        <pre>
          <code>{correctedCode}</code>
        </pre>
      </div>
    </section>
  );
}

export default AnalysisResult;
