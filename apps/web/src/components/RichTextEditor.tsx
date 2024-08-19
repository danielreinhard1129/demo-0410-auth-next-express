"use client";

import QuillEditor from "react-quill";
import { Label } from "./ui/label";
import { FC } from "react";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  label: string;
  isError: boolean;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  isError,
  onChange,
}) => {
  const quillModules = {
    toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic"]],
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <QuillEditor
        modules={quillModules}
        value={value}
        onChange={onChange}
        className="pb-16 h-[300px]"
      />

      {isError ? (
        <p className="text-xs text-red-500">{label} is Required</p>
      ) : null}
    </div>
  );
};

export default RichTextEditor;
