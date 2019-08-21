/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      gray: {
        '100': '#FCFCFC',
        '300': '#F4F4F4',
        '400': '#c8c8c8',
        '500': '#707070'
      },
      primary: {
        '500': '#C1CA01',
      },
      error: {
        '500': '#D20707',
      },
      metric0: {
        '500': '#D5575C',
      },
      metric1: {
        '500': '#7D9963',
      },
      metric2: {
        '500': '#F2D20F',
      },
      metric3: {
        '500': '#98BBD6',
      },
      metric4: {
        '500': '#A8C038',
      },
      metric5: {
        '500': '#DF7226',
      }
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '1rem',
      '4': '2rem',
      '5': '4rem',
      '6': '6rem',
      'i': '1.5rem'
    },
    extend: {
      borderWidth: {
        '3': '3px',
      },
      fontSize: {
        '7xl': '7rem',
      }
    }
  },
  variants: {},
  plugins: []
}
