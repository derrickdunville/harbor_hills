"use client"

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {RemoveResidentForm} from "@/app/admin/homes/components/RemoveResidentForm";

export default function RemoveResidentModal() {
  const {id: homeId} = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();

  const backPath = `/admin/homes/${homeId}`;
  return (
    <RouteModal title="Unassign Boat Slip"
                onClosePath={backPath}
    >
      <RemoveResidentForm
        homeId={homeId as string}
        userId={userId!}
        onSuccessAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}