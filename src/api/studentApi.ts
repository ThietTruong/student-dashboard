import { City, ListParams, ListResponse } from '../models';
import { Student } from '../models/student';
import axiosClient from './axiosClient';
const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const urls = 'students';
    return axiosClient.get(urls, {
      params,
    });
  },
  add(data: Student): Promise<Student> {
    const urls = 'students';
    return axiosClient.post(urls, data);
  },
  update(data: Student): Promise<Student> {
    const urls = 'cities';
    return axiosClient.put(urls, data);
  },
  remove(id: string): Promise<any> {
    const urls = `students/${id}`;
    return axiosClient.delete(urls);
  },
  getById(id: string): Promise<Student> {
    const urls = `students/${id}`;
    return axiosClient.get(urls);
  },
};

export default studentApi;
