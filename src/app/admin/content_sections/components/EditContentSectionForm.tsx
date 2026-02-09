"use client"

import { Button, Field, Input, Stack, HStack, IconButton, Text, Spinner } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { ContentSection } from "@/app/admin/types/contentSection";
import { useEffect } from "react";

interface ContentSectionForm {
  section_key: string;
  badge_text: string;
  title: string;
  items: { value: string }[];
}

export function EditContentSectionForm({
  id,
  onSuccessAction,
  onCancelAction,
}: {
  id: string;
  onSuccessAction: () => void;
  onCancelAction: () => void;
}) {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const { data: section, isLoading } = useQuery<ContentSection>({
    queryKey: ["contentSection", id],
    queryFn: () => fetch(`${baseUrl}/api/content_sections/${id}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ContentSectionForm>({
    defaultValues: {
      section_key: "",
      badge_text: "",
      title: "",
      items: [{ value: "" }],
    },
  });

  useEffect(() => {
    if (!section) return;
    reset({
      section_key: section.section_key || "",
      badge_text: section.badge_text || "",
      title: section.title || "",
      items: section.items?.length ? section.items.map((item) => ({ value: item })) : [{ value: "" }],
    });
  }, [section, reset]);

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = async (data: ContentSectionForm) => {
    const payload = {
      section_key: data.section_key.trim(),
      badge_text: data.badge_text.trim(),
      title: data.title.trim(),
      items: data.items.map((item) => item.value),
    };

    const res = await fetch(`${baseUrl}/api/content_sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await queryClient.invalidateQueries({ queryKey: ["contentSections"] });
      await queryClient.invalidateQueries({ queryKey: ["contentSection", id] });
      onSuccessAction();
    }
  };

  if (isLoading && !section) {
    return (
      <HStack justify="center" py="10">
        <Spinner size="xl" />
      </HStack>
    );
  }

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="gray">
      <Field.Root invalid={!!errors.section_key}>
        <Field.Label>Section Key</Field.Label>
        <Input {...register("section_key", { required: "Key is required" })} placeholder="latest_notes" />
        <Field.ErrorText>{errors.section_key?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.badge_text}>
        <Field.Label>Badge Label</Field.Label>
        <Input {...register("badge_text", { required: "Badge text is required" })} />
        <Field.ErrorText>{errors.badge_text?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.title}>
        <Field.Label>Title</Field.Label>
        <Input {...register("title", { required: "Title is required" })} />
        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      <Stack gap="3">
        <HStack justify="space-between">
          <Text fontWeight="semibold">Items</Text>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<LuPlus />}
            type="button"
            onClick={() => append({ value: "" })}
          >
            Add item
          </Button>
        </HStack>
        <Stack gap="3">
          {fields.map((field, index) => (
            <HStack key={field.id} align="flex-start">
              <Field.Root flex="1">
                <Input {...register(`items.${index}.value`)} placeholder={`Item ${index + 1}`} />
              </Field.Root>
              <IconButton
                variant="ghost"
                aria-label="Remove item"
                type="button"
                onClick={() => remove(index)}
              >
                <LuTrash2 />
              </IconButton>
            </HStack>
          ))}
        </Stack>
      </Stack>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Update Section</Button>
      </HStack>
    </Stack>
  );
}
