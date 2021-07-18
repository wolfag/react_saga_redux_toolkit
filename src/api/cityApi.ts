import { ICity, IListResponse } from "models";
import axiosClient from "./axiosClient";

const cityApi = {
  getAll(): Promise<IListResponse<ICity>> {
    const url = '/cities';
    return axiosClient.get(url, {
      params: {
        _page: 1,
        _limit: 10
      }
    })
  }
}

export { cityApi };