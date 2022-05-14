import { useState } from "react";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, updateResponses] = useState([]);

  async function getData() {
    const submission = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
        },
        body: JSON.stringify(submission),
      }
    );
    const data = await response.json();
    updateResponses([
      ...responses,
      { prompt: prompt, answer: data.choices[0].text },
    ]);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input type="submit" value="Generate results" />
        <div>
          <ul>
            {responses.map((response, i) => {
              return <div className="yes" key={i}>{[response.prompt, response.answer]}</div>;
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Form;
