'use strict'
let lifeCycle = process.env.npm_lifecycle_event
let log = lifeCycle.split(':')[0]
if (log === 'build') {
  console.log(`当前的打包环境为：${lifeCycle}`)
}

let getBaseApi = (lifeCycle) => {
  if (lifeCycle === 'build:mock') {
    return '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
  }
  if (lifeCycle === 'build:test') {
    return '"test"'
  }
  // lifeCycle === 'build:prod' || lifeCycle === 'build'
  return '"prod"'
}

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: getBaseApi(lifeCycle),
}
