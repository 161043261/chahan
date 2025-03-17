import type { IMenuItem } from '@/types/user'
import { name2icon } from '@/utils/icons'
import { defineComponent, h, type Component } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  item: IMenuItem
}

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
          <div class="flex justify-between gap-[50px]">
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
