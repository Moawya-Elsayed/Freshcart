export async function verifyResetCode(data:{
 resetCode:string
}){

 const res = await fetch(
  "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
  {
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    resetCode:data.resetCode
   })
  }
 )

 const result = await res.json()

 if(!res.ok){
  throw new Error(result.message || "Invalid verification code")
 }

 return result
}