// import React from 'react';

import { UserAuthForm } from "./components/user-auth-form"
import { BackgroundBeams } from './components/background-beams';
import { Card, CardContent } from '@/view/components/ui/card';
import { AlertCircle } from 'lucide-react';
// import { Adsense } from '@ctrl/react-adsense';

export const metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {

  return (
    <>
      {/* <Adsense
        client="ca-pub-6955719249375599"
        slot="1457147089"
      /> */}
      <div className='flex flex-row w-full'>
        <div className='bg-[#121212] w-full flex flex-row-reverse relative max-w-[621px]'>
          <BackgroundBeams />
          <div className='h-full w-full opacity-5' style={{ background: "#0a36b0" }} />
          <div className='flex flex-col w-full h-full p-10 justify-center absolute'>
            <div className='flex w-full justify-start text-[#fff] absolute top-10'>
              PRIME BANK
            </div>
            <div className='flex flex-col gap-[16px] '>
              <div className='text-[40px] text-[#fff] font-semibold font-sans text-start title-login leading-[120%] w-[450px]'>
                Revolucione a eficiência da sua central de pronta resposta
              </div>
              <div className='text-[18px] text-[#fff] opacity-90 font-normal text-start font-sans leading-[150%]'>
                Aprimore processos, aumente a produtividade e ofereça um atendimento excepcional.
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative w-full h-screen bg-[#121212] flex-col items-center justify-center md:grid ">
          {/* <div className='flex absolute right-[32px] top-4'>
            <Button variant="google" type="button" >
              Ainda não sou cliente
            </Button>
          </div> */}
          <div className="lg:p-8 container">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

              <div className="flex flex-col space-y-2 text-start">
                <h1 className="text-2xl text-[#EDEDED] font-semibold tracking-tight">
                  Acesso pessoal
                </h1>
                <p className="text-sm text-[#A0A0A0]">
                  Digite seu e-mail abaixo para gerenciar seus veículos com facilidade e segurança.
                </p>
              </div>
              <UserAuthForm />
              <p className="px-1 text-center text-sm text-[#7e7e7e]">
                Ao clicar em continuar, você concorda com nossos{" "}
                <a
                  href="/terms"
                  className="underline underline-offset-4 hover:text-[#a0a0a0]"
                >
                  Termos e Serviços
                </a >{" "}
                e{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-[#a0a0a0]"
                >
                  Política de privacidade
                </a >
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}