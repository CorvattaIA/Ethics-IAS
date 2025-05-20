import React from 'react';
    import { Slot } from '@radix-ui/react-slot';
    import { cva } from 'class-variance-authority';
    import { cn } from '@/lib/utils';
    import { motion } from 'framer-motion';

    const buttonVariants = cva(
      'inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-98',
      {
        variants: {
          variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/85', // -15% luminosity approx
            destructive:
              'bg-destructive text-destructive-foreground hover:bg-destructive/85',
            outline:
              'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary:
              'bg-secondary text-secondary-foreground hover:bg-secondary/80', // -10% luminosity approx for secondary
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
          },
          size: {
            default: 'h-button-desktop px-element-padding py-2 md:h-button-desktop min-h-[48px] md:min-h-[48px]', // Desktop default
            sm: 'h-9 rounded-md px-3',
            lg: 'h-button-mobile px-8 py-4 md:h-button-desktop min-h-[56px] md:min-h-[48px]', // Mobile default, Desktop large
            icon: 'h-10 w-10',
          },
        },
        defaultVariants: {
          variant: 'default',
          size: 'default',
        },
      }
    );

    const Button = React.forwardRef(({ className, variant, size, asChild = false, children, ...props }, ref) => {
      const Comp = asChild ? Slot : motion.button;
      
      // Solo aplicar las animaciones de Framer Motion si no es un Link
      const motionProps = asChild ? {} : {
        whileTap: { scale: 0.98 },
        transition: { duration: 0.1 },
        whileHover: { scale: 1.02 },
        whileFocus: { scale: 1.02 }
      };

      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...motionProps}
          {...props}
        >
          {children}
        </Comp>
      );
    });
    Button.displayName = 'Button';

    export { Button, buttonVariants };