
// const parseTime = (time, cFormat) => {
  
// }

const isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

const curTimeStamp = () => {
  return new Date().getTime()
}

export {
  isExternal, curTimeStamp
}