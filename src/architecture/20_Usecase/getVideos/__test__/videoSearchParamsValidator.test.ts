import { ValidatedVideoSearchParams, VideoSearchParams } from "../../../10_Entity/Video"
import { getVideos } from "../getVideos"
import { videoSearchParamsValidator } from "../validateVideoSearchParams"
import { videosFixture } from "./fixture"

describe('videoSearchParamsValidator', () => {
  describe('検索条件が文字列の場合', () => {
    it('検索条件を返す。エラーはない', () => {
      const result = videoSearchParamsValidator({
        series: 'test'
      })

      expect(result.series).toBe('test')
      expect(result.error).toBeFalsy()
    })
  })
  describe('検索条件が文字列でない場合', () => {
    it('検索条件はnullになる。エラーが入っている', () => {
      const result = videoSearchParamsValidator({
        series: 0
      })

      expect(result.series).toBe(null)
      expect(result.error).toBeTruthy()
    })
  })
})