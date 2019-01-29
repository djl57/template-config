'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let lifeCycle = process.env.npm_lifecycle_event
let log = lifeCycle.split(':')[0]
if (log === 'dev') {
  console.log(`当前的开发环境为：${lifeCycle}`)
}

let getBaseApi = (lifeCycle) => {
  if (lifeCycle === 'dev:test') {
    return '"test"'
  }
  if (lifeCycle === 'dev:prod') {
    return '"prod"'
  }
  // lifeCycle === 'dev:mock' || lifeCycle === 'dev'
  return '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: getBaseApi(lifeCycle),
})