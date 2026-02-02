"use client"

import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateContentSectionForm } from "@/app/admin/content_sections/components/CreateContentSectionForm";
import ContentSectionsPageClient from "@/app/admin/content_sections/components/ContentSectionsPageClient";

export default function CreateContentSectionHardPage() {
  const router = useRouter();
  const backPath = "/admin/content_sections";

  return (
    <>
      <ContentSectionsPageClient />
      <RouteModal title="Add Content Section" onClosePath={backPath}>
        <CreateContentSectionForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}
