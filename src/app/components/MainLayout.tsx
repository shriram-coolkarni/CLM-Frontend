import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Scale,
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DashboardHome from './DashboardHome';
import CaseContractList from './CaseContractList';
import Workspace from './Workspace';

interface MainLayoutProps {
  userType: 'individual' | 'firm';
  onLogout: () => void;
}

type ActivePage = 'dashboard' | 'contracts' | 'workspace' | 'cases' | 'team' | 'settings';

export default function MainLayout({ userType, onLogout }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navigationItems = [
    { id: 'dashboard' as ActivePage, icon: Home, label: 'Dashboard' },
    { id: 'contracts' as ActivePage, icon: FileText, label: 'Contracts' },
    { id: 'workspace' as ActivePage, icon: Briefcase, label: 'Workspace' },
    { id: 'team' as ActivePage, icon: Users, label: userType === 'firm' ? 'Team' : 'Clients' },
    { id: 'settings' as ActivePage, icon: Settings, label: 'Settings' }
  ];

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'contracts': return 'Contracts & Cases';
      case 'workspace': return 'Workspace';
      case 'team': return userType === 'firm' ? 'Team' : 'Clients';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Overview of your legal matters';
      case 'contracts': return 'Manage all legal documents and matters';
      case 'workspace': return 'Search and manage case studies';
      case 'team': return userType === 'firm' ? 'Manage team members' : 'Manage your clients';
      case 'settings': return 'Configure your preferences';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? '72px' : '288px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white border-r border-slate-200 sticky top-0 h-screen z-40 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="border-b border-slate-200 flex items-center justify-center" style={{ height: '73px' }}>
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {sidebarCollapsed ? (
              <Scale className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
            ) : (
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
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${
                    activePage === item.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
                </button>

                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap z-50 pointer-events-none"
                  >
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle Button */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition-all`}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <div
            className="relative"
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              onClick={onLogout}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
              {!sidebarCollapsed && <span className="text-sm">Logout</span>}
            </button>

            {/* Tooltip for logout */}
            {sidebarCollapsed && hoveredItem === 'logout' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap z-50 pointer-events-none"
              >
                Logout
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                {getPageTitle()}
              </h2>
              <p className="text-xs text-slate-600">
                {getPageSubtitle()}
              </p>
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
                      <p className="text-xs text-slate-600">shriram@crowvakil.com</p>
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

        {/* Page Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activePage === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardHome userType={userType} />
              </motion.div>
            )}

            {activePage === 'contracts' && (
              <motion.div
                key="contracts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    Contracts Management
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Contract lifecycle management features will be available here.
                  </p>
                </div>
              </motion.div>
            )}

            {activePage === 'workspace' && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Workspace />
              </motion.div>
            )}

            {activePage === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    {userType === 'firm' ? 'Team Management' : 'Client Management'}
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    {userType === 'firm'
                      ? 'Manage your team members, roles, and permissions.'
                      : 'Manage your client relationships and information.'}
                  </p>
                </div>
              </motion.div>
            )}

            {activePage === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    Settings
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Configure your account preferences and system settings.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
