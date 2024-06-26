interface Workspace extends Model {
	Map: Folder & {
		Part: Part;
		Tree: Folder & {
			Model: Model;
		};
		mats: Folder;
		dirt: Part;
		Buildings: Folder;
		Spawns: Folder;
		Concrete: Folder;
		Baseplate: Part;
		ground: Part;
		Roads: Folder;
	};
	Camera: Camera;
	Rojo: Folder & {
		Plugin: Script & {
			soundPlayer: ModuleScript;
			App: ModuleScript & {
				bindingUtil: ModuleScript;
				Theme: ModuleScript;
				Notifications: ModuleScript;
				StatusPages: ModuleScript & {
					Confirming: ModuleScript;
					Connected: ModuleScript;
					NotConnected: ModuleScript;
					Connecting: ModuleScript;
					Error: ModuleScript;
					Settings: ModuleScript & {
						Setting: ModuleScript;
					};
				};
				Page: ModuleScript;
				Components: Folder & {
					Spinner: ModuleScript;
					BorderedContainer: ModuleScript;
					VirtualScroller: ModuleScript;
					TextButton: ModuleScript;
					CodeLabel: ModuleScript;
					IconButton: ModuleScript;
					StringDiffVisualizer: ModuleScript & {
						StringDiff: ModuleScript;
					};
					PatchVisualizer: ModuleScript & {
						DomLabel: ModuleScript;
						DisplayValue: ModuleScript;
						ChangeList: ModuleScript;
					};
					SlicedImage: ModuleScript;
					Tooltip: ModuleScript;
					Dropdown: ModuleScript;
					Header: ModuleScript;
					Checkbox: ModuleScript;
					TouchRipple: ModuleScript;
					Studio: Folder & {
						StudioToolbarContext: ModuleScript;
						StudioToggleButton: ModuleScript;
						StudioPluginContext: ModuleScript;
						StudioToolbar: ModuleScript;
						StudioPluginGui: ModuleScript;
						StudioPluginAction: ModuleScript;
					};
					ScrollingFrame: ModuleScript;
					TextInput: ModuleScript;
				};
			};
			PatchTree: ModuleScript;
			InstanceMap: ModuleScript;
			Dictionary: ModuleScript;
			Settings: ModuleScript;
			ServeSession: ModuleScript;
			ApiContext: ModuleScript;
			Types: ModuleScript;
			PatchSet: ModuleScript;
			Reconciler: ModuleScript & {
				setProperty: ModuleScript;
				getProperty: ModuleScript;
				diff: ModuleScript;
				hydrate: ModuleScript;
				decodeValue: ModuleScript;
				reify: ModuleScript;
				Error: ModuleScript;
				applyPatch: ModuleScript;
			};
			strict: ModuleScript;
			runTests: ModuleScript;
			Config: ModuleScript;
			ChangeBatcher: ModuleScript & {
				encodePatchUpdate: ModuleScript;
				encodeProperty: ModuleScript;
				createPatchSet: ModuleScript;
			};
			preloadAssets: ModuleScript;
			invariant: ModuleScript;
			Assets: ModuleScript;
			ignorePlaceIds: ModuleScript;
			Version: ModuleScript;
		};
		Packages: Folder & {
			Roact: ModuleScript & {
				createSpy: ModuleScript;
				createSignal: ModuleScript;
				oneChild: ModuleScript;
				Component: ModuleScript;
				createElement: ModuleScript;
				createReconciler: ModuleScript;
				GlobalConfig: ModuleScript;
				strict: ModuleScript;
				createRef: ModuleScript;
				Type: ModuleScript;
				Portal: ModuleScript;
				["Component.spec"]: Folder;
				PropMarkers: Folder & {
					Ref: ModuleScript;
					Change: ModuleScript;
					Children: ModuleScript;
					Event: ModuleScript;
				};
				ComponentLifecyclePhase: ModuleScript;
				Config: ModuleScript;
				assign: ModuleScript;
				assertDeepEqual: ModuleScript;
				getDefaultInstanceProperty: ModuleScript;
				Binding: ModuleScript;
				NoopRenderer: ModuleScript;
				forwardRef: ModuleScript;
				internalAssert: ModuleScript;
				createContext: ModuleScript;
				RobloxRenderer: ModuleScript;
				createFragment: ModuleScript;
				Symbol: ModuleScript;
				PureComponent: ModuleScript;
				invalidSetStateMessages: ModuleScript;
				ElementKind: ModuleScript;
				createReconcilerCompat: ModuleScript;
				Logging: ModuleScript;
				ElementUtils: ModuleScript;
				SingleEventManager: ModuleScript;
				None: ModuleScript;
			};
			Promise: ModuleScript;
			RbxDom: ModuleScript & {
				database: ModuleScript;
				PropertyDescriptor: ModuleScript;
				EncodedValue: ModuleScript;
				base64: ModuleScript;
				allValues: ModuleScript;
				Error: ModuleScript;
				customProperties: ModuleScript;
			};
			t: ModuleScript & {
				ts: ModuleScript;
			};
			TestEZ: ModuleScript & {
				TestPlanner: ModuleScript;
				TestResults: ModuleScript;
				TestRunner: ModuleScript;
				TestBootstrap: ModuleScript;
				TestSession: ModuleScript;
				LifecycleHooks: ModuleScript;
				Reporters: Folder & {
					TextReporter: ModuleScript;
					TextReporterQuiet: ModuleScript;
					TeamCityReporter: ModuleScript;
				};
				TestPlan: ModuleScript;
				TestEnum: ModuleScript;
				ExpectationContext: ModuleScript;
				Context: ModuleScript;
				Expectation: ModuleScript;
			};
			Highlighter: ModuleScript & {
				utility: ModuleScript;
				lexer: ModuleScript & {
					language: ModuleScript;
				};
				theme: ModuleScript;
				types: ModuleScript;
			};
			Log: ModuleScript;
			Http: ModuleScript & {
				Error: ModuleScript;
				Response: ModuleScript;
			};
			Fmt: ModuleScript;
			Flipper: ModuleScript & {
				isMotor: ModuleScript;
				Spring: ModuleScript;
				GroupMotor: ModuleScript;
				Signal: ModuleScript;
				SingleMotor: ModuleScript;
				Instant: ModuleScript;
				Linear: ModuleScript;
				BaseMotor: ModuleScript;
			};
		};
		Version: StringValue;
	};
	GameConfig: Configuration;
	["Lumina Particles"]: Folder;
	FX: Folder & {
		Voxels: Folder;
	};
	Characters: Folder & {
		Dummies: Folder & {
			Dummy: Model & {
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
					m2: KeyframeSequence & {
						start: Keyframe & {
							start: KeyframeMarker;
							HumanoidRootPart: Pose & {
								Null: IntValue;
								Torso: Pose & {
									["Left Arm"]: Pose;
								};
							};
						};
						end: Keyframe & {
							HumanoidRootPart: Pose & {
								Null: IntValue;
								Torso: Pose & {
									["Right Arm"]: Pose;
									Null: IntValue;
									Head: Pose;
								};
							};
							end: KeyframeMarker;
						};
					};
					m1: KeyframeSequence & {
						start: Keyframe & {
							start: KeyframeMarker;
							HumanoidRootPart: Pose & {
								Null: IntValue;
								Torso: Pose & {
									["Left Arm"]: Pose;
									["Right Arm"]: Pose;
									Null: IntValue;
									Head: Pose;
								};
							};
						};
						end: Keyframe & {
							HumanoidRootPart: Pose & {
								Null: IntValue;
								Torso: Pose & {
									["Left Arm"]: Pose;
									["Right Leg"]: Pose;
									["Right Arm"]: Pose;
									Head: Pose;
								};
							};
							end: KeyframeMarker;
						};
					};
					run: KeyframeSequence;
				};
			};
		};
	};
}
