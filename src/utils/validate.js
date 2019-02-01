// valid: 有效的
const isValidUsername = str => {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}