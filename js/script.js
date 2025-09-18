// js/script.js

// Adiciona um listener que espera o HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona os elementos do DOM com os quais vamos interagir
    const form = document.getElementById('plano-form');
    const gerarBtn = document.getElementById('gerar-plano-btn');
    const limparBtn = document.getElementById('limpar-form-btn');
    const exportarBtn = document.getElementById('exportar-pdf-btn');
    const planoContainer = document.getElementById('plano-gerado-container');
    const planoConteudo = document.getElementById('plano-gerado-conteudo');
    const loadingDiv = document.getElementById('loading');
    
    // Base64 da logo do SENAI
    const logoSenaiBase64 = "data:image/png;base64,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"
    // EVENT LISTENERS
    form.addEventListener('submit', handleFormSubmit);
    limparBtn.addEventListener('click', resetForm);
    exportarBtn.addEventListener('click', exportarParaPDF);

    // FUNÇÕES
    /**
     * Função principal que lida com o envio do formulário.
     * @param {Event} event - O evento de submit do formulário.
     */
    async function handleFormSubmit(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Exibe o contêiner de resultados e o indicador de loading
        planoContainer.style.display = 'block';
        loadingDiv.style.display = 'block';
        planoConteudo.innerHTML = ''; // Limpa conteúdo anterior

        // Coleta os dados do formulário
        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        // Cria o prompt para a IA
        const prompt = criarPrompt(dados);

        try {
            // Chama a função que se comunica com a API do Gemini
            const planoGerado = await gerarPlanoDeAula(prompt);
            
            // Exibe o plano de aula gerado
            exibirPlano(planoGerado, dados);

        } catch (error) {
            planoConteudo.innerHTML = `<p style="color: red;">Ocorreu um erro ao gerar o plano de aula: ${error.message}</p>`;
            console.error("Erro na chamada da API:", error);
        } finally {
            // Esconde o indicador de loading
            loadingDiv.style.display = 'none';
        }
    }

    /**
     * Cria um prompt detalhado para enviar à API do Gemini.
     * @param {object} dados - Os dados coletados do formulário.
     * @returns {string} - O prompt formatado.
     */
    function criarPrompt(dados) {
        return `
            Aja como um especialista em design instrucional e pedagógico do SENAI.
            Crie um plano de curso detalhado e bem estruturado em formato de texto simples, utilizando os seguintes dados:

            - **Nome do Curso:** ${dados['nome-curso']}
            - **Instrutor Responsável:** ${dados['nome-instrutor']}
            - **Código da Turma:** ${dados['codigo-turma']}
            - **Área de Conhecimento:** ${dados['area-conhecimento']}
            - **Carga Horária Total:** ${dados.duracao} horas
            - **Nível:** ${dados['nivel-curso']}
            - **Público-Alvo:** ${dados['publico-alvo']}
            - **Objetivos de Aprendizagem:** ${dados['objetivos-curso']}

            O plano de curso deve conter obrigatoriamente as seguintes seções bem definidas:
            1.  **Identificação do Curso**: Inclua todos os dados fornecidos acima.
            2.  **Ementa**: Um parágrafo conciso que resume o conteúdo do curso.
            3.  **Competências a serem Desenvolvidas**: Liste as principais competências que o aluno irá adquirir.
            4.  **Conteúdo Programático Detalhado**: Divida o conteúdo em módulos ou unidades, sugerindo a carga horária para cada um. Detalhe os tópicos de cada módulo.
            5.  **Metodologia de Ensino**: Descreva as abordagens que serão utilizadas (aulas expositivas, práticas em laboratório, projetos, etc.).
            6.  **Recursos Didáticos**: Liste os recursos necessários (computadores, softwares, projetor, etc.).
            7.  **Sistema de Avaliação**: Detalhe como os alunos serão avaliados (provas teóricas, projetos práticos, participação), incluindo os critérios e pesos.
            8.  **Referências Bibliográficas**: Sugira 3 a 5 referências (livros, artigos, documentações online) relevantes para o curso.

            Formate a resposta de forma clara e organizada.
        `;
    }

    /**
     * Envia o prompt para a API do Gemini e retorna a resposta.
     * @param {string} promptTexto - O prompt para a IA.
     * @returns {Promise<string>} - O texto do plano de aula gerado.
     */
    async function gerarPlanoDeAula(promptTexto) {
        const apiKey = 'AIzaSyB80TXxTJEAlM8TYwRHp_yviSsaALg6fBI'; // <-- COLOQUE SUA CHAVE DE API AQUI
        const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

        const requestBody = {
            contents: [{
                parts: [{ text: promptTexto }]
            }]
        };

        const response = await fetch(`${url}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        // Navega na estrutura da resposta para obter o texto
        return data.candidates[0].content.parts[0].text;
    }

    /**
     * Formata e exibe o plano de aula gerado no HTML.
     * @param {string} textoPlano - O texto bruto retornado pela API.
     * @param {object} dados - Os dados do formulário para o cabeçalho.
     */
    function exibirPlano(textoPlano, dados) {
        // Substitui quebras de linha por parágrafos e negritos (simples)
        const htmlPlano = textoPlano
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Transforma **texto** em <strong>
            .replace(/\n/g, '<br>'); // Transforma quebras de linha em <br>

        planoConteudo.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 20px;">
                <div>
                    <p><strong>Instrutor:</strong> ${dados['nome-instrutor']}</p>
                    <p><strong>Turma:</strong> ${dados['codigo-turma']}</p>
                </div>
                <img src="${logoSenaiBase64}" alt="Logo SENAI" style="height: 40px;">
            </div>
            <h1>Plano de Curso: ${dados['nome-curso']}</h1>
            <br>
            <p>${htmlPlano}</p>
        `;
    }

    /**
     * Limpa todos os campos do formulário.
     */
    function resetForm() {
        form.reset();
        planoContainer.style.display = 'none';
        planoConteudo.innerHTML = '';
    }

    /**
     * Prepara e aciona a janela de impressão para salvar como PDF.
     */
    function exportarParaPDF() {
        const codigoTurma = document.getElementById('codigo-turma').value || 'turma';
        const nomeCurso = document.getElementById('nome-curso').value.replace(/\s+/g, '-') || 'curso';

        // Função para garantir dois dígitos (ex: 7 -> 07)
        const pad = (num) => num.toString().padStart(2, '0');

        // Cria a data e hora no formato desejado
        const agora = new Date();
        const dataHora = `${pad(agora.getDate())}-${pad(agora.getMonth() + 1)}-${agora.getFullYear()}-${pad(agora.getHours())}-${pad(agora.getMinutes())}-${pad(agora.getSeconds())}`;

        // Define o nome do arquivo
        const nomeArquivo = `Plano-de-curso_${codigoTurma}_${nomeCurso}_${dataHora}.pdf`;
        
        // Truque: define o título da página para o nome do arquivo desejado
        const tituloOriginal = document.title;
        document.title = nomeArquivo;

        // Aciona a impressão
        window.print();
        
        // Restaura o título original
        document.title = tituloOriginal;
    }
});