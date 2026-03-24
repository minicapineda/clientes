import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	moduleName: string;
}

interface State {
	hasError: boolean;
}

class RemoteErrorBoundary extends Component<Props, State> {
	public state: State = { hasError: false };

	public static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error(
			`Error en Microfrontend [${this.props.moduleName}]:`,
			error,
			errorInfo,
		);
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						padding: "20px",
						border: "1px solid red",
						borderRadius: "8px",
						background: "#fff1f0",
					}}
				>
					<h3>⚠️ Error al cargar {this.props.moduleName}</h3>
					<p>
						No pudimos conectar con este módulo. Intenta recargar la página.
					</p>
					<button type="button" onClick={() => window.location.reload()}>
						Recargar
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default RemoteErrorBoundary;
