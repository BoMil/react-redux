import axios, {isCancel, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export type AppDomains= 'fakestoreapi.com' | '';

class HttpService {
    private appDomain : AppDomains;

    constructor(appDomain?: AppDomains) {
      this.appDomain = appDomain ?? 'fakestoreapi.com';
    }
  
    public get(url: string = '', config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
      return axiosInstance.get(`${this.appDomain}/${url}`, config);
    }
  
    public post(url: string = '', data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
      return axiosInstance.post(`${this.appDomain}/${url}`, data, config);
    }
  
    public put(url: string = '', data?: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
      return axiosInstance.put(`${this.appDomain}/${url}`, data, config);
    }
  
    public delete(url: string = '', config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
      return axiosInstance.delete(`${this.appDomain}/${url}`, config);
    }
  }
  
  export default HttpService;