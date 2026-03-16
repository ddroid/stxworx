
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

export const BountiesPage = () => {
  const [bounties, setBounties] = useState([
    { id: 1, title: 'Write a tutorial on Clarity', description: 'Create a comprehensive guide on writing secure Clarity smart contracts.', links: 'https://docs.stacks.co', reward: '500 STX' },
    { id: 2, title: 'Design a new logo', description: 'We need a fresh, modern logo for our new DeFi protocol.', links: 'https://example.com/design-brief', reward: '200 USDCx' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBounty, setNewBounty] = useState({ title: '', description: '', links: '', reward: '' });

  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false);
  const [selectedBountyId, setSelectedBountyId] = useState<number | null>(null);
  const [participateForm, setParticipateForm] = useState({ description: '', links: '' });

  const handlePostBounty = () => {
    if (newBounty.title && newBounty.description) {
      setBounties([{ id: Date.now(), ...newBounty }, ...bounties]);
      setIsModalOpen(false);
      setNewBounty({ title: '', description: '', links: '', reward: '' });
    }
  };

  const handleParticipateSubmit = () => {
    if (participateForm.description) {
      alert('Participation submitted successfully!');
      setIsParticipateModalOpen(false);
      setParticipateForm({ description: '', links: '' });
      setSelectedBountyId(null);
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">Bounty Board</h1>
            <p className="text-muted">Complete tasks and earn direct rewards.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">Post Bounty</button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {bounties.map(bounty => (
            <div key={bounty.id} className="card p-6 flex flex-col md:flex-row justify-between items-start gap-6 hover:border-accent-orange transition-colors">
              <div className="flex-1">
                <h3 className="text-xl font-black mb-2">{bounty.title}</h3>
                <p className="text-sm text-muted mb-4">{bounty.description}</p>
                {bounty.links && (
                  <a href={bounty.links} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-cyan hover:underline flex items-center gap-1">
                    <LinkIcon size={12} /> {bounty.links}
                  </a>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-black text-accent-orange mb-1">{bounty.reward}</p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">Reward</p>
                <button 
                  onClick={() => {
                    setSelectedBountyId(bounty.id);
                    setIsParticipateModalOpen(true);
                  }}
                  className="btn-outline py-2 px-6 text-xs"
                >
                  Participate
                </button>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border border-border rounded-[15px] p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted hover:text-ink">
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-black mb-6">Post a Bounty</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Title</label>
                    <input 
                      type="text" 
                      value={newBounty.title}
                      onChange={(e) => setNewBounty({...newBounty, title: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                      placeholder="e.g. Write a tutorial on Clarity"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Description</label>
                    <textarea 
                      value={newBounty.description}
                      onChange={(e) => setNewBounty({...newBounty, description: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none h-24 resize-none"
                      placeholder="Describe the bounty requirements..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Links (Optional)</label>
                    <input 
                      type="text" 
                      value={newBounty.links}
                      onChange={(e) => setNewBounty({...newBounty, links: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Reward Amount</label>
                    <input 
                      type="text" 
                      value={newBounty.reward}
                      onChange={(e) => setNewBounty({...newBounty, reward: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                      placeholder="e.g. 500 STX"
                    />
                  </div>
                  <button onClick={handlePostBounty} className="btn-primary w-full py-4 mt-4">Post Bounty</button>
                </div>
              </motion.div>
            </div>
          )}

          {isParticipateModalOpen && (
            <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border border-border rounded-[15px] p-6 md:p-8 max-w-xl w-full shadow-2xl relative"
              >
                <button onClick={() => setIsParticipateModalOpen(false)} className="absolute top-4 right-4 text-muted hover:text-ink">
                  <X size={20} />
                </button>
                <h3 className="text-2xl font-black mb-6">Participate in Bounty</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Description</label>
                    <textarea 
                      value={participateForm.description}
                      onChange={(e) => setParticipateForm({...participateForm, description: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none h-32 resize-none"
                      placeholder="Describe how you plan to complete this bounty or what you have done..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Links (Proof of work / Portfolio)</label>
                    <input 
                      type="text" 
                      value={participateForm.links}
                      onChange={(e) => setParticipateForm({...participateForm, links: e.target.value})}
                      className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <button onClick={handleParticipateSubmit} className="btn-primary w-full py-4 mt-4">Submit Participation</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
