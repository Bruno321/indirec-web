import axios from 'axios';

export const GET = 'GET';
export const FIND = 'FIND';
export const SAVE = 'POST';
export const UPDATE = 'PATCH';
export const DELETE = 'DELETE';
export const SAVE_WITH_FILE = 'SAVE_WITH_FILE';

export const DEV = false;

export const URL = DEV ? "http://localhost:3030" : "http://20.106.129.226:3030";

export const token = localStorage.getItem('token');

const API = axios.create({
  baseURL: URL,
  headers: { 
    "Access-Control-Allow-Origin": null ,
    "Accept":"*/*"
  },
});

export async function login (email, password) {
  return await API.post('/auth', { email, password, strategy: 'local' });
};

/**
 * Generic function to make api calls
 * @param {ENUM} operation - Consts FIND, GET, SAVE or UPDATE
 * @param {string} model - Model name in API
 * @param {object} payload - Data to send
 * @param {object} params - Object that can contain id of a model or queries and skip for find calls.
 */
export async function process(operation, model, payload = {}, params = {}) {
  const { id, queries, limit, skip } = params || {};

  const oAuth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  switch (operation) {
    case FIND:
      return await API.get(
        `/${model}?${queries ? queries + '&' : ''}${
          limit ? '$limit=' + limit : ''
        }&$skip=${skip}`,
        oAuth
      );
    // case FIND:
    //   return await API.get(`/${model}`, oAuth);
    case SAVE:
      return await API.post(`/${model}`, payload, oAuth);
    case SAVE_WITH_FILE:
      return await API.post(`/${model}`, payload, {
        headers: {
          ...oAuth.headers,
          'Content-Type': 'multipart/form-data',
        },
      });
    // case UPDATE:
    //   return await API.patch(`/${model}/${id}`, payload, oAuth);
      case UPDATE:
      return await API.patch(`/${model}/${id}`, payload, oAuth);
    case DELETE:
      return await API.delete(`/${model}/${id}`, oAuth);
    default:
      return null;
  }
};
