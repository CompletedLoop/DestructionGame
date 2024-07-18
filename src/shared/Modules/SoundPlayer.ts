import { Make } from "@rbxts/altmake"
import PartCacheModule from "@rbxts/partcache"
import { ReplicatedStorage, Workspace } from "@rbxts/services"

const SoundPartCache = new PartCacheModule(ReplicatedStorage.SoundPart, 150)
SoundPartCache.SetCacheParent(Workspace.FX.SFX)

export default class SoundPlayer {
	static PlaySoundAtPosition(id: string, position: Vector3) {
		const SoundPart = SoundPartCache.GetPart()

		SoundPart.Position = position
		SoundPart.Sound.SoundId = id
		SoundPart.Sound.Play()

		task.delay(SoundPart.Sound.TimeLength, () => SoundPartCache.ReturnPart(SoundPart))
	}
}