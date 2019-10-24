// import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, LOGINOUT_USER, RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO } from "./mutation-types.js"
export default {
  
}

/**
 * 
 * 那个mutation里面的是解构赋值，绝必讲的有问题，返回的原本就是一个数组或者对象，
 * 怎么可能返回一个name:'lang'这样的鬼东西，而且下面用的时候你不加{}？？还不是直接把name:'lang'这坨东西
 * 直接传过去，傻逼！！！，mutations里面有{}包住完全是用结构赋值，而这里用解构赋值是因为action在传参的时
 * 候就加了{}导致后面要加{}解构赋值，actions不加，mutation根本不用加，而actions加{}应该是之后要在{}传第
 * 二个数，用来传多个值而已！！！！！！！！！actions这样一家{}用到了es6的简写，把请求回来的数据result丢
 * 进去了对象里面而已，而且这样还会导致mutation结构的时候必须用action丢进去的名字result，当然也可以写成info
 * 
 * 讲错的下面这个是保留一位小数范围是1-2.9，
 * "score|1-2.2": 1,这个的计算和后面的那个数字有关系
 * "score|0-1.1": 4.2只返回0.2和1.2这两个值
 * 
 * 
 */