import axios from 'axios';

class HttpService {
  constructor() {
    const http = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5',
    });

    // setup interceptor for http request
    http.interceptors.request.use(this.handleRequestInterceptor);

    // setup interceptor for http response
    http.interceptors.response.use(
      // success response
      response => response,
      // error response
      this.handleResponseInterceptor,
    );

    this.http = http;
  }

  // Request interceptor to add auth bearer token to request header
  handleRequestInterceptor = async request => request;

  // Response interceptor to manage token refresh
  handleResponseInterceptor = error => Promise.reject(error.response);

  // Perform a get http call
  get = (url, payload, conf = {}) => {
    const config = {
      method: 'get',
      url,
      params: payload,
      ...conf,
    };
    return this.http
      .request(config)
      .then(response => this.handleSuccessResponse(response))
      .catch(error => this.handleFailResponse(error));
  };

  handleSuccessResponse = response => response.data;

  handleFailResponse = error => Promise.reject(error);
}

export default new HttpService();
