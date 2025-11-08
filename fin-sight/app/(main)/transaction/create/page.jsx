import { getUserAccounts } from '@/actions/dashboard'
import { defaultCategories } from '@/data/categories'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import AddTransactionForm from '../_components/transaction-form'
import { getTransaction } from '@/actions/transaction'

const AddTransactionPage = async ({searchParams}) => {
  const accounts = await getUserAccounts();
  
  const editId = searchParams?.edit;
  
  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-medium tracking-tight gradient-title">
            {editId ? "Edit" : "Add"} Transaction
          </h1>
          {!editId && ( // Only show import button when not editing
            <Link href="/transaction/import">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
            </Link>
          )}
        </div> 
        
        {/*<div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-medium tracking-tight gradient-title">
            {editId ? "Edit" : "Add"} Transaction
          </h1>
        </div>*/}
        
        {/* Transaction Form */}
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData} 
        />
      </div>
    </div>
  )
}

export default AddTransactionPage;