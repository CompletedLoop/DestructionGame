import { Functions } from "client/network"

export default () => {
	const now = os.clock()
	Functions.Debug.GetPing().await()
	return os.clock() - now
}