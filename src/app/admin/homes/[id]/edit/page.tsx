"use client"

import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {use} from "react";
import {EditHomeForm} from "@/app/admin/homes/components/EditHomeForm";

export default function EditHomeHardPage({
                                               params
                                             }: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const {id} = use(params);

  const backPath = `/admin/homes/${id}`;
  return (
    <>
      <RouteModal title={`Edit Boat Slip #${id}`} onClosePath={backPath}>
        <EditHomeForm
          id={id as string}
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}