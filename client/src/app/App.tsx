import AppProvider from "./AppProvider";
import { AppRouter } from "@/app/AppRouter";

const App = () => {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
};

export default App;
