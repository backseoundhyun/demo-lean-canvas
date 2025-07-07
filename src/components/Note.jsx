import { useEffect, useState, useRef } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

const Note = ({
  id,
  content,
  color: initalColor,
  onRemoveNote,
  onUpdateNote,
}) => {
  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ]

  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef(null)
  const [localContent, setLocalContent] = useState(content) // 로컬 상태 추가

  const [localColor, setLocalColor] = useState(() => {
    if (initalColor) return initalColor
    const randomIndex = Math.floor(Math.random() * colorOptions.length)
    return colorOptions[randomIndex]
  }) // 로컬 색상 상태 추가

  // content prop이 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    setLocalContent(content)
  }, [content])

  // color prop이 변경되면 로컬 색상 상태도 업데이트
  useEffect(() => {
    if (initalColor) {
      setLocalColor(initalColor)
    }
  }, [initalColor])

  // 특정 메모지에 내용 입력시 높이 스크롤 안되게 처리하기
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [localContent]) // localContent로 변경

  // 메모 내용 수정시 (로컬 상태만 업데이트)
  const handleContentChange = e => {
    const newValue = e.target.value
    setLocalContent(newValue) // 로컬 상태만 즉시 업데이트
  }

  // 편집 완료 시 API 호출
  const handleFinishEditing = () => {
    setIsEditing(false)
    onUpdateNote(id, localContent, localColor) // 편집 완료 시에만 API 호출
  }

  // 색상 변경시 (로컬 상태만 업데이트)
  const handleColorChange = newColor => {
    setLocalColor(newColor) // 로컬 색상 상태만 업데이트
  }

  return (
    <div
      className={`p-4 ${localColor} relative max-h-[32rem] overflow-hidden`} // localColor 사용
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button
            type="button"
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation()
              handleFinishEditing() // 편집 완료 처리
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Close Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation()
              onRemoveNote(id)
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>

      {/* 메모 등록 입력 */}
      <textarea
        ref={textareaRef}
        value={localContent} // localContent 사용
        onBlur={handleFinishEditing}
        onChange={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />

      {/* 색상 변경 */}
      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              onClick={() => handleColorChange(option)}
              aria-label={`Change color to ${option}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Note
