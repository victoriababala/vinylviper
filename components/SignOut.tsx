import { useAuthActions } from "@convex-dev/auth/react";
 
export function SignOut() {
  const { signOut } = useAuthActions();
  return <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black" onClick={() => void signOut()}>Sign out</button>;
}