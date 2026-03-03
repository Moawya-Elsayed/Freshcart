    export async function forgotPassword(data:{
    email:string
    }){

    const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        email:data.email
    })
    }
    )

    const result = await res.json()

    if(!res.ok){
    throw new Error(result.message || "Forgot password failed")
    }

    return result
    }