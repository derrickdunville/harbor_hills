"use client"
import { RouteModal } from "@/app/admin/components/RouteModal";
import {CreateBoardSeatForm} from "@/app/admin/board_seats/components/CreateBoardSeatForm";
import {useRouter} from "next/navigation";

export default function CreateBoardSeatModal() {
  const router = useRouter();
  return (
    <RouteModal title="Create Board Seat">
      <CreateBoardSeatForm
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}