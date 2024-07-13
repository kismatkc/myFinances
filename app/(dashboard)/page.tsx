"use client";


import { useEffect, useState } from "react";
import { useAuth } from '@clerk/nextjs';
import { SignOutButton } from "@clerk/nextjs";
import API, { setUpInterceptor } from "../axios";
import {  useQuery } from "@tanstack/react-query";
import  useNewAccount  from "@/hooks/new-account-hook"
import { Button } from "@/components/ui/button";

const fetchData = async () => {

  try {
    const response = await API.get("/account");
return response.data;
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

export default function Home() {

  const [obj, setData] = useState(null);
  const {data,error,isLoading} = useQuery({
    
    queryKey: ['dashbaoard'],
    queryFn: fetchData,
  })
  const {isOpen,onOpen,onClose} = useNewAccount();

  const { getToken } = useAuth();
  setUpInterceptor(getToken)
if(error) return (
  <p>Error</p>
)
if(isLoading) return (
  <p>Isloading</p>
)
  return (

    <>
      <p>Dashboard: {JSON.stringify(data)}</p>
     <Button  onClick={onOpen} variant="outline" size= "lg" >Add a account</Button>
      <SignOutButton />
    </>
  );
}





