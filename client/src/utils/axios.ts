/**
 * Axios Library
 */
 import axios from "axios";

 class Axios {
   private endpoint: string;
   private token: string;
 
   constructor(endpoint: string) {
     this.endpoint = endpoint;
     this.token = "";
   }
 
   setToken(token: string) {
     try {
       this.token = token;
 
       return;
     } catch (e) {
       throw e;
     }
   }
 
   async get(path: string): Promise<any> {
     try {
       const res = await axios.get(`${this.endpoint}${path}`, {
         headers: { Authorization: `Bearer ${this.token}` },
       });
 
       return res.data;
     } catch (e) {
       throw e;
     }
   }
 
   async post(path: string, body = {}): Promise<any> {
     try {
       const res = await axios.post(`${this.endpoint}${path}`, body, {
         headers: { Authorization: `Bearer ${this.token}` },
       });
 
       return res.data;
     } catch (e) {
       throw e;
     }
   }
 
   async put(path: string, body = {}): Promise<any> {
     try {
       const res = await axios.put(`${this.endpoint}${path}`, body, {
         headers: { Authorization: `Bearer ${this.token}` },
       });
 
       return res.data;
     } catch (e) {
       throw e;
     }
   }
 
   async delete(path: string): Promise<any> {
     try {
       const res = await axios.delete(`${this.endpoint}${path}`, {
         headers: { Authorization: `Bearer ${this.token}` },
       });
 
       return res.data;
     } catch (e) {
       throw e;
     }
   }
 }
 
 export const rest = new Axios('');