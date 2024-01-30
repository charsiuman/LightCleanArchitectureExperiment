import { ValidatedVideoSearchParams, VideoSearchParams } from "../../../10_Entity/Video"
import { getVideos } from "../getVideos"
import { videosFixture } from "./fixture"

describe('getVideos', () => {
  const INVALID_SERIES = 0;
  const mockedValidator = (searchParams: VideoSearchParams) => {
    if (searchParams.series !== INVALID_SERIES) {
      return { ...searchParams as ValidatedVideoSearchParams, error: null }
    } else {
      return {
        series: null,
        error: {
          message: 'シリーズが不正な値です'
        }
      }
    }
  }
  // MEMO: 実質APIの内部実装なので、APIもこんな感じで実装していて欲しいなーという期待が多分に含まれる。このテストの意味とは、、、
  const mockedGetter = (searchParams: VideoSearchParams) => {
    return videosFixture.filter((video) => (video.series === searchParams.series) || searchParams.series === undefined)
  }

  describe('基本機能', () => {
    it('動画が取得できる', () => {
      const result = getVideos({}, mockedGetter, mockedValidator)

      expect(result.length).toBe(3)
    })
    it('動画が絞り込める', () => {
      const result = getVideos({
        series: videosFixture[0].series
      }, mockedGetter, mockedValidator)

      expect(result[0].series).toBe(videosFixture[0].series)
    })
    it('不正な値の場合には、全ての動画が返ってくる', () => {
      const result = getVideos({
        series: INVALID_SERIES
      }, mockedGetter, mockedValidator)

      expect(result.length).toBe(3)
    })
    it('検索条件に合致するものがない場合には、空配列が渡される', () => {
      const result = getVideos({
        series: 'unexisted series'
      }, mockedGetter, mockedValidator)

      expect(result.length).toBe(0)
    })
  })
})