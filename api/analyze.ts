import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido.",
    });
  }

  try {
    const data = req.body;

    // Verifica se os dados foram enviados corretamente
    if (!data || typeof data !== "object") {
      return res.status(400).json({
        error: "Dados inválidos.",
      });
    }

    // Valida os campos obrigatórios
    if (
      typeof data.language !== "string" ||
      !data.language.trim() ||
      typeof data.code !== "string" ||
      !data.code.trim()
    ) {
      return res.status(400).json({
        error: "A linguagem e o código são obrigatórios.",
      });
    }

    // Valida o nível de explicação
    if (
      data.explanationLevel !== "beginner" &&
      data.explanationLevel !== "technical"
    ) {
      return res.status(400).json({
        error: "Nível de explicação inválido.",
      });
    }

    // Valida a mensagem de erro, caso tenha sido informada
    if (
      data.errorMessage !== undefined &&
      typeof data.errorMessage !== "string"
    ) {
      return res.status(400).json({
        error: "A mensagem de erro deve ser um texto.",
      });
    }

    const prompt = `
    Você é um especialista em análise e depuração de código.

    Sua tarefa é analisar o código enviado pelo usuário e identificar possíveis problemas.

    Linguagem: ${data.language}

    Código enviado: ${data.code}

    Mensagem de erro: ${data.errorMessage || "Nenhuma mensagem de erro informada."}

    Nível de explicação: ${data.explanationLevel === "beginner" ? "Iniciante" : "Técnico"}

    Siga estas orientações:
    - Identifique o problema no código.
    - Explique por que ele acontece.
    - Apresente uma possível solução.
    - Forneça o código corrigido.
    - Adapte a explicação ao nível selecionado.
    - Não invente erros que não estejam presentes.
    - Se não conseguir identificar um problema, informe isso claramente.
    - Não execute o código enviado.
    - Responda exclusivamente em JSON válido.
    - O JSON deve conter exatamente estes campos:
        title, problem, explanation, solution, submittedCode e correctedCode.
    - Todos os campos devem conter valores em texto (string).
    - Não inclua comentários, formatação Markdown ou texto fora do JSON.
    `;

    if (!process.env.GROQ_API_KEY) {
      throw new Error("A chave da API da Groq não foi configurada.");
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          response_format: {
            type: "json_object",
          },
        }),
      },
    );

    const resultadoGroq = await response.json();

    if (!response.ok) {
      throw new Error(
        resultadoGroq.error?.message || "Erro ao solicitar análise à Groq.",
      );
    }

    const analysisText = resultadoGroq.choices?.[0]?.message?.content;

    if (!analysisText) {
      throw new Error("A Groq não retornou uma análise.");
    }

    const analysis: unknown = JSON.parse(analysisText);

    if (
      typeof analysis !== "object" ||
      analysis === null ||
      Array.isArray(analysis)
    ) {
      throw new Error("A Groq retornou uma resposta inválida.");
    }

    const analysisData = analysis as Record<string, unknown>;

    const requiredFields = [
      "title",
      "problem",
      "explanation",
      "solution",
      "submittedCode",
      "correctedCode",
    ];

    const isValidAnalysis = requiredFields.every(
      (field) => typeof analysisData[field] === "string",
    );

    if (!isValidAnalysis) {
      throw new Error(
        "A resposta da Groq não contém todos os campos esperados.",
      );
    }

    return res.status(200).json({
      success: true,
      message: "Análise realizada com sucesso!",
      analysis: {
        ...analysisData,
        submittedCode: data.code,
      },
    });
  } catch (error) {
    console.error("Erro ao realizar análise:", error);

    return res.status(502).json({
      error: "Não foi possível realizar a análise no momento. Tente novamente.",
    });
  }
}
