import { Author } from "./Author"

// MEMO: 詳細情報のユースケースによっては、VideoをextendしたVideoDetailというEntityが生まれるのかもしれないし、Video自体を変更するのかもしれない
type Series = string
export interface Video {
  id: number,
  volume: number, // 0.00 (GB)
  createdDate: string, // YYYY-MM-DD
  title: string,
  values: Values
  series: Series // seriesは変動する
  author: Author
}

type PaymentType = 'streaming' | 'download' | 'community'

type Values = {
  [key in PaymentType]: number // 0 ($)
}

type Videos = Video[]

// MEMO: 型の時点で実装が透けて見える程度まで定義してみる。慣れないと少し難しく、未だ効果は分からない。後続のユースケースの作りやすさで見ていく
export type VideoSearchParams = {
  series?: unknown
}
export type ValidatedVideoSearchParams = {
  series?: string
}
export type VideoSearchParamsValidator = (searchParams: VideoSearchParams) => ValidatedVideoSearchParams & {
  error: null
} | {
  series: null,
  error: {
    message: string
  }
}

type VideosGetter = (searchParams: ValidatedVideoSearchParams) => Videos

export type GetVideos = (searchParams: VideoSearchParams, getter: VideosGetter, validator: VideoSearchParamsValidator) => ReturnType<VideosGetter>
