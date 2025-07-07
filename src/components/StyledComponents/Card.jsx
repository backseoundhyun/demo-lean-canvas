import styled from 'styled-components'

// 만약 클래스 명을 따로 지정하고 싶다면?
// styled.div.attrs()
const CardComponent = styled.div.attrs({
  className: 'card-container',
})`
  border: 2px solid #393939;
  padding: 24px;
  border-radius: 6px;
  ${props => {
    console.log('props : ', props)
    return (
      props.$dark &&
      `
      background-color: black;
      color: white;
      border: none;
    `
    )
  }}
`

function Card() {
  return (
    // 식별자에 특수문자가 있어서 대괄호로 접근
    <CardComponent $dark>
      <h2>Styled Component</h2>
      <p>이것은 styled-components로 만든 카드입니다.</p>
    </CardComponent>
  )
}

export default Card
