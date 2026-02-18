import React from 'react';
import { Home, BookOpen, Bell, User } from 'lucide-react';

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-t border-slate-100">
    <button className="flex flex-col items-center text-indigo-600"><Home size={22}/><span className="text-[10px] font-bold mt-1">Home</span></button>
    <button className="flex flex-col items-center text-slate-400"><BookOpen size={22}/><span className="text-[10px] mt-1">Courses</span></button>
    <button className="flex flex-col items-center text-slate-400"><Bell size={22}/><span className="text-[10px] mt-1">Notif</span></button>
    <button className="flex flex-col items-center text-slate-400"><User size={22}/><span className="text-[10px] mt-1">Profile</span></button>
  </div>
);

export default BottomNav;