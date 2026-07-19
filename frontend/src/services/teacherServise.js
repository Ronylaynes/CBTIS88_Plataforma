import api from './api'
 
export const getStaff = (tipo = '') => {
  const params = tipo ? { tipo } : {}
  return api.get('/staff/', { params }).then(r => r.data)
}
 
export const getStaffById = (id) =>
  api.get(`/staff/${id}`).then(r => r.data)
 
export const getStaffSummary = () =>
  api.get('/staff/resumen').then(r => r.data)
 
export const createStaff = (data) =>
  api.post('/staff/', data).then(r => r.data)
 
export const updateStaff = (id, data) =>
  api.patch(`/staff/${id}`, data).then(r => r.data)
 
export const deleteStaff = (id) =>
  api.delete(`/staff/${id}`).then(r => r.data)
 