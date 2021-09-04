import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NewRoom } from "./Pages/NewRoom";

import { AuthContextProvider } from "./Contexts/AuthContext";
export function Routes() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<Route exact path="/" component={Home} />
				<Route path="/rooms/new" component={NewRoom} />
			</AuthContextProvider>
		</BrowserRouter>
	);
}
