import { useRouteError } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  return (
    <div>
      <h1>Oops!</h1>
      <h2>{error.status}</h2>
      <p>{error.statusText}</p>
      {error.data?.message && <p>{error.data.message}</p>}
    </div>
  )
}

export default ErrorPage
