import { HttpService, Workspace } from "@rbxts/services"

// Get server ip address
let [result, serverIP] = pcall(() => HttpService.GetAsync("https://ipconfig.io/json"))
if (serverIP) serverIP = (HttpService.JSONDecode(serverIP as string) as {ip: string})["ip"]

// Get region from ip address
let [result_, serverInfo] = pcall(() => HttpService.GetAsync(`https://ipapi.co/${serverIP}/json/`))
if (serverInfo) {
	serverInfo = HttpService.JSONDecode(serverInfo as string)
	const info = serverInfo as {region_code: string, country_name: string}
	Workspace.SetAttribute("Region", `${info.region_code}, ${info.country_name}`)
}