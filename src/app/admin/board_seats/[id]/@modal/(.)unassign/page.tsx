"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {UnassignMemberForm} from "@/app/admin/board_seats/components/UnassignMemberForm";

export default function UnassignMemberModal() {
  const router = useRouter();
  const { id: boardSeatId } = useParams();
  const backPath = `/admin/board_seats/${boardSeatId}`;

  return (
    <RouteModal title="Unassign Member"
                onClosePath={backPath}
    >
      <UnassignMemberForm
        boardSeatId={boardSeatId as string}
        onSuccessAction={() => router.back()}
      />
    </RouteModal>
  );
}