import Image from "next/image"

type ExecCardProps = {
  role: string
  name: string
  degree?: string | null
  position?: string | null
  yearsOfExperience?: number | null
  photo?:
    | {
        url?: string | null
        alt?: string | null
      }
    | string
    | null
}

export default function ExecCard({
  role,
  name,
  degree,
  position,
  yearsOfExperience,
  photo,
}: ExecCardProps) {
  const photoUrl = typeof photo === "string" ? photo : (photo?.url ?? null)
  const photoAlt =
    typeof photo === "string" ? `${name}'s profile photo` : photo?.alt || `${name}'s profile photo`

  return (
    <article className="mx-auto flex w-full max-w-[220px] flex-col items-center text-center">
      <p className="font-heading mb-3 max-w-full break-all text-center text-[#7FA6D8] text-sm uppercase tracking-wide sm:text-base">
        {role}
      </p>

      <div className="relative mb-8 h-[220px] w-[220px] overflow-hidden bg-[#d9d9d9]">
        {photoUrl ? (
          <Image alt={photoAlt} className="object-cover" fill src={photoUrl} />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            No photo
          </div>
        )}
      </div>

      <h3 className="font-heading mb-2 text-brand-primary text-lg uppercase leading-tight sm:text-xl">
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
