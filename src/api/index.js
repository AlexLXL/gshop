// 再封函数进行 复用 (减少get、post、url的书写)
import ajax from "./ajax.js"
const prefix = process.env.NODE_ENV === "development" ? "" : "http://localhost:5000"

// 请求位置
export const reqAddress = (latitude, longitude) => ajax(prefix + `/position/${latitude},${longitude}`)

// 请求食品分类
export const reqCategory = () => ajax(prefix + `/index_category`)

// 获取商铺列表
export const reqShops = (latitude, longitude) => ajax(prefix + `/shops`, { latitude, longitude })

// 获取验证码
export const reqCode = (phone) => ajax(prefix + `/sendcode`, { phone })

// 手机号登录
export const reqSmsLogin = (phone, code) => ajax(prefix + `/login_sms`, { phone, code }, 'post')

// 账号登录
export const reqAccountLogin = (name, pwd, captcha) => ajax(prefix + `/login_pwd`, { name, pwd, captcha }, 'post')

// 获取用户信息(cookie/session)
export const reqUser = () => ajax(prefix + `/userinfo`)

// 退出登录
export const reqLoginOut = () => ajax(prefix + `/logout`)

// foods/ratings/info
export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')
