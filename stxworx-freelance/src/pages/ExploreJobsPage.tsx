
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, Globe, LayoutGrid, Users, BookOpen, Briefcase, Calendar, ShoppingBag, Newspaper,
  ChevronRight, Star, Plus, Heart, MessageSquare, Share2, MapPin, Link as LinkIcon, Twitter, Instagram,
  Facebook, MoreHorizontal, ArrowRight, Filter, CheckCircle2, Trophy, ChevronLeft, ChevronsRight, ChevronDown,
  Wallet, Send, X, Settings, ShieldCheck, LogOut, Mail, Phone, MessageCircle, Sun, Moon, Maximize2, Minimize2,
  HelpCircle, AlertTriangle, Folder, GraduationCap, Home, PenTool, Camera, Edit2, Share, Shield, Upload, FileText,
  Download, Sparkles, Bot, ZoomIn, ZoomOut
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import * as Shared from '../shared';

export const ExploreJobsPage = () => {
  const { userRole } = Shared.useWallet();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('All');

  const categories = [
    { label: 'All', count: 124 },
    { label: 'Development', count: 45 },
    { label: 'Design', count: 32 },
    { label: 'Marketing', count: 18 },
    { label: 'Writing', count: 29 },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Smart Contract Developer Needed',
      category: 'Development',
      subCategory: 'Blockchain / Web3',
      description: 'Looking for an experienced Clarity developer to audit and optimize our escrow contract.',
      fullDescription: 'We are building a decentralized marketplace on Stacks and need a senior Clarity developer to review our existing escrow smart contracts. The ideal candidate has experience with sBTC integration, SIP-010 tokens, and a strong understanding of Stacks blockchain security patterns. You will be responsible for identifying vulnerabilities, optimizing gas usage, and writing comprehensive test suites.',
      tags: ['Clarity', 'Smart Contracts', 'Security'],
      budget: '2,500',
      currency: 'STX',
      color: 'text-accent-cyan',
      milestones: [
        { title: 'Security Audit', description: 'Complete review of existing contracts', percentage: 30 },
        { title: 'Optimization', description: 'Gas optimization and refactoring', percentage: 40 },
        { title: 'Final Testing', description: 'Comprehensive test coverage', percentage: 30 }
      ]
    },
    {
      id: 2,
      title: 'UI/UX Design for DeFi Dashboard',
      category: 'Design',
      subCategory: 'Product Design',
      description: 'We need a complete redesign of our decentralized exchange interface.',
      fullDescription: 'Our current DEX interface is functional but lacks the polish and intuitive user experience needed to attract mainstream users. We are looking for a talented UI/UX designer to create a comprehensive design system, wireframes, and high-fidelity prototypes for our new dashboard. Experience designing for Web3/DeFi applications is highly preferred. Deliverables must be in Figma.',
      tags: ['UI/UX', 'Figma', 'DeFi'],
      budget: '3,000',
      currency: 'USDCx',
      color: 'text-accent-orange',
      milestones: [
        { title: 'Wireframes', description: 'Initial layout and user flow', percentage: 50 },
        { title: 'High-Fidelity Prototypes', description: 'Final designs in Figma', percentage: 50 }
      ]
    },
    {
      id: 3,
      title: 'Technical Writer for API Documentation',
      category: 'Writing',
      subCategory: 'Technical Documentation',
      description: 'Create clear, comprehensive documentation for our new developer SDK.',
      fullDescription: 'We are launching a new SDK for developers to easily integrate Stacks authentication into their React applications. We need an experienced technical writer to create clear, concise, and engaging documentation. This includes writing quickstart guides, API references, and step-by-step tutorials. You should be comfortable reading TypeScript code and testing the SDK yourself.',
      tags: ['Technical Writing', 'React', 'API'],
      budget: '1,200',
      currency: 'sBTC',
      color: 'text-accent-pink',
      milestones: [
        { title: 'Drafting', description: 'Initial draft of all documentation', percentage: 40 },
        { title: 'Review & Edits', description: 'Incorporate feedback', percentage: 30 },
        { title: 'Final Publish', description: 'Publish to developer portal', percentage: 30 }
      ]
    }
  ];

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-8xl font-black tracking-tighter mb-12">Explore Jobs</h1>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <button 
                  key={i} 
                  className={`px-4 py-2 rounded-[15px] text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${i === 0 ? 'bg-white text-bg' : 'bg-surface text-muted hover:text-ink'}`}
                >
                  {cat.label} <span className="opacity-40">{cat.count}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="appearance-none bg-surface border border-border rounded-[15px] pl-4 pr-10 py-2 text-sm font-bold focus:ring-1 focus:ring-accent-orange outline-none cursor-pointer text-muted hover:text-ink transition-colors"
                >
                  <option value="All">All Currencies</option>
                  <option value="STX">STX</option>
                  <option value="sBTC">sBTC</option>
                  <option value="USDCx">USDCx</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              </div>
              <div className="bg-surface border border-border rounded-[15px] px-3 py-2 flex items-center gap-2">
                <Search size={14} className="text-muted" />
              </div>
              <button className="btn-outline"><Filter size={18} /> Filter</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.filter(job => selectedCurrency === 'All' || job.currency === selectedCurrency).map((job) => (
            <div key={job.id} className="card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-accent-orange transition-all cursor-pointer">
              <div>
                <h3 className="text-xl font-black mb-2 group-hover:text-accent-orange transition-colors">{job.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-muted">{job.category}</span>
                  <span className="text-muted text-xs">•</span>
                  <span className="text-xs text-muted">{job.subCategory}</span>
                </div>
                <p className="text-sm text-muted mb-4">{job.description}</p>
                <div className="flex gap-2">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-ink/5 rounded-[15px] text-[10px] font-bold">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-2xl font-black ${job.color}`}>{job.budget} {job.currency}</p>
                <p className="text-[10px] font-bold text-muted uppercase mb-4">Budget</p>
                {userRole !== 'client' && (
                  <button onClick={() => handleApply(job)} className="btn-outline py-2 px-6 text-xs">Apply Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Shared.JobApplyModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} job={selectedJob} />
    </div>
  );
};
