
const $ = (id) => document.getElementById(id);

let generated = "";

// Select a prompt category
document.querySelectorAll(".chip").forEach((chip) => {

    chip.addEventListener("click", () => {

        document.querySelectorAll(".chip").forEach((item) => {
            item.classList.remove("active");
        });

        chip.classList.add("active");

        $("task").value = chip.dataset.task;

    });

});

// Generate the AI prompt
function makePrompt() {

    const task = $("task").value;
    const goal = $("goal").value.trim();
    const audience = $("audience").value;
    const tone = $("tone").value;
    const format = $("format").value;
    const length = $("length").value;
    const context = $("context").value.trim();
    const constraints = $("constraints").value.trim();

    if (!goal) {
        alert("Please enter your goal first.");
        $("goal").focus();
        return;
    }

    const roleMap = {

        "Study and Learn":
        "Act as a knowledgeable college-level tutor.",

        "Research":
        "Act as an academic research assistant.",

        "Presentation":
        "Act as an experienced presentation coach.",

        "Writing":
        "Act as a professional writing coach.",

        "Coding":
        "Act as a supportive programming mentor.",

        "Creative Project":
        "Act as a creative thinking partner."

    };

    generated = `${roleMap[task]}

TASK
${goal}

TARGET AUDIENCE
${audience}

WRITING STYLE
${tone}

OUTPUT FORMAT
${format}

DETAIL LEVEL
${length}

${context ? `ADDITIONAL CONTEXT\n${context}\n` : ""}

${constraints ? `SPECIAL INSTRUCTIONS\n${constraints}\n` : ""}

QUALITY REQUIREMENTS

- Keep the response focused on the task.
- Explain unfamiliar terms clearly.
- Include relevant examples.
- Organize the answer with clear headings.
- Do not invent facts or references.
- Explain important concepts step by step.
- Support learning and independent thinking.

Begin by addressing the task directly.`;

    $("output").classList.remove("empty");

    $("output").textContent = generated;

    const words = generated.trim().split(/\s+/).length;

    $("wordcount").textContent = words + " words";

    $("copy").disabled = false;

}

// Generate button
$("generate").addEventListener("click", makePrompt);


// Copy prompt to clipboard
$("copy").addEventListener("click", async () => {

    if (!generated) return;

    try {

        await navigator.clipboard.writeText(generated);

    } catch (error) {

        const temp = document.createElement("textarea");

        temp.value = generated;

        document.body.appendChild(temp);

        temp.select();

        document.execCommand("copy");

        temp.remove();

    }

    $("copy").textContent = "Copied!";

    setTimeout(() => {

        $("copy").textContent = "Copy Prompt";

    }, 1500);

});


// Reset all fields
$("reset").addEventListener("click", () => {

    ["goal", "context", "constraints"].forEach((id) => {
        $(id).value = "";
    });

    $("audience").selectedIndex = 0;
    $("tone").selectedIndex = 0;
    $("format").selectedIndex = 0;
    $("length").selectedIndex = 0;

    document.querySelectorAll(".chip").forEach((chip) => {

        chip.classList.toggle(
            "active",
            chip.dataset.task === "Study and Learn"
        );

    });

    $("task").value = "Study and Learn";

    generated = "";

    $("output").classList.add("empty");

    $("output").textContent =
        "Your generated prompt will appear here. Enter your details and click Generate.";

    $("wordcount").textContent = "0 words";

    $("copy").disabled = true;

    $("copy").textContent = "Copy Prompt";

});
