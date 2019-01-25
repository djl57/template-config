'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let lifeCycle = process.env.npm_lifecycle_event, 
    BASE_API;

let log = lifeCycle.split(':')[0]
if (log === 'dev') {
  console.log(`当前的开发环境为：${lifeCycle}`)
}

if (lifeCycle === 'dev:mock') {
  BASE_API = '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
} else if (lifeCycle === 'dev:test') {
  BASE_API = '"test"'
} else if (lifeCycle === 'dev:prod') {
  BASE_API = '"prod"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: BASE_API,
})