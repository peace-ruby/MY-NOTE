window.onload = function() {
  displayNotes();
}

function saveNote() {
  let noteInput = document.getElementById("noteInput").value.trim();
  if (noteInput === "") {
    alert("Note cannot be empty!");
    return;
  }

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  let lines = noteInput.split("\n");
  let title = lines[0] || "Untitled Note";
  let content = lines.slice(1).join("\n");

  notes.push({ title: title, content: content });
  localStorage.setItem("notes", JSON.stringify(notes));
  document.getElementById("noteInput").value = "";
  displayNotes();
}

function displayNotes() {
  let notesList = document.getElementById("notesList");
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesList.innerHTML = "<h2>Saved Notes</h2>";

  notes.forEach((note, index) => {
    let div = document.createElement("div");
    div.className = "note";

    let noteTitle = document.createElement("div");
    noteTitle.className = "note-title";
    noteTitle.innerText = note.title;

    let noteContent = document.createElement("div");
    noteContent.className = "note-content";
    noteContent.innerText = note.content || "No additional text...";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "✕";
    deleteBtn.onclick = function(event) {
      event.stopPropagation();
      deleteNote(index);
    };

    div.onclick = function() {
      loadNote(index);
    };

    div.appendChild(noteTitle);
    div.appendChild(noteContent);
    div.appendChild(deleteBtn);
    notesList.appendChild(div);
  });
}

function loadNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let fullNote = notes[index].title + "\n" + notes[index].content;
  document.getElementById("noteInput").value = fullNote;
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}


