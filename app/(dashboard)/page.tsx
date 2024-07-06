"use client";


import { useEffect, useState } from "react";
import { useAuth } from '@clerk/nextjs';
import { SignOutButton } from "@clerk/nextjs";
import API, { setUpInterceptor } from "../axios";



export default function Home() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  setUpInterceptor(getToken)
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await API.get("/account");
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p>Dashboard</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <SignOutButton />
    </>
  );
}





