"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        setIsLoading(false);
        registerModal.onClose();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something Went Wrong", err);
        console.log(err);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={"Welcome to OpenHouse!"}
        subtitle={"Create an account"}
        center={true}
      />
      <Input
        id={"email"}
        label={"Email"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id={"name"}
        label={"Name"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id={"password"}
        type={"password"}
        label={"Password"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3"> footer content </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
