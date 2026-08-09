import axios from "axios";
import type { Note, NewNote } from "../types/note";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

const noteInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchNotes(
  search: string = "",
  page: number = 1,
  perPage: number = 12
): Promise<NotesResponse> {
  const response = await noteInstance.get<NotesResponse>("/notes", {
    params: {
      ...(search.trim() ? { search } : {}),
      page,
      perPage,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(newNoteData: NewNote): Promise<Note> {
  const response = await noteInstance.post<Note>("/notes", newNoteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}