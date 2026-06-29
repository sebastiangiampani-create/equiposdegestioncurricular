const chapters = [
  {
    label: "Capítulo 1",
    title: "No es un cargo, es una forma de mirar",
    audio: "audio/capitulo-1.mp3",
    summary: "Este capítulo invita a repensar la gestión curricular no como una jerarquía individual, sino como una función colectiva centrada en el liderazgo pedagógico. Propone el ejercicio de revisitar la escuela para desnaturalizar las estructuras tradicionales —la denominada gramática escolar— que suelen limitar las transformaciones profundas en la enseñanza. A través de la construcción de una mirada institucional compartida, los equipos directivos y asesores pueden intervenir no desde el saber disciplinar, sino mediante la formulación de preguntas potentes que habiliten la reflexión sobre la práctica docente."
  },
  {
    label: "Capítulo 2",
    title: "El currículum no vive en los papeles",
    audio: "audio/capitulo-2.mp3",
    summary: "Este capítulo invita a repensar el currículum más allá del documento escrito, definiéndolo como una experiencia formativa integral que cobra vida en las acciones cotidianas del aula. Explora la tensión entre la intención normativa y la realidad pedagógica, posicionando al Proyecto Curricular Institucional como una herramienta de decisión política y colectiva. También presenta marcos conceptuales para comprender cómo la escuela transforma la norma en decisiones pedagógicas concretas."
  },
  {
    label: "Capítulo 3",
    title: "No todo es un problema",
    audio: "audio/capitulo-3.mp3",
    summary: "Este capítulo profundiza en el contexto problematizador como motor de laboratorios de aprendizaje significativos. Propone dejar atrás los temas meramente descriptivos para enfocarse en situaciones complejas que generen preguntas poderosas, abiertas y genuinas. Además, analiza distintos grados de integración de saberes, ofreciendo criterios para diseñar propuestas pedagógicas colaborativas y con sentido institucional."
  },
  {
    label: "Capítulo 4",
    title: "Mover el banco, mover la escuela",
    audio: "audio/capitulo-4.mp3",
    summary: "Este capítulo invita a repensar la escuela secundaria a partir de las estructuras que condicionan el trabajo docente y la enseñanza. Recupera la tensión entre trayectorias teóricas y reales, proponiendo el avance continuo y la organización por niveles como respuestas pedagógicas frente a la repitencia. También aborda la electividad y la autonomía estudiantil como capacidades que deben enseñarse, acompañarse y sostenerse institucionalmente."
  },
  {
    label: "Capítulo 5",
    title: "Planificar para mirar la enseñanza",
    audio: "audio/capitulo-5.mp3",
    summary: "Este capítulo recupera la planificación como una hipótesis de trabajo flexible y no como un contrato rígido. Presenta un modelo organizado en punto de partida, indagación, producción y evaluación, bajo la lógica del diseño inverso. Para los equipos de gestión, el plan se vuelve una ventana para observar decisiones de enseñanza, acompañar a los docentes y construir acuerdos pedagógicos con mayor coherencia institucional."
  },
  {
    label: "Capítulo 6",
    title: "La enseñanza bajo la lupa",
    audio: "audio/capitulo-6.mp3",
    summary: "Este capítulo pone el foco en la enseñanza como objeto de análisis institucional. Diferencia los temas disciplinares de los contenidos escolares y propone planificar desde los aprendizajes esperados y las evidencias de comprensión. También analiza la demanda cognitiva de las tareas y el valor de las consignas como herramientas para promover autonomía, producción propia y aprendizajes más profundos."
  }
];

let currentIndex = 0;

const chapterLabel = document.getElementById("chapterLabel");
const episodeTitle = document.getElementById("episodeTitle");
const audioPlayer = document.getElementById("audioPlayer");
const episodeSummary = document.getElementById("episodeSummary");
const summaryChapter = document.getElementById("summaryChapter");
const chapterButtons = document.querySelectorAll(".chapter-btn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function setPlayIcon() {
  playBtn.textContent = audioPlayer.paused ? "▶" : "Ⅱ";
}

function updateProgress() {
  const duration = audioPlayer.duration || 0;
  const current = audioPlayer.currentTime || 0;
  const percent = duration ? (current / duration) * 100 : 0;

  progressBar.value = percent;
  progressBar.style.setProperty("--progress", `${percent}%`);
  currentTime.textContent = formatTime(current);
  durationTime.textContent = formatTime(duration);
}

function renderChapter(index, autoplay = false) {
  const chapter = chapters[index];

  currentIndex = index;

  chapterLabel.textContent = chapter.label;
  episodeTitle.textContent = chapter.title;
  audioPlayer.src = chapter.audio;
  episodeSummary.textContent = chapter.summary;
  summaryChapter.textContent = chapter.label;

  chapterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  chapterButtons[index].classList.add("active");

  progressBar.value = 0;
  progressBar.style.setProperty("--progress", "0%");
  currentTime.textContent = "0:00";
  durationTime.textContent = "0:00";
  setPlayIcon();

  if (autoplay) {
    audioPlayer.play();
  }
}

chapterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.index);
    renderChapter(index, true);
  });
});

prevBtn.addEventListener("click", () => {
  const newIndex = currentIndex === 0 ? chapters.length - 1 : currentIndex - 1;
  renderChapter(newIndex, true);
});

nextBtn.addEventListener("click", () => {
  const newIndex = currentIndex === chapters.length - 1 ? 0 : currentIndex + 1;
  renderChapter(newIndex, true);
});

playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
});

progressBar.addEventListener("input", () => {
  const duration = audioPlayer.duration || 0;
  const percent = Number(progressBar.value);

  if (duration) {
    audioPlayer.currentTime = (percent / 100) * duration;
  }
});

audioPlayer.addEventListener("loadedmetadata", updateProgress);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("play", setPlayIcon);
audioPlayer.addEventListener("pause", setPlayIcon);

audioPlayer.addEventListener("ended", () => {
  const newIndex = currentIndex === chapters.length - 1 ? 0 : currentIndex + 1;
  renderChapter(newIndex, false);
});

renderChapter(0, false);
