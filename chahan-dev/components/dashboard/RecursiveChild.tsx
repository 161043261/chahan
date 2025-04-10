import type { IMenuItem } from '~/types/user'
import { name2icon } from '~/utils/icons'
import { defineComponent, h, type Component } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  item: IMenuItem
}

//! 1. defineComponent({ name, props, emits, slots, expose, setup })
//! 2. defineComponent(setup, { name, props, emits, slots })
//! setup: (props, { emit /** fn */, slots, expose /** fn */ }) => renderFunc
//! renderFunc: () => <></>
const RecursiveChild = defineComponent(
  (props: IProps) => {
    const router = useRouter()
    const handleClick = (url: string) => {
      router.push(url)
    }
    const Icon: Component | undefined = name2icon.get(props.item.icon)
    return () => (
      <div>
        {props.item.children ? (
          <div class="flex justify-between gap-[70px]">
            {props.item.children.map((child) => (
              <RecursiveChild key={child.url} item={child} />
            ))}
          </div>
        ) : (
          <div
            class="text-[25px] transition-all duration-500 hover:scale-[2] hover:cursor-pointer"
            onClick={() => handleClick(props.item.url)}
          >
            {/* 使用 h 函数 */}
            {Icon ? h(Icon!) : ''}
          </div>
        )}
      </div>
    )
  },
  {
    name: 'RecursiveChild',
    props: ['item'],
  },
)

export default RecursiveChild
