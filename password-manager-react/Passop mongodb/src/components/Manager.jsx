import React, { use } from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


const Manager = () => {
  const showPass = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isEdit, setisEdit] = useState(false);

  const setPassword = async () => {
    let passwords = await fetch("http://localhost:3002/");
    let data = await passwords.json();
    if (Array.isArray(data)) {
      setPasswordArray(data);
    } else {
      console.log("error parsing to data");
    }
  };

  useEffect(() => {
    setPassword();
  }, [form]);

  function showPassword() {
    if (showPass.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password";
      showPass.current.src = "icons/eye.png";
    } else {
      showPass.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  }

  async function savePassword() {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      if (isEdit) {
        await fetch(`http://localhost:3002/${form._id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            site: form.site,
            username: form.username,
            password: form.password,
          }),
        });
        //This type can be done if you want to update the state directly after updating because it does not instantly update normally
        // setPasswordArray((prev) =>
        //   prev.map((item) =>
        //     item._id === form._id
        //       ? {
        //           ...item,...form
        //         }
        //       : item
        //   )
        // );
        // setPassword();
        setform({ site: "", username: "", password: "" });
         toast("password updated successfully!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      } else {
        // setPasswordArray([...passwordArray, ...form]);
        let a = await fetch("http://localhost:3002/", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(form),
        });
        let data=await a.json();
        console.log(data.result);

        setform({ site: "", username: "", password: "" });
      }
      setisEdit(false);
    } else {
      toast("site,username,password must be valid", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  function handleCopy(item) {
    try {
      navigator.clipboard.writeText(item)
      toast("Copied to clipboard!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }); 
    } catch (error) {
      toast(`Error Occured ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }); 
    }
  }

  function editPassword(id) {
    setisEdit(true);
    setform({ ...passwordArray.filter((item) => item._id === id)[0] });
  }

  async function deletePassword(id) {
    let isok = confirm("Are you sure you want to delete it??");

    if (isok) {
      let del = passwordArray.find((item) => item._id == id);

      setPasswordArray(passwordArray.filter((item) => item._id != id));
      await fetch("http://localhost:3002/", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(del),
      });
      toast("Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

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
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mycontainer py-10 md:py-15">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own password manager
        </p>

        <div className="text-white flex flex-col p-4 gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="bg-white rounded-2xl border-green-700 border text-black px-3 py-1 w-full"
            type="text"
            name="site"
            placeholder="Enter website url"
          />
          <div className="flex gap-6 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              className="bg-white rounded-2xl border-green-700 border text-black px-3 py-1 w-1/2"
              type="text"
              name="username"
              placeholder="Enter username"
            />
            <div className="relative w-1/2">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="bg-white rounded-2xl border-green-700 border text-black px-3 py-1 w-full"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <span className="absolute right-3 md:top-1 top-2 text-black">
                <img
                  ref={showPass}
                  onClick={showPassword}
                  className="md:w-6 cursor-pointer w-4"
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-black flex justify-center items-center bg-green-500 hover:bg-green-400 gap-2 w-fit rounded-full md:p-2 md:px-4 p-2"
          >
            <lord-icon
              src={
                isEdit
                  ? "https://cdn.lordicon.com/gwlusjdu.json"
                  : "https://cdn.lordicon.com/efxgwrkc.json"
              }
              trigger="hover"
            ></lord-icon>
            {isEdit ? "Edit Password" : "Save Password"}
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold text-center py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <table className="table-auto w-[95%] m-auto md:w-full overflow-hidden rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site name</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2 px-1 md-px-0">Actions</th>
                </tr>
              </thead>
              {passwordArray.map((item) => (
                <tbody className="bg-green-100" key={item._id}>
                  <tr>
                    <td className="py-2 border border-white text-center w-50">
                      <div className="flex justify-center items-center">
                        <a target="_blank" href={item.site}>
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy size-5 cursor-pointer"
                          onClick={() => handleCopy(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center w-30">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div
                          className="lordiconcopy size-5 cursor-pointer"
                          onClick={() => handleCopy(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center w-30">
                      <div className="flex justify-center items-center">
                        {item.password}
                        <div
                          className="lordiconcopy size-5 cursor-pointer"
                          onClick={() => handleCopy(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center w-10">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          editPassword(item._id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          deletePassword(item._id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "20px", height: "20px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
