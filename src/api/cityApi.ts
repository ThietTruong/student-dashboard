import { City, ListResponse } from '../models';
import axiosClient from './axiosClient';
const cityApi = {
  getAll(): Promise<ListResponse<City>> {
    const urls = 'cities';
    return axiosClient.get(urls, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
  },
};

export default cityApi;
