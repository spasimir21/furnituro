import daisyui from 'daisyui';

const CONFIG = {
  content: ['./frontend/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { max: '1000px' }
    },
    fontFamily: {
      serif: ['Righteous'],
      sans: ['Raleway'],
      mono: ['Nokora']
    },
    extend: {
      minHeight: {
        'usable-screen': 'calc(100vh - 80px)'
      },
      height: { 'usable-screen': 'calc(100vh - 80px)' },
      width: {
        // 'usable-screen': 'calc(100vh - 80px)'
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        lightDialogic: {
          'primary': '#E87231',

          'secondary': '#4782FF',

          'accent': '#a78bfa',

          'neutral': '#ffffff',

          'base-100': '#fcfcfc',

          'info': '#38bdf8',

          'success': '#00ffff',

          'warning': '#fef08a',

          'error': '#ef4444'
        },
        darkDialogic: {
          'primary': '#E87231',

          'secondary': '#4782FF',

          'accent': '#a78bfa',

          'neutral': '#171717',

          'base-100': '#1f2937',

          'info': '#38bdf8',

          'success': '#00ffff',

          'warning': '#fef08a',

          'error': '#ef4444'
        }
      }
    ]
  }
};

export default CONFIG;
