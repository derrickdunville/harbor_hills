"use client"
import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {CreateBoatSlipForm} from "@/app/admin/boat_slips/components/CreateBoatSlipForm";
import BoatSlipsPageClient from "@/app/admin/boat_slips/components/BoatSlipsPageClient";

export default function CreateBoatSlipHardPage() {
  const router = useRouter();
  const backPath = `/admin/boat_slips`;

  return (
    <>
      <BoatSlipsPageClient />
      <RouteModal title="Add Boat Slip"
        onClosePath={backPath}
      >
        <CreateBoatSlipForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}