"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AssignBoatSlipForm} from "@/app/admin/homes/components/AssignBoatSlipForm";

export default function AssignBoatSlipModal() {
  const {id: homeId} = useParams();
  const router = useRouter();

  const backPath = `/admin/homes/${homeId}`;
  return (
    <RouteModal title="Add Resident"
                onClosePath={backPath}
    >
      <AssignBoatSlipForm
        homeId={homeId as string}
        onSuccessAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}