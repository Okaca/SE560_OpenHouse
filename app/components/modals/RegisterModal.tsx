"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
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
        toast.success("Başarılı");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Üzgünüz. Hata oluştu :("); // TODO:
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Open House'a hoşgeldiniz :)" // TODO:
        subtitle="Hesap oluşturun!" // TODO:
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="name" // TODO:
        label="Ad/Soyad" // TODO:
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password" // TODO:
        type="password" // TODO:
        label="Şifre" // TODO:
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Google ile devam etmek için tıklayın" // TODO:
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <div
        className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Hesabınız var mı?</div>

          <div
            onClick={onToggle}
            className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
          >
            Giriş yapın
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Kayıt Ol" // TODO:
      actionLabel="Kayıt Ol" // TODO:
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
