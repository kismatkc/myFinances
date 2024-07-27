
"use client"

import React from 'react';
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import API from '@/app/axios';
import useUpdateAccount from "@/hooks/accounts/update-account-hook"
import useAddNewAccountModal  from "@/hooks/accounts/account-sheet-modal";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(30, {
    message: "Username must be at most 30 characters.",
  })
   
});

export type formData = z.infer<typeof formSchema>;





const EditAccountForm: React.FC = () => {
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    
      name: ""
    }
  });
  let { id
          } = useAddNewAccountModal();



  const mutation = useUpdateAccount();


  const onSubmit: SubmitHandler<formData> = (data) => {

    mutation.mutate(id=12);

  };


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
        <Button type="submit" variant="outline" disabled={mutation.isPending}>
          {mutation.isPending ? "Updating" : "Update"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default EditAccountForm;
