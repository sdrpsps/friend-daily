// uno.config.ts
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: '#576b95',
      bgc: '#f7f7f7',
      divider: '#f2f2f2',
      toolbar: '#4b5153',
      primaryGreen: '#00b95d',
    },
  },
  rules: [
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
})
