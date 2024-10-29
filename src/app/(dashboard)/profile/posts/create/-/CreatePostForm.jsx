"use client";
import { useCategories } from "@/hooks/useCategories";
import ButtonIcon from "@/ui/ButtonIcon";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object();

const CreatePostForm = () => {
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(null);

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
  });

  return (
    <form className="form">
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
            <TextField
              type="file"
              isRequired
              name={"my-coverImage"}
              label={"کاور پست"}
              {...rest}
              value={value?.fileName}
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
    </form>
  );
};

export default CreatePostForm;
