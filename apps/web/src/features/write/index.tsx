"use client";

import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateBlog from "@/hooks/api/blog/useCreateBlog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateBlogSchema } from "./schemas/CreateBlogSchema";

const WritePage = () => {
  const { mutateAsync: createBlog, isPending } = useCreateBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    validationSchema: CreateBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeSelectedImage = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <FormInput
            name="title"
            label="Title"
            placeholder="Blog title"
            type="text"
            value={formik.values.title}
            isError={!!formik.touched.title && !!formik.errors.title}
            error={formik.errors.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormInput
            name="category"
            label="Category"
            placeholder="Blog category"
            type="text"
            value={formik.values.category}
            isError={!!formik.touched.category && !!formik.errors.category}
            error={formik.errors.category}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Blog description"
            value={formik.values.description}
            isError={
              !!formik.touched.description && !!formik.errors.description
            }
            error={formik.errors.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <RichTextEditor
            label="Content"
            onChange={(html: string) => formik.setFieldValue("content", html)}
            isError={Boolean(formik.errors.content)}
            value={formik.values.content}
          />
          {selectedImage ? (
            <>
              <div className="relative h-[150px] w-[200px]">
                <Image src={selectedImage} alt="Blog thumbnail" fill />
              </div>
              <button onClick={removeSelectedImage}>remove</button>
            </>
          ) : null}

          <div className="flex flex-col space-y-1.5">
            <Label>Thumbnail</Label>
            <Input
              ref={thumbnailRef}
              type="file"
              accept="image/*"
              onChange={onChangeThumbnail}
            />
          </div>

          <div className="flex justify-end">
            <Button className="my-10" disabled={isPending}>
              {isPending ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WritePage;
