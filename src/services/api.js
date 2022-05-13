import axios from 'axios'

const apiCadastroUpdateRevect = axios.create({
  baseURL: 'http://localhost:3001'
})

export default apiCadastroUpdateRevect
