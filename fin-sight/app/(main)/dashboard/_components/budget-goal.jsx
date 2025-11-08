"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Target, TrendingUp, Calendar, Plus, IndianRupee, Trash2, Edit, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const BudgetGoalsSection = () => {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
  });

  const [selectedGoal, setSelectedGoal] = useState(null);
  const [contributeAmount, setContributeAmount] = useState('');
  const [editGoal, setEditGoal] = useState(null);

  // Load goals from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('budgetGoals');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      const goalsWithDates = parsed.map(goal => ({
        ...goal,
        deadline: new Date(goal.deadline),
        createdAt: new Date(goal.createdAt)
      }));
      setBudgetGoals(goalsWithDates);
    } else {
      // Set default goals only if nothing is saved
      const defaultGoals = [
        {
          id: 1,
          name: "New Laptop",
          targetAmount: 80000,
          currentAmount: 25000,
          deadline: new Date('2025-12-31'),
          createdAt: new Date('2025-09-01')
        },
        {
          id: 2,
          name: "Vacation Fund",
          targetAmount: 50000,
          currentAmount: 15000,
          deadline: new Date('2025-11-15'),
          createdAt: new Date('2025-09-15')
        }
      ];
      setBudgetGoals(defaultGoals);
      localStorage.setItem('budgetGoals', JSON.stringify(defaultGoals));
    }
  }, []);

  // Save to localStorage whenever goals change
  const saveGoals = (goals) => {
    setBudgetGoals(goals);
    localStorage.setItem('budgetGoals', JSON.stringify(goals));
  };

  // Calculate progress and status for a goal
  const calculateGoalMetrics = (goal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const now = new Date();
    const totalDays = Math.ceil((goal.deadline - goal.createdAt) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((now - goal.createdAt) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.ceil((goal.deadline - now) / (1000 * 60 * 60 * 24));
    const monthsRemaining = Math.max(1, Math.ceil(daysRemaining / 30));
    
    const expectedProgress = (daysElapsed / totalDays) * 100;
    const remainingAmount = goal.targetAmount - goal.currentAmount;
    const monthlyRequired = remainingAmount / monthsRemaining;

    let status = 'on-track';
    if (progress >= expectedProgress + 10) status = 'ahead';
    else if (progress < expectedProgress - 10) status = 'behind';

    return {
      progress: Math.min(progress, 100),
      daysRemaining,
      monthsRemaining,
      monthlyRequired,
      remainingAmount,
      status,
    };
  };

  const handleCreateGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline) {
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        deadline: new Date(newGoal.deadline),
        createdAt: new Date(),
      };
      const updatedGoals = [...budgetGoals, goal];
      saveGoals(updatedGoals);
      setNewGoal({ name: '', targetAmount: '', deadline: '' });
      setIsDrawerOpen(false);
    }
  };

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = budgetGoals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);
  };

  const openContribute = (goal) => {
    setSelectedGoal(goal);
    const metrics = calculateGoalMetrics(goal);
    setContributeAmount(Math.ceil(metrics.monthlyRequired).toString());
    setIsContributeOpen(true);
  };

  const handleContribute = () => {
    if (!contributeAmount || parseFloat(contributeAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const updatedGoals = budgetGoals.map(goal => {
      if (goal.id === selectedGoal.id) {
        return {
          ...goal,
          currentAmount: goal.currentAmount + parseFloat(contributeAmount)
        };
      }
      return goal;
    });

    saveGoals(updatedGoals);
    setIsContributeOpen(false);
    setSelectedGoal(null);
    setContributeAmount('');
  };

  const openEdit = (goal) => {
    setEditGoal({
      ...goal,
      deadline: new Date(goal.deadline).toISOString().split('T')[0]
    });
    setIsEditOpen(true);
  };

  const handleUpdateGoal = () => {
    if (editGoal.name && editGoal.targetAmount && editGoal.deadline) {
      const updatedGoals = budgetGoals.map(goal => {
        if (goal.id === editGoal.id) {
          return {
            ...goal,
            name: editGoal.name,
            targetAmount: parseFloat(editGoal.targetAmount),
            deadline: new Date(editGoal.deadline),
            // Keep currentAmount and createdAt unchanged
          };
        }
        return goal;
      });

      saveGoals(updatedGoals);
      setIsEditOpen(false);
      setEditGoal(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ahead':
        return 'text-green-600 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      case 'behind':
        return 'text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      default:
        return 'text-blue-600 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ahead':
        return 'Ahead of Schedule';
      case 'behind':
        return 'Behind Schedule';
      default:
        return 'On Track';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Budget Goals
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your savings goals and stay motivated
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetGoals.map((goal) => {
          const metrics = calculateGoalMetrics(goal);
          return (
            <Card
              key={goal.id}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {goal.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {metrics.daysRemaining} days left
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(goal)}
                      className="p-1 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-gray-400 hover:text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={cn(
                  "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border",
                  getStatusColor(metrics.status)
                )}>
                  <TrendingUp className="w-3 h-3" />
                  {getStatusText(metrics.status)}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {metrics.progress.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        metrics.status === 'ahead' && "bg-green-500",
                        metrics.status === 'behind' && "bg-red-500",
                        metrics.status === 'on-track' && "bg-blue-500"
                      )}
                      style={{ width: `${metrics.progress}%` }}
                    />
                  </div>
                </div>

                {/* Amounts */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {goal.currentAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Target</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {goal.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Monthly Required */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Save per month
                    </span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {Math.ceil(metrics.monthlyRequired).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    for {metrics.monthsRemaining} month{metrics.monthsRemaining !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Target: {goal.deadline.toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </div>

                {/* Contribute Button */}
                <Button
                  onClick={() => openContribute(goal)}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {/* Add New Goal Card */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[380px]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Add New Goal
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Set a new savings target
                </p>
              </CardContent>
            </Card>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Budget Goal
              </DrawerTitle>
              <DrawerDescription>
                Set a specific savings goal with a target amount and deadline
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Goal Name
                </label>
                <Input
                  placeholder="e.g., New Laptop, Vacation, Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  className="h-12 border-2 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Target Amount (₹)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="50000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="h-12 pl-10 border-2 rounded-xl"
                  />
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Target Date
                </label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12 border-2 rounded-xl"
                />
              </div>

              {newGoal.targetAmount && newGoal.deadline && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    You'll need to save approximately:
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <IndianRupee className="w-6 h-6" />
                    {Math.ceil(
                      parseFloat(newGoal.targetAmount) / 
                      Math.max(1, Math.ceil((new Date(newGoal.deadline) - new Date()) / (1000 * 60 * 60 * 24 * 30)))
                    ).toLocaleString('en-IN')}
                    <span className="text-base font-normal text-gray-600 dark:text-gray-400 ml-2">
                      per month
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DrawerFooter>
              <Button
                onClick={handleCreateGoal}
                disabled={!newGoal.name || !newGoal.targetAmount || !newGoal.deadline}
                className="h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              >
                Create Goal
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="h-12 rounded-xl">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Contribute Drawer */}
      <Drawer open={isContributeOpen} onOpenChange={setIsContributeOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add Money to {selectedGoal?.name}
            </DrawerTitle>
            <DrawerDescription>
              Contribute towards your goal
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6 space-y-6">
            {selectedGoal && (
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Suggested monthly contribution:
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <IndianRupee className="w-7 h-7" />
                  {Math.ceil(calculateGoalMetrics(selectedGoal).monthlyRequired).toLocaleString('en-IN')}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Amount to Add (₹)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={contributeAmount}
                  onChange={(e) => setContributeAmount(e.target.value)}
                  className="h-14 pl-10 text-lg border-2 rounded-xl"
                  placeholder="Enter amount"
                />
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              onClick={handleContribute}
              className="h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              Contribute ₹{contributeAmount || 0}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="h-12 rounded-xl">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Edit Goal Drawer */}
      <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edit Budget Goal
            </DrawerTitle>
            <DrawerDescription>
              Update your goal details
            </DrawerDescription>
          </DrawerHeader>
          {editGoal && (
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Goal Name
                </label>
                <Input
                  value={editGoal.name}
                  onChange={(e) => setEditGoal({ ...editGoal, name: e.target.value })}
                  className="h-12 border-2 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Target Amount (₹)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    value={editGoal.targetAmount}
                    onChange={(e) => setEditGoal({ ...editGoal, targetAmount: e.target.value })}
                    className="h-12 pl-10 border-2 rounded-xl"
                  />
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Target Date
                </label>
                <Input
                  type="date"
                  value={editGoal.deadline}
                  onChange={(e) => setEditGoal({ ...editGoal, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="h-12 border-2 rounded-xl"
                />
              </div>
            </div>
          )}
          <DrawerFooter>
            <Button
              onClick={handleUpdateGoal}
              className="h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              Update Goal
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="h-12 rounded-xl">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BudgetGoalsSection;