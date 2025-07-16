
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const AnimatedToggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
      "border-2 border-transparent transition-colors duration-300",
      "data-[state=checked]:bg-m1ssion-blue data-[state=unchecked]:bg-white/10",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-m1ssion-blue focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg",
        "toggle-slide data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        "ring-0 transition-transform data-[state=checked]:bg-white data-[state=unchecked]:bg-white/90"
      )}
    />
  </SwitchPrimitives.Root>
));

AnimatedToggle.displayName = SwitchPrimitives.Root.displayName;

export { AnimatedToggle };
