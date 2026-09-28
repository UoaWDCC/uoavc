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

// Keeps roles like "CO-ORDINATOR" from wrapping at the hyphen
const NON_BREAKING_HYPHEN = "\u2011"

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
    // Below sm the card spans two rows of the parent grid's subgrid, so photos
    // in the same row line up even when only one of the roles wraps.
    <article className="row-span-2 mx-auto grid w-full max-w-[220px] grid-rows-subgrid justify-items-center gap-y-0 break-words text-center sm:flex sm:flex-col sm:items-center">
      <p className="mb-[17px] max-w-[130px] self-end text-balance text-center font-body font-bold text-base text-brand-primary uppercase leading-[1.2] sm:mb-3 sm:min-h-12 sm:max-w-full sm:self-auto sm:text-wrap sm:text-xl sm:leading-7 sm:tracking-wide">
        {role.replaceAll("-", NON_BREAKING_HYPHEN)}
      </p>

      <div className="w-full">
        <div className="relative mb-[19px] aspect-square w-full overflow-hidden rounded-lg bg-[#D9D9D9] sm:mb-8 sm:w-[220px] sm:rounded-xl">
          {photoUrl ? (
            <Image
              alt={photoAlt}
              className="object-cover"
              fill
              sizes="(min-width: 640px) 220px, calc((100vw - 88px) / 2)"
              src={photoUrl}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-500 text-xs">
              No photo
            </div>
          )}
        </div>

        <h3 className="mb-2 font-body font-bold text-base text-brand-primary uppercase leading-[1.2] sm:text-xl sm:leading-tight">
          {name}
        </h3>

        {/* Details run slightly wider than the photo on mobile, matching the design's wrapping */}
        <div className="-mx-1 sm:mx-0">
          {degree ? (
            <p className="font-body font-light text-[15px] text-brand-primary leading-[23px] sm:font-normal sm:text-sm sm:leading-snug">
              {degree}
            </p>
          ) : null}
          {position ? (
            <p className="mt-1.5 font-body text-[15px] text-brand-primary leading-[23px] sm:mt-1 sm:text-sm sm:leading-snug">
              {position}
            </p>
          ) : null}
          {typeof yearsOfExperience === "number" ? (
            <p className="font-body text-[15px] text-brand-primary leading-[23px] sm:mt-1 sm:text-sm sm:leading-snug">
              {yearsOfExperience} years exp.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
