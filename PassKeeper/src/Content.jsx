import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function Content() {

  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }



  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/Hide.svg")) {
      ref.current.src = "/Show.svg"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "/Hide.svg"
    }

  }

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })
      toast.success('Saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      toast.error('Please Enter Valid Inputs!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

  }

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast.info('Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

  }
  const editPassword = (id) => {
    setform(passwordArray.filter(i => i.id === id)[0])
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (

    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="text-xl sm:text-4xl font-extrabold tracking-wide text-center mt-4 sm:mt-10">
        <span className="text-yellow-400 hover:scale-105 transition-transform duration-300">Pass</span>
        <span className="text-cyan-400 hover:scale-105 transition-transform duration-300">Keeper</span>
      </div>
      <div className="text-center text-md font-medium text-gray-400">Your own password manager</div>
      <div className="bg-black h-[1px] w-[20%] mx-auto mt-2 opacity-20"></div>
      <div className="flex flex-col items-center mt-3 sm:mt-6 w-[85%] sm:w-[80%] md:w-[75%] mx-auto gap-4">
        <input
          type="text"
          name="site"
          placeholder="Enter Website URL"
          className="bg-white border border-gray-300 rounded-full w-full py-1 px-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition" onChange={handleChange} value={form.site}
        />
        <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="bg-white border border-gray-300 rounded-full w-full sm:w-[50%] md:w-[62%] xl:w-full py-1 px-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 transition" value={form.username} onChange={handleChange}
          />
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="bg-white border border-gray-300 rounded-full w-full py-1 pl-4 pr-10 shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 transition" ref={passwordRef} value={form.password} onChange={handleChange}
            />
            <span className="absolute right-3 top-1 cursor-pointer" onClick={showPassword}><img ref={ref} src="/Show.svg" /></span>
          </div>
        </div>
        
        <button
          onClick={savePassword} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 px-6 py-2 rounded-full text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:cursor-pointer"
        >
          <img src="/Save.svg" alt="Save" className="w-5 h-5 invert" />Save
        </button>
      </div>
      <div className="container mt-5 mx-auto w-[85%] sm:w-[80%] md:w-[75%] min-h-[36vh] sm:min-h-[40vh] bg-white p-6 rounded-2xl shadow-md mb-[10px]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">🔐 Saved Passwords</h2>
        {passwordArray.length === 0 && <div className="text-center"> No passwords to show</div>}
        {passwordArray.length != 0 &&
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full table-fixed text-sm text-gray-700">
              <thead>
                <tr className="bg-cyan-100 text-cyan-800">
                  <th className="py-3 px-2 sm:px-5 text-left text-xs sm:text-sm w-[30%]">🌐 Site</th>
                  <th className="py-3 px-2 sm:px-5 text-left text-xs sm:text-sm w-[25%]">👤 Username</th>
                  <th className="py-3 px-2 sm:px-5 text-left text-xs sm:text-sm w-[25%]">🔑 Password</th>
                  <th className="py-3 px-2 sm:px-5 text-left text-xs sm:text-sm w-[20%]">⚙️ Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {
                  passwordArray.map((item, index) => (
                    <tr key={index} className="hover:bg-yellow-50 transition">
                      <td className="py-3 px-2 sm:px-5 text-xs sm:text-sm break-all">
                        <div className="flex items-center gap-2">
                          <a href={item.site} target="_blank">{item.site}</a>
                          <span className="hover:cursor-pointer" onClick={() => { copyText(item.site) }}><FaCopy /></span>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-5 text-xs sm:text-sm break-all">
                        <div className="flex items-center gap-2">
                          {item.username}
                          <span className="hover:cursor-pointer" onClick={() => { copyText(item.username) }}><FaCopy /></span>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-5 text-xs sm:text-sm break-all">
                        <div className="flex items-center gap-2">
                          {"*".repeat(item.password.length)}
                          <span className="hover:cursor-pointer" onClick={() => { copyText(item.password) }}><FaCopy /></span>
                        </div>
                      </td>
                      <td className="py-3 px-2 sm:px-5">
                        <div className="flex gap-1 sm:gap-3 items-center h-full">
                          <button className="bg-yellow-400 text-black p-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold hover:bg-yellow-300 transition hover:cursor-pointer" onClick={() => { editPassword(item.id) }} >
                            <FaEdit className="text-xs" />
                          </button>
                          <button className="bg-red-400 text-white p-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold hover:bg-red-300 transition hover:cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                            <MdDelete className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default Content;

