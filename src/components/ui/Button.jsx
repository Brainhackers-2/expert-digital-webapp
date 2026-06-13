export const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
  };
  return (
    <button className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};