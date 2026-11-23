import "./CodeForm.css";
import { useState } from "react";
import type { AnalysisResultProps } from "../AnalysisResult/AnalysisResult";

interface CodeFormProps {
  onAnalyze: (result: AnalysisResultProps) => void;
}

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "React", value: "react" },
];

function CodeForm({ onAnalyze }: CodeFormProps) {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [explanationLevel, setExplanationLevel] = useState("beginner");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSuccess(false);
    setIsError(false);
    setIsLoading(true);

    const dados = {
      language,
      code,
      errorMessage,
      explanationLevel,
    };

    console.log(dados);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar a análise.");
      }

      const resultado = await response.json();

      console.log("Resposta do backend:", resultado);
      console.log("Análise recebida:", resultado.analysis);

      onAnalyze(resultado.analysis);

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      setLanguage("");
      setCode("");
      setErrorMessage("");
      setExplanationLevel("beginner");
    } catch (error) {
      console.log("Erro capturado:", error);
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="language">Linguagem de programação</label>

        <select
          id="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          required
        >
          <option value="" disabled>
            Selecione uma linguagem
          </option>

          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </select>

        <div>
          <label htmlFor="code">Código para análise</label>

          <textarea
            id="code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Cole seu código aqui..."
            rows={10}
            required
          />
        </div>

        <div>
          <label htmlFor="errorMessage">Mensagem de erro</label>

          <textarea
            id="errorMessage"
            value={errorMessage}
            onChange={(event) => setErrorMessage(event.target.value)}
            placeholder="Cole a mensagem de erro aqui..."
            rows={5}
          />
        </div>

        <div>
          <label htmlFor="explanationLevel">Nível de explicação</label>

          <select
            id="explanationLevel"
            value={explanationLevel}
            onChange={(event) => setExplanationLevel(event.target.value)}
          >
            <option value="beginner">Iniciante</option>
            <option value="technical">Técnico</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Analisando código..." : "Analisar código"}
        </button>
      </form>

      {isSuccess && (
        <p className="success-message">Análise concluída com sucesso!</p>
      )}

      {isError && (
        <p className="error-message">
          Não foi possível concluir a análise. Tente novamente.
        </p>
      )}
    </section>
  );
}

export default CodeForm;
