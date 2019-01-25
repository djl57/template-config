'use strict'
let lifeCycle = process.env.npm_lifecycle_event,
    BASE_API;
    
let log = lifeCycle.split(':')[0]
if (log === 'build') {
  console.log(`当前的打包环境为：${lifeCycle}`)
}

if (lifeCycle === 'build:mock') {
  BASE_API = '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
} else if (lifeCycle === 'build:test') {
  BASE_API = '"test"'
} else if (lifeCycle === 'build:prod') {
  BASE_API = '"prod"'
}

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: BASE_API,
}
