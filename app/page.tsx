import { HomePageWrapper } from "./components/HomePageWrapper";

export default async function Home() {
	return (
		<main className="flex flex-col min-h-screen w-full gap-5 items-center justify-between p-5 md:px-40 pb-10">
			<HomePageWrapper />
		</main>
	);
}
