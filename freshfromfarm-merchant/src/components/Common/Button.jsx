import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  hover,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 border";

  const variants = {
    primary: "bg-primary text-white border-primary-border",
    secondary: "bg-background text-primary border-foreground-border",
    outline:
      "text-foreground [border-color:var(--button-outline)] shadow-xs active:shadow-none",
    contrast:
      "bg-foreground text-muted [border-color:var(--button-outline)] shadow-xs active:shadow-none",
    ghost: "border-transparent h-9 w-9",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <motion.button
      whileHover={hover ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
