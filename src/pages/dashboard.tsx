import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Dashboard = () => {
	const { data, status } = useSession();

	return status === "authenticated" ? (
		<div style={{ textAlign: "left" }}>
			<h1>Dashboard</h1>
			{data && (
				<>
					{/* <div>{`Name : ${data.user?.name}`}</div>
					<div>{`Email : ${data.user?.email}`}</div>
					<div>{`Token: ${data.accessToken}`}</div> */}

					{JSON.stringify(data)}
				</>
			)}
			<div className="">
				<button onClick={() => signOut({ callbackUrl: "/" })}>Log out</button>
			</div>
		</div>
	) : (
		<Link href="/">Log in</Link>
	);
};

export default Dashboard;
