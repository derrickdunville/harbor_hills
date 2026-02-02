"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AssignHomeForm} from "@/app/admin/boat_slips/components/AssignHomeForm";

export default function AssignHomeModal() {
  const {id: slipId} = useParams();
  const router = useRouter();

  return (
    <RouteModal title="Assign Slip">
      <AssignHomeForm
        slipId={slipId as string}
        onSuccessAction={() => router.back()}
      />
    </RouteModal>
  );
}