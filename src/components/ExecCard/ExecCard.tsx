import Image from "next/image"

type ExecCardProps = {
  role: string
  name: string
  degree?: string | null
  position?: string | null
  yearsOfExperience?: number | null
  photo?: {
    url?: string | null
    alt?: string | null
  } | null
}

export default function ExecCard({
  role,
  name,
  degree,
  position,
  yearsOfExperience,
  photo,
}: ExecCardProps) {
  const photoUrl = photo?.url ?? null
  const photoAlt = photo?.alt || `${name}'s profile photo`

  return (
    <article className="flex w-full min-w-0 max-w-[220px] flex-col items-center justify-self-center text-center [overflow-wrap:anywhere]">
      <p className="mb-2 flex min-h-10 items-center justify-center font-body font-extrabold text-[clamp(0.875rem,4.1vw,1rem)] text-brand-primary uppercase leading-tight sm:mb-3 sm:min-h-14 sm:font-bold sm:text-xl">
        {role}
      </p>

      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-[#D5D5D5] sm:mb-8 sm:rounded-xl">
        {photoUrl ? (
          <Image
            alt={photoAlt}
            className="object-cover"
            fill
            sizes="(max-width: 530px) calc((100vw - 90px) / 2), 220px"
            src={photoUrl}
          />
        ) : (
          <span className="sr-only">No photo for {name}</span>
        )}
      </div>

      <h3 className="mb-2 font-body font-extrabold text-[clamp(0.875rem,4.1vw,1rem)] text-brand-primary uppercase leading-tight sm:font-bold sm:text-xl">
        {name}
      </h3>

      {degree ? (
        <p className="font-body font-light text-[clamp(0.875rem,4.1vw,1rem)] text-brand-primary leading-6 sm:font-normal sm:text-sm sm:leading-snug">
          {degree}
        </p>
      ) : null}
      {position ? (
        <p className="mt-1 font-body font-light text-[clamp(0.875rem,4.1vw,1rem)] text-brand-primary leading-6 sm:font-normal sm:text-sm sm:leading-snug">
          {position}
        </p>
      ) : null}
      {typeof yearsOfExperience === "number" ? (
        <p className="font-body font-light text-[clamp(0.875rem,4.1vw,1rem)] text-brand-primary leading-6 sm:mt-1 sm:font-normal sm:text-sm sm:leading-snug">
          {yearsOfExperience} years exp.
        </p>
      ) : null}
    </article>
  )
}
