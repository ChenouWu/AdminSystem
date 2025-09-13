import {create} from 'zustand'
import axios from 'axios'


const BASE_URL= import.meta.env.VITE_SERVERURL;
const BASE_PATH ='employees'

export const useEmployees = create((set)=>({

    employees:[],
    loading: false,
    error: null,
    SingleEmployee:[],
    isFoud:true,

    fetchAllEmployees: async()=>{
        try{
            set ({loading:true,error:null});
            const res = await axios.get(`${BASE_URL}${BASE_PATH}`);
          
            set({ employees: res.data, loading: false });
            
        }catch(error){
          console.log(error)
    }
  },
    createEmployee: async (payload) => {
    try {
      set({ loading: true });
      const res = await axios.post(`${BASE_URL}${BASE_PATH}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      set((state) => ({
        employees: [res.data, ...state.employees],
        loading: false,
      }));
      return { success: true, data: res.data };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || err.message });
      return { success: false, error: err.message };
    }
  },

    searchingEmployee : async(payload)=>{
      try{
        set({isFoud:false,loading:true, SingleEmployee:[]});
        const res = await axios.get(`${BASE_URL}${BASE_PATH}/by-name/${payload}`);

        set({ isFoud:true,loading: false, SingleEmployee: res.data });
        return res.data;
        
      }catch(err){
        const message = err.response?.data?.message || err.message || "Request failed";
        return message
      }
    }

}))