import { useCurrentUser } from "app/core/hooks/useCurrentUser";

export default function TopNavigation() {
  const user = useCurrentUser()
  return (
      <div className="pt-5 flex items-center justify-center w-full">
        {user && (
          <div className="flex border-blue-500 border-2 border-dashed rounded-2xl p-5 items-center">
            {user.email}
          </div>
        )}
        {!user && (
          <div className="flex items-center">
            <a href="/auth/login">Login</a>
          </div>
        )}
      </div>
  );
}
