document.addEventListener('DOMContentLoaded', function() {
  const saveNoteButton = document.getElementById('save-note');
  const newNoteContainer = document.getElementById('new-note');
  const savedNotesContainer = document.getElementById('saved-notes');
  const boldButton = document.getElementById('bold-button');
  const underlineButton = document.getElementById('underline-button');
  const strikeThroughButton = document.getElementById('strikeThrough-button');
  const highlightButton = document.getElementById('highlight-button');
  const linkButton = document.getElementById('link-button');
  const colorPicker = document.getElementById('color-picker');
  const colorButton = document.getElementById('color-button');
  const superscriptButton = document.getElementById('superscript-button');
  const subscriptButton = document.getElementById('subscript-button');
  const clearFormattingButton = document.getElementById('clear-formatting-button');

  function formatText(command, value = null) {
      document.execCommand(command, false, value);
  }

  function saveNote() {
      const noteHTML = newNoteContainer.innerHTML.trim();
      if (noteHTML) {
          chrome.storage.sync.get({ notes: [] }, function(data) {
              const notes = data.notes;
              notes.push(noteHTML);
              chrome.storage.sync.set({ notes: notes }, function() {
                  displayNotes();
                  newNoteContainer.innerHTML = '';
              });
          });
      }
  }

  function deleteNote(index) {
      chrome.storage.sync.get({ notes: [] }, function(data) {
          const notes = data.notes;
          notes.splice(index, 1);
          chrome.storage.sync.set({ notes: notes }, function() {
              displayNotes();
          });
      });
  }

  function displayNotes() {
      savedNotesContainer.innerHTML = '';
      chrome.storage.sync.get({ notes: [] }, function(data) {
          const notes = data.notes;
          notes.forEach(function(note, index) {
              const noteItem = document.createElement('div');
              noteItem.className = 'note-item';
              noteItem.innerHTML = note;

              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.addEventListener('click', function() {
                  deleteNote(index);
              });
              noteItem.appendChild(deleteButton);

              savedNotesContainer.appendChild(noteItem);
          });
      });
  }

  boldButton.addEventListener('click', function() {
      formatText('bold');
  });

  underlineButton.addEventListener('click', function() {
      formatText('underline');
  });

  strikeThroughButton.addEventListener('click', function() {
      formatText('strikeThrough');
  });

  highlightButton.addEventListener('click', function() {
      formatText('backColor', 'yellow');
  });

  linkButton.addEventListener('click', function() {
      const url = prompt('Enter the URL');
      if (url) {
          formatText('createLink', url);
      }
  });

  colorButton.addEventListener('click', function() {
      const color = colorPicker.value;
      formatText('foreColor', color);
  });

  superscriptButton.addEventListener('click', function() {
      formatText('superscript');
  });

  subscriptButton.addEventListener('click', function() {
      formatText('subscript');
  });

  clearFormattingButton.addEventListener('click', function() {
      formatText('removeFormat');
  });

  saveNoteButton.addEventListener('click', saveNote);
  displayNotes();
});
