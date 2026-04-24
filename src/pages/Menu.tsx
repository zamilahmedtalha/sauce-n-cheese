import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useStore } from '../lib/store';
import { Flame, AlertTriangle, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Menu() {
  const { filters, setFilter, allergyWarningDismissed, dismissAllergyWarning } = useStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'fries' | 'wings'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (p.basePrice > filters.maxPrice) return false;
      if (filters.spicy && !p.spicy) return false;
      if (filters.bestseller && !p.bestseller) return false;
      return true;
    });
  }, [products, activeCategory, filters]);

  return (
    <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto w-full">
      {!allergyWarningDismissed && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-8 border-red-500 p-6 mb-12 rounded-r-xl shadow-lg flex justify-between items-start gap-4"
        >
          <div>
            <h3 className="text-red-800 font-display text-2xl flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" /> ALLERGY ALERT
            </h3>
            <p className="text-red-700 font-bold mt-2">
              Our products are prepared in kitchens that handle Dairy, Gluten, Nuts, and Soy. Cross-contamination is possible. Please review product details before ordering.
            </p>
          </div>
          <Button variant="destructive" onClick={dismissAllergyWarning}>Acknowledge</Button>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-12 w-full">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-8 sticky top-32 h-fit">
          <div>
            <h2 className="font-display text-4xl mb-4 text-fg uppercase">Categories</h2>
            <div className="flex flex-col gap-2">
              {['all', 'burgers', 'fries', 'wings'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`text-left px-4 py-3 font-bold uppercase rounded-sm transition-colors ${
                    activeCategory === cat ? 'bg-pri text-white' : 'bg-white hover:bg-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm">
            <h2 className="font-display text-3xl mb-6 text-fg uppercase">Filters</h2>
            
            <div className="flex flex-col gap-6">
              <div>
                <label className="font-bold uppercase text-sm text-sec flex justify-between mb-2">
                  <span>Max Price</span>
                  <span className="text-pri">PKR {filters.maxPrice}</span>
                </label>
                <input 
                  type="range" 
                  min="300" 
                  max="2000" 
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
                  className="w-full accent-pri"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${filters.spicy ? 'bg-red-500 border-red-500' : 'border-zinc-300 group-hover:border-red-500'}`}>
                  {filters.spicy && <Flame className="w-4 h-4 text-white" />}
                </div>
                <span className="font-bold uppercase flex items-center gap-1">Spicy <Flame className="w-4 h-4 text-red-500" /></span>
                <input type="checkbox" className="hidden" checked={filters.spicy} onChange={(e) => setFilter('spicy', e.target.checked)} />
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${filters.bestseller ? 'bg-gold border-gold' : 'border-zinc-300 group-hover:border-gold'}`}>
                  {filters.bestseller && <span className="text-white font-bold text-xs">✓</span>}
                </div>
                <span className="font-bold uppercase">Bestsellers</span>
                <input type="checkbox" className="hidden" checked={filters.bestseller} onChange={(e) => setFilter('bestseller', e.target.checked)} />
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <h1 className="font-display text-6xl md:text-8xl w-full uppercase mb-12 tracking-tighter text-fg">
            {activeCategory === 'all' ? 'FULL MENU' : activeCategory}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col group p-2 border-2 border-transparent hover:border-pri/40 transition-colors shadow-none hover:shadow-2xl">
                    <Link to={`/product/${p.slug}`} className="block relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-zinc-100/50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-1000 group-hover:scale-[1.15]" />
                      {p.spicy && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg border-2 border-white">
                          <Flame className="w-6 h-6" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white font-bold text-lg leading-relaxed line-clamp-3">{p.description}</p>
                      </div>
                    </Link>
                    
                    <div className="p-4 flex flex-col flex-1 pt-6">
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <Link to={`/product/${p.slug}`} className="hover:text-pri transition-colors line-clamp-2">
                          <h3 className="font-display text-4xl uppercase leading-[0.9]">{p.name}</h3>
                        </Link>
                        <span className="font-display text-2xl text-pri whitespace-nowrap bg-pri/10 px-3 py-1 rounded-lg">PKR {p.basePrice}</span>
                      </div>
                      
                      <div className="flex gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-sec mt-2">
                        <span className="bg-zinc-100 px-3 py-1 pb-0.5 rounded-md">{p.nutrition.cal} CAL</span>
                        {p.allergens.length > 0 && (
                          <span className="bg-red-50 text-red-600 px-3 py-1 pb-0.5 rounded-md flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> ALLERGENS
                          </span>
                        )}
                      </div>

                      <div className="mt-auto">
                        <Button 
                          className="w-full relative overflow-hidden group shadow-[0_8px_0_0_rgb(200,80,0)] h-16 text-xl rounded-xl active:translate-y-[8px] active:shadow-none" 
                          onClick={() => {
                            const sizeData = p.sizes.find(s => s.name === 'M') || p.sizes[0];
                            useStore.getState().addToCart({
                              id: '',
                              productId: p.id,
                              name: p.name,
                              price: p.basePrice + sizeData.priceAdd,
                              size: 'M' as any,
                              quantity: 1,
                              extras: { cheese: 0, beef: 0, sauce: 0, bacon: 0 }
                            });
                            toast.success(`Added ${p.name} to cart`, {
                               description: 'View tray to checkout or customize.'
                            });
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            ADD TO TRAY <ShoppingCart className="w-5 h-5" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-2xl font-bold text-sec uppercase">No products match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilter('maxPrice', 5000)}>Reset Price Filter</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
