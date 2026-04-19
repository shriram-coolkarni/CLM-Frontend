import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Star,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  FileText,
  TrendingUp,
  X,
  Grid3x3,
  List
} from 'lucide-react';

interface Case {
  id: string;
  title: string;
  client: string;
  caseType: string;
  status: 'active' | 'pending' | 'closed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  startDate: string;
  deadline: string;
  progress: number;
  isBookmarked: boolean;
  tags: string[];
  description: string;
}

const mockCases: Case[] = [
  {
    id: 'CASE-042',
    title: 'IP Rights Dispute - Patent Infringement',
    client: 'Tech Innovations Ltd',
    caseType: 'Intellectual Property',
    status: 'active',
    priority: 'critical',
    assignedTo: 'Adv. Sharma',
    startDate: '2026-02-15',
    deadline: '2026-06-30',
    progress: 65,
    isBookmarked: true,
    tags: ['IP', 'Patent', 'Litigation'],
    description: 'Patent infringement case involving software technology patents'
  },
  {
    id: 'CASE-038',
    title: 'Corporate Restructuring Advisory',
    client: 'Global Holdings Inc',
    caseType: 'Corporate Law',
    status: 'active',
    priority: 'high',
    assignedTo: 'Adv. Patel',
    startDate: '2026-03-01',
    deadline: '2026-07-15',
    progress: 40,
    isBookmarked: true,
    tags: ['Corporate', 'Restructuring', 'Advisory'],
    description: 'Complete corporate restructuring and compliance advisory'
  },
  {
    id: 'CASE-051',
    title: 'M&A Due Diligence - Acquisition',
    client: 'Investment Partners',
    caseType: 'Mergers & Acquisitions',
    status: 'active',
    priority: 'critical',
    assignedTo: 'Adv. Kumar',
    startDate: '2026-01-20',
    deadline: '2026-05-30',
    progress: 85,
    isBookmarked: true,
    tags: ['M&A', 'Due Diligence', 'Corporate'],
    description: 'Due diligence for acquisition of manufacturing company'
  },
  {
    id: 'CASE-029',
    title: 'Employment Dispute Resolution',
    client: 'TechCorp Solutions',
    caseType: 'Employment Law',
    status: 'pending',
    priority: 'medium',
    assignedTo: 'Adv. Mehta',
    startDate: '2026-03-15',
    deadline: '2026-05-15',
    progress: 30,
    isBookmarked: false,
    tags: ['Employment', 'Dispute', 'Labor'],
    description: 'Resolution of employment contract dispute with senior executive'
  },
  {
    id: 'CASE-056',
    title: 'Real Estate Transaction - Commercial Property',
    client: 'Property Developers Ltd',
    caseType: 'Real Estate',
    status: 'active',
    priority: 'high',
    assignedTo: 'Adv. Sharma',
    startDate: '2026-04-01',
    deadline: '2026-08-30',
    progress: 20,
    isBookmarked: false,
    tags: ['Real Estate', 'Commercial', 'Transaction'],
    description: 'Commercial property acquisition and title verification'
  },
  {
    id: 'CASE-033',
    title: 'Compliance Audit - Financial Regulations',
    client: 'FinServe Bank',
    caseType: 'Regulatory Compliance',
    status: 'on-hold',
    priority: 'medium',
    assignedTo: 'Adv. Patel',
    startDate: '2026-02-01',
    deadline: '2026-06-01',
    progress: 50,
    isBookmarked: false,
    tags: ['Compliance', 'Financial', 'Audit'],
    description: 'Comprehensive compliance audit for banking regulations'
  },
  {
    id: 'CASE-047',
    title: 'Contract Negotiation - Vendor Agreement',
    client: 'Manufacturing Corp',
    caseType: 'Contract Law',
    status: 'active',
    priority: 'low',
    assignedTo: 'Adv. Kumar',
    startDate: '2026-03-20',
    deadline: '2026-05-20',
    progress: 75,
    isBookmarked: false,
    tags: ['Contract', 'Negotiation', 'Vendor'],
    description: 'Long-term vendor agreement negotiation and drafting'
  },
  {
    id: 'CASE-019',
    title: 'Trademark Registration - Brand Protection',
    client: 'StartupX Innovations',
    caseType: 'Intellectual Property',
    status: 'closed',
    priority: 'low',
    assignedTo: 'Adv. Mehta',
    startDate: '2025-11-01',
    deadline: '2026-02-28',
    progress: 100,
    isBookmarked: false,
    tags: ['IP', 'Trademark', 'Registration'],
    description: 'Trademark registration and brand protection strategy'
  }
];

