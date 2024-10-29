"use client";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

const CreatePostForm = ({ postToEdit = {} }) => {
  // for edit

  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);

  const {
    title,
    slug,
    text,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevPostImage,
  } = postToEdit;

  let editValues = {};

  if (isEditSession) {
    editValues = {
      title,
      slug,
      text,
      briefText,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevPostImage || null);
  const { createPost, isCreating } = useCreatePost();
  const { editPost, isEditing } = useEditPost();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevPostImage) {
      // convert prev img link to

      async function prevImageUrl() {
        const file = await imageUrlToFile(prevPostImage);
        setValue("coverImage", file);
      }
      prevImageUrl();
    }
  }, [editId]);

  const onSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts ");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name={"title"}
        label={"عنوان"}
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name={"briefText"}
        label={"متن کوتاه"}
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name={"text"}
        label={"متن"}
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name={"slug"}
        label={"اسلاگ"}
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name={"readingTime"}
        label={"زمان مطالعه"}
        errors={errors}
        register={register}
        isRequired
      />
      <RHFSelect
        name={"category"}
        label={"دسته بندی"}
        errors={errors}
        register={register}
        isRequired
        options={categories}
      />

      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور چست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              label={"کاور پست"}
              name={"coverImage"}
              isRequired
              {...rest}
              value={value?.fileName}
              errors={errors}
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImageUrl(URL?.createObjectURL(file));
                event.target.value = null;
              }}
            />
          );
        }}
      />
      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />

          <ButtonIcon
            variant={"red"}
            className={"w-6 h-6 absolute left-4 top-4"}
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit" className={"w-full"}>
            تایید
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreatePostForm;
