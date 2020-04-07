import myAxios from './myAxios'
export const indexCategory = () => myAxios.get('/4000/indexCategory')
export const focusList = () => myAxios.get('/4000/recommend')
export const categoryL1List = ()=>myAxios.get('/4000/navCategory')
export const categoryL2List = (id)=>myAxios.get(`/4000/categoryList/${id}`)
export const navList = ()=>myAxios.get("/5000/topic/v1/know/navWap.json")
export const resultList = (page)=>myAxios.get(`/5000/topic/v1/find/recAuto.json?page=${page}&size=5`)