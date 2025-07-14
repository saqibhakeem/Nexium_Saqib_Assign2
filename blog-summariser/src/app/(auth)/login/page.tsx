import { LoginForm } from '@/components/login-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-evenly p-6 md:p-10 bg-[#F0E7D8]">
      <div className="max-w-xs mr-20 mt-20">
        <Image src="/logo.png" width={500} height={500} alt='Logo' />
      </div>
      <div className="w-full max-w-sm mt-20">
        <LoginForm />
      </div>
    </div>
  );
}
