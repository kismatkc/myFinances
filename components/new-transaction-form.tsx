"use client";

import React from "react";
import { array, z } from "zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import API from "@/app/axios";
import useCreateNewTransaction from "@/hooks/transactions/create-new-transaction-hook";
import Select from "./select-for-sheets";
import DatePicker from "./date-picker";
import { Textarea } from "./ui/textarea";
import InputAmount from "./input-amount";

const formSchema = z.object({
  date: z.coerce
    .date()
    .nullable()
    .optional()
    .refine((val) => val instanceof Date, {
      message: "Please select a date",
    }),

  accountId: z.object({ label: z.string(), value: z.string() }),
  categoryId: z.object({ label: z.string(), value: z.string() }),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().optional(),
});

export type formData = z.infer<typeof formSchema>;

type transactionFOrmProps = {
  disabled: boolean;
  categoryOptions: { label: string; value: string }[];
  onCreateCategory: ({ name }: { name: string }) => void;
  accountOptions: { label: string; value: string }[];
  onCreateAccount: ({ name }: { name: string }) => void;
};

const NewTransactionForm = ({
  disabled,
  categoryOptions,
  onCreateCategory,
  accountOptions,
  onCreateAccount,
}: transactionFOrmProps) => {
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: null as unknown as Date,
      accountId: {},
      categoryId: {},
      payee: "",
      amount: "",
      notes: "",
    },
  });

  const mutation = useCreateNewTransaction();

  const onSubmit: SubmitHandler<formData> = (data) => {
    const stringAmountToNumber = data.amount.toString();

    mutation.mutate({ ...data, amount: stringAmountToNumber });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={formMethods.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  date={field.value as Date}
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  options={accountOptions}
                  value={field.value}
                  onSelect={field.onChange}
                  onCreateAccount={onCreateAccount}
                  disabled={disabled}
                  placeholder="Enter Account name"
                />
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  options={categoryOptions}
                  value={field.value}
                  onSelect={field.onChange}
                  onCreateAccount={onCreateCategory}
                  disabled={disabled}
                  placeholder="Enter cateogry name"
                />
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <InputAmount
                  value={field.value}
                  onInput={field.onChange}
                  placeHolder="0.00"
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="payee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Enter payee"
                  {...field}
                />
              </FormControl>

              <FormMessage>
                {formMethods.formState.errors.accountId?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={formMethods.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter notes" />
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
