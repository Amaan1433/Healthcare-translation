export const theme = {
  colors: {
    // Primary colors
    primary: '#2563eb',
    primaryLight: '#3b82f6',
    primaryDark: '#1d4ed8',
    
    // Secondary colors
    secondary: '#10b981',
    secondaryLight: '#34d399',
    secondaryDark: '#059669',
    
    // Accent colors
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentDark: '#d97706',
    
    // Neutral colors
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceHover: '#f1f5f9',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    
    // Text colors
    text: '#1e293b',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    textInverse: '#ffffff',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Medical context colors
    medical: {
      symptoms: '#fef3c7',
      diagnosis: '#dbeafe',
      treatment: '#dcfce7',
      medication: '#fce7f3',
      appointment: '#f3e8ff',
      emergency: '#fee2e2'
    },
    
    // Dark mode colors (for future implementation)
    dark: {
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      border: '#334155'
    }
  },
  
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace"
    },
    
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem'
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
    slower: '500ms ease-in-out'
  },
  
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// Media query helpers
export const media = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  '2xl': `@media (min-width: ${theme.breakpoints['2xl']})`
};

// Common styled-components mixins
export const mixins = {
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  
  flexColumn: `
    display: flex;
    flex-direction: column;
  `,
  
  absoluteCenter: `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  
  truncate: `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  
  scrollbar: `
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: ${theme.colors.surface};
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.border};
      border-radius: ${theme.borderRadius.full};
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.primary};
    }
  `,
  
  buttonReset: `
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
    margin: 0;
  `,
  
  inputReset: `
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  `
};
