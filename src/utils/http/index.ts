import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import NProgress from "../progress";
const defaultConfig: AxiosRequestConfig = {
  baseURL: "",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化
  paramsSerializer: params => qs.stringify(params, { indices: false })
};

class Http {
  npOpen: any;
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  // 初始化配置对象
  private static initConfig = {} as any;
  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);
  // 请求拦截
  private httpInterceptorsRequest() {
    const instance = Http.axiosInstance;
    instance.interceptors.request.use(
      (config: any) => {
        const _config = config;
        NProgress?.start();

        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(_config);
          return _config;
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback(_config);
          return _config;
        }
        return _config;
        //  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  // 相应拦截
  private httpInterceptorsResponse() {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      response => {
        const _config = response.config as any;
        NProgress?.done();
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof _config.beforeResponseCallback === "function") {
          _config.beforeResponseCallback(response);
          return response.data;
        }
        if (Http.initConfig.beforeResponseCallback) {
          Http.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      error => {
        const _error = error;
        _error.isCancelRequest = Axios.isCancel(_error);
        NProgress?.done();
        return Promise.reject(_error);
      }
    );
  }
  // 通用请求工具函数
  public request(method, url, param?, axiosConfig?) {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    };

    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // post工具
  public post(url, param?, config?) {
    return this.request("post", url, param, config);
  }
  // get工具
  public get(url, param?, config?) {
    return this.request("get", url, param, config);
  }
}
export const http = new Http();
