import { storage } from '@/assets/global'

const TokenKey = 'Admin-Token'

const getToken = () => storage.getItem(TokenKey)

const setToken = token => storage.setItem(TokenKey, token)

const removeToken = () => storage. removeItem(TokenKey)

export {
  getToken, setToken, removeToken
}