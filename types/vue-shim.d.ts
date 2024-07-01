// types/vue-shim.d.ts
export {}

declare global {
  interface HTMLElement {
    __vueClickOutside__?: (event: Event) => void
  }
}
