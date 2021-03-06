import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {auth, logInWithEmailAndPassword} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { LockClosedIcon } from '@heroicons/react/solid'

export default function LoginWindow() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-4 lg:px-4 bg-zinc-800">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-white drop-shadow-lg ">
                Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-white">
              Or{' '}
              <a href="/register" className="font-medium text-cyan-300 hover:text-cyan-600">
                sign up here
              </a>
            </p>
          </div>
          <div className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"/>

              <div className="text-sm">
                <a href="/reset" className="font-medium text-cyan-300 hover:text-cyan-600">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <NavLink to = "/">
                <button
                  type=""
                  onClick={() => logInWithEmailAndPassword(email, password)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-zinc-600 group-hover:text-zinc-800" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}