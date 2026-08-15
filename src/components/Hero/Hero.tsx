import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-82px)] overflow-hidden md:h-[calc(100svh-82px)] md:min-h-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#F8E4A8] [clip-path:polygon(0_13%,0_100%,76%_100%)]" />
        <div className="absolute inset-0 bg-[#FADA7A] [clip-path:polygon(0_25%,0_100%,65%_100%)]" />
        <div className="absolute inset-0 bg-[#FBD45E] [clip-path:polygon(0_37%,0_100%,55%_100%)]" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100svh-82px)] grid-cols-1 md:h-full md:min-h-0 md:grid-cols-2">
        <div className="flex items-center justify-center px-6">
          <div className="relative aspect-[485/583] w-[clamp(180px,min(32vw,57.2vh),485px)]">
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

        <div className="flex flex-col items-center justify-center px-8 py-[clamp(0.5rem,3vh,2rem)]">
          <div className="md:-translate-x-[100px] w-full max-w-[620px]">
            <h1 className="text-center font-heading text-primary">
              <span className="ml-auto block w-fit origin-center whitespace-nowrap text-[clamp(3rem,min(9.13vw,16.35vh),8.66rem)] leading-[1.15] tracking-[-0.019em] transition-transform duration-500 ease-out hover:scale-[1.149]">
                WELCOME TO
              </span>

              <span className="mt-[clamp(-1.5rem,-1.5vh,-0.25rem)] ml-auto block w-fit origin-center whitespace-nowrap text-[clamp(5.5rem,min(17.62vw,31.55vh),16.72rem)] leading-[1] transition-transform duration-500 ease-out hover:scale-[1.142]">
                UOAVC
              </span>
            </h1>

            <div className="mt-[clamp(0.75rem,3vh,2.5rem)] ml-auto w-full max-w-[427px] text-right text-[clamp(13px,min(1.32vw,2.36vh),20px)] text-primary leading-[1.5] tracking-[-0.019em]">
              <p className="font-bold">University of Auckland Volleyball Club</p>

              <div className="mt-[clamp(0.5rem,1.5vh,1rem)]">
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
