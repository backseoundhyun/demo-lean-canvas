import { useCallback, useState } from 'react'

export default function useApiRequest(apiFunction) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // options: {onSuccess, onError}
  const execute = useCallback(
    // API 함수에 넘겨줄 파라미터 , 성공했을 때, 실패했을 때 각각 실행할 콜백 함수
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true) // 로딩 시작
        setError(null) // 이전 오류 초기화

        await new Promise(resolver => setTimeout(resolver, 1000)) // 1초 지연
        const response = await apiFunction(params) // 실제 API 호출
        if (onSuccess) {
          onSuccess(response)
        }
      } catch (err) {
        setError(err)
        if (onError) {
          onError(err)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [apiFunction],
  )

  return {
    isLoading, // 로딩 상태
    error, // 에러 정보
    execute, // API를 실행하는 함수
  }
}
