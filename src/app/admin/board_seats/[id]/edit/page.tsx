"use client"

import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {use} from "react";
import {EditBoardSeatForm} from "@/app/admin/board_seats/components/EditBoardSeatForm";

export default function EditBoardSeatHardPage({
                                               params
                                             }: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const {id} = use(params);
  const backPath = `/admin/board_seats/${id}`;

  return (
    <>
      <RouteModal title={`Edit Board Seat #${id}`}
                  onClosePath={backPath}
      >
        <EditBoardSeatForm
          boardSeatId={id as string}
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}