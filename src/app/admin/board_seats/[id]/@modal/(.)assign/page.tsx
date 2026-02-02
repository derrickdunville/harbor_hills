"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AssignMemberForm} from "@/app/admin/board_seats/components/AssignMemberForm";

export default function AssignMemberModal() {
  const {id: boardSeatId} = useParams();
  const router = useRouter();

  return (
    <RouteModal title="Assign Member">
      <AssignMemberForm
        boardSeatId={boardSeatId as string}
        onSuccessAction={()=> router.back()}
      />
    </RouteModal>
  );
}