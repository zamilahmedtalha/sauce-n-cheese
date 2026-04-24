import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';
import { ShieldAlert, Flame, Plus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="min-h-screen pt-32 px-6 text-center"><h1 className="text-4xl font-display">Product Not Found</h1></div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <Link to="/menu" className="inline-flex items-center gap-2 mb-8 text-sec hover:text-pri font-bold uppercase transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Visual Tower */}
          <div className="w-full relative sticky top-32">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="w-full aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative bg-zinc-100 border-4 border-white group"
             >
               <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             </motion.div>
             {/* Physics floating elements would go here, simulated by motion */}
             {product.spicy && (
               <motion.div 
                 initial={{ y: 50, opacity: 0, rotate: -15 }}
                 animate={{ y: 0, opacity: 1, rotate: 0 }}
                 transition={{ delay: 0.2, type: "spring" }}
                 className="absolute -bottom-6 flex items-center justify-center p-6 bg-red-600 rounded-full text-white shadow-xl -right-6 border-4 border-white"
               >
                 <Flame className="w-12 h-12" />
               </motion.div>
             )}
          </div>

          {/* Details Tower */}
          <div className="flex flex-col gap-8 w-full">
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="font-display text-7xl md:text-[7rem] leading-[0.8] uppercase tracking-tighter"
              >
                {product.name}
              </motion.h1>
              <p className="text-4xl font-display text-pri mt-6 mb-2 tracking-wide">PKR {product.basePrice} <span className="text-sm font-sans text-sec font-bold uppercase tracking-widest">(Base)</span></p>
              <p className="text-2xl text-fg font-medium leading-relaxed mt-4">{product.description}</p>
            </div>

            {/* Allergens Warning Mega Block */}
            {product.allergens.length > 0 && (
              <div className="bg-red-50 border-4 border-red-500 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldAlert className="w-32 h-32 text-red-500" />
                </div>
                <h3 className="text-red-700 font-display text-4xl mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-8 h-8" /> CONTAINS: {product.allergens.join(", ").toUpperCase()}
                </h3>
                <p className="text-red-800 font-bold max-w-sm relative z-10">
                  Allergy Risk. Prepared in a facility that process allergens. Consult doctor if severe.
                </p>
              </div>
            )}

            {/* Nutrition Box */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-white border border-black/10 rounded-2xl shadow-sm">
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-display text-3xl text-fg leading-none">{product.nutrition.cal}</span>
                <span className="text-[10px] font-bold text-sec uppercase tracking-widest mt-1">Calories</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-black/10">
                <span className="font-display text-3xl text-fg leading-none">{product.nutrition.fat}g</span>
                <span className="text-[10px] font-bold text-sec uppercase tracking-widest mt-1">Fat</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-black/10">
                <span className="font-display text-3xl text-fg leading-none">{product.nutrition.sugar}g</span>
                <span className="text-[10px] font-bold text-sec uppercase tracking-widest mt-1">Sugar</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center border-l border-black/10">
                <span className="font-display text-3xl text-fg leading-none">{product.nutrition.sodium}</span>
                <span className="text-[10px] font-bold text-sec uppercase tracking-widest mt-1">Sodium (mg)</span>
              </div>
            </div>

            {/* Action Group */}
            <div className="mt-8 pt-8 border-t border-black/10 flex flex-col gap-4">
               <Button 
                 size="lg" 
                 className="w-full text-2xl h-24 shadow-[0_15px_0_0_rgb(200,80,0)] active:translate-y-[15px]" 
                 onClick={() => {
                   import('../lib/store').then(({ useStore }) => {
                     const sizeData = product.sizes.find(s => s.name === 'M') || product.sizes[0];
                     useStore.getState().addToCart({
                       id: '',
                       productId: product.id,
                       name: product.name,
                       price: product.basePrice + sizeData.priceAdd,
                       size: 'M' as any,
                       quantity: 1,
                       extras: { cheese: 0, beef: 0, sauce: 0, bacon: 0 }
                     });
                     import('sonner').then(({ toast }) => {
                       toast.success(`Added ${product.name} to cart`);
                     });
                   });
                 }}
               >
                 ADD TO TRAY <ShoppingCart className="ml-2 w-8 h-8" />
               </Button>
               <p className="text-center font-bold text-sec uppercase text-sm mt-4 tracking-widest">You can customize ingredients during checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
