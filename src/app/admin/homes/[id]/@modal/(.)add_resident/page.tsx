"use client"

import {useParams, useRouter} from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { AddResidentForm } from "@/app/admin/homes/components/AddResidentForm";

export default function AddResidentModal() {
  const { id: homeId } = useParams();
  const router = useRouter();

  return (
    <RouteModal title="Add Resident">
      <AddResidentForm
        homeId={homeId as string}
        onSuccessAction={() => {router.back()}}
      />
    </RouteModal>
  );
}