"use client"

import {useParams, useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {AddResidentForm} from "@/app/admin/homes/components/AddResidentForm";

export default function AddResidentModal() {
  const {id: homeId} = useParams();
  const router = useRouter();
  const backPath = `/admin/homes/${homeId}`;

  return (
    <RouteModal title="Add Resident"
                onClosePath={backPath}
    >
      <AddResidentForm
        homeId={homeId as string}
        onSuccessAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}