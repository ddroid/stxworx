
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

export const FreelancersPage = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState('');

  const handleOpenMessage = (recipient: string) => {
    setSelectedRecipient(recipient);
    setIsMessageModalOpen(true);
  };

  const categories = [
    { label: 'All', count: 23 },
    { label: 'UX/UI Designers', count: 10 },
    { label: 'Illustrators', count: 5 },
    { label: '3D Artists', count: 6 },
    { label: 'Graphic Designers', count: 2 },
  ];

  const freelancers = [
    { name: 'Valerie Ferguson', handle: '@valerie_ui', role: 'ILLUSTRATOR', location: 'Vancouver, British Columbia, Canada', price: '$30', rating: 4.7, reviews: 26, seed: 'v1' },
    { name: 'Jermaine Mooney', handle: '@jermaine-mooney-des', role: 'WEB DESIGNER', location: 'Vienna, Austria', price: '$65 - $75', rating: 4.2, reviews: 83, seed: 'v2' },
    { name: 'Elodie Hardin', handle: '@elhardin.3dart', role: '3D ARTIST', location: 'Rotterdam, Netherlands', price: '$40', rating: 5.0, reviews: 19, seed: 'elodie' },
    { name: 'Armaan Humphrey', handle: '@humphrey83', role: 'GRAPHIC DESIGNER', location: 'London, United Kingdom', price: '$20 - $35', rating: 4.5, reviews: 2, seed: 'v3' },
    { name: 'Homer Heath', handle: '@hheath-ux', role: 'UX/UI DESIGNER', location: 'Helsinki, Finland', price: '$40 - $50', rating: 4.6, reviews: 5, seed: 'v4' },
    { name: 'Jing Zhang', handle: '@mazakii_aquarelle', role: 'ILLUSTRATOR', location: 'Barcelona, Spain', price: '$38', rating: 4.1, reviews: 20, seed: 'v5' },
    { name: 'Floyd Frederick', handle: '@ff_ux', role: 'UX/UI DESIGNER', location: 'San Giljan (St Julian\'s), Malta', price: '$59', rating: 4.4, reviews: 48, seed: 'v6' },
    { name: 'Susan Jordan', handle: '@susy.jordan_dsgn', role: 'GRAPHIC DESIGNER', location: 'Oslo, Norway', price: '$10 - $20', rating: 5.0, reviews: 37, seed: 'v7' },
    { name: 'Francesca Curtis', handle: '@francurtis_3dartist', role: '3D ARTIST', location: 'Paris, France', price: '$100', rating: 4.5, reviews: 6, seed: 'v8' },
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <Shared.MessageModal 
          isOpen={isMessageModalOpen} 
          onClose={() => setIsMessageModalOpen(false)} 
          recipient={selectedRecipient} 
        />
        <div className="mb-12">
          <h1 className="text-8xl font-black tracking-tighter mb-12">Freelancers</h1>
          
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
              <div className="bg-surface border border-border rounded-[15px] px-3 py-2 flex items-center gap-2">
                <Search size={14} className="text-muted" />
              </div>
              <div className="bg-surface border border-border rounded-[15px] px-4 py-2 text-[10px] font-bold flex items-center gap-4 cursor-pointer">
                Newest Registered
                <ChevronRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {freelancers.map((f, i) => (
              <div key={i} className="bg-surface rounded-[15px] p-8 border border-border group hover:border-accent-orange transition-all relative">
                <button className="absolute top-8 right-8 text-muted hover:text-ink">
                  <MoreHorizontal size={20} />
                </button>
                
                <div className="mb-6">
                  <span className="bg-accent-orange text-bg px-3 py-1 rounded-[15px] text-[8px] font-black uppercase tracking-widest mb-4 inline-block">
                    {f.role}
                  </span>
                  <h3 className="text-3xl font-black tracking-tighter mb-1 leading-none">{f.name}</h3>
                  <p className="text-sm font-bold text-accent-orange mb-2">{f.handle}</p>
                  <p className="text-[10px] text-muted font-medium">{f.location}</p>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[10px] bg-accent-pink/20 overflow-hidden border-4 border-bg">
                      <img 
                        src={`https://picsum.photos/seed/${f.seed}/200/200`} 
                        className="w-full h-full object-cover mix-blend-overlay opacity-80" 
                        alt={f.name} 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xl font-black leading-none">{f.price}</p>
                      <p className="text-[10px] text-muted font-bold">per hour</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black leading-none">{f.rating}</p>
                      <Star size={14} className="text-accent-orange fill-accent-orange" />
                      <p className="text-[10px] text-muted font-bold">{f.reviews} reviews</p>
                    </div>
                  </div>
                </div>

                <button onClick={() => handleOpenMessage(f.name)} className="w-full btn-outline py-4 rounded-[15px] text-xs font-bold hover:bg-white hover:text-bg transition-all">
                  Message
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted font-bold">Viewing 1 - 9 of 30 active members</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-[15px] bg-white text-bg flex items-center justify-center text-[10px] font-bold">1</button>
              <button className="w-8 h-8 rounded-[15px] bg-surface text-muted flex items-center justify-center text-[10px] font-bold hover:text-ink">2</button>
              <button className="w-8 h-8 rounded-[15px] bg-surface text-muted flex items-center justify-center text-[10px] font-bold hover:text-ink">3</button>
              <button className="w-8 h-8 rounded-[15px] bg-surface text-muted flex items-center justify-center text-[10px] font-bold hover:text-ink">
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
