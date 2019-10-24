import axios from "axios";

export default function ajax(url, data, method = 'get') { // data封index的时候传的就是对象
  let reqParam = data;
  method = method.toLowerCase();

  if (method === 'get') {
    reqParam = {
      params: data
    }
  }


  return axios[method](url, reqParam)
    .then((res) => {
      const { data } = res;
      if (data.code === 0) {
        return data.data || {};
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      alert('网络故障，请刷新网页~' + err);
    })
}