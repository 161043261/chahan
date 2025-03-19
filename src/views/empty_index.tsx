import { defineComponent, ref, watchEffect } from 'vue'
import MineSvg from '@/components/assets/mine_svg'
import FlagSvg from '@/components/assets/flag_svg'
export default defineComponent(() => () => {
  interface ICeilState {
    x: number
    y: number
    flipped: boolean // 是否被翻开
    flagged: boolean // 是否被标记
    mine: boolean // 是否为炸弹
    adjacentMines: number // 相邻的炸弹数
  }

  const WIDTH = 10 // 5
  const HEIGHT = 10 // 5
  const DEV = false
  const BG_COLORS = [
    'bg-transparent', // 0
    'bg-orange-300', // 1
    // amber
    'bg-yellow-300', // 2
    // lime
    'bg-green-300', // 3
    // emerald
    'bg-teal-300', // 4
    // cyan
    'bg-sky-300', // 5
    // blue
    'bg-indigo-300', // 6
    // violet
    'bg-purple-300', // 7
    // fuchsia
    'bg-pink-300', // 8
    // rose
  ]
  let mineGenerated = false
  const DIRECTIONS = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ]

  const ceilsGrid = ref<ICeilState[][]>(
    Array.from(
      {
        length: HEIGHT,
      },
      (_, y) =>
        Array.from(
          {
            length: WIDTH,
          },
          (_, x): ICeilState => {
            return {
              x,
              y,
              flipped: false,
              flagged: false,
              mine: false,
              adjacentMines: 0,
            }
          },
        ),
    ),
  )

  function generateMines(initialCeil: ICeilState) {
    for (const ceilsRow of ceilsGrid.value) {
      for (const ceil of ceilsRow) {
        if (initialCeil.x === ceil.x && initialCeil.y === ceil.y) {
          continue
        }
        ceil.mine = Math.random() < 0.2
      }
    }
    setAdjacentMines()
  }

  function expandZero(ceil: ICeilState) {
    if (ceil.adjacentMines > 0) {
      return
    }
    getSiblings(ceil).forEach((item) => {
      if (item.flipped) {
        return
      }
      item.flipped = true
      expandZero(item)
    })
  }

  function setAdjacentMines() {
    ceilsGrid.value.forEach((ceilsRow /** , y */) => {
      ceilsRow.forEach((ceil /** , x */) => {
        if (ceil.mine) {
          return
        }
        ceil.adjacentMines += getSiblings(ceil).filter((item) => item.mine).length
      })
    })
  }

  function handleClick(ceil: ICeilState) {
    ceil.flagged = false
    if (!mineGenerated) {
      generateMines(ceil)
      mineGenerated = true
    }
    ceil.flipped = true
    if (ceil.mine) {
      alert('You lose')
      return
    }
    expandZero(ceil)
    // 检查左键
    // judger()
  }

  function handleContextMenu(ceil: ICeilState) {
    if (ceil.flipped) {
      return
    }
    ceil.flagged = !ceil.flagged
    // 检查右键
    // judger()
  }

  function getCeilClass(ceil: ICeilState) {
    if (ceil.flagged) {
      // alpha channel: 50%
      return 'bg-slate-100/50'
    }
    if (!ceil.flipped) {
      // alpha channel: 50%
      return 'hover:bg-slate-300/50 bg-slate-100/50'
    }
    // ceil.flagged === false && ceil.flipped === true
    return ceil.mine ? 'bg-red-300' : BG_COLORS[ceil.adjacentMines]
  }

  function getSiblings(ceil: ICeilState): ICeilState[] {
    return DIRECTIONS.map(([dx, dy]) => {
      const x2 = ceil.x + dx
      const y2 = ceil.y + dy
      if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT) {
        return null
      }
      return ceilsGrid.value[y2][x2]
    }).filter(Boolean) as ICeilState[] // 过滤 null 值
  }

  function judger() {
    if (!mineGenerated) {
      return
    }

    const ceils = ceilsGrid.value.flat() // 数组拍平
    if (ceils.every((ceil) => ceil.flipped || ceil.flagged)) {
      if (ceils.some((ceil) => ceil.flagged && !ceil.mine)) {
        alert('You lose')
      } else {
        alert('You win')
      }
    }
  }

  watchEffect(judger /** () => { judger() } */)
  return (
    <main class="flex flex-col items-center justify-center">
      <h1 class="text-3xl text-slate-700">上班摸鱼? 来扫雷!</h1>
      <div class="mt-[20px] border-1 border-slate-700">
        {ceilsGrid.value.map((ceilsRow, y) => (
          <div class="flex" key={y}>
            {ceilsRow.map((ceil, x) => (
              <button
                key={x}
                class={[
                  'flex',
                  'h-[50px]',
                  'w-[50px]',
                  'cursor-pointer',
                  'items-center',
                  'justify-center',
                  'border-1',
                  'border-slate-700',
                  `${getCeilClass(ceil)}`,
                ]}
                style={{ verticalAlign: 'top' }}
                onClick={() => handleClick(ceil)}
                onContextmenu={(ev) => {
                  ev.preventDefault()
                  handleContextMenu(ceil)
                }}
              >
                {(() => {
                  if (ceil.flagged) {
                    return <FlagSvg class="text-red-500" />
                  } else if (ceil.flipped || DEV) {
                    if (ceil.mine) {
                      return <MineSvg class="text-slate-500" />
                    } else {
                      return ceil.adjacentMines
                    }
                  }
                })()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
})
