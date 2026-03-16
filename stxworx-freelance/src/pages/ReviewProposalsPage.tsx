
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

export const ReviewProposalsPage = () => {
  const proposals = [
    { id: 1, freelancer: 'Marcus Chen', handle: '@marcusc', rating: 5.0, price: '2,500 STX', time: '14 days', coverLetter: 'I have extensive experience with Clarity smart contracts and have audited several DeFi protocols. I can complete this within your timeline and budget.' },
    { id: 2, freelancer: 'Sarah Jenkins', handle: '@sarahj', rating: 4.8, price: '2,200 STX', time: '20 days', coverLetter: 'I specialize in secure smart contract development. I have attached my previous work for your review.' },
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-ink mb-8 transition-colors">
          <ChevronRight size={14} className="rotate-180" /> Back to Dashboard
        </Link>
        <h1 className="text-5xl font-black tracking-tighter mb-2">Review Proposals</h1>
        <p className="text-muted mb-12">Review and accept proposals for "Smart Contract Developer Needed"</p>

        <div className="space-y-6">
          {proposals.map(p => (
            <div key={p.id} className="card p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[10px] bg-ink/10 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${p.handle}/100/100`} alt={p.freelancer} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{p.freelancer}</h3>
                    <p className="text-xs text-muted">{p.handle} • <Star size={12} className="inline text-accent-orange fill-accent-orange mb-0.5" /> {p.rating}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-xl text-accent-cyan">{p.price}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">in {p.time}</p>
                </div>
              </div>
              <div className="bg-ink/5 rounded-[15px] p-4 mb-6">
                <p className="text-sm text-muted leading-relaxed">{p.coverLetter}</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 btn-primary py-3 justify-center">Accept Proposal & Fund Escrow</button>
                <button className="flex-1 btn-outline py-3 justify-center">Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
