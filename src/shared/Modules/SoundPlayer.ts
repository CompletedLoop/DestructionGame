import { Clone, Make } from "@rbxts/altmake"
import PartCacheModule from "@rbxts/partcache"
import { ReplicatedStorage, Workspace } from "@rbxts/services"

const SoundPartCache = new PartCacheModule(ReplicatedStorage.SoundPart, 150)
SoundPartCache.SetCacheParent(Workspace.FX.SFX)

export default class SoundPlayer {
	public static PlaySoundAtPosition(id: string, position: Vector3) {
		const SoundPart = SoundPartCache.GetPart()

		SoundPart.Position = position
		SoundPart.Sound.SoundId = id
		SoundPart.Sound.Play()

		Promise.delay(SoundPart.Sound.TimeLength).andThen(() => SoundPartCache.ReturnPart(SoundPart))
	}

	public static PlaySoundAtPositionFromSound(sound: Sound, position: Vector3) {
		const SoundPart = SoundPartCache.GetPart()
		
		SoundPart.Position = position
		const cloned_sound = Clone(sound, {
			Parent: SoundPart,
		})
		
		cloned_sound.Play()
		
		Promise.delay(cloned_sound.TimeLength)
			.andThen(cloned_sound.Destroy)
			.andThen(() => SoundPartCache.ReturnPart(SoundPart))
	}
}