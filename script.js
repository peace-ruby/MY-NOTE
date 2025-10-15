let currentIndex = null;

window.onload = function () {
  displayNotes();
};

function saveNote() {
  let noteInput = document.getElementById("noteInput").value.trim();
  if (noteInput === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  let lines = noteInput.split("\n");
  let title = lines[0];
  let content = lines.slice(1).join("\n");

  let now = new Date().toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });

  if (currentIndex !== null) {
    let note = notes.splice(currentIndex, 1)[0];
    note.title = title;
    note.content = content;
    note.date = now;

    notes.unshift(note);
    currentIndex = 0;
  } else {
    let newNote = { title, content, date: now };
    notes.unshift(newNote);
    currentIndex = 0;
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

function displayNotes() {
  let notesContainer = document.getElementById("notesItems");
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.className = "note";

    let noteWrapper = document.createElement("div");

    let noteTitle = document.createElement("div");
    noteTitle.className = "note-title";
    noteTitle.innerText = note.title || "Untitled Note";

    let noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.innerText = note.content || "No additional text...";

    let noteDate = document.createElement("div");
    noteDate.className = "note-date";
    noteDate.innerText = note.date || "";

    noteWrapper.appendChild(noteTitle);
    noteWrapper.appendChild(noteContent);
    noteWrapper.appendChild(noteDate);

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/images/delete.png";
    deleteIcon.alt = "delete note";
    deleteIcon.width = 20;
    deleteIcon.style.cursor = "pointer";
    deleteIcon.style.opacity = "0.7";
    deleteIcon.onmouseover = () => (deleteIcon.style.opacity = "1");
    deleteIcon.onmouseout = () => (deleteIcon.style.opacity = "0.7");

    deleteIcon.onclick = function (event) {
      event.stopPropagation();
      if (confirm("Do you want to delete this note?")) {
        deleteNote(index);
      }
    };

    div.onclick = function () {
      loadNote(index);
    };

    div.appendChild(noteWrapper);
    div.appendChild(deleteIcon);

    notesContainer.appendChild(div);
  });
}

function loadNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let fullNote =
    (notes[index].title || "") + "\n" + (notes[index].content || "");
  document.getElementById("noteInput").value = fullNote.trim();
  currentIndex = index;
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();

  if (currentIndex === index) {
    document.getElementById("noteInput").value = "";
    currentIndex = null;
  }
}

document.getElementById("addNoteBtn").onclick = addNewNote;
function addNewNote() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  let now = new Date().toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });

  let newNote = {
    title: "",
    content: "",
    date: now,
  };

  notes.unshift(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();

  loadNote(0);
}

const noteBox = document.getElementById("noteInput");
let timeout;

noteBox.addEventListener("input", () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveNote();
  }, 1000);
});


const handle = document.getElementById("resizeHandle");
const container = document.querySelector(".resize-container");

let isResizing = false;
let startX, startWidth;

handle.addEventListener("mousedown", (e) => {
  isResizing = true;
  startX = e.clientX;
  startWidth = container.offsetWidth;
  document.body.style.userSelect = "none"; 
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const dx = e.clientX - startX;
  const newWidth = startWidth + dx;

  const minWidth = parseFloat(getComputedStyle(container).minWidth);
  const maxWidth = parseFloat(getComputedStyle(container).maxWidth);

  if (newWidth >= minWidth && newWidth <= maxWidth) {
    container.style.width = `${newWidth}px`;
  }
});

document.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.userSelect = "";
});
