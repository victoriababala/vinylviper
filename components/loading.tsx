import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col  justify-center items-center mt-48">
      <Image
        src="/main_logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};