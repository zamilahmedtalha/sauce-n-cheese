import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-pri text-white hover:bg-pri/90 shadow-[0_10px_0_0_rgba(200,80,0,1)] hover:translate-y-[2px] hover:shadow-[0_8px_0_0_rgba(200,80,0,1)] active:translate-y-[10px] active:shadow-none transition-all",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-[0_10px_0_0_rgba(150,0,0,1)] hover:translate-y-[2px] hover:shadow-[0_8px_0_0_rgba(150,0,0,1)] active:translate-y-[10px] active:shadow-none transition-all",
        outline: "border-4 border-pri text-pri hover:bg-pri/10",
        secondary: "bg-sec text-white hover:bg-sec/80 shadow-[0_8px_0_0_rgb(50,50,50)] active:translate-y-[8px] active:shadow-none transition-all",
        ghost: "hover:bg-black/5 hover:text-pri",
        link: "underline-offset-4 hover:underline text-pri",
        glass: "glass-panel text-fg hover:bg-white/50 shadow-lg border border-white/40",
      },
      size: {
        default: "h-14 py-4 px-6 text-lg",
        sm: "h-10 px-3 text-sm shadow-[0_6px_0_0_rgba(200,80,0,1)] active:translate-y-[6px]",
        lg: "h-16 px-10 text-xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? motion(Slot as any) : motion.button;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        whileTap={{ scale: 0.95 }}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
