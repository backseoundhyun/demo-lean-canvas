import { useParams } from 'react-router-dom'
import CanvasTitle from './CanvasTitle'
import LeanCanvas from './LeanCanvas'
import { useEffect, useState } from 'react'
import { getCanvasById, updateTitle, updateCanvas } from '../api/canvas'

function CanvasDetail() {
  const { id } = useParams()
  const [canvas, setCanvas] = useState()

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id)
      setCanvas(data)
    }
    fetchCanvas()
  }, [id])

  const handleTitleChange = async title => {
    try {
      await updateTitle(id, title)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas)
      setCanvas(updatedCanvas)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      {/**canvas가 없으면 value는 undefined (즉, 입력창에 아무 값도 표시되지 않음) */}
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </div>
  )
}

export default CanvasDetail
