
// const parseTime = (time, cFormat) => {
  
// }

const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export {
  isExternal
}