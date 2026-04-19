import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  LogOut,
  FileText,
  Ticket,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';

interface DashboardProps {
  userType: 'individual' | 'firm';
  onLogout: () => void;
}

interface TicketType {
  id: string;
  title: string;
  client: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  createdAt: string;
  category: string;
}

const mockTickets: TicketType[] = [
  {
    id: 'TKT-001',
    title: 'Contract Review - Merger Agreement',
    client: 'TechCorp India Pvt Ltd',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Adv. Sharma',
    createdAt: '2026-04-15',
    category: 'Contract Review'
  },
  {
    id: 'TKT-002',
    title: 'NDA Draft for Partnership',
    client: 'StartupX Solutions',
    status: 'open',
    priority: 'medium',
    assignee: 'Adv. Patel',
    createdAt: '2026-04-16',
    category: 'Drafting'
  },
  {
    id: 'TKT-003',
    title: 'Employment Agreement Amendment',
    client: 'Global Services Ltd',
    status: 'resolved',
    priority: 'low',
    assignee: 'Adv. Kumar',
    createdAt: '2026-04-10',
    category: 'Amendment'
  },
  {
    id: 'TKT-004',
    title: 'License Agreement Negotiation',
    client: 'Innovation Labs',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-04-17',
    category: 'Negotiation'
  }
];

export default function Dashboard({ userType, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'contracts'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewTicket, setShowNewTicket] = useState(false);

  const stats = [
    { label: 'Active Contracts', value: '247', change: '+12%', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Open Tickets', value: '18', change: '+3', icon: Ticket, color: 'from-amber-500 to-amber-600' },
    { label: userType === 'firm' ? 'Team Members' : 'Clients', value: userType === 'firm' ? '24' : '15', change: '+2', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Compliance Rate', value: '98%', change: '+2%', icon: TrendingUp, color: 'from-violet-500 to-violet-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const filteredTickets = mockTickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Scale className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  CrowVakil
                </h1>
                <p className="text-xs text-slate-600">
                  {userType === 'firm' ? 'Firm Dashboard' : 'Individual Dashboard'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-700">demo@crowvakil.com</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden md:inline">Logout</span>
              </motion.button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1 mt-6 border-b border-slate-200">
            {(['overview', 'tickets', 'contracts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm capitalize transition-all relative ${
                  activeTab === tab
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-slate-200 relative overflow-hidden group hover:shadow-lg transition-shadow"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                        </div>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                        {stat.value}
                      </h3>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Recent Tickets
                  </h3>
                  <div className="space-y-4">
                    {mockTickets.slice(0, 3).map((ticket) => (
                      <div key={ticket.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          ticket.status === 'resolved' ? 'bg-emerald-100' :
                          ticket.status === 'in-progress' ? 'bg-blue-100' : 'bg-amber-100'
                        }`}>
                          {ticket.status === 'resolved' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                          ) : ticket.status === 'in-progress' ? (
                            <Clock className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm mb-1 truncate">{ticket.title}</h4>
                          <p className="text-xs text-slate-600">{ticket.client}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Upcoming Deadlines
                  </h3>
                  <div className="space-y-4">
                    {[
                      { task: 'Submit revised merger documents', date: 'Apr 18, 2026', client: 'TechCorp India' },
                      { task: 'NDA review deadline', date: 'Apr 20, 2026', client: 'StartupX' },
                      { task: 'License agreement finalization', date: 'Apr 22, 2026', client: 'Innovation Labs' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-violet-600" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{item.task}</h4>
                          <p className="text-xs text-slate-600">{item.client}</p>
                        </div>
                        <span className="text-xs text-slate-600 whitespace-nowrap">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Tickets Header */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      Ticket Management
                    </h2>
                    <p className="text-sm text-slate-600">Track and manage all legal matters</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNewTicket(!showNewTicket)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    New Ticket
                  </motion.button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search tickets by title, client, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                    <Filter className="w-4 h-4" strokeWidth={1.5} />
                    Filter
                  </button>
                </div>
              </div>

              {/* Tickets List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Ticket ID</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Title</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Client</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Status</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Priority</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Assignee</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600">Created</th>
                        <th className="text-left px-6 py-4 text-sm text-slate-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTickets.map((ticket, index) => (
                        <motion.tr
                          key={ticket.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <span className="text-sm font-mono text-slate-600">{ticket.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm">{ticket.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{ticket.client}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{ticket.assignee || 'Unassigned'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-600">{ticket.createdAt}</span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contracts' && (
            <motion.div
              key="contracts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-12 border border-slate-200 text-center"
            >
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Contract Management
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Contract lifecycle management features will be available here. Track drafts, negotiations, approvals, and renewals.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewTicket(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Create New Ticket
              </h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Ticket Title</label>
                  <input
                    type="text"
                    placeholder="Brief description of the legal matter"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Client Name</label>
                  <input
                    type="text"
                    placeholder="Client or company name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-slate-700">Category</label>
                    <select className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors">
                      <option>Contract Review</option>
                      <option>Drafting</option>
                      <option>Negotiation</option>
                      <option>Amendment</option>
                      <option>Litigation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-slate-700">Priority</label>
                    <select className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Detailed description of the legal matter and requirements"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Create Ticket
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => setShowNewTicket(false)}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
