// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Registro en la base de datos cuando un usuario inicia sesión con Google
      try {
        const response = await axios.post('http://localhost:8080/auth/register-google', {
          name: user.name,
          email: user.email,
        });
        return response.status === 201; // Retorna true si el registro es exitoso
      } catch (error) {
        console.error('Error registering user:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
