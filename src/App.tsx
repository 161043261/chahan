import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent(() => () => (
  <main>
    <RouterView></RouterView>
  </main>
))
