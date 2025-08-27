// Theme configuration for dark/light mode and shadcn/ui
// TODO: Implement proper theme switching and shadcn/ui integration

export const theme = {
  light: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399',
  }
};

// Theme context and provider
export const useTheme = () => {
  // TODO: Implement theme context with localStorage persistence
  return {
    theme: 'light',
    toggleTheme: () => console.log('Toggle theme'),
    isDark: false
  };
};

// shadcn/ui configuration
export const shadcnConfig = {
  // TODO: Add shadcn/ui component configurations
  components: {
    button: {
      variants: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      }
    }
  }
};
