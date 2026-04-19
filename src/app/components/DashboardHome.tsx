import { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Briefcase,
  Star,
  ArrowUpRight
} from 'lucide-react';

interface DashboardHomeProps {
  userType: 'individual' | 'firm';
}

export default function DashboardHome({ userType }: DashboardHomeProps) {
  const stats = [
    {
      label: 'Active Contracts',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Open Cases',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: Briefcase,
      color: 'from-amber-500 to-amber-600'
    },
    {
      label: userType === 'firm' ? 'Team Members' : 'Clients',
      value: userType === 'firm' ? '24' : '15',
      change: '+2',
      trend: 'up',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Compliance Rate',
      value: '98%',
      change: '+2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-violet-500 to-violet-600'
    }
  ];

  const recentActivity = [
    {
      title: 'Contract Review - Merger Agreement',
      client: 'TechCorp India Pvt Ltd',
      status: 'in-progress',
      time: '2 hours ago',
      type: 'contract'
    },
    {
      title: 'NDA Draft for Partnership',
      client: 'StartupX Solutions',
      status: 'pending',
      time: '5 hours ago',
      type: 'contract'
    },
    {
      title: 'Employment Agreement Amendment',
      client: 'Global Services Ltd',
      status: 'completed',
      time: '1 day ago',
      type: 'case'
    },
    {
      title: 'License Agreement Negotiation',
      client: 'Innovation Labs',
      status: 'in-progress',
      time: '2 days ago',
      type: 'contract'
    }
  ];

  const upcomingDeadlines = [
    {
      task: 'Submit revised merger documents',
      date: 'Apr 18, 2026',
      client: 'TechCorp India',
      priority: 'high'
    },
    {
      task: 'NDA review deadline',
      date: 'Apr 20, 2026',
      client: 'StartupX',
      priority: 'medium'
    },
    {
      task: 'License agreement finalization',
      date: 'Apr 22, 2026',
      client: 'Innovation Labs',
      priority: 'high'
    },
    {
      task: 'Partnership agreement signing',
      date: 'Apr 25, 2026',
      client: 'Venture Partners',
      priority: 'low'
    }
  ];

  const bookmarkedCases = [
    {
      id: 'CASE-042',
      title: 'IP Rights Dispute - Patent Infringement',
      client: 'Tech Innovations Ltd',
      progress: 65
    },
    {
      id: 'CASE-038',
      title: 'Corporate Restructuring Advisory',
      client: 'Global Holdings Inc',
      progress: 40
    },
    {
      id: 'CASE-051',
      title: 'M&A Due Diligence - Acquisition',
      client: 'Investment Partners',
      progress: 85
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Good afternoon
        </h2>
        <p className="text-slate-600">Here's what's happening with your legal matters today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {stat.value}
              </h3>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Recent Activity
            </h3>
            <button className="text-sm text-slate-600 hover:text-slate-900 underline">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.status === 'completed' ? 'bg-emerald-100' :
                  activity.status === 'in-progress' ? 'bg-blue-100' : 'bg-amber-100'
                }`}>
                  {activity.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                  ) : activity.status === 'in-progress' ? (
                    <Clock className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm mb-1 truncate">{activity.title}</h4>
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-600">{activity.client}</p>
                    <span className="text-xs text-slate-400">•</span>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Upcoming Deadlines
            </h3>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm flex-1">{item.task}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3 h-3" strokeWidth={1.5} />
                  <span>{item.date}</span>
                  <span className="text-slate-400">•</span>
                  <span>{item.client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookmarked Cases */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" fill="currentColor" strokeWidth={1.5} />
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
              Bookmarked Cases
            </h3>
          </div>
          <button className="text-sm text-slate-600 hover:text-slate-900 underline">
            View workspace
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarkedCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="p-5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-600">{caseItem.id}</span>
                <Star className="w-4 h-4 text-amber-500" fill="currentColor" strokeWidth={1.5} />
              </div>
              <h4 className="text-sm mb-2 line-clamp-2">{caseItem.title}</h4>
              <p className="text-xs text-slate-600 mb-4">{caseItem.client}</p>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600">Progress</span>
                  <span className="text-xs text-slate-900">{caseItem.progress}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                    style={{ width: `${caseItem.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
