import { Workspace } from "@rbxts/services"
import { Clone, Make } from "@rbxts/altmake"
import { PartCache } from "@rbxts/partcache/out/class"
import PartCacheModule from "@rbxts/partcache"

type PartTemplate = Part & { Sound: Sound , WeldConstraint: WeldConstraint}
const SoundPartCache = new PartCacheModule(Make("Part", {
	Anchored: true,
	Transparency: 1,
	CanCollide: false,
	BrickColor: BrickColor.Red(),
	Massless: true,
	Children: [
		Make("Sound"),
		Make("WeldConstraint")
	]

}), 150) as PartCache<PartTemplate>
SoundPartCache.SetCacheParent(Workspace.FX.PartCache.SFX)

export default class SoundPlayer {
	public static PlaySoundAtPosition(id: string | Sound, position: Vector3) {
		// Get SoundPart and Position it
		const SoundPart = SoundPartCache.GetPart()
		SoundPart.Position = position
		
		// Set SoundId and Play
		SoundPart.Sound.SoundId = typeOf(id) === "string"? id as string : (id as Sound).SoundId
		SoundPart.Sound.Play()

		// Return SoundPart after Sound is finished playing
		Promise.fromEvent(SoundPart.Sound.Ended)
			.andThenCall(() => SoundPartCache.ReturnPart(SoundPart))
	}
}