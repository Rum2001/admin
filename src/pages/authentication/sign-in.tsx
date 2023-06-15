import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import LoginBackground from '../../../public/images/authentication/footer.jpg'
import Logo from '../../../public/images/authentication/logo.png'
import { loginUser } from '../../redux/authActions'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
const SignInPage: FC = function () {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.user)
  const handleFormSubmit = async (data) => {
    try {
      const { email, password } = data;
      await dispatch(loginUser(email, password));
      navigate("/home");
      toast.success('Thanh Cong')
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12 bg-center bg-cover" style={{ backgroundImage: `url(${LoginBackground})` }} >
      <div className="max-w-sm">
        <Card>
          <img src={Logo} alt="" />
          <h5 className="text-[#FF0000] text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ĐĂNG NHẬP HỆ THỐNG QUẢN LÝ SỰ KIỆN
          </h5>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Email"
                />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@mail.com"
                required={true}
                {...register("email")}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  value="Password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                required={true}
                {...register("password")}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">
                Remember me
              </Label>
            </div>
            <Button type="submit">
              Đăng nhập
            </Button>
          </form>
          <ToastContainer />
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
