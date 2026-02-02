"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {UnassignHomeForm} from "@/app/admin/boat_slips/components/UnassignHomeForm";

export default function UnassignHomeModal() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <RouteModal title="Unassign Boat Slip">
      <UnassignHomeForm
        slipId={id as string}
        onSuccessAction={() => router.back()}
      />
    </RouteModal>
  );
}