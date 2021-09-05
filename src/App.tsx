
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NewRoom } from "./Pages/NewRoom";
import { Room } from "./Pages/Room";
import { AuthContextProvider } from "./Contexts/AuthContext";
function App() {
  return (
    <BrowserRouter>
			<AuthContextProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/rooms/new" component={NewRoom} />
					<Route path="/rooms/:id" component={Room} />
				</Switch>
			</AuthContextProvider>
		</BrowserRouter>
  );
}

export default App;
