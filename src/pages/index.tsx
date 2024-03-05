import { signIn } from "next-auth/react";

export default function Home() {
	return (
		<div>
			<button
				onClick={() => {
					signIn("azure-ad", { callbackUrl: "/dashboard" }, { prompt: "login" });
				}}
			>
				Click to Sign In
			</button>
		</div>
	);
}
