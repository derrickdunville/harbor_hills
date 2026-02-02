"use client"
import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import BoardManagementClient from "@/app/admin/board_seats/components/BoardManagementClient";
import {CreateBoardSeatForm} from "@/app/admin/board_seats/components/CreateBoardSeatForm";

export default function CreateBoardSeatHardPage() {
  const router = useRouter();
  const backPath = `/admin/board_seats/`;

  return (
    <>
      <BoardManagementClient />
      <RouteModal title="Create Board Seat"
                  onClosePath={backPath}
      >
        <CreateBoardSeatForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}