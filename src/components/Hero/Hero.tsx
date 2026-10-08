import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-82px)] overflow-hidden min-[880px]:h-[calc(100svh-82px)] min-[880px]:min-h-0">
      <div className="pointer-events-none absolute inset-0 translate-y-[45px] min-[880px]:translate-y-0">
        <div className="absolute inset-0 bg-[#F8E4A8] [clip-path:polygon(0_54%,0_100%,100%_100%,100%_83%)] min-[880px]:[clip-path:polygon(0_13%,0_100%,76%_100%)]" />
        <div className="absolute inset-0 bg-[#FADA7A] [clip-path:polygon(0_59%,0_100%,100%_100%,100%_88%)] min-[880px]:[clip-path:polygon(0_25%,0_100%,65%_100%)]" />
        <div className="absolute inset-0 bg-[#FBD45E] [clip-path:polygon(0_65%,0_100%,100%_100%,100%_94%)] min-[880px]:[clip-path:polygon(0_37%,0_100%,55%_100%)]" />
      </div>

      <div className="relative z-10 grid min-h-[calc(100svh-82px)] grid-cols-1 content-start min-[880px]:h-full min-[880px]:min-h-0 min-[768px]:grid-cols-2 min-[768px]:content-stretch">
        <div className="order-2 flex min-w-0 items-center justify-start pr-6 pb-5 pl-[clamp(24px,8vw,62px)] min-[768px]:order-1 min-[768px]:items-end min-[880px]:items-center min-[768px]:justify-start min-[880px]:justify-center min-[880px]:px-6 min-[768px]:pr-3 min-[768px]:pb-6 min-[880px]:pb-0 min-[768px]:pl-[clamp(55px,9vw,75px)] min-[600px]:max-[768px]:absolute min-[600px]:max-[768px]:bottom-16 min-[600px]:max-[768px]:left-0 min-[431px]:max-[600px]:pb-2 min-[600px]:max-[768px]:pb-0">
          <div className="relative aspect-[485/583] w-[clamp(160px,50vw,196px)] min-[768px]:w-[clamp(260px,32vw,285px)] min-[880px]:w-[clamp(180px,min(32vw,57.2vh),485px)] min-[600px]:max-[768px]:w-[clamp(200px,34vw,260px)]">
            <Image
              alt="UOAVC volleyball mascot"
              className="origin-[50%_50%] object-contain transition-transform duration-500 ease-out hover:rotate-[11deg] hover:scale-[1.07]"
              fill
              priority
              sizes="(max-width: 430px) 50vw, (max-width: 767px) 35vw, (max-width: 879px) 31vw, 32vw"
              src="/mascot-default.svg"
            />
          </div>
        </div>

        <div className="order-1 flex min-w-0 flex-col items-center justify-center px-[14px] pt-[clamp(0.75rem,3vh,2rem)] pb-3 min-[768px]:order-2 min-[768px]:justify-start min-[880px]:justify-center min-[768px]:px-[clamp(1rem,calc(6.96vw_-_29.24px),2rem)] min-[880px]:py-[clamp(0.5rem,3vh,2rem)] min-[768px]:pt-12 min-[768px]:pb-6 min-[431px]:max-[768px]:pt-3 min-[431px]:max-[768px]:pb-1">
          <div className="min-[880px]:-translate-x-[clamp(1.5rem,8vw,6.25rem)] mx-auto w-fit min-w-0 max-w-full translate-x-[clamp(0px,calc(50vw_-_215px),160px)] min-[880px]:ml-auto min-[768px]:w-full min-[880px]:max-w-[620px] min-[768px]:translate-x-[clamp(-70px,calc(198px_-_30.43vw),0px)]">
            <h1 className="text-center font-heading text-primary min-[768px]:ml-auto min-[768px]:w-fit">
              <span className="mx-auto block w-fit origin-center whitespace-nowrap text-[clamp(57px,17.86vw,70px)] leading-[1.5] tracking-[-0.019em] transition-transform duration-500 ease-out hover:scale-[1.149] min-[768px]:mr-0 min-[768px]:ml-auto min-[768px]:text-[clamp(4.375rem,min(9.13vw,16.35vh),5rem)] min-[880px]:text-[clamp(3rem,min(9.13vw,16.35vh),8.66rem)] min-[768px]:leading-[1.15]">
                WELCOME TO
              </span>

              <span className="mx-auto mt-[-22px] block w-fit origin-center whitespace-nowrap text-[clamp(122px,38vw,149px)] leading-[1] transition-transform duration-500 ease-out hover:scale-[1.142] min-[768px]:mt-[clamp(-1.5rem,-1.5vh,-0.25rem)] min-[768px]:mr-0 min-[768px]:ml-auto min-[768px]:text-[clamp(5.5rem,min(17.62vw,31.55vh),16.72rem)] min-[768px]:leading-[0.95]">
                UOAVC
              </span>
            </h1>

            <div className="mt-6 ml-auto flex w-full max-w-[427px] flex-col text-right text-[clamp(14px,3.57vw,16px)] text-primary leading-[1.5] tracking-[-0.019em] min-[768px]:mt-[clamp(0.75rem,3vh,2.5rem)] min-[880px]:text-[clamp(14px,min(1.32vw,2.36vh),20px)] min-[431px]:max-[768px]:mt-4 min-[768px]:max-[879px]:text-[clamp(15px,min(1.55vw,2.36vh),20px)]">
              <p className="order-2 mt-4 ml-auto max-w-[220px] font-bold min-[880px]:order-1 min-[880px]:mt-0 min-[880px]:max-w-none">
                University of Auckland Volleyball Club
              </p>
              <div className="order-1 min-[880px]:order-2 min-[880px]:mt-[clamp(0.5rem,1.5vh,1rem)]">
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
