    "use client"

    import { changePasswordAction } from "@/actions/changePassword.action"
    import { useSession } from "next-auth/react"
    import { useState } from "react"
    import { toast } from "sonner"
    // import { FaEye, FaEyeSlash } from "react-icons/fa"
    import { Eye, EyeOff, Lock, User, Shield } from "lucide-react"

    export default function SecurityPage() {

      const { data: session } = useSession()

      const [showCurrent,setShowCurrent] = useState(false)
      const [showNew,setShowNew] = useState(false)
      const [showConfirm,setShowConfirm] = useState(false)
      
      const [loading, setLoading] = useState(false)

      const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        password: "",
        rePassword: ""
      })  

      const handleChangePassword = async (e:React.FormEvent) => {
        e.preventDefault()

        try {
          setLoading(true)

          if(passwordData.password !== passwordData.rePassword){
            toast.error("Passwords not match")
            return
          }

          await changePasswordAction(passwordData)

          toast.success("Password changed successfully")

        } catch(err){
          const message =
            err instanceof Error ? err.message : "Something went wrong"

          toast.error(message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="container mx-auto max-w-3xl mt-24 p-6">

          {/* <h1 className="text-3xl font-bold mb-8 text-emerald-600">
            Security Settings 🔐
          </h1> */}
          <div className="flex items-center gap-3 mb-8">
            <Shield className="text-emerald-600" size={32}/>
            <h1 className="text-3xl font-bold text-emerald-600">
              Security Settings
            </h1>
          </div>

          {/* ===== Profile Card ===== */}
          <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg mb-8 border dark:border-gray-800">
            {/* <h2 className="text-xl font-semibold mb-2">
              Account Info
            </h2> */}
            <div className="flex items-center gap-2 mb-3">
              <User size={20} className="text-emerald-600"/>
              <h2 className="text-xl font-semibold">
                Account Info
              </h2>
            </div>

            <p className="text-gray-500">
              {session?.user?.email}
            </p>
          </div>

          {/* ===== Change Password Form ===== */}
          <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg border dark:border-gray-800">

            {/* <h2 className="text-xl font-semibold mb-6">
              Change Password
            </h2> */}
            <div className="flex items-center gap-2 mb-6">
              <Lock size={20} className="text-emerald-600"/>
              <h2 className="text-xl font-semibold">
                Change Password
              </h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">

              <div className="relative">
                <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full p-3 rounded-lg border dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    onChange={e =>
                    setPasswordData({...passwordData, currentPassword:e.target.value})
                    }
                    
                />
                <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-3 text-gray-500"
                    >
                    {/* {showCurrent ? <FaEyeSlash /> : <FaEye />} */}
                    {showCurrent ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>



            <div className="relative">
                <input
                    type={showNew  ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full p-3 rounded-lg border dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    onChange={e =>
                    setPasswordData({...passwordData, password:e.target.value})
                    }
                />
                <button
                    type="button"
                    onClick={() => setShowNew (!showNew )}
                    className="absolute right-3 top-3 text-gray-500"
                    >
                    {/* {showNew  ? <FaEyeSlash /> : <FaEye />} */}
                    {showNew ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
            </div>

            <div className="relative">
                <input
                    type={showConfirm   ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-lg border dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    onChange={e =>
                    setPasswordData({...passwordData, rePassword:e.target.value})
                    }
                />
                <button
                        type="button"
                        onClick={() => setShowConfirm (!showConfirm )}
                        className="absolute right-3 top-3 text-gray-500"
                        >
                        {/* {showConfirm  ? <FaEyeSlash /> : <FaEye />} */}
                        {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
            </div>






              <button
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 font-semibold"
                  >
                  {loading ? "Processing..." : "Change Password"}
                </button>

            </form>
          </div>

        </div>
      )
    }