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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // malalamobilelegends@gmail.com
      // 1) когда через логин и пр вызывается этот метод до signIn метода
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
            email: credentials.email,
          },
        })
        console.log('findUser: 0_0 ', findUser);

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
        }
      }
    })
  ],
  secret: "no system is save",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 👉 authorize возвращает данные
    // 👉 jwt решает, что сохранить в токене(cookie)
    // 👉 session решает, что увидит фронт
    async jwt({ token }) {

      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }
      console.log('token: JWT', token);
      return token; // возвращаем токен
    },

    async session({ session, token }) {

      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.tox = "tox500";
      }
      console.log('session: ', session);
      return session
    },

    // вызывается всегда при авторизации
    async signIn({ user, account }) {
      console.log('user signIn: ', user);

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

      console.log('findUser: ', findUser);
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
}



// тут прикрутим провайдер для входа в акаунт через логин и пр
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };