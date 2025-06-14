import './RecursiveChild.scss'

import { defineComponent, h } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import type { IMenuItem } from '@/types/user'
import { name2icon } from '@/utils/icons'
import { useTabStore } from '@/stores/tab'

interface IProps {
  item: IMenuItem
}

const RecursiveChild = defineComponent({
  name: 'RecursiveChild',
  props: ['item'],

  setup(props: IProps) {
    const tabStore = useTabStore()

    // actions 可以直接解构, 不需要 storeToRefs
    // state, getters 不可以直接解构, 需要 storeToRefs
    const { addTab } = tabStore

    const handleClick = (item: IMenuItem) => {
      const { name, icon, url } = item
      addTab(name, icon, url)
    }

    return () => (
      <div class="child-container">
        {props.item.children ? (
          <ElSubMenu index={props.item.name}>
            {{
              title: () => (
                <div>
                  <ElIcon>{h(name2icon.get(props.item.icon)!)}</ElIcon>
                  <span>{props.item.name}</span>
                </div>
              ),

              default: () => {
                return props.item.children!.map((child) => (
                  <RecursiveChild key={child.url} item={child}></RecursiveChild>
                ))
              },
            }}
          </ElSubMenu>
        ) : props.item.url !== '/order/detail' ? (
          <ElMenuItem
            index={props.item.url}
            onClick={() => handleClick(props.item)}
            class="duration-500"
          >
            <ElIcon>{h(name2icon.get(props.item.icon)!)}</ElIcon>
            <span>{props.item.name}</span>
          </ElMenuItem>
        ) : (
          <></>
        )}
      </div>
    )
  },
})

export default RecursiveChild
