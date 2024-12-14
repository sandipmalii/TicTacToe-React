import { useEffect, useState } from "react";

const useSocket = () => {
	const [socket, setSocket] = useState(null);
	useEffect(() => {
		if (socket) return;
		const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

		ws.onopen = (event) => {
			console.log("Connected");
			setSocket(ws);
		};

		ws.onclose = (event) => {
			console.log("Connection closed");
			setSocket(null);
		};

		return () => {
			ws.close();
		};
	}, []);
	return socket;
};

export default useSocket;

