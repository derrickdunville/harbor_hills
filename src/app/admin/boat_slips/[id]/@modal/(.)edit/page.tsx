"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import {EditBoatSlipForm} from "@/app/admin/boat_slips/components/EditBoatSlipForm";

export default function EditBoatSlipModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <RouteModal title={`Edit Boat Slip #${id}`}>
      <EditBoatSlipForm
        id={id}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}