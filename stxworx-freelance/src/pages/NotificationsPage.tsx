
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

export const NotificationsPage = () => {
  const notifications = [
    { id: 1, title: 'New Course Available', desc: 'Check out the new Advanced Clarity course.', time: '2m ago', icon: BookOpen, color: 'bg-accent-orange', unread: true },
    { id: 2, title: 'Valerie invited you', desc: 'Valerie Ferguson invited you to apply for a job.', time: '1h ago', icon: Users, color: 'bg-accent-red', unread: true },
    { id: 3, title: 'Payment received', desc: 'You received 1,500 STX for Milestone 1.', time: '3h ago', icon: ShoppingBag, color: 'bg-accent-cyan', unread: false },
    { id: 4, title: 'Proposal Accepted', desc: 'Your proposal for DeFi Dashboard was accepted.', time: '1d ago', icon: CheckCircle2, color: 'bg-accent-blue', unread: false },
    { id: 5, title: 'System Update', desc: 'STXWORX will undergo maintenance on Sunday.', time: '2d ago', icon: Bell, color: 'bg-ink/20', unread: false },
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-5xl font-black tracking-tighter">Notifications</h1>
          </div>
          <button className="text-xs font-bold text-accent-orange hover:underline">Mark all as read</button>
        </div>
        
        <div className="bg-surface border border-border rounded-[15px] overflow-hidden">
          {notifications.map(n => (
            <div key={n.id} className={`p-6 flex items-start gap-6 border-b border-border/50 last:border-0 transition-colors hover:bg-ink/5 cursor-pointer ${n.unread ? 'bg-ink/5' : ''}`}>
              <div className={`w-12 h-12 rounded-[15px] ${n.color} flex items-center justify-center text-bg shrink-0`}>
                <n.icon size={20} className={n.color === 'bg-ink/20' ? 'text-ink' : ''} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-base ${n.unread ? 'font-black' : 'font-bold'}`}>{n.title}</h3>
                  <span className="text-[10px] text-muted font-bold whitespace-nowrap">{n.time}</span>
                </div>
                <p className={`text-sm ${n.unread ? 'text-ink' : 'text-muted'}`}>{n.desc}</p>
              </div>
              {n.unread && (
                <div className="w-3 h-3 bg-accent-orange rounded-full mt-2 shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
