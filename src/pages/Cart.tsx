import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, addToCart, clearCart } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% GST
  const total = subtotal + tax;

  const updateQuantity = (item: any, delta: number) => {
    if (item.quantity + delta === 0) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: delta });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
      <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-12">YOUR TRAY</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-black/5 shadow-sm">
          <img src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=1415&auto=format&fit=crop" alt="Empty Tray" className="w-64 h-64 object-cover rounded-full mx-auto mb-8 opacity-50 grayscale" />
          <h2 className="font-display text-4xl text-sec mb-6">Tray is empty.</h2>
          <Button size="lg" asChild>
             <Link to="/menu">START BUILDING</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 flex flex-col gap-6">
             <AnimatePresence>
               {cart.map((item) => (
                 <motion.div 
                   key={item.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -100, scale: 0.9 }}
                   layout
                 >
                   <Card className="flex flex-col sm:flex-row p-6 gap-6 relative group overflow-hidden">
                     {/* Refraction effect on hover */}
                     <div className="absolute inset-0 bg-gradient-to-r from-pri/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                     
                     <div className="flex-1">
                       <div className="flex justify-between items-start mb-2">
                         <h3 className="font-display text-3xl uppercase">{item.name}</h3>
                         <span className="font-display text-2xl text-pri">PKR {item.price * item.quantity}</span>
                       </div>
                       
                       <p className="text-sec font-bold uppercase text-xs tracking-widest mb-4 border-l-2 border-pri pl-2">
                         SIZE: {item.size} 
                         {item.extras.cheese > 0 && ` | +${item.extras.cheese} CHEESE`}
                         {item.extras.beef > 0 && ` | +${item.extras.beef} BEEF`}
                         {item.extras.bacon > 0 && ` | +${item.extras.bacon} BACON`}
                       </p>
                       
                       <div className="flex items-center gap-6 mt-4">
                         <div className="flex items-center gap-4 bg-zinc-100 rounded-full p-1">
                           <button onClick={() => updateQuantity(item, -1)} className="p-2 rounded-full hover:bg-white text-black transition-colors"><Minus className="w-4 h-4" /></button>
                           <span className="font-display text-2xl w-6 text-center">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item, 1)} className="p-2 rounded-full hover:bg-white text-black transition-colors"><Plus className="w-4 h-4" /></button>
                         </div>
                         <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-bold uppercase">
                           <Trash2 className="w-4 h-4" /> Remove
                         </button>
                       </div>
                     </div>
                   </Card>
                 </motion.div>
               ))}
             </AnimatePresence>
           </div>
           
           <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-2xl shadow-xl border border-black/5 sticky top-32">
               <h2 className="font-display text-4xl uppercase mb-8 border-b border-black/10 pb-4">SUMMARY</h2>
               
               <div className="flex flex-col gap-4 text-lg font-bold mb-8">
                 <div className="flex justify-between text-sec">
                   <span>Subtotal</span>
                   <span>PKR {subtotal}</span>
                 </div>
                 <div className="flex justify-between text-sec">
                   <span>Tax (16%)</span>
                   <span>PKR {tax.toFixed(0)}</span>
                 </div>
                 <div className="h-px bg-black/10 my-2" />
                 <div className="flex justify-between text-2xl font-black">
                   <span>TOTAL</span>
                   <span className="text-pri font-display text-4xl">PKR {total.toFixed(0)}</span>
                 </div>
               </div>
               
               <Button size="lg" className="w-full h-20 text-2xl shadow-[0_15px_0_0_rgb(200,80,0)]" asChild>
                  <Link to="/checkout" className="flex items-center justify-center gap-2">CHECKOUT <ArrowRight className="w-6 h-6" /></Link>
               </Button>
               
               <p className="text-center text-sec text-xs font-bold uppercase tracking-widest mt-8">Orders over PKR 2500 get free delivery.</p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
