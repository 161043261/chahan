export default defineNuxtRouteMiddleware((/** to, from */) => {
  // const authorization = useRequestHeader('authorization')
  // const headers = useRequestHeaders()
  // const headers = useRequestHeaders(['cookie'])
  if (!useRequestHeader('authorization')) {
    return navigateTo('/login')
  }
})
