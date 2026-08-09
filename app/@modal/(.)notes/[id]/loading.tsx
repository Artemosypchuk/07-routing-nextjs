"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  const handleClose = () => router.back();
  return (
    <Modal isOpen={true} onClose={handleClose}>
      <p>Loading note details...</p>
    </Modal>
  );
}
