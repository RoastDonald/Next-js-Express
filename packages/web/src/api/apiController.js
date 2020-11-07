import axios from "axios";
import Routes from './routes';

const server = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000 * 20,
  withCredentials: true,
});

const VERBS = {
  POST: 'post',
  GET: 'get',
  DELETE:'delete'
};
const handleErrors = (response) => {
  console.log(response);
  if (!response) throw Error('Server Error');
  const {
    status,
    data
  } = response;
  if (status > 400) {
    throw data;
  } else if (!data) {
    throw Error('Server Error');
  }
};


/**
 * 
 * @param url query 
 * @param {Object} params 
 */

const appendParams = (query, params) => {
  if (!params && !query) return query;
  query = query.concat('?');
  for (let param in params) {
    query = query.concat(`${param}=${params[param]}&`);
  }
  query = query.substring(0, query.length - 1);
  return query;
}



const handleRequest = async (url, method, values = null, config = null) => {
  try {
    if(method === VERBS['DELETE']){
      console.log(values);
      const {data} = await server.delete(url,{
        params:{...values},
      });
      return data;
    }
    const {
      data
    } = await server[method](url, values, config);
    return data;
  } catch ({
    response
  }) {
    handleErrors(response);
  }
}
export default {
  login: (userCredentials) => {
    return handleRequest(Routes.LOGIN, VERBS['POST'], userCredentials);
  },
  logout: () => {
    return handleRequest(Routes.LOGOUT, VERBS['GET']);
  },
  register: (userCredentials) => {
    return handleRequest(Routes.REGISRER, VERBS['POST'], userCredentials);
  },
  me: () => {
    return handleRequest(Routes.ME, VERBS['GET']);
  },
  postProduct:(data)=>{
    return handleRequest(Routes.PRODUCTS,VERBS['POST'],data);
  },

  uploadFile: (file) => {
    const conf = {
      header: {
        "content-type": "multipart/form-data",
      },
    };
    return handleRequest(Routes.UPLOAD_FILE, VERBS['POST'], file, conf);
  },
  deleteFile: (id) => {
    return handleRequest(Routes.DELETE_FILE, VERBS['POST'], {
      id
    });
  },

  getProductsByBestSell: () => {
    return handleRequest(appendParams(Routes.PRODUCTS, {
      sortBy: 'sold',
      order: 'desc',
      limit: 4
    }), VERBS['GET']);
  },
  getProductsByFilters: (filters) => {
    return handleRequest(Routes.SHOP, VERBS['POST'], filters);
  },
  getWoods: () => {
    return handleRequest(Routes.WOODS, VERBS['GET']);
  },
  getBrands: () => {
    return handleRequest(Routes.BRANDS, VERBS['GET']);
  },
  getUsers:()=>{
    return handleRequest(Routes.USERS,VERBS['GET']);
  },
  deleteUser:(email)=>{
    return handleRequest(Routes.USERS,VERBS['DELETE'],{email});
  }
};