import { GetVideos } from "../../10_Entity/Video";

export const getVideos: GetVideos = (searchParams, getter, validator) => {
  const validated = validator(searchParams)

  if (validated.error !== null) {
    return getter({
      series: undefined
    })
  } else {
    return getter(validated)
  }
}