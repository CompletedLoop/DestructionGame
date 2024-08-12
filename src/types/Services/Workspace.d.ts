interface Workspace extends Model {
	Map: Folder & {
		Tree: Folder & {
			Model: Model;
		};
		mats: Folder;
		Respawner: Part;
		Buildings: Folder & {
			["medium building"]: Model & {
				roof: Part;
				entrance: Model;
			};
			["small building"]: Model & {
				roof: Part;
				floor: Part;
				entrance: Model;
			};
			["large building"]: Model & {
				roof: Part;
				entrance: Model;
			};
		};
		Spawns: Folder & {
			SpawnLocation: SpawnLocation & {
				Decal: Decal;
			};
		};
		Concrete: Folder;
		Baseplate: Part;
		ground: Part;
		Roads: Folder & {
			Lines: Folder;
		};
	};
	Camera: Camera;
	["Animation Dummy"]: Model & {
		["Left Leg"]: Part & {
			Snap: Snap;
			LeftFootAttachment: Attachment;
		};
		Humanoid: Humanoid & {
			HumanoidDescription: HumanoidDescription;
			Animator: Animator;
		};
		["Right Leg"]: Part & {
			Snap: Snap;
			RightFootAttachment: Attachment;
		};
		Head: Part & {
			HatAttachment: Attachment;
			HairAttachment: Attachment;
			FaceFrontAttachment: Attachment;
			face: Decal;
			Mesh: SpecialMesh;
			FaceCenterAttachment: Attachment;
		};
		Torso: Part & {
			RightCollarAttachment: Attachment;
			WaistCenterAttachment: Attachment;
			BodyBackAttachment: Attachment;
			Neck: Motor6D;
			LeftCollarAttachment: Attachment;
			["Left Shoulder"]: Motor6D;
			["Left Hip"]: Motor6D;
			["Right Hip"]: Motor6D;
			["Right Shoulder"]: Motor6D;
			BodyFrontAttachment: Attachment;
			WaistBackAttachment: Attachment;
			WaistFrontAttachment: Attachment;
			NeckAttachment: Attachment;
		};
		HumanoidRootPart: Part & {
			RootJoint: Motor6D;
			RootAttachment: Attachment;
		};
		["Right Arm"]: Part & {
			RightShoulderAttachment: Attachment;
			RightGripAttachment: Attachment;
		};
		["Left Arm"]: Part & {
			LeftGripAttachment: Attachment;
			LeftShoulderAttachment: Attachment;
		};
		["SMG cursor "]: Decal & {
			["dot cursor image"]: Decal;
		};
		AnimSaves: ObjectValue & {
			["m1's"]: KeyframeSequence;
			r1: KeyframeSequence;
			r2: KeyframeSequence;
		};
	};
	GameConfig: Configuration;
	["Lumina Particles"]: Folder;
	FX: Folder & {
		Hitboxes: Folder;
		Voxels: Folder;
		SFX: Folder;
		PartCache: Folder;
	};
	Characters: Folder & {
		Dummies: Folder & {
			["Dummy Spawner"]: Part;
		};
	};
}
