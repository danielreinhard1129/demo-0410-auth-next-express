"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { useEffect } from "react";

const useAxios = () => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err?.response.status === 403) {
          dispatch(logoutAction());
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch, token]);

  return { axiosInstance };
};

export default useAxios;
