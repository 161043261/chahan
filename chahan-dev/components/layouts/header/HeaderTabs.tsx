import './HeaderTabs.scss'

import { useTabState } from '~/composables/useTabStore'
import { ElTabs, ElTabPane, type TabsPaneContext, type TabPaneName } from 'element-plus'

import { name2icon } from '~/utils/icons'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, h, onBeforeMount, ref, Transition, watch } from 'vue'

export default defineComponent({
  setup() {
    const tabState = useTabState()
    const { tabList } = tabState
    const router = useRouter()

    const handleClick = (tab: TabsPaneContext) => {
      const { name: url } = tab.props
      // Number.parseInt('') === NaN
      router.push(url as string)
    }

    const handleRemove = (url: TabPaneName) => {
      const idx = tabState.findTab(url as string)
      tabState.removeTab(idx)
      if (tabList.value.length === 0) {
        router.push('/')
        return
      }
      if (tabList.value.length === idx) {
        router.push(tabList.value[idx - 1].url)
        return
      }
      router.push(tabList.value[idx].url)
    }

    const route = useRoute()
    const isAlive = ref<boolean>(false)
    const handleWindowClick = () => (isAlive.value = false)
    watch(
      () => isAlive.value,
      () => {
        if (isAlive.value) {
          window.addEventListener('click', handleWindowClick)
        } else {
          window.removeEventListener('click', handleWindowClick)
        }
      },
    )
    onBeforeMount(() => window.removeEventListener('click', handleWindowClick))

    const ctxMenuX = ref<string>('0px')
    const ctxMenuY = ref<string>('0px')
    const handleCtxMenu = (ev: MouseEvent) => {
      ////////////////////
      ev.preventDefault()
      ////////////////////
      if (tabList.value.length === 0) {
        return
      }
      ctxMenuX.value = `${ev.pageX}px`
      ctxMenuY.value = `${ev.pageY}px`
      isAlive.value = true
    }

    const removeAll = () => {
      tabList.value = []
      router.push({ name: 'Home' })
    }

    return () => (
      <div>
        <div onContextmenu={handleCtxMenu}>
          <ElTabs
            modelValue={route.path}
            class="tab-container"
            onTabClick={handleClick}
            type="card"
            closable={true}
            onTabRemove={handleRemove}
          >
            {tabList.value.map(({ name, icon, url }) => (
              <ElTabPane key={url} label={name} name={url} class="rounded-lg">
                {{
                  label: () => (
                    <div class="flex items-center gap-[5px]">
                      {h(name2icon.get(icon)!)}
                      <span>{name}</span>
                    </div>
                  ),
                }}
              </ElTabPane>
            ))}
          </ElTabs>
        </div>

        {/* vue 中, v-if/v-show 加在 Transition 的直接子元素上 */}

        <Transition
          enterActiveClass="animate__animated animate__flipInX"
          leaveActiveClass="animate__animated animate__flipOutX"
        >
          {isAlive.value ? (
            <ul
              class={`ctx-menu fixed z-10 w-[150px] rounded-lg bg-slate-100 text-slate-500 shadow-lg !left-[${ctxMenuX.value}] !top-[${ctxMenuY.value}]`}
              style={{
                left: ctxMenuX.value,
                right: ctxMenuY.value,
              }}
            >
              <li>选择关闭方式</li>
              <li>
                <hr />
              </li>
              <li onClick={removeAll}>关闭所有标签页</li>
            </ul>
          ) : (
            ''
          )}
        </Transition>
      </div>
    )
  },
})
