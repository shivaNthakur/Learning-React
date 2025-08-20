// import React from 'react';
// import appwriteService from "../appwrite/config";
// import {Link, link } from "react-router-dom";


// function PostCard({$id, tittle, featuredImage}) {
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full p-4 bg-gray-100 rounded-xl'>
//             <div className='justify-center w-full mb-4'>
//                 <img src={appwriteService.getFilePreview(featuredImage)} alt={tittle} className='rounded-xl' />
//             </div>
//             <h2 className='text-xl font-bold'>{tittle}</h2>
//         </div>
//     </Link>
//   )
// }

// export default PostCard;




/*  New code showing the site loading */

import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // ✅ FIX

  return (
    <header>
      {authStatus === "authenticated" ? (
        <p>Welcome Back!</p>
      ) : (
        <p>Please Log In</p>
      )}
    </header>
  );
}

export default Header;