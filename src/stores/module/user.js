import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserByIdApi } from '@/api/user'
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const username = ref('')
    const sex = ref('')
    const motto = ref('')
    const email = ref('')
    const phone = ref('')
    const password = ref('')
    const avatar = ref('')
    const address = ref('')
    const Url = ref('')
    const id = ref(0)
    const user = reactive({
      username: '',
      sex: '',
      motto: '',
      email: '',
      phone: '',
      password: '',
      avatar: '',
      address: '',
      Url: '',
      id: 0,
    })
    const setUserMes = (myid, name, phonenum, userPassword) => {
      id.value = myid
      username.value = name
      phone.value = phonenum
      password.value = userPassword
    }
    const setUrl = (url) => {
      Url.value = url
    }
    const setSex = (sex) => {
      sex.value = sex
    }
    const setEmail = (email) => {
      email.value = email
    }
    const getUser = async (Id) => {
      const { data } = await getUserByIdApi(Id)
      console.log('仓库中api', data)
      address.value = data.address
      email.value = data.email
      id.value = data.id
      motto.value = data.motto
      password.value = data.password
      phone.value = data.phone
      sex.value = data.sex
      username.value = data.username
      Url.value = data.urlavatar
      // user = data 这样无法正确赋值
      Object.assign(user, data)
    }
    return {
      Url,
      setUrl,
      id,
      token,
      username,
      phone,
      password,
      avatar,
      password,
      sex,
      motto,
      email,
      address,
      user,
      setUserMes,
      setSex,
      setEmail,
      getUser,
    }
  },
  {
    persist: true,
  },
)
