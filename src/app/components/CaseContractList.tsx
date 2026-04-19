import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Scale,
  Home,
  FileText,
  Ticket,
  Users,
  Settings,
  LogOut,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  User,
  ChevronDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase
} from 'lucide-react';

interface CaseContractListProps {
  userType: 'individual' | 'firm';
  onLogout: () => void;
}

interface Contract {
  id: string;
  title: string;
  client: string;
  type: string;
  status: 'draft' | 'review' | 'active' | 'expired' | 'terminated';
  startDate: string;
  endDate: string;
  value: string;
  assignedTo?: string;
  progress: number;
}

const mockContracts: Contract[] = [
  {
    id: 'CNT-001',
    title: 'Master Service Agreement - IT Services',
    client: 'TechCorp India Pvt Ltd',
    type: 'Service Agreement',
    status: 'active',
    startDate: '2026-01-15',
    endDate: '2027-01-15',
    value: '₹45,00,000',
    assignedTo: 'Adv. Sharma',
    progress: 75
  },
  {
    id: 'CNT-002',
    title: 'Non-Disclosure Agreement - Product Development',
    client: 'StartupX Solutions',
    type: 'NDA',
    status: 'review',
    startDate: '2026-04-01',
    endDate: '2027-04-01',
    value: '₹2,50,000',
    assignedTo: 'Adv. Patel',
    progress: 40
  },
  {
    id: 'CNT-003',
    title: 'Employment Contract - Senior Developer',
    client: 'Global Services Ltd',
    type: 'Employment',
    status: 'active',
    startDate: '2025-11-01',
    endDate: '2028-11-01',
    value: '₹18,00,000',
    assignedTo: 'Adv. Kumar',
    progress: 100
  },
  {
    id: 'CNT-004',
    title: 'License Agreement - Software Platform',
    client: 'Innovation Labs',
    type: 'License',
    status: 'draft',
    startDate: '2026-05-01',
    endDate: '2029-05-01',
    value: '₹1,25,00,000',
    assignedTo: 'Adv. Sharma',
    progress: 25
  },
  {
    id: 'CNT-005',
    title: 'Partnership Agreement - Joint Venture',
    client: 'Venture Partners Co',
    type: 'Partnership',
    status: 'review',
    startDate: '2026-03-15',
    endDate: '2031-03-15',
    value: '₹5,00,00,000',
    assignedTo: 'Adv. Mehta',
    progress: 60
  },
  {
    id: 'CNT-006',
    title: 'Consulting Agreement - Financial Advisory',
    client: 'FinTech Innovations',
    type: 'Consulting',
    status: 'active',
    startDate: '2025-09-01',
    endDate: '2026-09-01',
    value: '₹12,00,000',
    assignedTo: 'Adv. Patel',
    progress: 85
  },
  {
    id: 'CNT-007',
    title: 'Lease Agreement - Commercial Property',
    client: 'Real Estate Holdings Ltd',
    type: 'Lease',
    status: 'expired',
    startDate: '2023-01-01',
    endDate: '2026-01-01',
    value: '₹36,00,000',
    assignedTo: 'Adv. Kumar',
    progress: 100
  },
  {
    id: 'CNT-008',
    title: 'Supply Agreement - Raw Materials',
    client: 'Manufacturing Corp',
    type: 'Supply',
    status: 'active',
    startDate: '2026-02-01',
    endDate: '2027-02-01',
    value: '₹78,00,000',
    assignedTo: 'Adv. Sharma',
    progress: 90
  }
];

export default function CaseContractList({ userType, onLogout }: CaseContractListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
      case 'terminated': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />;
      case 'review': return <Clock className="w-4 h-4" strokeWidth={1.5} />;
      case 'draft': return <FileText className="w-4 h-4" strokeWidth={1.5} />;
      case 'expired': return <AlertCircle className="w-4 h-4" strokeWidth={1.5} />;
      default: return <FileText className="w-4 h-4" strokeWidth={1.5} />;
    }
  };

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: FileText, label: 'Contracts', active: true },
    { icon: Ticket, label: 'Tickets', active: false },
    { icon: Briefcase, label: 'Cases', active: false },
    { icon: Users, label: userType === 'firm' ? 'Team' : 'Clients', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-72 bg-white border-r border-slate-200 fixed lg:sticky top-0 h-screen z-40 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Scale className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
                  <div>
                    <h1 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      CrowVakil
                    </h1>
                    <p className="text-xs text-slate-600">
                      {userType === 'firm' ? 'Law Firm' : 'Individual'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-slate-900" strokeWidth={1.5} />
              </button>
              <div>
                <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  Contracts & Cases
                </h2>
                <p className="text-xs text-slate-600">
                  Manage all legal documents and matters
                </p>
              </div>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm">Demo User</p>
                  <p className="text-xs text-slate-600">demo@crowvakil.com</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600 hidden md:block" strokeWidth={1.5} />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2"
                  >
                    <div className="px-4 py-3 border-b border-slate-200">
                      <p className="text-sm">Demo User</p>
                      <p className="text-xs text-slate-600">demo@crowvakil.com</p>
                    </div>
                    <button className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors">
                      Profile Settings
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors">
                      Preferences
                    </button>
                    <div className="border-t border-slate-200 mt-2 pt-2">
                      <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search contracts by title, client, ID, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" strokeWidth={1.5} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="terminated">Terminated</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-5 h-5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">New Contract</span>
                </motion.button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="text-center">
                <p className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {mockContracts.length}
                </p>
                <p className="text-xs text-slate-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-emerald-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {mockContracts.filter(c => c.status === 'active').length}
                </p>
                <p className="text-xs text-slate-600">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-amber-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {mockContracts.filter(c => c.status === 'review').length}
                </p>
                <p className="text-xs text-slate-600">In Review</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-slate-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {mockContracts.filter(c => c.status === 'draft').length}
                </p>
                <p className="text-xs text-slate-600">Draft</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-red-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {mockContracts.filter(c => c.status === 'expired').length}
                </p>
                <p className="text-xs text-slate-600">Expired</p>
              </div>
            </div>
          </div>

          {/* Contracts List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Contract ID</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Title</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Client</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Type</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Value</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">End Date</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600">Progress</th>
                    <th className="text-left px-6 py-4 text-sm text-slate-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContracts.map((contract, index) => (
                    <motion.tr
                      key={contract.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-slate-600">{contract.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm max-w-xs truncate">{contract.title}</p>
                          {contract.assignedTo && (
                            <p className="text-xs text-slate-500 mt-1">Assigned to {contract.assignedTo}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{contract.client}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                          {contract.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full border capitalize flex items-center gap-1 w-fit ${getStatusColor(contract.status)}`}>
                          {getStatusIcon(contract.status)}
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-900">{contract.value}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                          <span className="text-sm text-slate-600">{contract.endDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                                style={{ width: `${contract.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-600 w-8">{contract.progress}%</span>
                          </div>
                        </div>
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

            {filteredContracts.length === 0 && (
              <div className="py-16 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-slate-600">No contracts found matching your criteria</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
