import type { NuxtError } from '#app'

interface IProps {
  error: NuxtError
}
export default defineComponent(
  (props: IProps) => {
    const { error } = toRefs(props)
    const handleClick = () => {
      clearError({ redirect: '/login' })
    }

    return () => (
      <div>
        <p>statusCode: {error.value?.statusCode ?? 'unknown'}</p>
        <p>fatal: {error.value?.fatal ?? 'unknown'}</p>
        <p>unhandled: {error.value?.unhandled ?? 'unknown'}</p>
        <p>statusMessage: {error.value?.statusMessage ?? 'unknown'}</p>
        {/* 可以在 data 中设置自定义字段 */}
        <p>data: {JSON.stringify(error.value?.data ?? 'unknown')}</p>
        <p>cause: {JSON.stringify(error.value?.cause ?? 'unknown')}</p>
        <button
          onClick={handleClick}
          class="rounded-xl border-[3px] border-6th p-[9px] hover:bg-6th"
        >
          clearError
        </button>
      </div>
    )
  },
  {
    props: ['error'],
    name: 'error',
  },
)
