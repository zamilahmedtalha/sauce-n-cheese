import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useStore } from '../../lib/store';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function Navbar() {
  const { cart } = useStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="glass-panel rounded-full px-8 py-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/20"
        >
          <Link to="/" className="text-4xl font-display font-medium tracking-tighter text-pri flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.png" 
              alt="Sauce N Cheese Logo" 
              className="h-14 w-auto object-contain bg-white rounded-xl shadow-sm px-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="hidden">SAUCE <span className="text-black">N</span> CHEESE</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link key={link.name} to={link.path} className="relative px-6 py-3 text-lg font-bold tracking-widest uppercase group">
                <span className={cn(
                  "relative z-10 transition-colors duration-300",
                  location.pathname === link.path ? "text-white" : "text-fg group-hover:text-white"
                )}>
                  {link.name}
                </span>
                {(location.pathname === link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-pri rounded-full z-0 shadow-[0_4px_0_0_rgb(200,80,0)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                {/* Hover indicator */}
                <div className="absolute inset-0 bg-black/80 rounded-full z-[5] scale-0 group-hover:scale-100 transition-transform duration-300 transform origin-center opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="relative rounded-full h-16 w-16" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-8 h-8 cursor-none text-pri" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-red-600 text-white text-xs w-7 h-7 flex items-center justify-center rounded-full font-bold shadow-md border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </Button>
            
            <button 
              className="md:hidden p-3 text-fg hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon className="w-8 h-8 text-pri" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
        >
          <button 
            className="absolute top-6 right-6 p-4"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-8 h-8 text-black" />
          </button>
          <div className="flex flex-col gap-6 text-center">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-4xl font-display uppercase font-bold text-fg hover:text-pri transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
