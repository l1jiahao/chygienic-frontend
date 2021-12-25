import axios from 'axios'

const myAxios = axios.create({
  baseURL: '/prod',
  timeout: 5000
})

myAxios.interceptors.request.use(function (config) {
  // eslint-disable-next-line no-unused-vars,standard/object-curly-even-spacing
  const { url, method, params, data } = config
  // eslint-disable-next-line no-template-curly-in-string
  console.log(method + '了' + url, method === 'get' ? params : data)
  return config
// eslint-disable-next-line handle-callback-err
}, function (error) {
  console.log('请求失败：错误为：' + error.massage)
  return Promise.reject(error)
})

myAxios.interceptors.response.use(function (response) {
  console.log('响应成功：' + response)
  return response
// eslint-disable-next-line handle-callback-err
}, function (error) {
  console.log('响应失败：错误为：' + error.massage)
  return Promise.reject(error)
})

export function $get (url, params) {
  return myAxios.get(url, { params })
}
export function $post (url, params) {
  return myAxios.post(url, params)
}

export function loginChy (userInfo) {
  return $post('/login/GetUserInformation', {
    account: userInfo.username,
    password: userInfo.password
  })
}
