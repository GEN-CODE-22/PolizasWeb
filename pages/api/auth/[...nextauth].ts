import api from "@/api/axios";
import { Account, AuthSesion } from "@/interfaces";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import { pagesOptions } from "./pages-options";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Custom Login",
      credentials: {
        user: { type: "text", label: "Usuario", placeholder: "Usuario" },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credencials) {
        try {
          toast.loading("Revisando credenciales");
          const { data, status } = await api.post<AuthSesion>(
            "/api/Auth/Login",
            {
              user: credencials!.user,
              password: credencials!.password,
            },
            {
              headers: {
                Server: (credencials as any).server,
              },
            }
          );

          toast.dismiss();

          // ///Si no esta autorizado
          if (status !== 200) {
            toast.error("Revisa tus credenciales");
            throw new Error("Credenciales incorrectos");
          }
          let usr: any = {
            user: data.user.usr_ucve,
            serverAuth: data.serversAuth,
            server: (credencials as any).server,
          };

          return {
            ...usr,
          };
        } catch (error) {
          throw new Error("Credenciales incorrectos");
        }
      },
    }),
  ],
  pages: {
    ...pagesOptions,
  },

  session: {
    maxAge: 100 * 5 * 5, //1 dias
    strategy: "jwt",
    updateAge: 600, //30 min
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.accessToken;
        switch (account.type) {
          case "credentials":
            token.user = user;

            break;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
