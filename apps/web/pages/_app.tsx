import "styles/main.css";
import "styles/chrome-bug.css";
import { useEffect, useState } from "react";
import React from "react";

import Layout from "components/Layout";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <div className="bg-black">
      <SessionContextProvider supabaseClient={supabaseClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
    </div>
  );
}
