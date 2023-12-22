import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

export default defineNuxtPlugin({
  name: 'viewer',
  enforce: 'pre', // or 'post'
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueViewer)
  },
})
