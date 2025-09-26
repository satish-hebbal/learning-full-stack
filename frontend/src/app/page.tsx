'use client';

import { useNotes } from '@/hooks/useNotes';
import NotesList from '@/components/NotesList';
import NoteEditor from '@/components/NoteEditor';

export default function Home() {
  const {
    notes,
    selectedNote,
    isEditing,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    startEditing,
    saveNote,
  } = useNotes();

  return (
    <div className="h-screen flex bg-black">
      <NotesList
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={selectNote}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
      />
      <NoteEditor
        note={selectedNote}
        isEditing={isEditing}
        onUpdateNote={updateNote}
        onStartEditing={startEditing}
        onSaveNote={saveNote}
      />
    </div>
  );
}
