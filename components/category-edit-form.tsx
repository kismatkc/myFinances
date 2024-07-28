"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import API from "@/app/axios";
import useUpdateAccount from "@/hooks/categories/update-category-hook";
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must be at most 30 characters.",
    }),
});

export type formData = z.infer<typeof formSchema>;

const EditAccountForm: React.FC = () => {
  const { id, currentFieldValue } = useAddNewAccountModal();
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentFieldValue,
    },
  });

  const mutation = useUpdateAccount();

  const onSubmit: SubmitHandler<formData> = (data) => {
    mutation.mutate({ id, name: data.name });
  };

  const watchName = formMethods.watch("name");
  const isNameChanged = watchName !== currentFieldValue;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={formMethods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage>
                {formMethods.formState.errors.name?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        {!isNameChanged && (
          <p className="text-red-700">The new name has to be different</p>
        )}
        <Button
          type="submit"
          variant="outline"
          disabled={mutation.isPending || !isNameChanged}
        >
          {mutation.isPending ? "Updating" : "Update"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default EditAccountForm;
