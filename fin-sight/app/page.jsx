"use client";

import React, { useState, useEffect } from 'react';
import { TrendingUp, Shield, Zap, PieChart, ArrowRight, CheckCircle, Star, Users, Target, Sparkles } from 'lucide-react';

const FinSightLanding = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []); 

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '$2M+', label: 'Managed Funds' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  const features = [
    {
      icon: <PieChart className="w-8 h-8" />,
      title: 'Smart Analytics',
      description: 'AI-powered insights that transform your financial data into actionable intelligence.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption keeps your financial data safe and secure 24/7.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real-Time Tracking',
      description: 'Monitor your finances in real-time with live updates and instant notifications.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Automated Insights',
      description: 'Let AI do the heavy lifting with automated financial reports and predictions.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Goal Planning',
      description: 'Set and achieve financial goals with personalized roadmaps and milestones.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Recommendations',
      description: 'Get personalized tips to optimize spending and maximize your savings.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Entrepreneur',
      quote: 'FinSight transformed how I manage my business finances. The insights are game-changing!',
      rating: 5
    },
    {
      name: 'Michael Roberts',
      role: 'Software Engineer',
      quote: 'Best financial tool I\'ve ever used. The UI is beautiful and the features are powerful.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Freelancer',
      quote: 'Finally, a finance app that actually makes sense. Love the real-time tracking!',
      rating: 5
    }
  ];

  const steps = [
    { icon: <Users className="w-6 h-6" />, title: 'Create Account', description: 'Sign up in seconds with just your email' },
    { icon: <CheckCircle className="w-6 h-6" />, title: 'Connect Accounts', description: 'Securely link your financial accounts' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Get Insights', description: 'Watch AI transform your financial data' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered Financial Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight">
            Transform Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Financial Future
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of financial management. FinSight combines cutting-edge AI with beautiful design to give you complete control over your money.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
           
          </div>
        </div>

        {/* Dashboard Preview */}
        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto mt-20 relative">
          <div className={`relative transition-all duration-1000 ${scrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-white/10 shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                    F
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Financial Overview</div>
                    <div className="text-xs text-slate-400">September 2025</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 rounded-xl border border-purple-500/20">
                  <div className="text-xs text-purple-300 mb-1">Total Balance</div>
                  <div className="text-2xl font-bold text-white">$24,580</div>
                  <div className="text-xs text-green-400 mt-1">+12.5%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-4 rounded-xl border border-blue-500/20">
                  <div className="text-xs text-blue-300 mb-1">Income</div>
                  <div className="text-2xl font-bold text-white">$8,420</div>
                  <div className="text-xs text-green-400 mt-1">+8.2%</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 p-4 rounded-xl border border-pink-500/20">
                  <div className="text-xs text-pink-300 mb-1">Expenses</div>
                  <div className="text-2xl font-bold text-white">$3,280</div>
                  <div className="text-xs text-red-400 mt-1">-3.1%</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                <div className="flex items-end justify-between h-32 gap-2">
                  {[40, 70, 45, 80, 55, 90, 65, 75, 85, 60, 95, 70].map((height, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t opacity-70 hover:opacity-100 transition-opacity" style={{height: `${height}%`}}></div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 mb-3">Recent Activity</div>
                {[
                  { name: 'Netflix Subscription', amount: '-$15.99', color: 'red' },
                  { name: 'Salary Deposit', amount: '+$4,200', color: 'green' },
                  { name: 'Grocery Shopping', amount: '-$127.50', color: 'red' }
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${transaction.color === 'green' ? 'from-green-500/20 to-green-500/10' : 'from-red-500/20 to-red-500/10'} flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-full ${transaction.color === 'green' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      </div>
                      <span className="text-sm text-white">{transaction.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${transaction.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20 px-4 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need,
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Nothing You Don't
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Powerful features designed for modern financial management</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-slate-400 text-lg">Three simple steps to financial clarity</p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 mx-auto">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                    <p className="text-slate-400 text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-slate-400 text-lg">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
            
            <div className="relative text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ready to Transform Your Finances?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their money smarter with FinSight
              </p>
              <button className="group px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/70 text-sm mt-4">No credit card required • 14-day free trial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinSightLanding;