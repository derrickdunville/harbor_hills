"use client"

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {RemoveResidentForm} from "@/app/admin/homes/components/RemoveResidentForm";

export default function RemoveResidentModal() {
  const {id: homeId} = useParams();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const router = useRouter();

  return (
    <RouteModal title="Unassign Boat Slip">
      <RemoveResidentForm
        homeId={homeId as string}
        userId={userId!}
        onSuccessAction={() => router.back()}
      />
    </RouteModal>
  );
}