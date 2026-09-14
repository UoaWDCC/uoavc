import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-82px)] overflow-hidden md:h-[calc(100svh-82px)] md:min-h-0">
      <div className="pointer-events-none absolute inset-0 translate-y-[45px] md:translate-y-0">
        <div className="absolute inset-0 bg-[#F8E4A8] [clip-path:polygon(0_54%,0_100%,100%_100%,100%_83%)] md:[clip-path:polygon(0_13%,0_100%,76%_100%)]" />
        <div className="absolute inset-0 bg-[#FADA7A] [clip-path:polygon(0_59%,0_100%,100%_100%,100%_88%)] md:[clip-path:polygon(0_25%,0_100%,65%_100%)]" />
        <div className="absolute inset-0 bg-[#FBD45E] [clip-path:polygon(0_65%,0_100%,100%_100%,100%_94%)] md:[clip-path:polygon(0_37%,0_100%,55%_100%)]" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100svh-82px)] grid-cols-1 md:h-full md:min-h-0 md:grid-cols-2">
        <div className="order-2 flex min-w-0 items-center justify-start px-[31px] pb-5 md:order-1 md:justify-center md:px-6 md:pb-0">
          <div className="relative aspect-[485/583] w-[clamp(160px,50vw,196px)] md:w-[clamp(180px,min(32vw,57.2vh),485px)]">
            <Image
              alt="UOAVC volleyball mascot"
              className="origin-[50%_50%] object-contain transition-transform duration-500 ease-out hover:rotate-[11deg] hover:scale-[1.07]"
              fill
              priority
              sizes="(max-width: 768px) 60vw, 32vw"
              src="/mascot-default.svg"
            />
          </div>
        </div>

        <div className="order-1 flex min-w-0 flex-col items-center justify-center px-[14px] py-[clamp(0.5rem,3vh,2rem)] md:order-2 md:px-8">
          <div className="md:-translate-x-[100px] w-full min-w-0 max-w-[620px]">
            <h1 className="text-center font-heading text-primary">
              <span className="mx-auto block w-fit origin-center whitespace-nowrap text-[clamp(57px,17.86vw,70px)] leading-[1.5] tracking-[-0.019em] transition-transform duration-500 ease-out hover:scale-[1.149] md:mr-0 md:ml-auto md:text-[clamp(3rem,min(9.13vw,16.35vh),8.66rem)] md:leading-[1.15]">
                WELCOME TO
              </span>

              <span className="mx-auto mt-[-22px] block w-fit origin-center whitespace-nowrap text-[clamp(122px,38vw,149px)] leading-[1] transition-transform duration-500 ease-out hover:scale-[1.142] md:mt-[clamp(-1.5rem,-1.5vh,-0.25rem)] md:mr-0 md:ml-auto md:text-[clamp(5.5rem,min(17.62vw,31.55vh),16.72rem)]">
                UOAVC
              </span>
            </h1>

            <div className="mt-8 ml-auto flex w-full max-w-[427px] flex-col text-right text-[16px] text-primary leading-[1.5] tracking-[-0.019em] md:mt-[clamp(0.75rem,3vh,2.5rem)] md:text-[clamp(13px,min(1.32vw,2.36vh),20px)]">
              <p className="order-2 mt-5 ml-auto max-w-[220px] font-bold md:order-1 md:mt-0 md:max-w-none">
                University of Auckland Volleyball Club
              </p>
              <div className="order-1 md:order-2 md:mt-[clamp(0.5rem,1.5vh,1rem)]">
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
