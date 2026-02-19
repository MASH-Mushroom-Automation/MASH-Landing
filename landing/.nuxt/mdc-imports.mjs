import _RemarkEmoji from 'remark-emoji'
import _Highlight from 'C:/Users/Kenneth/Desktop/PP Namias/landing-main/node_modules/.pnpm/@nuxtjs+mdc@0.20.1_magicast@0.5.2/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype-nuxt.js'

export const remarkPlugins = {
  'remark-emoji': { instance: _RemarkEmoji },
}

export const rehypePlugins = {
  'highlight': { instance: _Highlight, options: {} },
}

export const highlight = {"theme":{"light":"material-theme-lighter","default":"material-theme","dark":"material-theme-palenight"}}