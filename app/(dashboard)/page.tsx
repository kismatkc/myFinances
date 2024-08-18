"use client";


import { useEffect, useState } from "react";
import { useAuth } from '@clerk/nextjs';
import { SignOutButton } from "@clerk/nextjs";
import API from "../axios";
// import  { setUpInterceptor } "../axios";
import {  useQuery } from "@tanstack/react-query";





const fetchData = async () => {

  try {
    const response = await API.get("/name");
return response.data;
  
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {

  
  
  
  const {data,error,isLoading} = useQuery({
    
    queryKey: ['accounts'],
    queryFn: fetchData
    ,initialData: [{name: "hello",_id: "1"}]
      
    
  })


  // const { getToken } = useAuth();
  // setUpInterceptor(getToken)
if(error) return (
  <p>Error</p>
)
if(isLoading) return (
  <p>Isloading</p>
)
  return (
    <>
      <p>Dashboard: {JSON.stringify(data)}</p>
     

      {/* <SignOutButton /> */}
    </>
  );
}





