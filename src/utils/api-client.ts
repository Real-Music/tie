import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://paneltool-stage.ejaraapis.xyz",
});

export interface ApiRes {
  statusCode: number;
  message: string;
}

export type ApiError = AxiosError<ApiRes>;

class APIClient<R, D = unknown> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  post = (data: D, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<R>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  put = (data: D, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put<R>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance.get<R>(this.endpoint, config).then((res) => res.data);
  };

  get = (id: string | number, config?: AxiosRequestConfig) => {
    return axiosInstance.get<R>(this.endpoint + '/' + id, config).then(res => res.data)
  }
}

export default APIClient;
