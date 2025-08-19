import { auth, googleAuth } from "../config/firebase"; //the best way to say the name is googleProvider.
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {
    console.log(auth?.currentUser?.email);
  }

  const signIn = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(`The error is $error`);
    }
  };

  return (
    <div>
      <h2 className="text-amber-500 underline text-3xl font-bold text-center p-4">
        Authentication
      </h2>
      <form className="m-4">
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 rounded p-0.5"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 rounded p-0.5"
            type="password"
            id="password"
            name="password"
            placeholder="........."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            onClick={signIn}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50 rounded-xl"
          >
            Submit
          </button>
        </div>
      </form>
      <button
        className="bg-amber-950 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50 rounded-xl m-3"
        onClick={signInWithGoogle}
      >
        Sign in With Google
      </button>
      <button
        className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50 rounded-xl m-3 block"
        onClick={logout}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Auth;
