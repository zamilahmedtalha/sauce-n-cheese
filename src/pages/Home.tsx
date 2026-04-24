import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from '../components/ui/Button';
import { SplitText } from '../components/ui/SplitText';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/5966601/5966601-uhd_2732_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Parallax Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
          <motion.div 
            style={{ y: y1 }}
            className="relative flex flex-col items-center text-center w-full"
          >
            <h1 className="font-display text-[25vw] md:text-[min(20vw,30rem)] leading-[0.75] tracking-tighter text-white drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              <SplitText text="SAUCE" delay={0.08} />
            </h1>
            <h1 className="font-display text-[20vw] md:text-[min(16vw,25rem)] leading-[0.75] tracking-tighter text-pri drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] -mt-4 md:-mt-12 z-20">
              <SplitText text="N CHEESE" delay={0.05} />
            </h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white font-bold tracking-[0.3em] text-2xl md:text-5xl uppercase mt-12 bg-black/60 px-12 py-6 backdrop-blur-md rounded-sm border-2 border-white/20"
            >
              GLOBAL HALAL DOMINANCE
            </motion.p>
          </motion.div>

          {/* Button Cluster */}
          <motion.div 
            style={{ y: y2 }}
            className="relative z-30 mt-32 flex flex-col w-full sm:flex-row flex-wrap justify-center gap-8 max-w-4xl"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="w-full sm:w-auto text-3xl px-16 py-10 shadow-[0_20px_0_0_rgba(200,80,0,1)] active:translate-y-[20px] active:shadow-none bg-pri text-white border-4 border-pri hover:bg-pri font-black" asChild>
                <Link to="/menu">START ORDERING</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="glass" className="w-full sm:w-auto text-3xl px-16 py-10 font-black border-4" asChild>
                <Link to="/menu">EXPLORE MENU</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-black py-8 overflow-hidden border-y-8 border-pri">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 text-pri font-display text-7xl md:text-9xl"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>100% HALAL &bull; NEVER FROZEN &bull; LIQUID CHEESE &bull; </span>
          ))}
        </motion.div>
      </section>

      {/* Feature Section 1 */}
      <section className="py-48 px-6 max-w-screen-2xl mx-auto relative min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden glass-panel shadow-[0_0_100px_rgba(200,80,0,0.3)]">
             <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-105"
            >
              <source src="https://videos.pexels.com/video-files/5966611/5966611-uhd_2732_1440_30fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-pri/20 mix-blend-color pointer-events-none" />
          </div>
          <div className="flex flex-col gap-12">
            <h2 className="font-display text-8xl md:text-[9rem] leading-[0.8] text-fg uppercase drop-shadow-xl">Engineered<br/><span className="text-pri">Perfection.</span></h2>
            <p className="text-sec font-bold text-2xl md:text-4xl leading-relaxed">We don't make standard burgers. We build overlapping structural masterpieces overloaded with liquid gold cheese, fresh halal beef, and unapologetic flavor. Every bite is a calculated explosion of taste.</p>
            <div className="flex gap-4 mt-8">
              <Button size="lg" className="w-full md:w-auto text-2xl px-12 py-8 rounded-xl shadow-[0_15px_0_0_rgba(200,80,0,1)] hover:-translate-y-2 active:translate-y-[15px]" asChild>
                <Link to="/menu">BROWSE BURGERS <span className="ml-4 text-4xl">🍔</span></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 (Wings & Sides) */}
      <section className="py-48 px-6 relative min-h-screen flex flex-col justify-center bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-20 relative z-0"
          >
            <source src="https://videos.pexels.com/video-files/5966601/5966601-uhd_2732_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 z-10" />
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-20">
          <div className="flex flex-col gap-12 lg:order-1 order-2">
            <h2 className="font-display text-8xl md:text-[9rem] leading-[0.8] uppercase drop-shadow-xl text-white">LIQUID GOLD<br/><span className="text-pri">SIDES.</span></h2>
            <p className="text-zinc-400 font-bold text-2xl md:text-4xl leading-relaxed">Fries drowned in liquid cheese. Wings tossed to perfection. It's not a meal without the heavy hitters. Elevate your tray today.</p>
            <div className="flex gap-4 mt-8">
              <Button size="lg" className="w-full md:w-auto text-2xl px-12 py-8 bg-zinc-100 text-black hover:bg-white border-none rounded-xl" asChild>
                <Link to="/menu?category=sides">VIEW SIDES <span className="ml-4 text-4xl">🍟</span></Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(200,80,0,0.2)] lg:order-2 order-1 border-4 border-zinc-800">
             <img src="https://images.unsplash.com/photo-1534080564583-6be75777b70a?q=80&w=1470&auto=format&fit=crop" alt="Volcano Fries" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
