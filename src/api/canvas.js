import { canvases } from './http'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

// npm 라이브러리 :  https://www.npmjs.com/package/date

// 검색
export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  )
  const { data } = await canvases.get('/', { params: payload })
  return data
}

// 등록
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  }
  return canvases.post('/', newCanvas)
}

// 삭제
export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`)
}

// CanvasDetail 타이틀 정보 get
export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`)
  return data
}

// CanvasDetail 타이틀 수정
export async function updateTitle(id, title) {
  // post : 새로운 자원 생성
  // put : 기존 자원 전체 업데이트 또는 새 자원 생성
  // patch : 일부 수정
  canvases.patch(`/${id}`, { title })
}

// 메모 Note.jsx 수정
export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas)
}
