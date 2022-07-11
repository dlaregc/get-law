import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../firebase";

export default function RegisterWindow() {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrorMsgPassword, setShowErrorMsgPassword] = useState(true);
  const [showErrorMsgEmail, setShowErrorMsgEmail] = useState(true);
  const [
    createUserWithEmailAndPassword,
    user, 
    loading, 
    error
  ] = useCreateUserWithEmailAndPassword(auth);

  // Matching password
  useEffect(() => {
    if (password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        setShowErrorMsgPassword(false);
      } else {
        setShowErrorMsgPassword(true);
      }
    }
  }, [password, confirmPassword]);

  // Matching email 
  useEffect(() => {
    if (email !== "" && confirmEmail !== "") {
      if (email === confirmEmail) {
        setShowErrorMsgEmail(false);
      } else {
        setShowErrorMsgEmail(true);
      }
    }
  }, [email, confirmEmail]);

  const register = () => {
    if (!firstName) {
      alert("Please enter first name");
    }

    if (showErrorMsgPassword) {
      alert("Please ensure passwords match");
    }
    registerWithEmailAndPassword(firstName, email, password);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-4 lg:px-4 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                Join GetLaw Now
            </h2>
          </div>
          <div className="mt-8 space-y-6" action="/" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="First Name"
                  name="First Name"
                  type="First Name"
                  autoComplete="First Name"
                  // required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="Last Name"
                  name="Last Name"
                  type="Last Name"
                  autoComplete="Last Name"
                  // required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-password"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmpassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            {showErrorMsgPassword && confirmPassword !== "" && password !== "" ? <span className="flex justify-center text-red-500 font-bold sm:text-sm"> Passwords do not match </span> : ""}
            
            <div>
              <button
                type=""
                onClick= {register}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
