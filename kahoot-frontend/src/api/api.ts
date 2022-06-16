import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import { IUser } from "../model/interface";

const DEFAULT_URL = 'http://localhost:5000/api/v1'

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>(async (resolve , reject) => {
    const requestOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/auth/login`,
      data: {
        email,password
      }
    }
    axios(requestOptions).then((response : AxiosResponse) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
};

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<AxiosResponse> => {
  return new Promise<AxiosResponse>(async (resolve , reject) => {
    const requestOptions = {
      method: "POST",
      url: `${DEFAULT_URL}/auth/register`,
      data: {
        email,password,name
      }
    }
    axios(requestOptions).then((response : AxiosResponse) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  })
};
