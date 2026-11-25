import { useState } from "react"
import { api } from "../../services/api"

export function Dashboard() {
  const [meResponse, setMeResponse] = useState<unknown>(null)
  const [meError, setMeError] = useState<string>('')

  async function handleCallMe() {
    setMeError('')

    try {
      const { data } = await api.get('/users/me')
      setMeResponse(data)
    } catch (err: any) {
      console.error(err)
      setMeError(err.response?.data?.message || 'Erro ao chamar /users/me')
    }
  }

  return (
    <>
    <button type="button" onClick={handleCallMe}>
      Testar /users/me
    </button>

    {meError && <p>{meError}</p>}
    {meResponse && <pre>{JSON.stringify(meResponse, null, 2)}</pre>}
    </>
  )
}