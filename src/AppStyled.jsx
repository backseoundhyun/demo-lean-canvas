import Card from './components/StyledComponents/Card'
import BaseButton from './components/StyledComponents/BaseButton'
import StyleButton from './components/StyledComponents/StyledButton'

function AppStyled() {
  return (
    <div>
      <Card />
      <hr />
      <BaseButton>BaseButton</BaseButton> &nbsp;
      <StyleButton>StypedButton</StyleButton>
    </div>
  )
}

export default AppStyled
