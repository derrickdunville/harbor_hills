"use client"
import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateBoatSlipForm } from "../../components/CreateBoatSlipForm";

export default function CreateBoatSlipModal() {
  const router = useRouter();
  return (
    <RouteModal title="Add Boat Slip">
      <CreateBoatSlipForm onSuccessAction={() => router.back()} onCancelAction={() => router.back()} />
    </RouteModal>
  );
}