import { useState, useRef, useEffect } from 'react';
import './App.css';

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.34)_0%,transparent_70%),radial-gradient(ellipse_at_80%_100%,rgba(139,92,246,0.3)_0%,transparent_60%),radial-gradient(ellipse_at_0%_50%,rgba(139,92,246,0.22)_0%,transparent_50%)]" />
      
      <div className="absolute inset-0 background-noise" aria-hidden="true" />
      
      <div className="absolute inset-0 background-grid" aria-hidden="true" />
      
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="glow-orb animate-float"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 20}%`,
            background: i % 2 === 0
              ? 'linear-gradient(135deg, rgba(59,130,246,0.85) 0%, rgba(139,92,246,0.55) 100%)'
              : 'linear-gradient(135deg, rgba(139,92,246,0.75) 0%, rgba(59,130,246,0.45) 100%)',
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${12 + i * 2}s`,
          }}
        />
      ))}
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
           style={{ width: '650px', height: '650px', filter: 'blur(180px)', background: 'radial-gradient(circle, rgba(59,130,246,0.65) 0%, transparent 70%)' }} />
    </div>
  );
}

function Logo() {
  return (
    <svg 
      className="w-11 h-11" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#logoGradient)" opacity="0.15"/>
      <path d="M14 24L21 31L34 17" stroke="url(#logoGradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="18" stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.3"/>
    </svg>
  );
}

function FloatingParticles() {
  const [particles, setParticles] = useState(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.35,
    }));
  });

  useEffect(() => {
    let frame;
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100,
      })));
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}

function InputField({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  onBlur,
  error,
  icon,
  showToggle,
  onToggleShow,
  disabled,
  autoComplete,
  placeholder = ' ',
  required,
  id,
}) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const form = inputRef.current?.closest('form');
      if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      }
    }
  };

  return (
    <div className="relative group" style={{ animationDelay: `${parseInt(name?.slice(-1) || '1') * 100}ms` }}>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] transition-colors duration-300 group-focus-within:text-[var(--color-primary)]" aria-hidden="true">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={`input-field ${icon ? 'pl-12' : ''} ${showToggle ? 'pr-12' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          style={{ paddingLeft: icon ? '3rem' : undefined, paddingRight: showToggle ? '3rem' : undefined }}
        />
        <label 
          htmlFor={id || name}
          className={`label-float ${hasValue || focused ? 'has-value' : ''}`}
          style={icon ? { left: '3rem' } : undefined}
        >
          {label}
        </label>
        {showToggle && (
          <button
            type="button"
            onClick={onToggleShow}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 p-1"
            aria-label={type === 'password' ? 'Show password' : 'Hide password'}
            tabIndex={-1}
          >
            {type === 'password' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-[var(--color-error)] flex items-center gap-1.5" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function SocialButton({ children, onClick, disabled, icon, 'aria-label': ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="btn-secondary w-full flex items-center justify-center gap-3"
      style={{ minHeight: '52px' }}
    >
      <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`notification ${type === 'success' ? 'notification-success' : type === 'error' ? 'notification-error' : 'notification-info'}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
          {type === 'success' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          )}
          {type === 'error' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          )}
          {type === 'info' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          )}
        </div>
        <p className="text-sm text-[var(--color-text)]">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-label="Dismiss notification"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function LoadingSpinner({ size = 20 }) {
  return (
    <svg 
      className="animate-spin" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeDasharray="31.4 31.4" 
        opacity="0.25"
      />
      <path 
        d="M12 2C12 2 12 6 12 6" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

export default function App() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    if (touched[name]) {
      const error = validateField(name, type === 'checkbox' ? checked : value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, type === 'checkbox' ? checked : value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    
    setTouched({ email: true, password: true });
    setErrors(newErrors);
    
    if (newErrors.email || newErrors.password) {
      addNotification('Please fix the errors above', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification('Welcome back! Redirecting...', 'success');
      
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Login successful:', formData);
      }, 1000);
    } catch {
      addNotification('Sign in failed. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    const urls = {
      Google: 'https://accounts.google.com/',
      GitHub: 'https://github.com/login',
    };
    window.location.href = urls[provider];
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    addNotification('Password reset link sent to your email', 'info');
  };

  /* eslint-disable react/no-danger-with-ref -- eslint-enable */
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <BackgroundEffects />
      <FloatingParticles />
      
      <main className="relative w-full max-w-md animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="glass-strong rounded-2xl p-8 sm:p-10 shadow-[var(--shadow-card)]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.2) 100%)' }}>
              <Logo />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-text)] tracking-tight mb-2 animate-fade-in" style={{ animationDelay: '300ms' }}>
              Premium Sign In
            </h1>
            <p className="text-[var(--color-text-muted)] text-base animate-fade-in" style={{ animationDelay: '400ms' }}>
              Sign in to continue to your account
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
              icon={<EmailIcon />}
              autoComplete="email"
              required
              id="email"
              disabled={isSubmitting}
              placeholder=" "
            />

            <InputField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : undefined}
              icon={<LockIcon />}
              showToggle
              onToggleShow={() => setShowPassword(!showPassword)}
              autoComplete="current-password"
              required
              id="password"
              disabled={isSubmitting}
              placeholder=" "
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-card)] accent-[var(--color-primary)] transition-colors"
                  aria-describedby="remember-desc"
                />
                <span id="remember-desc" className="text-sm text-[var(--color-text-muted)]">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isSubmitting}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-2"
              style={{ minHeight: '52px' }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size={20} />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider my-8">
            <span>or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton
              onClick={() => handleSocialLogin('Google')}
              disabled={isSubmitting}
              icon={<GoogleIcon />}
              aria-label="Sign in with Google"
            >
              Google
            </SocialButton>
            <SocialButton
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isSubmitting}
              icon={<GitHubIcon />}
              aria-label="Sign in with GitHub"
            >
              GitHub
            </SocialButton>
          </div>

          <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] font-semibold transition-colors"
              onClick={() => addNotification('Sign up page would open here', 'info')}
            >
              Create Account
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-text-muted)] max-w-md mx-auto">
          By continuing, you agree to our{' '}
          <button type="button" className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] underline underline-offset-2 transition-colors">Terms of Service</button>
          {' '}and{' '}
          <button type="button" className="text-[var(--color-primary)] hover:text-[var(--color-primary-glow)] underline underline-offset-2 transition-colors">Privacy Policy</button>
        </p>
      </main>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" role="region" aria-label="Notifications">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  );
}