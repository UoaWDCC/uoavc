import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-96px)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#F8E4A8] [clip-path:polygon(0_13%,0_100%,76%_100%)]" />
        <div className="absolute inset-0 bg-[#FADA7A] [clip-path:polygon(0_25%,0_100%,65%_100%)]" />
        <div className="absolute inset-0 bg-[#FBD45E] [clip-path:polygon(0_37%,0_100%,55%_100%)]" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100vh-96px)] grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center px-6 md:translate-y-5">
          <div className="relative aspect-square w-full max-w-[600px]">
            <Image
              alt="UOAVC volleyball mascot"
              className="origin-[50%_50%] object-contain transition-transform duration-500 ease-out hover:rotate-[11deg] hover:scale-[1.07]"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 48vw"
              src="/mascot-default.svg"
            />
          </div>
        </div>

        <div className="flex flex-col items-center px-8 py-16 md:justify-start md:pt-[80px]">
          <div className="w-full max-w-[700px] min-[900px]:w-fit min-[1200px]:max-w-none">
            <h1 className="text-center font-heading text-primary">
              <span className="mx-auto block w-fit origin-center whitespace-nowrap text-[clamp(6rem,9vw,11rem)] leading-[0.9] transition-transform duration-500 ease-out hover:scale-[1.18]">
                WELCOME TO
              </span>

              <span className="mx-auto block w-fit origin-center whitespace-nowrap text-[clamp(10rem,18vw,20rem)] leading-[1] transition-transform duration-500 ease-out hover:scale-[1.18]">
                UOAVC
              </span>
            </h1>

            <div className="mt-6 w-full text-right text-[20px] text-primary leading-[1.4] md:mt-10">
              <p className="font-bold">University of Auckland Volleyball Club</p>

              <div className="mt-6">
                <p>
                  <span className="font-bold">2025</span> Sports Club Of The Year (Runner-up)
                </p>

                <p>
                  <span className="font-bold">2021</span> Supreme Club Of The Year
                </p>

                <p>
                  <span className="font-bold">2021</span> Sports Club Of The Year
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
