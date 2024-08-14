import { Workspace } from "@rbxts/services"
import { Make } from "@rbxts/altmake"
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
	/**
	 * Plays A Sound at a Position
	 * @param id Either the SoundId or Sound object you want to play
	 * @param position Where should the Sound be played at
	 */
	public static PlaySoundAtPosition(id: string | Sound, position: Vector3): void {
		// Get SoundPart and Position it
		const SoundPart = SoundPartCache.GetPart()
		SoundPart.Position = position
		
		// Set SoundId and Play
		SoundPart.Sound.SoundId = typeIs(id, "string") ? id : id.SoundId
		SoundPart.Sound.Play()

		// Return SoundPart after Sound is finished playing
		Promise.fromEvent(SoundPart.Sound.Ended)
			.andThenCall(() => SoundPartCache.ReturnPart(SoundPart))
	}
}