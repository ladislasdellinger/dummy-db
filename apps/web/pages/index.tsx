import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { getURL } from "@/utils/helpers";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Button from "ui/Button";

const Home = () => {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-9xl font-bold pb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          DummyDB
        </h1>
        <div className="w-80">
          <Auth
            supabaseClient={supabaseClient}
            providers={["github"]}
            redirectTo={getURL()}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#404040",
                    brandAccent: "#52525b",
                  },
                },
              },
            }}
            theme="dark"
          />
        </div>
      </div>
    );

  return (
    <div>
      <Button onClick={() => supabaseClient.auth.signOut()}>Logout</Button>
    </div>
  );
};

export default Home;
