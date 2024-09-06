// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { User as NextAuthUser } from 'next-auth';

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      // Registro en la base de datos cuando un usuario inicia sesión con Google
      try {
        // Registro o inicio de sesión en la base de datos según sea necesario
        const registerResponse = await axios.post('http://localhost:8080/auth/register-google', {
          name: user.name,
          email: user.email,
        });

        const loginResponse = await axios.post('http://localhost:8080/auth/logIn-google', {
          email: user.email,
        });

        // Retorna true si ambos son exitosos
        return registerResponse.status === 201 && loginResponse.status === 201;
      } catch (error) {
        console.error('Error during Google sign-in:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
