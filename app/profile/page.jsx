/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




function MyProfile() {
    const router = useRouter()
    const {data : session } =useSession();

    const [posts , setPosts] =useState([])

const handleEdit = (post) =>{
  router.push(`/update-prompt?id=${post._id}`)
}
const handleDelete =async(post)=>{
  const hasConfirm = confirm("Are you sure you want to delete this prompt?")

  if (hasConfirm) {
    try {
      await fetch(`/api/prompt/${post._id.toString()}`,{
        method :"DELETE"
      })
      const filteredPost = posts.filter((p)=> p._id !== post._id)

      setPosts(filteredPost);

    } catch (error) {
      console.log(error);
    }
  }

}


const fetchPosts = async () => {
 
 const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
   if (session?.user.id) fetchPosts();
   
  }, []);


  return (
    <Profile 
     name = "my"
     desc ="welcome"
     data ={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
     
     />
  )
}

export default MyProfile