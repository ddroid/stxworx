
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

export const DashboardPage = () => {
  const { userRole, walletAddress, isWorkSubmitted } = Shared.useWallet();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  const handleSubmitWork = (milestone: any) => {
    setSelectedMilestone(milestone);
    setIsSubmitModalOpen(true);
  };

  const handleOpenMessage = (recipient: string) => {
    setSelectedRecipient(recipient);
    setIsMessageModalOpen(true);
  };

  if (!walletAddress) {
    return (
      <div className="pt-28 pb-20 px-6 md:pl-[92px]">
        <div className="container-custom flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-3xl font-black mb-4">Dashboard</h2>
          <p className="text-muted text-center max-w-md">Connect your wallet to see your personalized dashboard data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <Shared.MessageModal 
          isOpen={isMessageModalOpen} 
          onClose={() => setIsMessageModalOpen(false)} 
          recipient={selectedRecipient} 
        />
        <Shared.PostJobModal 
          isOpen={isPostJobModalOpen} 
          onClose={() => setIsPostJobModalOpen(false)} 
        />
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">{userRole === 'client' ? 'Client Dashboard' : 'Freelancer Dashboard'}</h1>
            <p className="text-muted">
              {userRole === 'client' ? 'Manage your job postings, active contracts, and escrow.' : 'Manage your active contracts, earnings, and reputation.'}
            </p>
          </div>
        </div>

        {userRole === 'client' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Shared.StatCard value="2" label="Active Postings" color="bg-accent-orange" />
              <Shared.StatCard value="1" label="Active Contracts" color="bg-accent-cyan" />
              <Shared.StatCard value="$4,500" label="Total Escrow Locked" color="bg-accent-blue" />
              <Shared.StatCard value="$12,000" label="Total Spent" color="bg-accent-yellow" />
            </div>
            
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl">Active Job Postings</h3>
                <button onClick={() => setIsPostJobModalOpen(true)} className="btn-primary py-2 px-4 text-xs">Post New Job</button>
              </div>
              <div className="space-y-6">
                <div className="border border-border rounded-[15px] p-6 bg-ink/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg mb-1">Smart Contract Developer Needed</h4>
                      <p className="text-xs text-muted">Posted 2 days ago</p>
                    </div>
                    <span className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-[10px] font-bold uppercase tracking-widest">Active</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-muted mb-2">Milestones:</p>
                    <ul className="list-disc list-inside text-sm text-muted space-y-1">
                      <li>Milestone 1: Security Audit (30%)</li>
                      <li>Milestone 2: Optimization (40%)</li>
                      <li>Milestone 3: Final Testing (30%)</li>
                    </ul>
                  </div>
                  <div className="flex gap-4 border-t border-border pt-4">
                    <div className="flex-1">
                      <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Budget</p>
                      <p className="font-bold">2,500 STX</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Proposals</p>
                      <p className="font-bold">12</p>
                    </div>
                    <div className="flex-1 text-right">
                      <Link to="/review-proposals" className="text-accent-orange text-xs font-bold hover:underline">View Proposals</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-xl mb-6">Active Contracts</h3>
              <div className="border border-border rounded-[15px] p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg mb-1">UI/UX Design for DeFi Dashboard</h4>
                    <p className="text-xs text-muted">Freelancer: 0x456...def</p>
                  </div>
                  <span className="px-3 py-1 bg-accent-orange/10 text-accent-orange rounded-full text-[10px] font-bold uppercase tracking-widest">In Progress</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted mb-2">Current Milestone: <span className="text-ink font-bold">Wireframes (50%)</span></p>
                  <div className="w-full bg-ink/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-accent-orange h-full w-1/2"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Escrow Status</p>
                    <p className="font-bold text-accent-cyan flex items-center gap-1"><ShieldCheck size={14} /> Locked ($1,500)</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenMessage('0x456...def')} className="btn-outline py-2 px-4 text-xs flex items-center justify-center">Message</button>
                    {isWorkSubmitted ? (
                      <Link to="/review-work" className="btn-primary py-2 px-4 text-xs flex items-center justify-center">Review Work</Link>
                    ) : (
                      <button disabled className="btn-primary py-2 px-4 text-xs flex items-center justify-center opacity-50 cursor-not-allowed">Review Work</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Shared.StatCard value="3" label="Active Contracts" color="bg-accent-orange" />
              <Shared.StatCard value="$1,250" label="Pending Escrow" color="bg-accent-cyan" />
              <Shared.StatCard value="$8,400" label="Total Earned" color="bg-accent-blue" />
              <Shared.StatCard value="4.9" label="Reputation Score" color="bg-accent-yellow" />
            </div>
            
            <div className="card">
              <h3 className="font-bold text-xl mb-6">Active Contracts</h3>
              <div className="space-y-6">
                <div className="border border-border rounded-[15px] p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg mb-1">UI/UX Design for DeFi Dashboard</h4>
                      <p className="text-xs text-muted">Client: 0x123...abc</p>
                    </div>
                    <span className="px-3 py-1 bg-accent-orange/10 text-accent-orange rounded-full text-[10px] font-bold uppercase tracking-widest">In Progress</span>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-sm font-bold mb-3">Milestones</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-ink/5 rounded-[10px] border border-border">
                        <div>
                          <p className="text-sm font-bold">1. Wireframes</p>
                          <p className="text-xs text-muted">Initial layout and user flow</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">$1,500</p>
                          <button 
                            onClick={() => handleSubmitWork({ title: '1. Wireframes', description: 'Initial layout and user flow', amount: '$1,500' })}
                            className="text-xs text-accent-cyan font-bold hover:underline mt-1"
                          >
                            Submit Work
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-transparent rounded-[10px] border border-border opacity-50">
                        <div>
                          <p className="text-sm font-bold">2. High-Fidelity Prototypes</p>
                          <p className="text-xs text-muted">Final designs in Figma</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">$1,500</p>
                          <span className="text-xs text-muted mt-1 block">Locked</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-[10px] text-muted uppercase tracking-widest font-bold mb-1">Escrow Status</p>
                      <p className="font-bold text-accent-cyan flex items-center gap-1"><ShieldCheck size={14} /> Funded ($3,000)</p>
                    </div>
                    <button onClick={() => handleOpenMessage('0x123...abc')} className="btn-outline py-2 px-4 text-xs flex items-center justify-center">Message Client</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Shared.MilestoneSubmitModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
        milestone={selectedMilestone} 
      />
    </div>
  );
};
