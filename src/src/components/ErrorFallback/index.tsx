export const ErrorFallback = ({ moduleName }: { moduleName: string }) => (
	<div
		style={{
			padding: "20px",
			border: "2px dashed red",
			backgroundColor: "#fff1f1",
			color: "#a00",
		}}
	>
		<h3>❌ Error al cargar {moduleName}</h3>
		<p>El servicio no está disponible en este momento.</p>
	</div>
);
