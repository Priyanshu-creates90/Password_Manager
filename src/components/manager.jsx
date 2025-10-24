import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [show, setShow] = useState(false); // to toggle visibility
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }
  useEffect(() => {
    getpasswords()

  }, []);

  const showPassword = () => {
    if (!ref.current) return; //this line mean if ref is not defined return
    setShow(!show); // toggle show state
  };

  const savePassword = async () => {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3 ) {
    toast("Password saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
     await fetch("http://localhost:3000/", {
    method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({id:form.id}) })

    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
   await fetch("http://localhost:3000/", {
    method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({...form, id: uuidv4()})
   })
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    // );
    // console.log(...passwordArray, form);
    setForm({ site: "", username: "", password: "" });
  }
 else { 
    toast("Please enter valid data ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark", 
    })};
  }
  const deletePassword =  async(id) => {
    console.log("delete", id);
    let c = confirm ("Are you sure you want to delete this password?");
    if (c) {
       toast("Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
  
    });
      let newArray = passwordArray.filter((item) => item.id !== id); // filter out the item with the given id and create a new array of remaining items
      setPasswordArray(newArray);
      // localStorage.setItem("passwords", JSON.stringify(newArray));
      let req = await fetch("http://localhost:3000/", {
    method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({id})
   })
    }
  }

  const editPassword = (id) => {
    console.log("edit", id);
 setForm({...passwordArray.filter(i => i.id === id)[0],id:id}); // find the item with the given id and set the form state to that item's values simple mening ye hai ki jo id pass kiya hai uske basis pe uska data form me le aao
 // i is the item in the array and filter will return an array of items that match the condition i.id === id
 // [0] is used to get the first item from the array returned by filter
 // setForm will set the form state to the values of the item with the given id
 setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    toast("Copied to clipboard", {
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
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); //e.target.name will give the name of the input field and e.target.value will give the value of the input field
    };

  return (
    <>
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
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform ]"></div>

      <div className="p-2 md:px-0 md:mycontainer min-h-[88.5vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass<span className="text-green-500">Op/&gt;</span>
        </h1>

        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="siite"
          />

          <div className="flex  flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 pl-2 py-1"
                type={show ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src={show ? "icons/eye.png" : "icons/eyecross.png"}
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900  ring-white ring-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font bold text-2xl py-4"> Your Password </h2>
          {passwordArray.length === 0 && <div>No Password Saved</div>}
          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-5">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th> 
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50 ">
                {passwordArray.map((item, index) => { 
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center  ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <span
                            className="material-symbols-outlined cursor-pointer pb-8 p-3 size-3"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            {" "}
                            content_copy
                          </span>{" "}
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center   ">
                        <div className="flex items-center justify-center">
                          {" "}
                          {item.username}
                          <span
                            className="material-symbols-outlined cursor-pointer  pb-8 p-3 size-3 "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            {" "}
                            content_copy
                          </span>{" "}
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          {" "}
                          {"*".repeat(item.password.length)}
                          <span
                            className="material-symbols-outlined cursor-pointer  pb-8 p-3 size-3"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            {" "}
                            content_copy
                          </span>{" "}
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          <span className=" cursor-pointer  pb-8 p-3 size-3">
                            {" "}
                          </span>
                          <span
                          
                            className="material-symbols-outlined m-4 cursor-pointer  "
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            {" "}
                            edit{" "}
                          </span>
                          <span
                            className="cursor-pointer "
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/oqeixref.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
