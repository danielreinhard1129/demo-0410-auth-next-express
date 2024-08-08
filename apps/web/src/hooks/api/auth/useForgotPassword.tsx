"use client";

import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email: email });
      toast.success("Send email success");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { forgotPassword, isLoading };
};

export default useForgotPassword;
