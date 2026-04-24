import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="relative bg-zinc-950 text-white pt-32 pb-12 overflow-hidden mt-32">
      {/* Mega Background Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-pri/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-1 md:col-span-4">
             <h2 className="text-6xl font-display font-bold leading-none mb-6 tracking-tighter text-pri">
              SAUCE<br/>N<br/>CHEESE.
             </h2>
             <p className="text-zinc-400 font-bold mb-8 max-w-xs uppercase tracking-widest text-sm">
               Global Halal Burger Dominance. No Compromise.
             </p>
             <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
               Join 5M+ Rewards
             </Button>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-display text-2xl tracking-wide mb-6 uppercase">Menu</h4>
            <ul className="space-y-4">
              <li><Link to="/menu" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Burgers</Link></li>
              <li><Link to="/menu?category=fries" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Sides</Link></li>
              <li><Link to="/menu?category=wings" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Wings</Link></li>
              <li><Link to="/customize" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Customizer</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-display text-2xl tracking-wide mb-6 uppercase">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Our Story</Link></li>
              <li><Link to="/locations" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Locations</Link></li>
              <li><Link to="/careers" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-zinc-400 hover:text-pri transition-colors font-bold uppercase text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4">
             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                <h4 className="font-display text-3xl tracking-wide mb-2 uppercase text-pri">10% Off First Order</h4>
                <p className="text-zinc-400 text-sm font-bold mb-6">Sign up for our newsletter and get exclusive drops.</p>
                <form className="flex gap-2">
                  <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-black border border-white/20 rounded-sm px-4 py-3 text-white font-bold uppercase text-sm focus:outline-none focus:border-pri" />
                  <Button variant="default" className="min-w-[100px]">Send</Button>
                </form>
             </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">&copy; 2026 Sauce N Cheese. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-white cursor-pointer">Privacy</span>
            <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-white cursor-pointer">Terms</span>
            <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-white cursor-pointer">Allergens</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
