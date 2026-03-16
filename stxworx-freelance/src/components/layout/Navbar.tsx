
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
import * as Shared from '../../shared';

export const TopHeader = ({ theme, toggleTheme }: { theme: 'dark' | 'light', toggleTheme: () => void }) => {
  const { walletAddress, setWalletAddress, userRole, setUserRole, blockedWallets } = Shared.useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const isBlocked = walletAddress && blockedWallets.includes(walletAddress);

  const handleConnect = (role: 'client' | 'freelancer') => {
    setWalletAddress('0x71C...4f2'); // Mock wallet connection
    setUserRole(role);
    setShowWalletModal(false);
    setSelectedProvider(null);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setUserRole(null);
  };

  const notifications = [
    { id: 1, title: 'New Course Available', time: '2m ago', icon: BookOpen, color: 'bg-accent-orange' },
    { id: 2, title: 'Valerie invited you', time: '1h ago', icon: Users, color: 'bg-accent-red' },
    { id: 3, title: 'Payment received', time: '3h ago', icon: ShoppingBag, color: 'bg-accent-cyan' },
  ];

  const messages = [
    { id: 1, sender: 'Alice', text: 'Hey, are you available for a new project?', time: '10m ago', unread: true },
    { id: 2, sender: 'Bob', text: 'The designs look great, thanks!', time: '2h ago', unread: false },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 md:left-[120px] right-0 h-20 bg-bg/80 backdrop-blur-xl border-b border-border z-40 px-4 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-8">
        <Link to="/" className="flex items-center md:hidden">
          <div className="w-8 h-8 bg-accent-orange rounded-[10px] flex items-center justify-center text-white font-black">S</div>
        </Link>
        <Link to="/" className="hidden md:flex items-center">
          <Shared.Logo className="text-3xl" />
        </Link>
        <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-[15px] border border-border w-40 md:w-64 xl:w-96">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search for anything..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-[15px] hover:bg-ink/5 text-muted hover:text-ink transition-all"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          onClick={() => userRole ? handleDisconnect() : setShowWalletModal(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-[15px] text-xs font-bold transition-all ${userRole ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'bg-ink text-bg hover:bg-accent-orange'}`}
        >
          {userRole ? (
            <Wallet size={16} />
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#FF5E00] shadow-[0_0_8px_#FF5E00]" />
          )}
          {userRole ? walletAddress : 'Connect Wallet'}
        </button>

        <div className="relative">
          <button 
            onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
            className={`relative text-muted hover:text-ink transition-colors p-2 rounded-[15px] hover:bg-ink/5 ${showMessages ? 'text-ink bg-ink/5' : ''}`}
          >
            <MessageCircle size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-cyan rounded-full"></span>
          </button>

          <AnimatePresence>
            {showMessages && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-80 bg-surface border border-border rounded-[15px] shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-sm">Recent Messages</h3>
                  <button onClick={() => setShowMessages(false)} className="text-muted hover:text-ink"><X size={16} /></button>
                </div>
                <div className="max-h-96 overflow-y-auto no-scrollbar">
                  {messages.map(m => (
                    <div key={m.id} className={`p-4 flex items-start gap-4 hover:bg-ink/5 cursor-pointer transition-colors border-b border-border/50 last:border-0 ${m.unread ? 'bg-ink/5' : ''}`}>
                      <div className="w-8 h-8 rounded-[10px] bg-ink/10 overflow-hidden shrink-0">
                        <img src={`https://picsum.photos/seed/${m.sender}/100/100`} alt={m.sender} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <p className={`text-xs ${m.unread ? 'font-black' : 'font-bold'}`}>{m.sender}</p>
                          <p className="text-[10px] text-muted">{m.time}</p>
                        </div>
                        <p className={`text-[10px] truncate max-w-[200px] ${m.unread ? 'text-ink font-bold' : 'text-muted'}`}>{m.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/messages" 
                  onClick={() => setShowMessages(false)}
                  className="block w-full text-center p-3 text-[10px] font-bold text-muted hover:text-ink transition-colors bg-ink/5"
                >
                  View All Messages
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
            className={`relative text-muted hover:text-ink transition-colors p-2 rounded-[15px] hover:bg-ink/5 ${showNotifications ? 'text-ink bg-ink/5' : ''}`}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-4 w-80 bg-surface border border-border rounded-[15px] shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-sm">Recent Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-muted hover:text-ink"><X size={16} /></button>
                </div>
                <div className="max-h-96 overflow-y-auto no-scrollbar">
                  {notifications.map(n => (
                    <div key={n.id} className="p-4 flex items-start gap-4 hover:bg-ink/5 cursor-pointer transition-colors border-b border-border/50 last:border-0">
                      <div className={`w-8 h-8 rounded-[15px] ${n.color} flex items-center justify-center text-bg`}>
                        <n.icon size={14} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold mb-1">{n.title}</p>
                        <p className="text-[10px] text-muted">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/notifications" 
                  onClick={() => setShowNotifications(false)}
                  className="block w-full text-center p-3 text-[10px] font-bold text-muted hover:text-ink transition-colors bg-ink/5"
                >
                  View All Notifications
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-[1px] bg-border"></div>
        <Link to="/profile" className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold group-hover:text-accent-orange transition-colors">Elodie Hardin</p>
            <p className="text-[10px] text-muted">Pro Member</p>
          </div>
          <img 
            src="https://picsum.photos/seed/elodie/100/100" 
            alt="Profile" 
            className="w-10 h-10 rounded-[10px] object-cover border-2 border-border group-hover:border-accent-orange transition-all"
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
    </header>

    <AnimatePresence>
      {showWalletModal && (
        <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-surface border border-border rounded-[15px] p-8 max-w-sm w-full shadow-2xl relative"
          >
            <button 
              onClick={() => {
                setShowWalletModal(false);
                setSelectedProvider(null);
              }}
              className="absolute top-4 right-4 text-muted hover:text-ink"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-black mb-6 text-center">
              {selectedProvider ? 'Select Role' : 'Connect Wallet'}
            </h3>
            {isBlocked && (
              <div className="bg-accent-red/10 border border-accent-red text-accent-red p-4 rounded-[15px] mb-6 text-sm text-center font-bold">
                This wallet has been blocked by the administrator.
              </div>
            )}
            
            {!selectedProvider ? (
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedProvider('xverse')}
                  className="w-full py-4 rounded-[15px] border border-border hover:border-accent-orange hover:bg-accent-orange/5 transition-all font-bold flex items-center justify-center gap-3"
                >
                  <div className="w-6 h-6 bg-ink rounded-full flex items-center justify-center text-bg text-xs">X</div>
                  Xverse Wallet
                </button>
                <button 
                  onClick={() => setSelectedProvider('leather')}
                  className="w-full py-4 rounded-[15px] border border-border hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all font-bold flex items-center justify-center gap-3"
                >
                  <div className="w-6 h-6 bg-ink rounded-full flex items-center justify-center text-bg text-xs">L</div>
                  Leather Wallet
                </button>
                <button 
                  onClick={() => setSelectedProvider('other')}
                  className="w-full py-4 rounded-[15px] border border-border hover:border-blue-500 hover:bg-blue-500/5 transition-all font-bold flex items-center justify-center gap-3"
                >
                  <Wallet size={24} className="text-blue-500" />
                  Any Bitcoin Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => handleConnect('client')}
                  className="w-full py-4 rounded-[15px] border border-border hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all font-bold flex flex-col items-center gap-2"
                >
                  <span className="text-accent-cyan"><Briefcase size={24} /></span>
                  Connect as Client
                </button>
                <button 
                  onClick={() => handleConnect('freelancer')}
                  className="w-full py-4 rounded-[15px] border border-border hover:border-accent-orange hover:bg-accent-orange/5 transition-all font-bold flex flex-col items-center gap-2"
                >
                  <span className="text-accent-orange"><PenTool size={24} /></span>
                  Connect as Freelancer
                </button>
                <button 
                  onClick={() => setSelectedProvider(null)}
                  className="w-full py-2 text-xs font-bold text-muted hover:text-ink transition-colors mt-2"
                >
                  Back to Wallets
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};
