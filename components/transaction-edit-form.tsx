"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import API from "@/app/axios";
import useUpdateTransaction from "@/hooks/transactions/update-transaction-hook";
import useAddNewAccountModal from "@/hooks/account-sheet-modal";

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

import Select from "./select-for-sheets";
import DatePicker from "./date-picker";
import { Textarea } from "./ui/textarea";
import InputAmount from "./input-amount";
import { convertToMiliamounts } from "@/lib/utils";

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
type formDataForApi = {
  date: string;
  accountId: { label: string; value: string };
  categoryId: { label: string; value: string };
  payee: string;
  amount: string;
  notes: string;
  _id: string;
};
type transactionFOrmProps = {
  disabled: boolean;
  categoryOptions: { label: string; value: string }[];
  onCreateCategory: ({ name }: { name: string }) => void;
  accountOptions: { label: string; value: string }[];
  onCreateAccount: ({ name }: { name: string }) => void;
};

const EditTransactionForm = ({
  disabled,
  categoryOptions,
  onCreateCategory,
  accountOptions,
  onCreateAccount,
}: transactionFOrmProps) => {
  const { defaultValues } = useAddNewAccountModal();

  //Could have used the achtal Date type from begjnning but next time
  // let formDefaultValues = {...defaultValues,date}
  const formMethods = useForm<formData>({
    resolver: zodResolver(formSchema),
    //Lots of unexpected huddent properties sk clulsnkt lrovide the full tyoe for the default values for eg name and_id
    defaultValues: {
      date: new Date(defaultValues.date),
      //@ts-ignore
      accountId: {
        //@ts-ignore

        label: defaultValues.accountId.name,
        //@ts-ignore

        value: defaultValues.accountId._id,
      },
      categoryId: {
        //@ts-ignore
        label: defaultValues.categoryId.name,
        //@ts-ignore
        value: defaultValues.categoryId._id,
      },
      notes: defaultValues.notes,
      payee: defaultValues.payee,
      amount: defaultValues.amount.toString(),
    },
  });

  const mutation = useUpdateTransaction();

  const onSubmit: SubmitHandler<formDataForApi> = (data) => {
    const stringAmountToNumber = convertToMiliamounts(data.amount);
    const dateToString = data.date.toString();

    mutation.mutate({
      ...data,
      amount: stringAmountToNumber,
      date: dateToString,
      _id: defaultValues._id,
    });
  };

  const { isDirty } = formMethods.formState;

  return (
    <FormProvider {...formMethods}>
      {/* @ts-ignore */}
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

        <Button type="submit" variant="outline" disabled={!isDirty}>
          {mutation.isPending ? "Submitting" : "Submit"}
        </Button>
        {!isDirty && (
          <div className="text-red-900 text-sm">
            Please modify the transcation in order to submit
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default EditTransactionForm;
