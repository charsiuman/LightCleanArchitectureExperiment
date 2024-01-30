import { Author } from "./Author"

// MEMO: 詳細情報のユースケースによっては、VideoをextendしたVideoDetailというEntityが生まれるのかもしれないし、Video自体を変更するのかもしれない
interface Video<Series extends string> {
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

export type Videos<Series extends string> = Video<Series>[]

// MEMO: 型の時点で実装が透けて見える程度まで定義してみる。慣れないと少し難しく、未だ効果は分からない。後続のユースケースの作りやすさで見ていく
type VideoSearchParams<Series> = {
  series?: Series
}
type ValidatedVideoSearchParams<Series extends string> = VideoSearchParams<Series>
type VideoSearchParamsValidator<Series extends string> = (searchParams: VideoSearchParams<Series>) => ValidatedVideoSearchParams<Series>

type VideosGetter<Series extends string> = (searchParams: ValidatedVideoSearchParams<Series>) => Videos<Series>


export type GetVideos<Series extends string> = (getter: VideosGetter<Series>, validator: VideoSearchParamsValidator<Series>) => VideosGetter<Series>

