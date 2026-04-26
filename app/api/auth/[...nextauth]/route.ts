import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma.client";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      // какие поля принимает провайдер
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(
        credentials
      ) {
        if (!credentials) {
          return null;
        }

        // Add your own logic here to check if the user exists in your database
        // For now, we'll just return a mock user

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        })

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials?.password, findUser.password); // Здесь нужно использовать хеширование паролей в реальном приложении
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(findUser.id),
          name: findUser.fullName,
          email: findUser.email,
          role: findUser.role,
          "mazakaToken": 666
        };
      }
    })
  ],
  secret: "no system is save",
  session: {
    strategy: "jwt",
  },
  callback: {
    // 👉 authorize возвращает данные
    //jwt callback 👉 решает, что сохранить в токене(cookie)
    // session callback 👉 решает, что увидит фронт
    async jwt({ token }) {

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = findUser.id;
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }
      return token; // возвращаем токен
    },
    async session({ session, token }) {

      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session

    },
  }
};


// тут прикрутим провайдер для входа в акаунт через логин и пр
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
