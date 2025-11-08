"use client";

import { createTransaction, updateTransaction } from '@/actions/transaction';
import { transactionSchema } from '@/app/lib/schema';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useFetch from '@/hooks/use-fetch';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, ArrowUpCircle, ArrowDownCircle, Repeat, DollarSign } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ReceiptScanner from './receipt-scanner';

const AddTransactionForm = ({ accounts, categories, editMode = false, initialData = null, }) => {
  // Router
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
    editMode && initialData?{
      type: initialData.type,
      amount: initialData.amount.toString(),
      description: initialData.description,
      accountId: initialData.accountId,
      category: initialData.category,
      date: new Date(initialData.date),
      isRecurring: initialData.isRecurring,
      ...(initialData.recurringInterval && {
        recurringInterval: initialData.recurringInterval,
      }),
    }:
    {
      type: "EXPENSE",
      amount: "",
      description: "",
      accountId: Array.isArray(accounts)
      ? accounts.find((ac) => ac.isDefault)?.id
      : undefined,
      date: new Date(),
      isRecurring: false,
    },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

   const onSubmit = async (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    }

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
   };

   useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  // AI Receipt Scanner Handler
  const handleScanComplete = (scannedData) => {
    if(scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  return (
    <form className='space-y-6 max-w-3xl mx-auto' onSubmit={handleSubmit(onSubmit)}>
      {/* Header Section */}
      <div className="space-y-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {editMode ? "Edit Transaction" : "New Transaction"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {editMode ? "Update your transaction details" : "Add a new transaction to your account"}
        </p>
      </div>

      {/* AI Receipt Scanner */}
      {!editMode && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <ReceiptScanner onScanComplete={handleScanComplete} />
        </div>
      )}

      {/* Transaction Type Toggle - More Visual */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Transaction Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("type", "EXPENSE")}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-200 group",
              type === "EXPENSE"
                ? "border-red-500 bg-red-50 dark:bg-red-950/20 shadow-lg shadow-red-500/20"
                : "border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 bg-white dark:bg-gray-900"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                type === "EXPENSE" 
                  ? "bg-red-500 text-white" 
                  : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              )}>
                <ArrowDownCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className={cn(
                  "font-semibold",
                  type === "EXPENSE" ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"
                )}>
                  Expense
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Money going out</div>
              </div>
            </div>
            {type === "EXPENSE" && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setValue("type", "INCOME")}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-200 group",
              type === "INCOME"
                ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-lg shadow-green-500/20"
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-800 bg-white dark:bg-gray-900"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                type === "INCOME" 
                  ? "bg-green-500 text-white" 
                  : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              )}>
                <ArrowUpCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className={cn(
                  "font-semibold",
                  type === "INCOME" ? "text-green-700 dark:text-green-300" : "text-gray-700 dark:text-gray-300"
                )}>
                  Income
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Money coming in</div>
              </div>
            </div>
            {type === "INCOME" && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </div>
        {errors.type && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.type.message}
          </p>
        )}
      </div>
      
      {/* Amount and Account */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">          
            Amount
          </label>
          <div className="relative">
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("amount")}
              className="pl-10 h-12 text-lg font-semibold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg font-semibold">₹</span>
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Account</label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl bg-white dark:bg-gray-900 transition-colors">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {accounts.map((account) => (
                <SelectItem 
                  key={account.id} 
                  value={account.id}
                  className="rounded-lg"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{account.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                       ₹{parseFloat(account.balance).toFixed(2)}
                    </span>
                  </div>
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-lg py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-purple-50 dark:hover:bg-purple-950/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  + Create New Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.accountId.message}
            </p>
          )}
        </div>
      </div>

      {/* Category and Date */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={getValues("category")}
          >
            <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl bg-white dark:bg-gray-900 transition-colors">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {filteredCategories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id}
                  className="rounded-lg"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 pl-4 text-left font-normal border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 rounded-xl bg-white dark:bg-gray-900 transition-colors",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setValue("date", date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
        <Input 
          placeholder="Enter transaction description..." 
          {...register("description")} 
          className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl bg-white dark:bg-gray-900 transition-colors"
        />
        {errors.description && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Recurring Toggle - Enhanced Card */}
      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/10 dark:to-pink-950/10 p-5 transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
              isRecurring 
                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
            )}>
              <Repeat className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <label className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Recurring Transaction
              </label>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Set up an automatic schedule
              </div>
            </div>
          </div>
          <Switch
            checked={isRecurring}
            onCheckedChange={(checked) => setValue("isRecurring", checked)}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
          />
        </div>
      </div>

      {/* Recurring Interval - Animated Reveal */}
      {isRecurring && (
        <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Frequency</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="h-12 border-2 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-500 rounded-xl bg-white dark:bg-gray-900 transition-colors">
              <SelectValue placeholder="How often?" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="DAILY" className="rounded-lg">Daily</SelectItem>
              <SelectItem value="WEEKLY" className="rounded-lg">Weekly</SelectItem>
              <SelectItem value="MONTHLY" className="rounded-lg">Monthly</SelectItem>
              <SelectItem value="YEARLY" className="rounded-lg">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* Actions - Enhanced Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button 
          type="button"
          variant="outline"
          className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed" 
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </span>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Add Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddTransactionForm;