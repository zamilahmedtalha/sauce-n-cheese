import { useState, FormEvent } from 'react';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Minus, Plus, Settings, Check, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, updateQuantity, updateExtras, clearCart } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Customize, 2 = Details
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + subtotal * 0.16;

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-6xl mb-8">TRAY IS EMPTY</h1>
        <Button size="lg" asChild><Link to="/menu">GO BACK TO MENU</Link></Button>
      </div>
    );
  }

  const activeItem = editingItemId ? cart.find(i => i.id === editingItemId) : null;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e67e22', '#f39c12', '#d35400']
    });
    toast.success("Order Placed Successfully!");
    
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-40 px-6 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-pri' : 'bg-black/10'}`} />
        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-pri' : 'bg-black/10'}`} />
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
          <h1 className="font-display text-5xl md:text-7xl uppercase mb-4">Customize Your Tray</h1>
          <p className="text-sec font-bold text-lg mb-12">Want extra cheese? Double beef? Upgrade your items before we cook 'em.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="relative bg-white border border-black/10 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-all hover:border-pri">
                  <div className="flex-1">
                    <h3 className="font-display text-3xl">{item.name}</h3>
                    <p className="font-bold text-sec">Size: <span className="text-black">{item.size}</span></p>
                    
                    <div className="mt-2 text-sm text-sec flex flex-wrap gap-2">
                       {item.extras?.cheese ? <span className="bg-pri/10 text-pri px-2 py-1 rounded">Extra Cheese x{item.extras.cheese}</span> : null}
                       {item.extras?.beef ? <span className="bg-pri/10 text-pri px-2 py-1 rounded">Extra Beef x{item.extras.beef}</span> : null}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                    <Button 
                      variant="outline" 
                      onClick={() => setEditingItemId(editingItemId === item.id ? null : item.id)}
                      className={editingItemId === item.id ? 'border-pri text-pri bg-pri/5' : ''}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {editingItemId === item.id ? 'DONE' : 'CUSTOMIZE'}
                    </Button>
                    <span className="font-display text-2xl w-24 text-right">PKR {item.price}</span>
                  </div>

                  {/* Customizer Panel */}
                  <AnimatePresence>
                    {editingItemId === item.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="w-full sm:col-span-full border-t border-black/10 pt-6 mt-6 overflow-hidden"
                      >
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-4 text-sec">Extra Ingredients</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Cheese Option */}
                          <div className="flex items-center justify-between bg-black/5 p-4 rounded-xl">
                            <div>
                              <span className="font-bold">Liquid Cheese</span>
                              <p className="text-xs text-sec">+PKR 75 / ea</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => updateExtras(item.id, 'cheese', Math.max(0, (item.extras?.cheese || 0) - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pri"><Minus className="w-4 h-4"/></button>
                              <span className="font-bold w-4 text-center">{item.extras?.cheese || 0}</span>
                              <button onClick={() => updateExtras(item.id, 'cheese', Math.min(3, (item.extras?.cheese || 0) + 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pri"><Plus className="w-4 h-4"/></button>
                            </div>
                          </div>
                          
                          {/* Beef Option */}
                          <div className="flex items-center justify-between bg-black/5 p-4 rounded-xl">
                            <div>
                              <span className="font-bold">Extra Patty</span>
                              <p className="text-xs text-sec">+PKR 150 / ea</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button onClick={() => updateExtras(item.id, 'beef', Math.max(0, (item.extras?.beef || 0) - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pri"><Minus className="w-4 h-4"/></button>
                              <span className="font-bold w-4 text-center">{item.extras?.beef || 0}</span>
                              <button onClick={() => updateExtras(item.id, 'beef', Math.min(3, (item.extras?.beef || 0) + 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-pri"><Plus className="w-4 h-4"/></button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-black/5 sticky top-32">
                <h2 className="font-display text-4xl uppercase mb-6 border-b border-black/10 pb-4">SUMMARY</h2>
                <div className="flex justify-between text-2xl font-black mb-8">
                  <span>TOTAL</span>
                  <span className="text-pri">PKR {total.toFixed(0)}</span>
                </div>
                <Button size="lg" className="w-full h-20 text-2xl" onClick={() => {
                  setEditingItemId(null);
                  setStep(2);
                }}>
                  PROCEED TO PAYMENT <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
           <Button variant="ghost" onClick={() => setStep(1)} className="mb-8">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back to Customization
           </Button>
           
           <h1 className="font-display text-5xl md:text-6xl uppercase mb-8">FINAL DETAILS</h1>
           
           <form onSubmit={handleCheckout} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-black/5">
             <div>
               <label className="block text-sm font-bold uppercase tracking-widest text-sec mb-2">Full Name</label>
               <input required type="text" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold focus:ring-2 focus:ring-pri outline-none" placeholder="John Doe" />
             </div>
             
             <div>
               <label className="block text-sm font-bold uppercase tracking-widest text-sec mb-2">Delivery Address</label>
               <textarea required className="w-full bg-black/5 border-none rounded-xl p-4 font-bold focus:ring-2 focus:ring-pri outline-none min-h-[120px]" placeholder="123 Cheese Ave, Flavor Town"></textarea>
             </div>
             
             <div>
               <label className="block text-sm font-bold uppercase tracking-widest text-sec mb-2">Phone Number</label>
               <input required type="tel" className="w-full bg-black/5 border-none rounded-xl p-4 font-bold focus:ring-2 focus:ring-pri outline-none" placeholder="+1 (555) 000-0000" />
             </div>

             <div className="pt-8 border-t border-black/10 mt-8">
               <h3 className="font-display text-3xl mb-4">PAYMENT</h3>
               <div className="bg-orange-500/10 border-2 border-pri text-pri font-bold p-4 rounded-xl flex items-center justify-center gap-3">
                 <Check className="w-5 h-5" /> Cash on Delivery Selected
               </div>
             </div>

             <Button type="submit" size="lg" className="w-full h-24 text-3xl shadow-[0_15px_0_0_rgb(200,80,0)] mt-12 bg-pri hover:bg-pri active:translate-y-[15px]">
               PLACE ORDER • PKR {total.toFixed(0)}
             </Button>
           </form>
        </motion.div>
      )}

    </div>
  );
}
