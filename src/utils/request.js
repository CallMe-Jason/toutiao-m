import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  // baseURL:'http://ttapi.research.itcast.cn/',
  //自定义后端返回的原始数据
  //data是后端返回的原始数据
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
    // return data
  }]
})


request.interceptors.request.use(function(config) {
  const { user } = store.state
  if ( user && user.token ) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

export default request