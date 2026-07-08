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
    <article className="mx-auto flex w-full max-w-[220px] flex-col items-center text-center">
      <p className="mb-3 max-w-full break-words text-center font-body font-bold text-[#73ABDE] text-sm uppercase tracking-wide sm:text-base">
        {role}
      </p>

      <div className="relative mb-8 h-[220px] w-[220px] overflow-hidden bg-[#D9D9D9]">
        {photoUrl ? (
          <Image alt={photoAlt} className="object-cover" fill sizes="220px" src={photoUrl} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs">
            No photo
          </div>
        )}
      </div>

      <h3 className="mb-2 font-body font-bold text-brand-primary text-lg uppercase leading-tight sm:text-xl">
        {name}
      </h3>

      {degree ? (
        <p className="font-body text-brand-primary text-sm leading-snug">{degree}</p>
      ) : null}
      {position ? (
        <p className="font-body text-brand-navy text-sm leading-snug">{position}</p>
      ) : null}
      {typeof yearsOfExperience === "number" ? (
        <p className="font-body text-brand-navy text-sm leading-snug">
          {yearsOfExperience} years exp.
        </p>
      ) : null}
    </article>
  )
}
