import { Workspace } from "services";
import Signal from "@rbxts/goodsignal";

const default_oparams = new OverlapParams()
default_oparams.FilterDescendantsInstances = [Workspace.Characters]
default_oparams.FilterType = Enum.RaycastFilterType.Include

class Hitbox {
	onHit: Signal;
	oparams = default_oparams;
	constructor(oparams?: OverlapParams) {
		this.onHit = new Signal()
		if (oparams) this.oparams = oparams
	}

	// 
	detect(cframe: CFrame, size: Vector3) {

	}
}