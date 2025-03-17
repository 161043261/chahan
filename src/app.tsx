import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

// defineComponent(setup, ctx)
// setup = () => renderFunc
// renderFunc = () => <></>
// defineComponent(() => () => <></>)
// 不推荐这种写法
export default defineComponent(() => () => (
  <main>
    <RouterView></RouterView>
  </main>
))
