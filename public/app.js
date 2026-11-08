// Wildlife Music Studio
// Animal scenes and project export

const animals = [
  { name: "Lion", prompt: "A realistic cinematic wildlife documentary shot of a male lion walking through the African savanna at sunrise." },
  { name: "Elephant", prompt: "A realistic cinematic wildlife documentary shot of a large elephant walking through the African grasslands." },
  { name: "Giraffe", prompt: "A realistic cinematic wildlife documentary shot of a giraffe eating leaves from a tall acacia tree." },
  { name: "Zebra", prompt: "A realistic cinematic wildlife documentary shot of zebras running across an open African plain." },
  { name: "Monkey", prompt: "A realistic cinematic wildlife documentary shot of a monkey jumping between tropical forest branches." },
  { name: "Tiger", prompt: "A realistic cinematic wildlife documentary shot of a tiger walking through a green jungle." },
  { name: "Bear", prompt: "A realistic cinematic wildlife documentary shot of a brown bear walking beside a forest river." },
  { name: "Wolf", prompt: "A realistic cinematic wildlife documentary shot of a wolf standing in a misty forest." },
  { name: "Fox", prompt: "A realistic cinematic wildlife documentary shot of a red fox walking through a meadow." },
  { name: "Dolphin", prompt: "A realistic cinematic wildlife documentary shot of dolphins swimming in clear blue ocean water." }
];

const scenesContainer = document.getElementById("scenes");
const audioPlayer = document.getElementById("audioPlayer");
const audioUpload = document.getElementById("audioUpload");
const lyricsEditor = document.getElementById("lyrics");
const exportButton = document.getElementById("exportButton");

// Display animal scenes
function displayScenes() {
  if (!scenesContainer) return;

  scenesContainer.innerHTML = "";

  animals.forEach((animal, index) => {
    const scene = document.createElement("div");
    scene.className = "scene-card";

    const title = document.createElement("h3");
    title.textContent = `${index + 1}. ${animal.name}`;

    const prompt = document.createElement("textarea");
    prompt.className = "scene-prompt";
    prompt.value = animal.prompt;
    prompt.rows = 4;
    prompt.dataset.animal = animal.name;

    scene.appendChild(title);
    scene.appendChild(prompt);
    scenesContainer.appendChild(scene);
  });
}

// Load the demo audio
function loadDemoAudio() {
  if (!audioPlayer) return;

  audioPlayer.src = "../assets/assets/Ten%20Animals%2C%20Ten%20Words.m4a";
}

// Upload a new audio file for preview
if (audioUpload && audioPlayer) {
  audioUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
      const audioURL = URL.createObjectURL(file);
      audioPlayer.src = audioURL;
      audioPlayer.load();
    }
  });
}

// Export project as JSON
if (exportButton) {
  exportButton.addEventListener("click", function () {
    const scenePrompts = [];

    document.querySelectorAll(".scene-prompt").forEach((field) => {
      scenePrompts.push({
        animal: field.dataset.animal,
        prompt: field.value
      });
    });

    const project = {
      projectName: "Ten Animals, Ten Words",
      studio: "Wildlife Music Studio",
      videoStyle: "Realistic cinematic wildlife documentary",
      lyrics: lyricsEditor ? lyricsEditor.value : "",
      scenes: scenePrompts,
      audioFile: "Ten Animals, Ten Words.m4a",
      note: "This export contains production planning data. It does not render a video."
    };

    const blob = new Blob(
      [JSON.stringify(project, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ten-animals-project.json";
    link.click();

    URL.revokeObjectURL(url);
  });
}

// Start the studio
displayScenes();
loadDemoAudio();
