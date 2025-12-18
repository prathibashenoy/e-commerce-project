import { API_URL } from "../config"


export const loginUser = async({ email, password})=>{
  const res = await fetch(`${API_URL}/api/users/login`,{
    method:'POST',
    headers:{'Content-Type':"application/json"},
    body: JSON.stringify({ email, password})
  })
  const result = await res.json()
  return result 
}