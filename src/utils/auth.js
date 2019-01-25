import { storage } from '@/assets/global'

const TokenKey = 'Admin-Token'

const getToken = () => storage.getItem(TokenKey)

const setToken = () => storage.setItem(TokenKey, token)

const removeToken = () => storage. removeItem(TokenKey)

export {
  getToken, setToken, removeToken
}