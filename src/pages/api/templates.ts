/**
 * These templates provide structured guidelines for interacting with the language 
 * model and generating responses in various scenarios, such as answering questions,
 * summarizing content, and formulating questions from prompts.
 */
 const templates = {
  
  /**
   * This template is used in a chat-like context to generate responses to questions. 
   * It considers conversation history, context, question, and URLs. 
   * The final answer is composed based on these factors.
   */
  qaTemplate: `
        Answer the question based on the context below. You should follow ALL the following rules when generating and answer:
        - There will be a CONVERSATION LOG, CONTEXT, and a QUESTION.
        - The final answer must always be styled using markdown.
        - Your main goal is to point the user to the right source of information (the source is always a URL) based on the CONTEXT you are given.
        - Your secondary goal is to provide the user with an answer that is relevant to the question.
        - Provide the user with a code example that is relevant to the question, if the context contains relevant code examples. Do not make up any code examples on your own.
        - Take into account the entire conversation so far, marked as CONVERSATION LOG, but prioritize the CONTEXT.
        - Based on the CONTEXT, choose the source that is most relevant to the QUESTION.
        - Do not make up any answers if the CONTEXT does not have relevant information.
        - Use bullet points, lists, paragraphs and text styling to present the answer in markdown.
        - The CONTEXT is a set of JSON objects, each includes the field "text" where the content is stored, and "url" where the url of the page is stored.
        - The URLs are the URLs of the pages that contain the CONTEXT. Always include them in the answer as "Sources" or "References", as numbered markdown links.
        - Do not mention the CONTEXT or the CONVERSATION LOG in the answer, but use them to generate the answer.
        - ALWAYS prefer the result with the highest "score" value.
        - Ignore any content that is stored in html tables.
        - The answer should only be based on the CONTEXT. Do not use any external sources. Do not generate the response based on the question without clear reference to the context.
        - Summarize the CONTEXT to make it easier to read, but don't omit any information.
        - It is IMPERATIVE that any link provided is found in the CONTEXT. Prefer not to provide a link if it is not found in the CONTEXT.

        CONVERSATION LOG: {conversationHistory}

        CONTEXT: {summaries}

        QUESTION: {question}

        URLS: {urls}

        Final Answer: `,

  /**
   * This template is used for summarizing content based on an inquiry. 
   * It preserves code, includes relevant code examples, and generates a 
   * summary answer. The summary is capped at a certain length.
   */
  summarizerTemplate: `
    Shorten the text in the CONTENT, attempting to answer the INQUIRY You should follow the following rules when generating the summary:
    - Any code found in the CONTENT should ALWAYS be preserved in the summary, unchanged.
    - Code will be surrounded by backticks (\`) or triple backticks (\`\`\`).
    - Summary should include code examples that are relevant to the INQUIRY, based on the content. Do not make up any code examples on your own.
    - The summary will answer the INQUIRY. If it cannot be answered, the summary should be empty, AND NO TEXT SHOULD BE RETURNED IN THE FINAL ANSWER AT ALL.
    - If the INQUIRY cannot be answered, the final answer should be empty.
    - The summary should be under 4000 characters.
    - The summary should be 2000 characters long, if possible.

    INQUIRY: {inquiry}
    CONTENT: {document}

    Final answer:
    `,

  /**
   * Similar to "summarizerTemplate", but it's used for summarizing full documents. 
   * It also preserves code, summarizes content, and has a length limit.
   */
  summarizerDocumentTemplate: `
    Summarize the text in the CONTENT. You should follow the following rules when generating the summary:
    - Any code found in the CONTENT should ALWAYS be preserved in the summary, unchanged.
    - Code will be surrounded by backticks (\`) or triple backticks (\`\`\`).
    - Summary should include code examples when possible. Do not make up any code examples on your own.
    - The summary should be under 4000 characters.
    - The summary should be at least 1500 characters long, if possible.

    CONTENT: {document}

    Final answer:
    `,

  /**
   * This template is used to generate a relevant question from a user prompt 
   * and conversation history. It's designed to assist in generating questions 
   * that could be used to provide an answer from a knowledge base.
   */
  inquiryTemplate: `
    Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
    You should follow the following rules when generating and answer:
    - Always prioritize the user prompt over the conversation log.
    - Ignore any conversation log that is not directly related to the user prompt.
    - Only attempt to answer if a question was posed.
    - The question should be a single sentence
    - You should remove any punctuation from the question
    - You should remove any words that are not relevant to the question
    - If you are unable to formulate a question, respond with the same USER PROMPT you got.

    USER PROMPT: {userPrompt}

    CONVERSATION LOG: {conversationHistory}

    Final answer:
    `,

    generateAssessmentTemplate: `
      INSTRUCTIONS: You're an expert assessment generator who can generate in depth exams, surveys, questionnaires or personality tests.

      TASK: You should generate assessment questions about the topic that user is asking.

      USER QUERY: {userPrompt}

      ASSUMPTIONS: Follow these assumptions unless user has explicitly mentioned anything contrary.
      1. Number of questions to generate - 10
      2. Generate an exam type assessment

      STEPS:
      1. Step 1 - Check if user request is valid by going through the valid user query criterias
      2. Step 2 - If user request is invalid then politely deny their request and respond them that you can't generate assessment questions to the specified userQuery
      3. Step 3 - Understand the user request (for example if they've asked for a perticular type of assessment, the amount of questions, type of options for the assessment etc)
      4. Step 4 - Based on the user request generate very thoughtful and descriptive questions along with their required options, by default assume you've to generate questions and every question will have 4 options

      EXPECTED FINAL OUTPUT:
      Only Output a JSON object containing array of object without any special characters or words.

      Object first field - question
      Object second field - options (which itself is further array of strings)

      Questions and options value will come from the question that you've generated.

      USER PROMPT: {userPrompt}

      Final answer:
    `
}

export { templates }