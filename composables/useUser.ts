export function useUser() {
  return useLocalStorage('user', { id: 2, name: '访客', email: '', website: '' })
}
