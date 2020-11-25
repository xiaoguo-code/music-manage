/*访问后台使用axios框架实现*/
import Axios from "axios";
Axios.defaults.timeout = 5000;//超时时间5秒
Axios.defaults.withCredentials = true;//允许跨域
//Content-type 响应头
Axios.defaults.headers.post["Content-type"] = 'application/x-www-form-urlencode;charset=UTF-8';
//配置基础url
Axios.defaults.baseURL="http://localhost:8888";

//响应拦截器
Axios.interceptors.response.use(
  response=>{
    //如果response里面的status是200，说明访问到接口，否则错误
    if(response.status===200){
      return Promise.resolve(response);//Promise是异步执行框架
    }else{
      return Promise.reject(response);
    }
  },
    error=>{
    if(error.response.status){
      switch (error.re.status) {
        case 401: //未登录
          router.replace({
            path:'/',//返回到根目录
            qury:{
              redirect:router.currentRoute.fullPath
            }
          });
          break;
        case 404: //未找到
          break;
      }
    }
  },
);
/*封装get方法*/
export function get(url,params={}) {
  return new Promise((resolve,reject)=>{
    Axios.get(url,{params:params})
      .then(response=>{
        resolve(response.data);
      })
      .catch(err=>{
        reject(err)
      })
  })
}
/*封装post方法*/
export function post(url,data={}) {
  return new Promise((resolve,reject)=>{
    Axios.post(url,data)
      .then(response=>{
        resolve(response.data);
      })
      .catch(err=>{
        reject(err)
      })
  })
}
