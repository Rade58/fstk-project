"use client";

import type React from "react";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { UploadCloud, CircleX, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type EditorProps = {
  initialTitle?: string;
  initialContent?: string;
  isEditing?: boolean;
  articleId?: string;
};

type FormData = {
  title: string;
  content: string;
  files: File[];
};

type FormErrors = {
  title?: string;
  content?: string;
};

export function MarkdownEditor({
  initialTitle = "",
  initialContent = "",
  isEditing = false,
  articleId,
}: EditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log({ content });

  async function handleSubmit(ev: React.FormEvent) {
    // console.log("handle submit");
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData: FormData = {
      title: title.trim(),
      content: content.trim(),
      files,
    };

    // logging data (here you would call api but we are logging for now)
    console.log("Form submitted: ", {
      action: isEditing ? "edit" : "create",
      articleId: isEditing ? articleId : undefined,
      data: formData,
    });
    // simulating lattency, a delayed api call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);

    // in real world example you would navigate after successful submission
    alert(
      `Article ${isEditing ? "updated" : "created"} 
       successfully! Check console for form data. 
      `,
    );
  }

  function handleUpload(ev: React.ChangeEvent<HTMLInputElement>) {
    // console.log("handle upload");
    const selectedFiles = ev.target.files;

    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }

  function removeFile(index: number) {
    // console.log("remove file");
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCancel() {
    // console.log("canceling");
    // in real app you would navigate back
    const shouldLeave = window.confirm(
      "Are you sure you want to cancel? Any unsaved changes will be lost.",
    );

    if (shouldLeave) {
      console.log("User cancelled editing");
      // navigation logic would go here
    }
  }
  // ----------------------------------------------
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }
  // ----------------------------------------------

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{"Title of some page"}</h1>
        {isEditing && articleId && (
          <p className="text-muted-foreground">
            Editing article with ID: {articleId}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Article Title</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter article title ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <div className="space-y-2">
            <Label>Markdown content *</Label>
            <div
              className={`border rounded-md ${errors.content ? "border-destructive" : ""}`}
            >
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                preview="edit"
                hideToolbar={false}
                visibleDragbar={false}
                textareaProps={{
                  placeholder: "Write your article content in Markdown ...",
                  style: { fontSize: 14, lineHeight: 1.5 },
                }}
              />
            </div>
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
          </div>
        </Card>

        {/* ---------------------------------------- */}
        {/* ------------- File upload -------------- */}
        {/* ---------------------------------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-w border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <div className="space-y-2">
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer text-sm font-medium"
                  >
                    Click Here to uplaod files
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Upload images, documents, or other, to attach to article
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleUpload}
                  className="w-0 h-0 sr-only"
                />
              </div>
            </div>

            {/* displaying uploaded files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files:</Label>
                <div className="space-y-2">
                  {files.map((file, index) => {
                    return (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: nothing to be vorry about since order won't change
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({(file.size / 1204).toFixed(1)} KB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant={"ghost"}
                          size={"sm"}
                          onClick={() => removeFile(index)}
                          className="h-7 w-7 p-1"
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ------------------------------------------------ */}
        {/* ------------------------------------------------ */}
        {/* Cancel and Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? "Saving ..." : "Save Article"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
