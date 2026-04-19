import { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, Building2, User, ArrowRight, Shield, Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (userType: 'individual' | 'firm', credentials: { email: string; password: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'individual' | 'firm'>('individual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType, { email, password });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-slate-900 to-slate-700 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-800 to-slate-600 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 p-16 flex-col justify-between text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Scale className="w-10 h-10" strokeWidth={1.5} />
              <h1 className="text-4xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                CrowVakil
              </h1>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md">
              Comprehensive Contract Lifecycle Management platform designed for modern Indian law practices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-slate-400 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Enterprise-grade Security
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Bank-level encryption and compliance with Indian data protection standards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-slate-400 mt-1" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Built for Law Firms
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tailored workflows for individual practitioners and full-service firms.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-12">
              <Scale className="w-8 h-8" strokeWidth={1.5} />
              <h1 className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                CrowVakil
              </h1>
            </div>

            <h2 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {isSignUp ? 'Create Account' : 'Welcome back'}
            </h2>
            <p className="text-slate-600 mb-12">
              {isSignUp ? 'Sign up to start managing your legal matters' : 'Sign in to access your contracts and tickets'}
            </p>

            <motion.form
              key={isSignUp ? 'signup' : 'login'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {isSignUp && (
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm mb-2 text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" strokeWidth={1.5} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm mb-2 text-slate-700">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('individual')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        userType === 'individual'
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <User className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                      <span className="text-sm">Individual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('firm')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        userType === 'firm'
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-slate-700" strokeWidth={1.5} />
                      <span className="text-sm">Law Firm</span>
                    </button>
                  </div>
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <span className="text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-slate-600 hover:text-slate-900 underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-lg hover:bg-slate-800 transition-colors group flex items-center justify-center gap-2"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <p className="text-center text-sm text-slate-600">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-slate-900 underline hover:no-underline"
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-slate-900 underline hover:no-underline"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
