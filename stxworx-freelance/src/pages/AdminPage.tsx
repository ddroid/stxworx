
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

export const AdminDashboard = () => {
  const { blockedWallets, blockWallet, unblockWallet } = Shared.useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'wallet'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [walletToBlock, setWalletToBlock] = useState('');
  const [daoFee, setDaoFee] = useState(10);
  const [daoWallet, setDaoWallet] = useState('SP3...DAO');
  const [isSavingDao, setIsSavingDao] = useState(false);
  const [disputes, setDisputes] = useState([
    { id: 'DSP-1042', client: '0x123...abc', freelancer: '0x456...def', amount: '$1,200', status: 'Pending' },
    { id: 'DSP-1043', client: '0x789...ghi', freelancer: '0xabc...jkl', amount: '$3,500', status: 'Pending' },
  ]);

  const handleReleaseEscrow = (id: string, to: 'client' | 'freelancer') => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: `Resolved (Paid to ${to})` } : d));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'STXWORX' && password === 'ADMINMARS@110') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleSaveDaoConfig = () => {
    setIsSavingDao(true);
    setTimeout(() => {
      setIsSavingDao(false);
      alert('DAO Wallet Configuration Saved successfully!');
    }, 1000);
  };

  const stats = [
    { label: 'Total Users', value: '12,450', change: '+12%', color: 'text-accent-orange' },
    { label: 'Revenue', value: '$45,200', change: '+8%', color: 'text-accent-cyan' },
    { label: 'Active Tasks', value: '156', change: '-2%', color: 'text-accent-red' },
    { label: 'Support Tickets', value: '12', change: '0%', color: 'text-accent-blue' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-12 flex flex-col items-center">
            <Shared.Logo className="text-5xl mb-6" />
            <h1 className="text-4xl font-black tracking-tighter mb-2">Admin Portal</h1>
            <p className="text-muted">Secure access for STXWORX administrators</p>
          </div>

          <div className="card p-8">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setLoginMethod('credentials')}
                className={`flex-1 py-3 rounded-[15px] text-[10px] font-bold uppercase tracking-widest transition-all ${loginMethod === 'credentials' ? 'bg-ink text-bg' : 'bg-ink/5 text-muted hover:text-ink'}`}
              >
                Credentials
              </button>
              <button 
                onClick={() => setLoginMethod('wallet')}
                className={`flex-1 py-3 rounded-[15px] text-[10px] font-bold uppercase tracking-widest transition-all ${loginMethod === 'wallet' ? 'bg-ink text-bg' : 'bg-ink/5 text-muted hover:text-ink'}`}
              >
                Wallet
              </button>
            </div>

            {loginMethod === 'credentials' ? (
              <form className="space-y-6" onSubmit={handleLogin}>
                {loginError && <p className="text-xs text-accent-red text-center font-bold">{loginError}</p>}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange" 
                    placeholder="admin_user" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-3 text-sm focus:ring-1 focus:ring-accent-orange" 
                    placeholder="••••••••" 
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 font-bold">Sign In</button>
              </form>
            ) : (
              <div className="space-y-6">
                <p className="text-xs text-center text-muted">Connect your authorized administrator wallet to continue.</p>
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-ink text-bg py-4 rounded-[15px] font-bold flex items-center justify-center gap-3 hover:bg-accent-orange transition-all"
                >
                  <Wallet size={20} />
                  Connect Admin Wallet
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-6 md:pl-[92px]">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">Admin Dashboard</h1>
            <p className="text-muted">Welcome back, Administrator.</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="btn-outline flex items-center gap-2">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(s => (
            <div key={s.label} className="card p-6">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">{s.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black tracking-tighter">{s.value}</p>
                <span className={`text-[10px] font-bold ${s.change.startsWith('+') ? 'text-accent-cyan' : 'text-accent-red'}`}>
                  {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold">Recent Activity</h3>
              <button className="text-xs text-accent-orange font-bold">View Logs</button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center">
                      <ShieldCheck size={18} className="text-accent-cyan" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">System Update Successful</p>
                      <p className="text-[10px] text-muted">Server node #04 updated to v2.4.1</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted font-bold">14:20 PM</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="card">
              <h3 className="font-bold mb-8">User Access Control</h3>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Block Wallet Address</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={walletToBlock}
                    onChange={(e) => setWalletToBlock(e.target.value)}
                    className="w-full bg-ink/5 border border-border rounded-[10px] px-3 py-2 text-xs focus:ring-1 focus:ring-accent-red outline-none" 
                    placeholder="0x..." 
                  />
                  <button 
                    onClick={() => { if(walletToBlock) { blockWallet(walletToBlock); setWalletToBlock(''); } }}
                    className="bg-accent-red text-white px-3 py-2 rounded-[10px] text-xs font-bold hover:bg-red-600 transition-colors"
                  >
                    Block
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">Blocked Wallets</h4>
                {blockedWallets.length === 0 ? (
                  <p className="text-xs text-muted italic">No wallets currently blocked.</p>
                ) : (
                  <ul className="space-y-2">
                    {blockedWallets.map(wallet => (
                      <li key={wallet} className="flex items-center justify-between bg-ink/5 p-2 rounded-[8px] text-xs">
                        <span className="font-mono truncate max-w-[150px]">{wallet}</span>
                        <button onClick={() => unblockWallet(wallet)} className="text-accent-cyan hover:underline font-bold">Unblock</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold mb-8">DAO Wallet Configuration</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">DAO Fee Percentage (%)</label>
                  <input 
                    type="number" 
                    value={daoFee}
                    onChange={(e) => setDaoFee(Number(e.target.value))}
                    className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-2 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">DAO Wallet Address</label>
                  <input 
                    type="text" 
                    value={daoWallet}
                    onChange={(e) => setDaoWallet(e.target.value)}
                    className="w-full bg-ink/5 border border-border rounded-[15px] px-4 py-2 text-sm focus:ring-1 focus:ring-accent-orange outline-none"
                    placeholder="SP..."
                  />
                </div>
                <button 
                  onClick={handleSaveDaoConfig}
                  disabled={isSavingDao}
                  className="btn-primary w-full py-3"
                >
                  {isSavingDao ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold">Escrow Dispute Resolution</h3>
            <span className="text-xs text-muted bg-ink/5 px-3 py-1 rounded-full font-bold">{disputes.filter(d => d.status === 'Pending').length} Active Disputes</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted uppercase tracking-widest">
                  <th className="pb-4 font-bold">Dispute ID</th>
                  <th className="pb-4 font-bold">Client Wallet</th>
                  <th className="pb-4 font-bold">Freelancer Wallet</th>
                  <th className="pb-4 font-bold">Amount</th>
                  <th className="pb-4 font-bold">Status</th>
                  <th className="pb-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map(dispute => (
                  <tr key={dispute.id} className="border-b border-border last:border-0 hover:bg-ink/5 transition-colors">
                    <td className="py-4 font-bold">{dispute.id}</td>
                    <td className="py-4 font-mono text-xs">{dispute.client}</td>
                    <td className="py-4 font-mono text-xs">{dispute.freelancer}</td>
                    <td className="py-4 font-black">{dispute.amount}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${dispute.status === 'Pending' ? 'bg-accent-orange/10 text-accent-orange' : 'bg-accent-cyan/10 text-accent-cyan'}`}>
                        {dispute.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {dispute.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleReleaseEscrow(dispute.id, 'client')} className="text-xs font-bold text-accent-red hover:underline">Refund Client</button>
                          <span className="text-muted">|</span>
                          <button onClick={() => handleReleaseEscrow(dispute.id, 'freelancer')} className="text-xs font-bold text-accent-cyan hover:underline">Pay Freelancer</button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted italic">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
