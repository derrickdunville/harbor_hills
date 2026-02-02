"use client"

import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {EditBoatSlipForm} from "@/app/admin/boat_slips/components/EditBoatSlipForm";
import {use} from "react";

export default function EditBoatSlipHardPage({
                                                     params
                                                   }: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const {id} = use(params);
  const backPath = `/admin/boat_slips/${id}`;

  return (
    <>
      <RouteModal title={`Edit Boat Slip #${id}`}
                  onClosePath={backPath}
      >
        <EditBoatSlipForm
          id={id as string}
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}