export default function Workspace() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCaseType, setFilterCaseType] = useState<string>('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const toggleBookmark = (caseId: string) => {
    setCases(cases.map(c =>
      c.id === caseId ? { ...c, isBookmarked: !c.isBookmarked } : c
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'closed': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'on-hold': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <TrendingUp className="w-4 h-4" strokeWidth={1.5} />;
      case 'pending': return <Clock className="w-4 h-4" strokeWidth={1.5} />;
      case 'closed': return <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />;
      case 'on-hold': return <AlertCircle className="w-4 h-4" strokeWidth={1.5} />;
      default: return <Briefcase className="w-4 h-4" strokeWidth={1.5} />;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || caseItem.priority === filterPriority;
    const matchesCaseType = filterCaseType === 'all' || caseItem.caseType === filterCaseType;
    const matchesBookmark = !showBookmarkedOnly || caseItem.isBookmarked;

    return matchesSearch && matchesStatus && matchesPriority && matchesCaseType && matchesBookmark;
  });

  const caseTypes = ['all', ...Array.from(new Set(cases.map(c => c.caseType)))];
  const bookmarkedCount = cases.filter(c => c.isBookmarked).length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-7 h-7 text-slate-900" strokeWidth={1.5} />
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            Workspace
          </h2>
        </div>
        <p className="text-slate-600">Search, filter, and manage your case studies</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by title, client, case ID, type, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" strokeWidth={1.5} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filterCaseType}
                onChange={(e) => setFilterCaseType(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 transition-colors text-sm appearance-none cursor-pointer"
              >
                {caseTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm ${
                  showBookmarkedOnly
                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Star
                  className={`w-4 h-4 ${showBookmarkedOnly ? 'fill-amber-500 text-amber-500' : ''}`}
                  strokeWidth={1.5}
                />
                Bookmarked ({bookmarkedCount})
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Card View"
              >
                <Grid3x3 className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            <p className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {filteredCases.length}
            </p>
            <p className="text-xs text-slate-600">Found</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-emerald-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {cases.filter(c => c.status === 'active').length}
            </p>
            <p className="text-xs text-slate-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-amber-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {cases.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-xs text-slate-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-red-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {cases.filter(c => c.status === 'on-hold').length}
            </p>
            <p className="text-xs text-slate-600">On Hold</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-slate-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              {cases.filter(c => c.status === 'closed').length}
            </p>
            <p className="text-xs text-slate-600">Closed</p>
          </div>
        </div>
      </div>

      {/* Cases Display - Card or List View */}
      {viewMode === 'card' ? (
        /* Card View */
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedCase(caseItem)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600">{caseItem.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border capitalize flex items-center gap-1 ${getPriorityColor(caseItem.priority)}`}>
                    {caseItem.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(caseItem.id);
                    }}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${
                        caseItem.isBookmarked
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-400 hover:text-amber-500'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg mb-2 line-clamp-2 group-hover:text-slate-900 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                {caseItem.title}
              </h3>

              {/* Client */}
              <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                <User className="w-4 h-4" strokeWidth={1.5} />
                <span>{caseItem.client}</span>
              </div>

              {/* Case Type */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                  {caseItem.caseType}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full border capitalize flex items-center gap-1 ${getStatusColor(caseItem.status)}`}>
                  {getStatusIcon(caseItem.status)}
                  {caseItem.status}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {caseItem.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-slate-50 text-slate-600 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-600">Progress</span>
                  <span className="text-xs text-slate-900">{caseItem.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                    style={{ width: `${caseItem.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" strokeWidth={1.5} />
                  <span>Deadline: {caseItem.deadline}</span>
                </div>
                {caseItem.assignedTo && (
                  <span>{caseItem.assignedTo}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Case ID</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Title</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Client</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Type</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Priority</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Progress</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Deadline</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600">Assigned To</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => (
                  <motion.tr
                    key={caseItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-slate-600">{caseItem.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{caseItem.title}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{caseItem.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 whitespace-nowrap">
                        {caseItem.caseType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border capitalize flex items-center gap-1 w-fit ${getStatusColor(caseItem.status)}`}>
                        {getStatusIcon(caseItem.status)}
                        {caseItem.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getPriorityColor(caseItem.priority)}`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                              style={{ width: `${caseItem.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-600 w-8">{caseItem.progress}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                        <span className="text-sm text-slate-600">{caseItem.deadline}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{caseItem.assignedTo || 'Unassigned'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(caseItem.id);
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Star
                            className={`w-4 h-4 transition-colors ${
                              caseItem.isBookmarked
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-slate-400 hover:text-amber-500'
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredCases.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-slate-600">No cases found matching your criteria</p>
        </div>
      )}

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-mono text-slate-600">{selectedCase.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border capitalize ${getPriorityColor(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border capitalize flex items-center gap-1 ${getStatusColor(selectedCase.status)}`}>
                      {getStatusIcon(selectedCase.status)}
                      {selectedCase.status}
                    </span>
                  </div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {selectedCase.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-slate-600 block mb-2">Client</label>
                  <p className="text-base">{selectedCase.client}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-600 block mb-2">Case Type</label>
                  <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                    {selectedCase.caseType}
                  </span>
                </div>

                <div>
                  <label className="text-sm text-slate-600 block mb-2">Description</label>
                  <p className="text-base text-slate-700">{selectedCase.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-600 block mb-2">Start Date</label>
                    <p className="text-base">{selectedCase.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 block mb-2">Deadline</label>
                    <p className="text-base">{selectedCase.deadline}</p>
                  </div>
                </div>

                {selectedCase.assignedTo && (
                  <div>
                    <label className="text-sm text-slate-600 block mb-2">Assigned To</label>
                    <p className="text-base">{selectedCase.assignedTo}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm text-slate-600 block mb-3">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.tags.map(tag => (
                      <span key={tag} className="text-sm px-3 py-1 bg-slate-50 text-slate-700 rounded-lg border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-slate-600">Progress</label>
                    <span className="text-lg" style={{ fontFamily: 'var(--font-display)' }}>{selectedCase.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                      style={{ width: `${selectedCase.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      toggleBookmark(selectedCase.id);
                      setSelectedCase(cases.find(c => c.id === selectedCase.id) || null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${selectedCase.isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
                      strokeWidth={1.5}
                    />
                    {selectedCase.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" strokeWidth={1.5} />
                    View Documents
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
