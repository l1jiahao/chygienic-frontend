import storage from 'store'
import { getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { loginChy } from '@/chygienic/util/request'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    role_id: -1,
    user_id: -1,
    sex: 0,
    school: '',
    career: '',
    identity: '',
    phone: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ROLE_ID: (state, roleId) => {
      state.role_id = roleId
    },
    SET_BASIC: (state, { userID, sex, school, career, identityNumber, phoneNumber }) => {
      state.user_id = userID
      state.sex = sex
      state.school = school
      state.career = career
      state.identity = identityNumber
      state.phone = phoneNumber
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginChy(userInfo).then(response => {
          const result = response.data
          storage.set(ACCESS_TOKEN, '4291d7da9005377ec9aec4a71ea837f', 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', '4291d7da9005377ec9aec4a71ea837f')
          commit('SET_ROLE_ID', result.message.role_id)
          commit('SET_NAME', { name: result.message.name, welcome: welcome() })
          commit('SET_BASIC', { userID: result.message.user_id,
                                sex: result.message.sex,
                                school: result.message.school,
                                career: result.message.career,
                                identityNumber: result.message.identity_number,
                                phoneNumber: result.message.phone_number })
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_AVATAR', result.avatar)
          response['role_id'] = user.state.role_id
          response['user_name'] = user.state.name
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
