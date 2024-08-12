import Link from "next/link";
import Image from "next/image";
import { Title } from "rizzui";
import cn from "@/utils/class-names";

export default function AuthWrapperFour({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-[url('/hero_bg.png')] bg-cover">
      {/* <AuthHeader /> */}

      <div className="flex w-full flex-col justify-center px-5">
        <div
          className={cn(
            "mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2",
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link href={"/"} className="mb-5 inline-block max-w-[64px] lg:mb-9">
              <Image
                src={"/perfil.png"}
                alt={"Perfil"}
                width={100}
                height={100}
              />
            </Link>
            <Title
              as="h2"
              className="mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl"
            >
              {title}
            </Title>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
