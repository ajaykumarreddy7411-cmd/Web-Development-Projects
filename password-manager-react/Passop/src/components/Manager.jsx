import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

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

  useEffect(() => {
    try {
      let passwords = localStorage.getItem("passwords");
      if (passwords) {
        let parsed = JSON.parse(passwords);
        if (Array.isArray(parsed)) {
          setPasswordArray(parsed);
        } else {
          setPasswordArray([]); // fallback if data is not an array
        }
      } else {
        setPasswordArray([]);
      }
    } catch (err) {
      console.error("Error parsing passwords:", err);
      setPasswordArray([]); // fallback if JSON.parse fails
    }
  }, []);

  function showPassword() {
    if (showPass.current.src.includes("icons/eyecross.png")) {
      passwordRef.current.type = "password";
      showPass.current.src = "icons/eye.png";
    } else {
      showPass.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  }

  function savePassword() {
    if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
      
    
    if (isEdit) {
      setPasswordArray((prevArray) => {
        // Check if that id exists in the array
        const exists = prevArray.some((item) => item.id === form.id);

        let updated;
        if (exists) {
          // update the matching item
          updated = prevArray.map((item) =>
            item.id === form.id ? { ...item, ...form } : item
          );
        } else {
          // fallback: add new if id not found
          updated = [...prevArray, { ...form, id: uuidv4() }];
        }

        localStorage.setItem("passwords", JSON.stringify(updated));
        setform({ site: "", username: "", password: "" });
        return updated;
      });
    } else {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
    }
    setisEdit(false);
    } else{
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

  function handleCopy(text) {
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
  }

  function editPassword(id) {
    setisEdit(true);
    let item = passwordArray.filter((it) => {
      return it.id === id;
    });
    setform(item[0]);

    console.log(item);
  }

  function deletePassword(id) {
    let isok = confirm("Are you sure you want to delete it??");
    if (isok) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
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
              {passwordArray.map((item, index) => (
                <tbody className="bg-green-100" key={index}>
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
                          editPassword(item.id);
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
                          deletePassword(item.id);
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
