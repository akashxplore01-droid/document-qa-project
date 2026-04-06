let pdfText = "";

const API_KEY = "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";

async function upload() {
    const file = document.getElementById("file").files[0];
    const reader = new FileReader();

    reader.onload = async function() {
        const pdf = await pdfjsLib.getDocument(new Uint8Array(this.result)).promise;

        pdfText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            pdfText += content.items.map(i => i.str).join(" ");
        }

        addMsg("PDF Loaded", "bot");
    };

    reader.readAsArrayBuffer(file);
}

async function ask() {
    const q = document.getElementById("question").value;
    addMsg(q, "user");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [
                { role: "user", content: pdfText + "\nQuestion: " + q }
            ]
        })
    });

    const data = await res.json();

    addMsg(data.choices[0].message.content, "bot");
}

function addMsg(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    document.getElementById("chat").appendChild(div);
}
