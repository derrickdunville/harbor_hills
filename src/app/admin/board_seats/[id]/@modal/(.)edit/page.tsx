"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import {EditBoardSeatForm} from "@/app/admin/board_seats/components/EditBoardSeatForm";

export default function EditBoardSeatModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <RouteModal title={`Edit Board Seat #${id}`}>
      <EditBoardSeatForm
        boardSeatId={id}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}