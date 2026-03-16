
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

export const LeaderboardPage = () => {
  const leaders = [
    { name: 'Elodie Hardin', handle: '@elhardin.3dart', role: '3D ARTIST', points: '12,450', rank: 1, seed: 'elodie', color: 'bg-accent-orange' },
    { name: 'Julian Wan', handle: '@julian_arch', role: 'ARCHITECT', points: '10,200', rank: 2, seed: 'm1', color: 'bg-accent-red' },
    { name: 'Ayo Ogunseinde', handle: '@ayo_interior', role: 'INTERIOR DESIGNER', points: '9,850', rank: 3, seed: 'm2', color: 'bg-accent-blue' },
    { name: 'Michael Dam', handle: '@michael_creative', role: 'CREATIVE DIRECTOR', points: '8,400', rank: 4, seed: 'm3', color: 'bg-accent-cyan' },
    { name: 'Sarah Jenkins', role: 'PRODUCT DESIGNER', handle: '@sarah_design', points: '7,900', rank: 5, seed: 'm4', color: 'bg-accent-lightblue' },
    { name: 'Marcus Chen', role: 'MOTION ARTIST', handle: '@marcus_motion', points: '7,200', rank: 6, seed: 'm5', color: 'bg-accent-yellow' },
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-8xl font-black tracking-tighter mb-12">Leaderboard</h1>
          
          <div className="grid grid-cols-1 gap-4">
            {leaders.map((leader, i) => (
              <div key={i} className="bg-surface rounded-[15px] p-6 border border-border flex items-center justify-between group hover:border-accent-orange transition-all">
                <div className="flex items-center gap-8">
                  <div className="text-4xl font-black text-muted/20 w-12 text-center group-hover:text-accent-orange transition-colors">
                    {leader.rank}
                  </div>
                  <div className="relative">
                    <img 
                      src={`https://picsum.photos/seed/${leader.seed}/100/100`} 
                      className="w-16 h-16 rounded-[10px] object-cover border-2 border-border" 
                      alt={leader.name} 
                      referrerPolicy="no-referrer" 
                    />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-bg ${leader.color}`}>
                      {leader.rank === 1 ? '👑' : leader.rank}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tighter leading-none mb-1">{leader.name}</h3>
                    <p className="text-xs font-bold text-accent-orange">{leader.handle}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-2xl font-black leading-none">{leader.points}</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Points</p>
                  </div>
                  <button className="btn-outline py-3 px-6 rounded-[15px] text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-bg transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
