import { useState } from "react";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();

  async function getData(req, res) {
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
    setResult(data.choices[0].text);
    setPrompt("");
    console.log("look here response", data.choices[0].text);
  }

  async function onSubmit(event) {
    event.preventDefault();
    getData();
  }

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
        <div>prompt:{prompt} result: {result}</div>
      </form>
    </div>
  );
};

export default Form;
