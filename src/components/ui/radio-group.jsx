import React from 'react';
    import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
    import { Check } from 'lucide-react'; // Changed from Circle to Check for better UX
    import { cn } from '@/lib/utils';

    const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
      return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
    });
    RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

    const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
      return (
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            'aspect-square h-5 w-5 rounded-full border-2 border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Check className="h-3.5 w-3.5 fill-current text-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      );
    });
    RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

    export { RadioGroup, RadioGroupItem };