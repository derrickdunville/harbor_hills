"use client"

import { Button, Field, Input, Stack, HStack, IconButton, Text } from "@chakra-ui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface ContentSectionForm {
  section_key: string;
  badge_text: string;
  title: string;
  items: { value: string }[];
}

export function CreateContentSectionForm({
  onSuccessAction,
  onCancelAction,
}: {
  onSuccessAction: () => void;
  onCancelAction: () => void;
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<ContentSectionForm>({
    defaultValues: {
      items: [{ value: "" }, { value: "" }, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const onSubmit = async (data: ContentSectionForm) => {
    const payload = {
      section_key: data.section_key.trim(),
      badge_text: data.badge_text.trim(),
      title: data.title.trim(),
      items: data.items.map((item) => item.value),
    };

    const res = await fetch(`${baseUrl}/api/content_sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await queryClient.invalidateQueries({ queryKey: ["contentSections"] });
      onSuccessAction();
    }
  };

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
        <Button type="submit" loading={isSubmitting}>Create Section</Button>
      </HStack>
    </Stack>
  );
}
