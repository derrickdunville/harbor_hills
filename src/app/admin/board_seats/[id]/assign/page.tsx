"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AssignMemberForm} from "@/app/admin/board_seats/components/AssignMemberForm";

export default function AssignMemberModal() {
  const {id: boardSeatId} = useParams();
  const router = useRouter();
  const backPath = `/admin/board_seats/${boardSeatId}`;

  return (
    <RouteModal title="Assign Member"
                onClosePath={backPath}
    >
      <AssignMemberForm
        boardSeatId={boardSeatId as string}
        onSuccessAction={()=> router.push(backPath)}
      />
    </RouteModal>
  );
}