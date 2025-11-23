function mistralChat(prompt, targetSelector) {

    const userKey = document.querySelector("#api-key-input").value.trim();

    if (!userKey) {
        document.querySelector(targetSelector).textContent = "Please enter your API key.";
        return;
    }

    return fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + userKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "ministral-8b-2410",
            messages: [
                { role: "system", content: "You are a concise assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 512
        })
    })
        .then(response => response.json())
        .then(function(data) {
            const aiResponse = data.choices[0].message.content;
            document.querySelector(targetSelector).textContent = aiResponse;
        })
        .catch(error => {
            document.querySelector(targetSelector).textContent = "Error: " + error.message;
        });
}


document.querySelector("#generateBtn").addEventListener("click", () => {
    const choice = document.querySelector("#workout-select").value;

    if (choice === "") {
        document.querySelector("#output").textContent = "Please choose a workout.";
        return;
    }

    let prompt = "";

    if (choice === "fullbody") {
        prompt = "Give me a beginner-friendly full body workout.";
    }
    if (choice === "back") {
        prompt = "Give me a beginner-friendly back workout.";
    }
    if (choice === "legs") {
        prompt = "Give me a beginner-friendly leg workout.";
    }
    if (choice === "glutes") {
        prompt = "Give me a beginner-friendly glute workout.";
    }
    if (choice === "bicep") {
        prompt = "Give me a beginner-friendly biceps and triceps workout.";
    }

    mistralChat(prompt, "#output");
});


