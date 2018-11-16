import axios from 'axios'

export default {
  getDomains() {
    return axios.get('/full-status').then(response => {
      return response.data
    })	 
  },
}
