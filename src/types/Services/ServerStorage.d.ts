interface ServerStorage extends Instance {
	Dummy: Model & {
		["Left Leg"]: Part & {
			LeftFootAttachment: Attachment;
		};
		Humanoid: Humanoid & {
			Animator: Animator;
			HumanoidDescription: HumanoidDescription;
		};
		["Right Leg"]: Part & {
			RightFootAttachment: Attachment;
		};
		Head: Part & {
			HatAttachment: Attachment;
			FaceFrontAttachment: Attachment;
			HairAttachment: Attachment;
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
			["Left Hip"]: Motor6D;
			roblox: Decal;
			["Right Hip"]: Motor6D;
			["Left Shoulder"]: Motor6D;
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
		["Body Colors"]: BodyColors;
		Accessory: Accessory & {
			Handle: Part & {
				HatAttachment: Attachment;
				TouchInterest: TouchTransmitter;
				AccessoryWeld: Weld;
				SpecialMesh: SpecialMesh;
				AvatarPartScaleType: StringValue;
			};
		};
		["Right Arm"]: Part & {
			RightShoulderAttachment: Attachment;
			RightGripAttachment: Attachment;
		};
		["Left Arm"]: Part & {
			LeftGripAttachment: Attachment;
			LeftShoulderAttachment: Attachment;
		};
		Pants: Pants;
		MeshPartAccessory: Accessory & {
			Handle: Part & {
				BodyBackAttachment: Attachment;
				TouchInterest: TouchTransmitter;
				AccessoryWeld: Weld;
				SpecialMesh: SpecialMesh;
				AvatarPartScaleType: StringValue;
			};
		};
		["Epic Gamer ShadesAccessory"]: Accessory & {
			Handle: Part & {
				TouchInterest: TouchTransmitter;
				AccessoryWeld: Weld;
				FaceCenterAttachment: Attachment;
				SpecialMesh: SpecialMesh;
				AvatarPartScaleType: StringValue;
			};
		};
		Shirt: Shirt;
	};
	["VSP Scripts"]: Folder;
	_VSP_Frozen_Objects: Folder & {
		["!!! [VSP] READ ⚠"]: Script;
	};
	["Lumina Saves"]: Folder;
	RBX_ANIMSAVES: Model & {
		Dummy: ObjectValue & {
			["Automatic Save"]: KeyframeSequence;
		};
	};
}
