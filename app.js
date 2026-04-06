import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);

  const ask = async (q) => {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_KEY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: text + q }],
      }),
    });

    const data = await res.json();
    setChat([...chat, { q, a: data.choices[0].message.content }]);
  };

  return <div>DocQA React UI</div>;
}

export default App;
