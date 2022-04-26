import ViewTemplete from './ViewTemplate.vue'

export default function createView(name) {
  return {
    name,
    render(h) {
      return h(ViewTemplete)
    },
  }
}
