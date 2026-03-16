
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

export const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');
  
  const chats = [
    { id: 1, name: 'Alice', role: 'Client', lastMessage: 'Hey, are you available for a new project?', time: '10m ago', unread: true, seed: 'Alice' },
    { id: 2, name: 'Bob', role: 'Freelancer', lastMessage: 'The designs look great, thanks!', time: '2h ago', unread: false, seed: 'Bob' },
    { id: 3, name: 'Charlie', role: 'Client', lastMessage: 'Can we schedule a call for tomorrow?', time: '1d ago', unread: false, seed: 'Charlie' },
  ];

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px] h-screen flex flex-col">
      <div className="container-custom flex-1 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="w-10 h-10 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">Messages</h1>
        </div>
        
        <div className="flex-1 bg-surface border border-border rounded-[15px] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          {/* Chat List */}
          <div className={`w-full md:w-80 border-r border-border flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border">
              <div className="bg-ink/5 rounded-[15px] px-4 py-2 flex items-center gap-2">
                <Search size={16} className="text-muted" />
                <input type="text" placeholder="Search messages..." className="bg-transparent border-none focus:ring-0 text-sm w-full" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {chats.map(chat => (
                <div 
                  key={chat.id} 
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-border/50 cursor-pointer transition-colors flex items-start gap-4 ${selectedChat === chat.id ? 'bg-ink/5' : 'hover:bg-ink/5'}`}
                >
                  <div className="relative">
                    <img src={`https://picsum.photos/seed/${chat.seed}/100/100`} alt={chat.name} className="w-12 h-12 rounded-[10px] object-cover" referrerPolicy="no-referrer" />
                    {chat.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-accent-cyan rounded-full border-2 border-surface"></span>}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`text-sm truncate ${chat.unread ? 'font-black' : 'font-bold'}`}>{chat.name}</h4>
                      <span className="text-[10px] text-muted whitespace-nowrap">{chat.time}</span>
                    </div>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">{chat.role}</p>
                    <p className={`text-xs truncate ${chat.unread ? 'text-ink font-bold' : 'text-muted'}`}>{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
            {currentChat ? (
              <>
                <div className="p-6 border-b border-border flex items-center justify-between bg-ink/5">
                  <div className="flex items-center gap-4">
                    <button className="md:hidden text-muted hover:text-ink" onClick={() => setSelectedChat(null)}>
                      <ChevronLeft size={24} />
                    </button>
                    <img src={`https://picsum.photos/seed/${currentChat.seed}/100/100`} alt={currentChat.name} className="w-10 h-10 rounded-[10px] object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="font-bold text-lg">{currentChat.name}</h3>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{currentChat.role}</p>
                    </div>
                  </div>
                  <button className="text-muted hover:text-ink"><MoreHorizontal size={20} /></button>
                </div>
                
                <div className="flex-1 p-6 overflow-y-auto no-scrollbar space-y-6">
                  <div className="text-center text-[10px] text-muted font-bold uppercase tracking-widest my-4">Today</div>
                  <div className="flex justify-start">
                    <div className="max-w-[70%] p-4 rounded-[15px] text-sm bg-ink/5 text-ink rounded-tl-none border border-border">
                      {currentChat.lastMessage}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2 bg-ink/5 border border-border rounded-[15px] p-2">
                    <button className="p-2 text-muted hover:text-ink transition-colors"><Plus size={20} /></button>
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..." 
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm outline-none px-2" 
                    />
                    <button className="w-10 h-10 bg-ink text-bg rounded-[15px] flex items-center justify-center hover:scale-105 transition-transform shrink-0">
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted p-6 text-center">
                <MessageCircle size={48} className="mb-4 opacity-20" />
                <h3 className="text-xl font-black mb-2">Your Messages</h3>
                <p className="text-sm">Select a conversation from the list to start chatting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
