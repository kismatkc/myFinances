
"use client"

import React from 'react';
import { z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import API from '@/app/axios';
import useCreateNewAccount from "@/hooks/accounts/create-new-account-hook"
import Temp from './select';

const formSchema = z.object({
 date: z.coerce.date(),
 accountId: z.string(),
 categoryId: z.string(),
payee: z.string(),
amount: z.string(),
notes: z.string().optional().nullable()
 
   
});

export type formData = z.infer<typeof formSchema>;




const NewTransactionForm: React.FC = () => {
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      accountId: "",
      categoryId: "",
      payee: "",
      amount: "",
      notes: "",
    },
  });
    


  const mutation = useCreateNewAccount();

  


  const onSubmit: SubmitHandler<formData> = (data) => {


    // mutation.mutate(data);
    
  };

 
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={formMethods.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
               <Temp/>
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
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

export default NewTransactionForm;
