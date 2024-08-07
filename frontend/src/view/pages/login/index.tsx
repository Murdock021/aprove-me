// import React from 'react';

import { UserAuthForm } from './components/user-auth-form';
import { BackgroundBeams } from './components/background-beams';
import { Button } from '@/view/components/ui/button';
import logo from '../../../assets/images/logo-bankme.webp';

export const metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="bg-[#121212] w-full flex flex-row-reverse relative max-w-[621px]">
          <BackgroundBeams />
          <div
            className="h-full w-full opacity-5"
            style={{ background: '#0a36b0' }}
          />
          <div className="flex flex-col w-full h-full p-10 justify-center absolute">
            <div className="flex w-full justify-start text-[#fff] absolute top-10">
              <img src={logo} className="w-[180px] h-[120px]" alt="logo" />
            </div>
            <div className="flex flex-col gap-[16px] ">
              <div className="text-[40px] text-[#fff] font-semibold font-sans text-start title-login leading-[120%] w-[450px]">
                Bem-vindo ao Bankme digital.
              </div>
              <div className="text-[18px] text-[#fff] opacity-90 font-normal text-start font-sans leading-[150%]">
                Seja o banqueiro do seu cliente
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative w-full h-screen bg-[#121212] flex-col items-center justify-center md:grid ">
          <div className="lg:p-8 container">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-start">
                <h1 className="text-2xl text-[#EDEDED] font-semibold tracking-tight">
                  Acesso pessoal
                </h1>
                <p className="text-sm text-[#A0A0A0]">
                  Digite seu e-mail abaixo para gerenciar seus veículos com
                  facilidade e segurança.
                </p>
              </div>
              <UserAuthForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
