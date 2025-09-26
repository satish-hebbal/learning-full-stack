'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';

interface NoteEditorProps {
  note: Note | null;
  isEditing: boolean;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onStartEditing: () => void;
  onSaveNote: () => void;
}

export default function NoteEditor({ 
  note, 
  isEditing, 
  onUpdateNote, 
  onStartEditing, 
  onSaveNote 
}: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (note) {
      onUpdateNote(note.id, { title: value });
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (note) {
      onUpdateNote(note.id, { content: value });
    }
  };

  const handleSave = () => {
    onSaveNote();
  };

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Select a note to view
          </h3>
          <p className="text-gray-300">
            Choose a note from the sidebar or create a new one
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-black">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Untitled Note"
                className="w-full text-2xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-400"
                autoFocus
              />
            ) : (
              <h1 className="text-2xl font-bold text-white">
                {title || 'Untitled Note'}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={onStartEditing}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-300 mt-2">
          Last updated: {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(note.updatedAt)}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your note..."
            className="w-full h-full resize-none border-none outline-none bg-transparent text-white placeholder-gray-400 text-lg leading-relaxed"
            autoFocus
          />
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-white text-lg leading-relaxed">
              {content || (
                <span className="text-gray-400 italic">
                  No content yet. Click Edit to start writing.
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
