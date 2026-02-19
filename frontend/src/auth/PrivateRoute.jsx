import React from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

const PrivateRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  // ⏳ Show loader while Clerk is still checking user
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-lg">Checking authentication...</span>
      </div>
    );
  }

  // ❌ Not signed in → go to login
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // ✅ Signed in → show page
  return children;
};

export default PrivateRoute;
