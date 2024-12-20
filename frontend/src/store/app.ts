// Utilities
import { defineStore } from 'pinia'
import { useUserStore } from './user'


export const useAppStore = defineStore('app', () => {
  const user = useUserStore();

  return {user};
})
