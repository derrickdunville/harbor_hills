"use client"

import {useParams, useRouter} from "next/navigation";
import {UnassignHomeForm} from "@/app/admin/boat_slips/components/UnassignHomeForm";
import {RouteModal} from "@/app/admin/components/RouteModal";

export default function UnassignModal() {
  const router = useRouter();
  const {id} = useParams();
  const backPath = `/admin/boat_slips/${id}`;

  return (
    <RouteModal title={"Unassign Home"}
                onClosePath={backPath}
    >
      <UnassignHomeForm
        slipId={id as string}
        onSuccessAction={() => {
          router.push(backPath)
        }}
      />
    </RouteModal>
  );
}