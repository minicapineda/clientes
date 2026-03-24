
import { createBrowserRouter, Navigate } from "react-router-dom";
import RemoteErrorBoundary from "../../components/ErrorFallback/ErrorBoundary";

import { ROUTES } from "../../shared/constants";
import ListClients from "../../features/panel/pages/ListClients";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <ListClients />, 
	},
	{
		path: `/${ROUTES.CLIENTES}`,
		element: (
			<RemoteErrorBoundary moduleName="Clientes">
				<ListClients />
			</RemoteErrorBoundary>
		),
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);
