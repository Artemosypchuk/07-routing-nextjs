"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const handleClose = () => router.back();

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {isLoading ?
        <p>Loading note details...</p>
      : isError ?
        <p>Failed to load note details. Please try again later.</p>
      : note ?
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {note.tag && <span>Tag: {note.tag}</span>}
        </div>
      : <p>Note not found.</p>}
    </Modal>
  );
}
