import { useUser } from "@auth0/nextjs-auth0/client";

type Props = {};

export const LoginLogout = ({}: Props) => {
  const { error, isLoading, user } = useUser();

  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  return (
    <div className="login">
      <a href="/api/auth/login">
        <button className="bg-green-600 text-lavenderBlush hover:bg-green-400 focus:outline-none px-4 py-2 rounded">
          Login auth0
        </button>
      </a>
      <a href="/api/auth/logout">
        <button className="bg-green-600 text-lavenderBlush hover:bg-green-400 focus:outline-none px-4 py-2 rounded">
          Logout auth0
        </button>
      </a>
    </div>
  );
};

