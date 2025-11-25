import { api } from '../api.js'

export async function sendMessage (user_id, message) {
  const response = await api.post('chat/', { user_id, message })

  console.log(response.data)

  return response.data
}

export async function getHistory (user_id) {
  try {
    const response = await api.get(`history/${user_id}/`)

    return response.data
  } catch (error) {
    console.error("Erro ao buscar histórico:", error)

    return [] 
  }
}