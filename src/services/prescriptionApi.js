import axios from 'axios';

const BASE_URL = '/api/other/prescription/v1';

export const getAllPrescriptions = () =>
  axios.get(`${BASE_URL}/get-prescription`).then(res => res.data);

export const getPrescriptionById = (id) =>
  axios.get(`${BASE_URL}/get-prescriptions/${id}`).then(res => res.data);

export const createPrescription = (data) =>
  axios.post(`${BASE_URL}/add-prescription`, data).then(res => res.data);

export const updatePrescription = (id, data) =>
  axios.put(`${BASE_URL}/update-prescription/${id}`, data).then(res => res.data);

export const deletePrescription = (id) =>
  axios.delete(`${BASE_URL}/delete-prescription/${id}`).then(res => res.data); 