"use client";

import useAxios from "@/hooks/useAxios";
import { Blog } from "@/types/blog";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";

interface BlogOption {
  label: string;
  value: string;
}

const Autocomplete = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  const getEventsOptions = async (inputText: string) => {
    const { data } = await axiosInstance.get("/blogs", {
      params: { search: inputText, take: 20 },
    });

    return data?.data.map((blog: Blog) => ({
      label: blog.title,
      value: blog.id,
    }));
  };

  const loadOptions = debounce(
    (inputText: string, callback: (option: BlogOption[]) => void) => {
      getEventsOptions(inputText).then((option) => callback(option));
    },
    500,
  );

  return (
    <AsyncSelect
      placeholder="Search blog..."
      className="mx-auto my-8 max-w-[650px]"
      loadOptions={loadOptions}
      onChange={(event) => router.push(`/events/${event?.value}`)}
    />
  );
};

export default Autocomplete;
