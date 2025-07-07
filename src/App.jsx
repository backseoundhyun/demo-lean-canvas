import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
    <>
      <Header />
      <Main>
        {/** 부모 컴포넌트 안에 자식 라우트의 요소가 렌더링될 위치를 지정하는 컴포넌트 */}
        <Outlet />
      </Main>
    </>
  )
}

export default App
