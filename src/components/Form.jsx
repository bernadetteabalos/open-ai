import { useState } from "react";
import "./form.scss";
import robot from "../../src/robo.svg";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, updateResponses] = useState([]);

  async function getData() {
    const submission = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 60,
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
    if (responses)
      updateResponses([
        { prompt: prompt, answer: data.choices[0].text },
        ...responses,
      ]);
    setPrompt("");
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="form">
      <div className="svgThing">
        <img src={robot} alt="robot"></img>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="prompt"
          placeholder="enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <input type="submit" value="Generate results" />
      </form>
      <div className="responses">
        <h2>RESPONSES</h2>

        <ul>
          {responses.map((response, i) => {
            return (
              <div key={i} className={"yes " + (i === 0 ? "animate" : "")}>
                {[
                  <h3>Prompt: {response.prompt}</h3>,
                  <h4>Response: {response.answer}</h4>,
                ]}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Form;
