import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const NEXT_PUBLIC_AZURE_AD_CLIENT_ID = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID;
const NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET;
const NEXT_PUBLIC_AZURE_AD_TENANT_ID = process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID;

if (!NEXT_PUBLIC_AZURE_AD_CLIENT_ID || !NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET || !NEXT_PUBLIC_AZURE_AD_TENANT_ID) {
	throw new Error("Missing Azure AD Credentials");
}

// export const {
// 	handlers: { GET, POST },
// 	auth,
// 	signIn,
// 	signOut,
// } = NextAuth({
// 	providers: [
// 		AzureADProvider({
// 			clientId: NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
// 			clientSecret: NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
// 			tenantId: NEXT_PUBLIC_AZURE_AD_TENANT_ID,
// 			authorization: {
// 				params: { scope: "openid email profile User.Read  offline_access" },
// 			},
// 			httpOptions: { timeout: 10000 },
// 		}),
// 	],
// 	callbacks: {
// 		async jwt({ token, user, account }) {
// 			if (account && user) {
// 				return {
// 					accessToken: account.id_token,
// 					accessTokenExpires: account?.expires_at ? account.expires_at * 1000 : 0,
// 					refreshToken: account.refresh_token,
// 					user,
// 				};
// 			}
// 			if (Date.now() < token.accessTokenExpires - 100000 || 0) {
// 				return token;
// 			}
// 		},
// 		async session({ session, token }) {
// 			if (session) {
// 				session.user = token.user;
// 				session.error = token.error;
// 				session.accessToken = token.accessToken;
// 			}
// 			return session;
// 		},
// 	},
// });

export const authOptions = {
	providers: [
		AzureADProvider({
			clientId: NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
			clientSecret: NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
			tenantId: NEXT_PUBLIC_AZURE_AD_TENANT_ID,
			authorization: {
				params: { scope: "openid email profile User.Read  offline_access" },
			},
			httpOptions: { timeout: 10000 },
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				return {
					accessToken: account.id_token,
					accessTokenExpires: account?.expires_at ? account.expires_at * 1000 : 0,
					refreshToken: account.refresh_token,
					user,
				};
			}

			if (Date.now() < token.accessTokenExpires - 100000 || 0) {
				return token;
			}
		},
		async session({ session, token }) {
			if (session) {
				session.user = token.user;
				session.error = token.error;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
