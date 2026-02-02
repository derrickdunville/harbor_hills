"use client"

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {UnassignBoatSlipForm} from "@/app/admin/homes/components/UnassignBoatSlipForm";

export default function UnassignBoatSlipModal() {
  const {id: homeId} = useParams();
  const searchParams = useSearchParams();
  const slipId = searchParams.get("slipId");
  const router = useRouter();
  const backPath = `/admin/homes/${homeId}`;

  return (
    <RouteModal title="Unassign Boat Slip"
                onClosePath={backPath}
    >
      <UnassignBoatSlipForm
        homeId={homeId as string}
        slipId={slipId!}
        onSuccessAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}