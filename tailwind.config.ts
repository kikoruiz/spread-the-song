import type {Config} from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          '50': '#f1fcf9',
          '100': '#cbf8e9',
          '200': '#9ef1d7',
          '300': '#66e2c0',
          '400': '#36cba6',
          '500': '#1daf8d',
          '600': '#148d73',
          '700': '#15705e',
          '800': '#155a4d',
          '900': '#164b41'
        },
        pink: {
          '50': '#fef1fa',
          '100': '#fee5f7',
          '200': '#ffcbf1',
          '300': '#ffa1e4',
          '400': '#ff66ce',
          '500': '#fa3ab7',
          '600': '#ea1896',
          '700': '#cc0a79',
          '800': '#a80c63',
          '900': '#8c0f55'
        },
        yellow: {
          '50': '#fffaeb',
          '100': '#fff1c6',
          '200': '#ffe184',
          '300': '#ffcd4a',
          '400': '#ffb720',
          '500': '#f99407',
          '600': '#dd6d02',
          '700': '#b74b06',
          '800': '#94390c',
          '900': '#7a2f0d'
        },
        'gray-dark': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d'
        },
        'apple-music-primary': 'rgb(250,39,63)',
        'apple-music-secondary': 'rgb(250,89,112)',
        'musixmatch-primary': 'white',
        'musixmatch-secondary': 'black',
        'spotify-primary': 'rgb(105,0,186)',
        'spotify-secondary': 'rgb(255,157,150)',
        'youtube-primary': 'white',
        'youtube-secondary': 'black',
        'youtube-music-primary': 'white',
        'youtube-music-secondary': 'black'
      },
      animation: {
        'slide-left-out': '0.3s ease-in forwards slide-left-out',
        'slide-left-in': '0.3s ease-out slide-left-in',
        'slide-right-out': '0.3s ease-in forwards slide-right-out',
        'slide-right-in': '0.3s ease-out slide-right-in'
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'slide-left-out': {
          from: {opacity: '100', transform: 'translateX(0)'},
          to: {opacity: '0', transform: 'translateX(-15%)'}
        },
        'slide-left-in': {
          from: {opacity: '0', transform: 'translateX(15%)'},
          to: {opacity: '100', transform: 'translateX(0%)'}
        },
        'slide-right-out': {
          from: {opacity: '100', transform: 'translateX(0)'},
          to: {opacity: '0', transform: 'translateX(15%)'}
        },
        'slide-right-in': {
          from: {opacity: '0', transform: 'translateX(-15%)'},
          to: {opacity: '100', transform: 'translateX(0)'}
        }
      }
    }
  }
}

export default config
