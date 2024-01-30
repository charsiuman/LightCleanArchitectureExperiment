import { VideoSearchParams, VideoSearchParamsValidator } from "@/ architecture/10_Entity/Video";
import { z } from "zod";

export const validateVideoSearchParamsScheme = z.object({
  series: z.string()
})

export const videoSearchParamsValidator: VideoSearchParamsValidator = (searchParams: VideoSearchParams) => {
  const result = validateVideoSearchParamsScheme.safeParse(searchParams)

  return result.success ? {
    ...validateVideoSearchParamsScheme.parse(searchParams),
    error: null
  } : {
    series: null,
    error: {
      message: 'シリーズが不正な値です'
    }
  }
}