
export async function resetPassword(data:{
 email:string
 newPassword:string
}) {    

 const res = await fetch(
  "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
  {
   method:"PUT",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    email:data.email,
    newPassword:data.newPassword
   })
  }
 )

 const result = await res.json()

 if(!res.ok){
  throw new Error(result.message || "Reset password failed")
 }

 return result
}