import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma.client";
import { compare, hashSync } from "bcrypt";

export const authOptions: AuthOptions = {
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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        // Add your own logic here to check if the user exists in your database
        // For now, we'll just return a mock user

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.username,
          },
        });

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
          mazakaToken: 666,
        };
      },
    }),
  ],
  secret: "no system is save",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 👉 authorize возвращает данные
    //jwt callback 👉 решает, что сохранить в токене(cookie)
    // session callback 👉 решает, что увидит фронт
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: String(token.email),
        },
      });

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
        //@ts-ignore
        session.user.id = token.id;
        //@ts-ignore
        session.user.role = token.role;
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (!user.email) {
        return false;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          OR: [{ provider: account?.provider, providerId: account?.providerAccountId }, { email: user.email }],
        },
      });

      if (findUser) {
        await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });
      } else {
        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            verified: new Date(),
            password: hashSync(user.id.toString(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });
      }

      return true;
    },
  },
};

// тут прикрутим провайдер для входа в акаунт через логин и пр
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
