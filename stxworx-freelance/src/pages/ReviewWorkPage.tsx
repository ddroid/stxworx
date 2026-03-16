
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

export const ReviewWorkPage = () => {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-ink mb-8 transition-colors">
          <ChevronRight size={14} className="rotate-180" /> Back to Dashboard
        </Link>
        <h1 className="text-5xl font-black tracking-tighter mb-2">Review Work</h1>
        <p className="text-muted mb-12">Review submitted work for "UI/UX Design for DeFi Dashboard"</p>

        <div className="card p-8">
          <div className="flex justify-between items-start mb-8 pb-8 border-b border-border">
            <div>
              <h3 className="font-bold text-2xl mb-2">Milestone 1: Wireframes</h3>
              <p className="text-sm text-muted">Submitted by 0x456...def • 2 hours ago</p>
            </div>
            <div className="text-right">
              <p className="font-black text-2xl text-accent-cyan">$1,500</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Escrow Amount</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold mb-4">Freelancer Notes</h4>
            <div className="bg-ink/5 rounded-[15px] p-6">
              <p className="text-sm text-muted leading-relaxed">
                I've completed the initial wireframes for the dashboard, including the main overview, portfolio view, and swap interface. Please review the attached Figma file and let me know if you have any feedback before I move on to high-fidelity designs.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold mb-4">Attachments</h4>
            <div className="flex gap-4">
              <div className="border border-border rounded-[15px] p-4 flex items-center gap-4 cursor-pointer hover:bg-ink/5 transition-colors">
                <div className="w-10 h-10 bg-accent-orange/20 text-accent-orange rounded-lg flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">wireframes_v1.fig</p>
                  <p className="text-xs text-muted">12.4 MB</p>
                </div>
                <Download size={16} className="text-muted ml-4" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsApproved(true)}
              disabled={isApproved}
              className={`flex-1 py-4 justify-center font-bold text-sm rounded-[25px] transition-all duration-300 ${isApproved ? 'bg-green-500/20 text-green-500 border border-green-500/50 cursor-not-allowed' : 'btn-primary bg-accent-cyan hover:bg-accent-cyan/80'}`}
            >
              {isApproved ? 'FUNDS APPROVED' : 'Approve & Release Funds'}
            </button>
            <button className="flex-1 btn-outline py-4 justify-center">Request Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
