/** @type {import('tailwindcss').Config} */
    const plugin = require('tailwindcss/plugin');
    
    module.exports = {
      darkMode: ['class'],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
      ],
      theme: {
        container: {
          center: true,
          padding: '2rem',
          screens: {
            '2xl': '1400px',
          },
        },
        extend: {
          fontSize: {
            'base-mobile': '16px',
            'base-desktop': '18px',
          },
          spacing: {
            'element-padding': '16px',
            'element-margin-v': '24px',
            'element-margin-h': '16px',
          },
          minHeight: {
            'button-mobile': '56px',
            'button-desktop': '48px',
          },
          colors: {
            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
              DEFAULT: 'hsl(var(--primary))',
              foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
              DEFAULT: 'hsl(var(--secondary))',
              foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
            },
            'brand-deep-indigo': '#231F31',
            'brand-vibrant-red': '#EE2A24',
            'brand-orange-red': '#F55528',
            'brand-warm-orange': '#FBAF18',
            'brand-deep-teal': '#007A73',
            'brand-light-text': '#F0F0F0',
            'brand-dark-text': '#1a1a1a',
            'progress-start': '#A7F3D0', 
            'progress-end': '#059669', 
            'focus-blue': '#2563EB', 
          },
          borderRadius: {
            lg: 'var(--radius)', 
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
          },
          textShadow: {
            sm: '1px 1px 2px var(--tw-shadow-color, rgba(0,0,0,0.2))',
            DEFAULT: '2px 2px 4px var(--tw-shadow-color, rgba(0,0,0,0.3))',
            lg: '3px 3px 6px var(--tw-shadow-color, rgba(0,0,0,0.4))',
            none: 'none',
          },
          keyframes: {
            'accordion-down': {
              from: { height: 0 },
              to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: 0 },
            },
            pulse: {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(0.98)' },
            },
            typingDots: {
              '0%, 100%': { opacity: 0.2 },
              '50%': { opacity: 1 },
            }
          },
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            'pulse-click': 'pulse 0.3s ease-out',
            'typing-dot-1': 'typingDots 1s infinite 0s',
            'typing-dot-2': 'typingDots 1s infinite 0.2s',
            'typing-dot-3': 'typingDots 1s infinite 0.4s',
          },
        },
      },
      plugins: [
        require('tailwindcss-animate'),
        plugin(function({ matchUtilities, theme }) {
          matchUtilities(
            {
              'text-shadow': (value) => ({
                textShadow: value,
              }),
            },
            { values: theme('textShadow') }
          )
        }),
      ],
    };