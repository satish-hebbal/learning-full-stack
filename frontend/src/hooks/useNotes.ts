'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from backend API on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // First, get all note titles
        const titlesResponse = await fetch('http://localhost:5000/title');
        console.log(titlesResponse);
        if (titlesResponse.ok) {
          const titles = await titlesResponse.json();
          
          // Then fetch each note's content using the /data endpoint
          const notesPromises = titles.map(async (title: string, index: number) => {
            try {
              const dataResponse = await fetch(`http://localhost:5000/data?title=${encodeURIComponent(title)}`);
              if (dataResponse.ok) {
                const noteData = await dataResponse.json();
                return {
                  id: `note-${index}`,
                  title: noteData.title,
                  content: noteData.content,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };
              }
              return null;
            } catch (error) {
              console.error(`Failed to fetch data for note "${title}":`, error);
              return null;
            }
          });
          
          const fetchedNotes = await Promise.all(notesPromises);
          const validNotes = fetchedNotes.filter(note => note !== null);
          setNotes(validNotes);
        }
      } catch (error) {
        console.error('Failed to fetch notes from backend:', error);
        // Fallback to localStorage if backend is not available
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt),
          }));
          setNotes(parsedNotes);
        }
      }
    };

    fetchNotes();
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
    if (selectedNote?.id === id) {
      setSelectedNote(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveNote = () => {
    setIsEditing(false);
  };

  return {
    notes,
    selectedNote,
    isEditing,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    startEditing,
    saveNote,
  };
};
