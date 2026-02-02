"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AssignBoatSlipForm} from "@/app/admin/homes/components/AssignBoatSlipForm";

export default function AssignBoatSlipModal() {
  const {id: homeId} = useParams();
  const router = useRouter();
  return (
    <RouteModal title="Assign Slip">
      <AssignBoatSlipForm
        homeId={homeId as string}
        onSuccessAction={() => {
          router.back()
        }}
      />
    </RouteModal>
  );
}