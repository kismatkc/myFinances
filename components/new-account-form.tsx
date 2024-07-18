
"use client"

import React from 'react';
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import API from '@/app/axios';
import useCreateNewAccount from "@/hooks/create-new-account-hook"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).max(30, {
    message: "Username must be at most 30 characters.",
  }),
});

export type formData = z.infer<typeof formSchema>;


export const createUser = async (data: formData)=> {
   
   const response = await API.post("/account",data);
  console.log(response.data);
return response.data;
}


const NewAccountForm: React.FC = () => {
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  });
    


  const mutation = useCreateNewAccount();


  const onSubmit: SubmitHandler<formData> = (data) => {

    mutation.mutate(data);
    
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
          {mutation.isPending ? "Submitting" : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default NewAccountForm;
