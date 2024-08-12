interface ReplicatedStorage extends Instance {
	Modules: Folder & {
		VoxelDestruction: ModuleScript & {
			Voxelize: ModuleScript;
			PartCache: ModuleScript & {
				Table: ModuleScript;
			};
			Settings: ModuleScript;
			Signal: ModuleScript;
			Mesh: ModuleScript;
			Queue: ModuleScript;
		};
		GoodSignal: ModuleScript;
		VoxBreaker: ModuleScript & {
			PartCache: ModuleScript & {
				Table: ModuleScript;
			};
		};
	};
	TS: Folder & {
		Luau: Folder & {
			VoxBreaker: ModuleScript;
			VoxelDestruct: ModuleScript;
			Hitbox: ModuleScript;
		};
		Movesets: Folder & {
			Base: ModuleScript;
			Roach: Folder & {
				RoachAwakened: ModuleScript;
				RoachBase: ModuleScript;
			};
		};
		network: ModuleScript;
		Constants: ModuleScript;
		Modules: Folder & {
			Logger: ModuleScript;
			TimedConnection: ModuleScript;
			SoundPlayer: ModuleScript;
		};
		StatusEffects: Folder & {
			Attacking: ModuleScript;
			Blocking: ModuleScript;
			Stun: ModuleScript;
			Ragdolled: ModuleScript;
			Running: ModuleScript;
		};
		Skills: Folder & {
			Base: Folder & {
				dash: ModuleScript;
				block: ModuleScript;
				m1: ModuleScript;
			};
			Roach: Folder & {
				RoachAwakened: Folder;
				RoachBase: Folder;
			};
		};
		Util: Folder & {
			LoadCharacter: ModuleScript;
			GetWSC_Character: ModuleScript;
		};
		VFX: Folder & {
			Punched: ModuleScript;
		};
	};
	buildingObjects: Folder & {
		building: Folder & {
			garden: Folder & {
				["Mall Bush 2"]: Part & {
					Mesh: SpecialMesh;
					Decal: Decal;
				};
				["Aesthetic Potted Table Plant - Reggie"]: Model & {
					Model: Model & {
						Union: UnionOperation;
						Part: Part;
					};
					["Meshes/Grass"]: MeshPart;
				};
				bigbush: Model & {
					Part: Part & {
						Decal: Decal;
					};
				};
				["Potted Plant"]: Model & {
					Fern: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					Dirt: Part;
					Pot: MeshPart;
				};
				["White Flower Bush"]: Model & {
					Leaf: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					Trunk: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
				};
				ObjectPart: Model & {
					Plant: MeshPart;
				};
				["Bush in Garden"]: Model & {
					Union: UnionOperation;
					Part: Part;
				};
				["Pink Flower Pot"]: Model & {
					Flowerpot: Model;
					Dirt: Part;
				};
				Plant: Model;
				["Rose Bush"]: Model & {
					Model: Model & {
						MeshPart: MeshPart & {
							["MeshPart-to-MeshPart Strong Joint"]: ManualWeld;
							["MeshPart Terrain Joint"]: ManualWeld;
						};
						Bush: Model & {
							Union: UnionOperation;
						};
					};
				};
				["Street Flower Pot"]: Model;
				["Plant garden"]: Model & {
					Part: Part;
				};
			};
			pillars: Folder & {
				["Neon Pillar"]: Model & {
					Neon: Model;
					Pillar: Model;
				};
				["Poolrooms Part"]: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
				};
			};
			fireplaces: Folder & {
				["Modern Fireplace"]: Model & {
					Fire: Part & {
						["1"]: ParticleEmitter;
						["3"]: ParticleEmitter;
						["2"]: ParticleEmitter;
					};
				};
				["Wood Burning Stove"]: Model & {
					Union: UnionOperation;
					FireParticles: Part & {
						Fire: ParticleEmitter;
					};
				};
				["Elegant Fireplace"]: Model;
				Bonfire: Model;
				["Rectangle Fireplace"]: Model;
				["Fire Pit"]: Model;
				["Basic Fireplace"]: Model & {
					Union: UnionOperation;
					fire: Part;
				};
			};
			windows: Folder & {
				["Traditional Window"]: Model & {
					Windoe: Folder;
				};
				["Modern Window"]: Model;
				BiggerWindow: Model;
				["Modern windows"]: Model;
				BigModernWindow: Model;
			};
			doors: Folder & {
				["Slick Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model;
					Script: Script;
					doorFrame: Model;
				};
				["Room Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model & {
						Handle2: UnionOperation & {
							Weld: Weld;
						};
						Handle1: UnionOperation & {
							Weld: Weld;
						};
						Hinge: Part & {
							Weld: Weld;
						};
					};
					Script: Script;
					doorFrame: Model;
				};
				["Traditional Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: Model;
					Script: Script;
					doorPiece: Model & {
						Glass: Part;
						Sealant: Part;
						PrimaryHinge: Part & {
							Mesh: CylinderMesh;
						};
					};
				};
				["Industrial Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model & {
						Handle2: UnionOperation;
						Handle1: UnionOperation;
						Hinge: Part & {
							Weld: Weld;
						};
						Part: Part;
					};
					Script: Script;
					doorFrame: Model;
				};
				["Plain Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: UnionOperation;
					Script: Script;
					doorPiece: Model & {
						Hinge: Part & {
							Mesh: CylinderMesh;
						};
					};
				};
				["Door Frame"]: Model;
				["School Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model;
					Script: Script;
					doorFrame: Model & {
						Union: UnionOperation;
					};
				};
				["Class Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: Model & {
						Part: Part;
					};
					Script: Script;
					doorPiece: Model & {
						["Union(Sperate them if you want..)"]: UnionOperation;
					};
				};
				["Double Door Frame"]: Model;
				["Glass Window Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: Model;
					Script: Script;
					doorPiece: Model;
				};
				["Luxurious Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model;
					Script: Script;
					doorFrame: Model;
				};
				["Basic Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorPiece: Model & {
						Union: UnionOperation;
					};
					Script: Script;
					doorFrame: Model & {
						Hinge: Part & {
							WeldConstraint: WeldConstraint;
						};
					};
				};
				["Elaborate Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: Model;
					Script: Script;
					doorPiece: Model & {
						Door: Model & {
							AnchoredParts: Model;
							Window: Part & {
								Weld: Weld;
							};
							Base: Part & {
								BodyGyro: BodyGyro;
							};
						};
					};
				};
				["Broken Door"]: Model & {
					Part: Part & {
						hingeLocation: Attachment;
						ProximityPrompt: ProximityPrompt;
					};
					doorPiece: Model & {
						Handle2: UnionOperation;
						Handle1: UnionOperation;
						Hinge: Part & {
							Weld: Weld;
						};
					};
					Script: Script;
					doorFrame: Model;
				};
				["Glass Door"]: Model & {
					Part: Part & {
						ProximityPrompt: ProximityPrompt;
						hingeLocation: Attachment;
					};
					doorFrame: Model;
					Script: Script;
					doorPiece: Model;
				};
			};
			floor: Folder & {
				points: Folder;
				point: Part;
				displayTriangle: MeshPart;
			};
			basicShapes: Folder;
			fences: Folder & {
				Union: UnionOperation;
				["Metal Fence "]: Model & {
					Design: Model;
					Bars: Model & {
						Union: UnionOperation;
					};
				};
				MeshPart: MeshPart;
				["Red Carpet Fence"]: Model;
				["Wooden Fence"]: Model & {
					Wood: Part;
					Memes: Part;
					Dab: UnionOperation;
					Robux: UnionOperation;
				};
			};
			wallTrim: Folder & {
				["Large Top Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
				["Flat Top Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
				["Small Top Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
				["Large Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
				["Small Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
				["Flat Trim"]: Model & {
					Display: Model & {
						wall: UnionOperation;
						flatTrim: Part & {
							originalWall: ObjectValue;
						};
					};
					flatTrim: Part;
				};
			};
			fenceGates: Folder & {
				["Fence Gate"]: Model;
				Gate: Model & {
					Door1: Model & {
						MeshPart1: MeshPart;
					};
					Door2: Model & {
						MeshPart1: MeshPart;
					};
					Script: Script;
				};
			};
			wall: Folder & {
				wall: Part;
				Part: Part;
			};
			paths: Folder;
			stairs: Folder & {
				Union: UnionOperation;
				Staircase: Model;
				["New York Stairs"]: Model;
				MetalStairs: Model;
				["Stone Stairs"]: Model;
				["Double Stair set"]: Model;
				["Stairs | By - RealDogeIsPro"]: Model & {
					Stairs: Model;
					["Random Design"]: Model;
					["Stair Cover"]: Model & {
						Part: Part;
					};
					Rails: Model;
					Lights: Model;
				};
			};
			chimneys: Folder & {
				Chimney2: Model & {
					Brick2: Part & {
						Smoke: Smoke;
					};
				};
				["Factory chimney"]: Model;
				["Smoke Effect W/ Chimney"]: Model & {
					["Smoke Effect"]: Part & {
						Smoke: ParticleEmitter;
					};
					["Chimney (Delete If You Want)"]: UnionOperation;
				};
				Chimney: Model & {
					["Smoke Particle"]: Part & {
						["Smoke Particle"]: ParticleEmitter;
					};
				};
				["Locomotive Chimney V2"]: Model & {
					["Smoke Emitter"]: Part & {
						WeldConstraint: WeldConstraint;
						ParticleEmitter: ParticleEmitter;
					};
					Collider: Part;
				};
			};
		};
		decor: Folder & {
			cabinets: Folder & {
				["cyan cabinet"]: Model & {
					Union: UnionOperation;
					teapot: Model & {
						["default"]: MeshPart;
					};
					glass: UnionOperation;
				};
				FileCabinet: Model & {
					Drawer3: Model & {
						Handle: Part & {
							Mesh: SpecialMesh;
							Click: ClickDetector;
						};
						MainPart: Part;
						Open: BoolValue;
					};
					Drawer1: Model & {
						Handle: Part & {
							Mesh: SpecialMesh;
							Click: ClickDetector;
						};
						MainPart: Part;
						Open: BoolValue;
					};
					MainPart: Part;
					Drawer2: Model & {
						Handle: Part & {
							Mesh: SpecialMesh;
							Click: ClickDetector;
						};
						MainPart: Part;
						Open: BoolValue;
					};
				};
				["(slightly wide) Hanging Cabinet with Range Hood Exhaust Fan Layout"]: Model & {
					Display: Model & {
						Cabinet: Model;
					};
					Model: Model & {
						Cabinet: Model;
					};
				};
				["Bro Table"]: Model & {
					Union: UnionOperation;
				};
				FilingCabinetLarge: Model & {
					Colorable: Model & {
						Part: Part;
					};
				};
				["Display cabinet"]: Model & {
					Teapot: Part & {
						Mesh: SpecialMesh;
						["Black Slate"]: Decal;
					};
					["Big ink bottle - Black"]: Model & {
						["Meshes/ring"]: MeshPart;
						["cone0,6"]: MeshPart;
						Part: Part;
						Cylinder: MeshPart & {
							Ink: Decal;
						};
						["cone0,5"]: MeshPart;
					};
				};
				GothicCabinet_01_2k: Model & {
					GothicCabinet_01_door3: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					GothicCabinet_01_door4: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					GothicCabinet_01_cabinet: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					GothicCabinet_01_door1: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					GothicCabinet_01_door2: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
				};
				["Cabinet BookShelf v1"]: Model;
			};
			training: Folder & {
				["Boxing Bag"]: Model;
				["soccer goal"]: Model & {
					SoccerGoal: Model & {
						Frame: MeshPart & {
							Weld: Weld;
						};
						SideNetting: MeshPart;
						MidNetting: MeshPart & {
							Weld: Weld;
						};
					};
				};
				["Folding Chair"]: UnionOperation & {
					Seat: Seat & {
						Configuration: Configuration & {
							["Sitting Angle"]: NumberValue;
							["Head Angle"]: NumberValue;
							["Legs Angle"]: NumberValue;
							["Arms Angle"]: NumberValue;
							["Sitting Position"]: Vector3Value;
						};
					};
				};
				["weight scale"]: Model;
				ball: Part & {
					PathfindingModifier: PathfindingModifier;
				};
			};
			tables: Folder & {
				["Medieval Table"]: Model & {
					Surface: UnionOperation;
					Lower: UnionOperation;
				};
				["Cafeteria Table"]: Model & {
					Table: Model;
				};
				["Small Round Table"]: Model;
				["Dinner Table"]: Model & {
					Hitbox: Part;
				};
				["Modern Coffee Table"]: Model;
				["NealSavage's Map of Europe."]: Model & {
					["Crafted Wooden Table"]: Model;
				};
				["Table Dinner"]: Model & {
					Part: Part & {
						Decal: Decal;
					};
					Table: UnionOperation;
				};
				["White Table"]: Model;
				["tv table"]: Model;
				Union: UnionOperation;
				["Metal Table"]: Model & {
					Screws: Model;
					Frame: Model;
					LegParts: Model;
					Top: Model & {
						MainPart: Part;
					};
				};
				["Low Poly Modern Table"]: Model & {
					Union: UnionOperation;
				};
				FoldingTable: Model;
				["Table by Surfaceglue"]: Model & {
					Union: UnionOperation;
				};
				houseInteriorCoffeeTable: Model;
				["Wood Bench"]: Model;
				["Dining Table"]: Model;
			};
			lighting: Folder & {
				["Modern House Light"]: Model & {
					Bulb: Part & {
						SpotLight: SpotLight;
					};
					Body: UnionOperation;
				};
				["Factory Lights"]: Model & {
					Wires: Model;
					Bulb: Model;
					["Protective Case"]: Model;
				};
				["Ceiling Light"]: Model & {
					Frame: UnionOperation;
					["Light Part"]: UnionOperation & {
						PointLight: PointLight;
					};
				};
				["Industrial Light - No supports"]: Model & {
					["Lighting Element"]: Model & {
						["Lighting Element"]: Part & {
							SpotLight: SpotLight;
						};
					};
					["Light Cover"]: Model & {
						Glass: Part;
						["Light Cover"]: UnionOperation;
					};
				};
				["Doors Light"]: Model;
				["Traditional Japanese Latern"]: Model & {
					Lamp: Model & {
						Light: Part & {
							Weld: Weld;
							PointLight: PointLight;
						};
					};
					["Japanese Lamp"]: Model;
				};
				["Realistic Bunker Roof Light"]: Model & {
					Glass: UnionOperation;
					Metal: UnionOperation;
					Light: UnionOperation & {
						SurfaceLight: SurfaceLight;
					};
				};
			};
			appliances: Folder & {
				["Deep Fryer"]: Model & {
					["Fryer Wheels"]: Model & {
						["Fryer BL"]: Model;
						["Fryer FL"]: Model;
						["Fryer BR"]: Model;
						["Fryer FR"]: Model;
					};
					["Deep Fryer Control Panels"]: Model;
					["Deep Fryer Baskets"]: Model;
					["Fryer Oil"]: Model;
					["Fryer Base"]: Model & {
						["Fryer Hooks"]: Model;
						["Small Fryer Door"]: Model;
					};
				};
				Cooler: Model;
				["Fridge  Made By AlmostAtHome"]: Model;
				["Fogão"]: Model & {
					Suportes: UnionOperation;
					Porta: Model & {
						Vidro: Part;
						Puxador: UnionOperation;
					};
					["Paínel de botões"]: Part;
					Cor: UnionOperation;
					Bocas: Model & {
						Part: Part;
						Chapa: Part;
					};
				};
				["Mini-Fridge"]: Model & {
					Union: UnionOperation;
				};
				fryer: Model & {
					Union: UnionOperation;
				};
				Grill: Model;
			};
			plumbing: Folder & {
				Shower: Model & {
					Drain: Model & {
						Part: Part & {
							Mesh: CylinderMesh;
						};
					};
					Door: Model & {
						Part: Part;
						Interactive: Part & {
							ClickDetector: ClickDetector;
							Mesh: SpecialMesh;
						};
						PrimaryHinge: Part & {
							Mesh: CylinderMesh;
						};
					};
					ShowerFrame: Model & {
						Union: UnionOperation;
					};
					ShowerHead: Model & {
						Spout: Part & {
							Mesh: SpecialMesh;
							ParticleEmitter: ParticleEmitter;
						};
					};
					ColdOn: BoolValue;
					Faucet: Model & {
						WarmWaterSet: Model & {
							Interactive: Part & {
								ClickDetector: ClickDetector;
								Mesh: BlockMesh;
							};
						};
						ColdWaterSet: Model & {
							Interactive: Part & {
								ClickDetector: ClickDetector;
								Mesh: BlockMesh;
							};
						};
						HandleBase: Part;
						WaterOffSet: Model & {
							Interactive: Part & {
								ClickDetector: ClickDetector;
								Mesh: BlockMesh;
							};
						};
						HotWaterSet: Model & {
							Interactive: Part & {
								ClickDetector: ClickDetector;
								Mesh: BlockMesh;
							};
						};
						Handle: Model & {
							Base: Part;
							Union: UnionOperation;
						};
					};
					HotOn: BoolValue;
					Steam: Part & {
						WarmSteam: ParticleEmitter;
						HotSteam: ParticleEmitter;
					};
				};
				["Working Sink"]: Model & {
					["Sink System"]: Model & {
						Part: Part & {
							ParticleEmitter: ParticleEmitter;
						};
						Off: Part & {
							ClickDetector: ClickDetector;
						};
						On: Part & {
							ClickDetector: ClickDetector;
						};
						Faucet: Part & {
							ParticleEmitter: ParticleEmitter;
						};
					};
				};
				Toilet: Model & {
					WaterResetPos: Part & {
						SteamEmitter: ParticleEmitter;
					};
					Part: Part;
					Lid: UnionOperation;
					Water: Part & {
						SteamEmitter: ParticleEmitter;
						Mesh: CylinderMesh;
					};
					Interactive: Part & {
						Mesh: CylinderMesh;
						ClickDetector: ClickDetector;
					};
					Seat: Seat;
					Handle: Part & {
						Mesh: CylinderMesh;
					};
					ToiletUsed: BoolValue;
					ToiletSeat: UnionOperation;
					ToiletBowl: UnionOperation & {
						Weld: Weld;
					};
				};
				["Modern Shower"]: Model;
				["T-H178b"]: Model & {
					["Hottub noise"]: Model & {
						stop: Part & {
							X_icon: Decal;
							ClickDetector: ClickDetector;
						};
						play: Part & {
							["Wind Icon"]: Decal;
							ClickDetector: ClickDetector;
						};
					};
					["Smoke switch"]: Model & {
						Off: Part & {
							["Gui - X Icon"]: Decal;
							ClickDetector: ClickDetector;
						};
						On: Part & {
							bubbles: Decal;
							ClickDetector: ClickDetector;
						};
						SmokePart: Part & {
							Smoke: Smoke;
						};
					};
				};
				["School Bathroom Sinks"]: Model & {
					BathroomSinkSetup: Model & {
						BathroomCounter: Model;
					};
				};
				["UNGROUP TO RELEASE THUMBNAILCAMERA"]: Model & {
					["Commercial Bathroom Sink (3.25 x 4.4)"]: Model & {
						Plug: Model & {
							Plug: UnionOperation;
							Union: UnionOperation;
							Interactive: Part & {
								Mesh: CylinderMesh;
								ClickDetector: ClickDetector;
							};
							Shaft: Part & {
								Mesh: CylinderMesh;
							};
						};
						HotTapHandle: Model & {
							Cap: Part & {
								Mesh: SpecialMesh;
							};
							Part: Part & {
								Mesh: CylinderMesh;
							};
							Knob: UnionOperation;
							Interactive: Part & {
								ClickDetector: ClickDetector;
							};
						};
						ColdOn: BoolValue;
						FaucetHardware: Model & {
							Aerator: Model;
							Faucet: Model & {
								Base: UnionOperation;
								Faucet: UnionOperation;
							};
						};
						ColdTapHandle: Model & {
							Cap: Part & {
								Mesh: SpecialMesh;
							};
							Part: Part & {
								Mesh: CylinderMesh;
							};
							Knob: UnionOperation;
							Interactive: Part & {
								ClickDetector: ClickDetector;
							};
						};
						Water: Part & {
							Mesh: BlockMesh;
							SteamEmitter: ParticleEmitter;
						};
						Wood: Model;
						Faucet: UnionOperation & {
							ParticleEmitter: ParticleEmitter;
						};
						Splash: Part & {
							ParticleEmitter: ParticleEmitter;
						};
						Top: Model & {
							Basin: UnionOperation;
						};
						Frame: Model;
						HotOn: BoolValue;
						Plugged: BoolValue;
					};
				};
			};
			chairs: Folder & {
				Chair: Model & {
					Seat: Seat;
				};
				["Sofa Chair"]: MeshPart & {
					Seat: Seat;
				};
				["Wooden Chair"]: Model & {
					["Wodden Chair"]: UnionOperation;
					Seat: Seat;
				};
				["Office chair"]: Model;
				armchair: Model & {
					Seat: Seat & {
						sitanim: Animation;
					};
					MeshPart: MeshPart;
				};
				["Red Plastic Chair"]: Model & {
					Seat: Seat;
					["Red plastic chair"]: MeshPart;
				};
				["Broken Chair"]: Model & {
					["Chair legs"]: Model & {
						Union: UnionOperation;
					};
					["Seat Part"]: Model & {
						Wedge: WedgePart;
						Union: UnionOperation & {
							Seat: Seat & {
								sitanim: Animation;
							};
						};
					};
					["Chair Border (keeps it in shape)"]: Part;
					["Back of Chair"]: Model & {
						Union: UnionOperation;
					};
				};
				["Modern Office Chair"]: Model & {
					Seat: Seat;
					Model: Model & {
						Chair: Model & {
							RightHandle: Model & {
								Union: UnionOperation;
								Model: Model & {
									Union: UnionOperation;
								};
							};
							LeftHandle: Model;
						};
						Model: Model & {
							Spine: Model & {
								Cylinder: MeshPart;
							};
							["Legs/Feet"]: Model;
						};
					};
				};
				["Chair (THAI)"]: Model;
				["luxury chair"]: Model & {
					cushion_1: MeshPart;
					cushion_3: MeshPart;
					legs: MeshPart;
					neji: MeshPart;
					base: MeshPart;
					cushion_2: MeshPart;
				};
				["Office Chair"]: Model & {
					Part: Part & {
						Mesh: SpecialMesh;
						["This Chair was Made by Consend"]: IntValue;
					};
					Seat: Seat & {
						Weld: Weld;
					};
				};
				["Royal Chair"]: Model & {
					Seat: Seat;
				};
				ClassroomChairDesk: Model & {
					Frame: Model;
					Back: UnionOperation;
					Desk: UnionOperation;
				};
				["Rocking Chair"]: Model & {
					Model: Model & {
						Seat: Seat & {
							Mesh: BlockMesh;
						};
					};
				};
			};
			household: Folder & {
				["Laundry Basket"]: Model;
			};
			decoration: Folder & {
				soapbottle: Model & {
					Union: UnionOperation;
					straw: Part;
					handle: UnionOperation & {
						dispenser: Part & {
							ParticleEmitter: ParticleEmitter;
						};
						ClickDetector: ClickDetector;
					};
					soap: Part;
				};
				["Open Crate"]: Model & {
					Flask: Model;
					["Part d1 1"]: Part;
					EmptyBottles: Model & {
						main: MeshPart;
					};
					["Model d1 1"]: Model;
				};
				["Meshes/vase"]: MeshPart;
				Part: Part;
				MeshPart: MeshPart;
				Book: Model;
				["Roman Vase"]: MeshPart & {
					SurfaceAppearance: SurfaceAppearance;
				};
				SqueezePouch: MeshPart;
				["Cutting Board"]: UnionOperation & {
					Weld: Weld;
				};
				["Pink Soap"]: MeshPart;
				["Meshes/ceramic_vase_02_4k"]: MeshPart;
				["Meshes/Grass"]: MeshPart;
				Serum: MeshPart;
				Bottle4: MeshPart;
				ToiletPaperDispenser: Model & {
					ToiletPaperRoll: Model & {
						Part: Part & {
							Mesh: BlockMesh;
						};
					};
				};
				["Modern Decoration"]: Model & {
					Top: Part & {
						Weld: Weld;
					};
					Light: Part & {
						Weld: Weld;
					};
					Bottom: Part & {
						Weld: Weld;
					};
				};
				Plant: Model & {
					["Mall Bigleaves Plant 1 Medium"]: MeshPart;
					Model: Model & {
						Part: Part;
						Union: UnionOperation;
					};
				};
				["Potted Plant"]: Model & {
					Union: UnionOperation;
				};
				LowPolyCutlery: Model & {
					Knife: MeshPart;
					Spoon: MeshPart;
					Fork: MeshPart;
				};
				["Xlerator Hand Dryer"]: Model & {
					XLBody: UnionOperation;
					Platform: Part;
					Model: Model & {
						Infared: Part;
						Nozzle: Part;
					};
					LOGO: Model & {
						Plate: UnionOperation;
					};
					Z: UnionOperation;
				};
				plant: Model & {
					Union: UnionOperation;
				};
				Cloud: Model & {
					Mesh: MeshPart;
				};
				Sprayer: Model & {
					SprayCap: MeshPart;
					Spray: MeshPart;
				};
				["Plant in Vase"]: Model & {
					Part: Part;
					vaso: Model & {
						["Vase Plant"]: MeshPart;
					};
					Vase: MeshPart & {
						Weld: Weld;
					};
				};
				["Books #1"]: Model;
				Bottle3: MeshPart;
				["Office Plant"]: Model;
				["Nature Plant"]: Model & {
					MeshPart: MeshPart;
				};
			};
			electronics: Folder & {
				Mac: MeshPart;
				Old_Laptop: Model & {
					Union: UnionOperation;
					Power: Part & {
						Decal: Decal;
					};
					["Designed for XP, 2000,ME, 98"]: Part & {
						Decal: Decal;
					};
					Sticker: Part & {
						Decal: Decal;
					};
					Screen: Part & {
						Creen: Decal;
					};
					["Pentium 3"]: Part & {
						Decal: Decal;
					};
				};
				["old pc"]: Model & {
					["Meshes/tolly2_keyboard.003"]: MeshPart;
					["Meshes/tolly2_keyboard.001"]: MeshPart;
					["Meshes/tolly2_keyboard.005"]: MeshPart;
					["Meshes/tolly3_pc"]: MeshPart;
					["Meshes/tolly2_wire2"]: MeshPart;
					["Meshes/tolly2_mouse"]: MeshPart;
					["Meshes/tolly2_screen"]: MeshPart;
					["Meshes/tolly2_wire1"]: MeshPart;
					["Meshes/tolly2_keyboard.002"]: MeshPart;
					["Meshes/tolly2_keyboard.004"]: MeshPart;
					["Meshes/tolly2_keyboard"]: MeshPart;
				};
				Keyboard: Model;
				GamingMousePad: Model;
				GamingPC: Model & {
					ThreeDTextObject: Model & {
						uni00B0: MeshPart;
						uni0039: MeshPart;
						uni0030: MeshPart;
					};
				};
				Monitor: Model & {
					LCD: Part;
					["Monitor  Mesh"]: MeshPart;
				};
				KeyBoard: Model & {
					Part: Part;
					Frame: UnionOperation;
					Color: UnionOperation;
					Buttons: UnionOperation;
				};
				Mouse: Model & {
					Color: UnionOperation;
				};
				CRTMonitor: Model & {
					Button: MeshPart;
					Screen: MeshPart;
					Base: MeshPart;
					OnLight: Part;
				};
			};
			carpets: Folder;
			counters: Folder & {
				["Long Display Case"]: Model & {
					["Sliding Doors"]: Model & {
						["Right Door"]: Model & {
							["Door Panel"]: Part;
							Keylock: Model & {
								Part: UnionOperation;
								KeyHole: UnionOperation;
								Base: UnionOperation;
								Shadow: Part;
							};
						};
						["Door Tracks"]: Model & {
							["Lower Door Track"]: UnionOperation;
							["Upper Door Track"]: UnionOperation;
						};
						["Left Door"]: Model & {
							["Door Panel"]: Part;
							Keylock: Model & {
								Part: UnionOperation;
								KeyHole: UnionOperation;
								Base: UnionOperation;
								Shadow: Part;
							};
						};
					};
					Shelfing: Model & {
						["Mounting Frames"]: Model;
						["Glass Shelfing"]: Model;
					};
					Casing: Model & {
						["Platform Board"]: Model & {
							Frame: UnionOperation;
							["Corner Frames"]: UnionOperation;
							Base: UnionOperation;
							Board: Part;
						};
						Windows: Model;
					};
				};
				["Narrow Cabinet with Slide-Out/Storage/Waste"]: Model & {
					Drawer: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					["Slide-Out Storage/Waste"]: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					Cabinet: Model;
					Stainable: Part;
				};
				["Short Display Case"]: Model & {
					Door: Model & {
						["Door Panel"]: Part;
						Keylock: Model & {
							Part: UnionOperation;
							KeyHole: UnionOperation;
							Base: UnionOperation;
							Shadow: Part;
						};
					};
					Shelfing: Model & {
						["Mounting Frames"]: Model;
						Frame: UnionOperation;
						["Glass Shelfing"]: Model;
					};
					Casing: Model & {
						["Platform Board"]: Model & {
							Corners: UnionOperation;
							Frame: UnionOperation;
							Base: UnionOperation;
							Board: Part;
						};
						Windows: Model;
					};
				};
				["Corner Cabinet with Drawers"]: Model & {
					Cabinet: Model;
					Counter: Model;
				};
				["Standard Cabinet with Sink Pre-Cutout"]: Model & {
					Counter: Model;
					Cabinet: Model;
					["Decorative Panel"]: Model & {
						["Fake Handle"]: MeshPart;
						Colorable: UnionOperation;
						Beam: Part;
					};
				};
				["Standard Cabinet"]: Model & {
					Stainable: Part;
					Cabinet: Model;
					Drawer: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
				};
				counter: Model;
				["Corner Cabinet with Lazy Susan Cupboard"]: Model & {
					["Lazy Susan Cupboard"]: Model & {
						Colorable: UnionOperation & {
							ClickDetector: ClickDetector;
						};
						Hinge: Part & {
							Mesh: CylinderMesh;
						};
					};
					Cabinet: Model;
					Counter: Model;
				};
				["Narrow Cabinet with Right Hinged Door"]: Model & {
					Drawer: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					Cupboard: Model & {
						Colorable: UnionOperation;
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
						Hinge: Part & {
							Mesh: CylinderMesh;
						};
						PrimaryHinge: Part & {
							Mesh: CylinderMesh;
						};
					};
					Cabinet: Model;
					Stainable: Part;
				};
				["Corner Cabinet with Slide-Out/Storage/Waste"]: Model & {
					Drawer: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					["Slide-Out Storage/Waste"]: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					Cabinet: Model;
					Counter: Model;
				};
				["Standard Cabinet with Dishwasher Pre-Cutout"]: Model & {
					Stainable: Part;
					Cabinet: Model;
				};
				["Narrow Cabinet with Drawers Only"]: Model & {
					Stainable: Part;
					Cabinet: Model;
				};
				["Narrow Cabinet with Left Hinged Door"]: Model & {
					Drawer: Model & {
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
					};
					Cupboard: Model & {
						Colorable: UnionOperation;
						Interactive: MeshPart & {
							ClickDetector: ClickDetector;
						};
						Hinge: Part & {
							Mesh: CylinderMesh;
						};
						PrimaryHinge: Part & {
							Mesh: CylinderMesh;
						};
					};
					Stainable: Part;
					Cabinet: Model;
				};
				Model: Model;
				["Food counter"]: Model & {
					Wedge: WedgePart;
				};
				["Bar Counter"]: UnionOperation;
				["Standard Corner Display Case"]: Model & {
					Shelfing: Model & {
						["Mounting Frames"]: Model;
						["Glass Shelfing"]: Model;
					};
					Casing: Model & {
						["Platform Board"]: Model & {
							Corners: UnionOperation;
							Frame: UnionOperation;
							Base: UnionOperation;
							Board: UnionOperation;
						};
						Windows: Model;
					};
				};
				["Kitchen Furniture (Stove/Oven and Counter)"]: Model & {
					Salt: UnionOperation;
					Pepper: UnionOperation;
				};
			};
			curtains: Folder;
			comfort: Folder & {
				Sofa: Model & {
					["Pillow 4"]: MeshPart;
					Legs: MeshPart;
					["Pillow 5 "]: MeshPart;
					["Pillow 1 "]: MeshPart;
					Sheet: MeshPart;
					["Pillow 2"]: MeshPart;
					["Pillow 3"]: MeshPart;
					Base: MeshPart;
					Seats: Model;
				};
				["pink daisy glass sofa"]: Model;
				model_Sofa_House: Model;
				SofaChair: Model & {
					["Lounge Chair"]: MeshPart;
					["Pillow 2"]: MeshPart;
					["Blanket 1"]: MeshPart;
					["Pillow 1"]: MeshPart;
				};
				["Sofa (Диван)"]: Model & {
					Seat: Seat;
				};
				["Simple Sofa"]: Model & {
					Sofa: UnionOperation;
					AttachPos1: Part;
					Legs: UnionOperation;
					AttachPos2: Part;
					WallOrigin: Part;
				};
			};
			beds: Folder & {
				["Prison bed"]: MeshPart;
				["Bed horror game"]: Model & {
					["Meshes/subqueenbed_dirty"]: MeshPart;
				};
				["smart bed"]: Model & {
					Matress: Model & {
						Part: Part;
					};
					LayDownOnTouchParts: Model;
					BedSheets: Model;
					SheetDecorations: Model;
					Pillows: Model;
					BedFrame: Model;
				};
				["medical bed"]: Model & {
					Union: UnionOperation;
					Wedge: WedgePart;
				};
				["Asylum Bed"]: Model & {
					Pillow: MeshPart;
				};
				BunkBed: Model & {
					Base: Part & {
						Weld: Weld;
					};
				};
				["MADE BY MARYJANEHOLL4ND"]: Model;
				["hospital bed"]: Model & {
					Cloth: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
					Table: MeshPart & {
						SurfaceAppearance: SurfaceAppearance;
					};
				};
				["Futuristic Bed"]: Model & {
					Pillows: Model;
					["Neon parts"]: Model;
				};
				["Modern Bed"]: Model;
			};
		};
	};
	Animations: Folder & {
		Dashes: Folder;
		Blocks: Folder & {
			Block: Animation;
		};
		Run: Animation;
		m1s: Folder & {
			m1: Animation;
			m2: Animation;
		};
	};
	Sounds: Folder & {
		DestructionSounds: Folder & {
			Concrete: Folder & {
				["1"]: Sound;
			};
			Glass: Folder & {
				["1"]: Sound;
				["2"]: Sound;
			};
		};
		Base: Folder & {
			M1: Folder & {
				Hit: Sound;
				Swing: Sound;
			};
		};
	};
	SoundPart: Part & {
		Sound: Sound;
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						flamework: ModuleScript;
						utility: ModuleScript;
						reflect: ModuleScript;
						modding: ModuleScript;
						metadata: ModuleScript;
					};
				};
				components: Folder & {
					out: ModuleScript & {
						components: ModuleScript;
						baseComponent: ModuleScript;
						componentTracker: ModuleScript;
						utility: ModuleScript;
					};
				};
				networking: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						["function"]: Folder & {
							createFunctionSender: ModuleScript;
							createFunctionReceiver: ModuleScript;
							errors: ModuleScript;
						};
						events: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingEvent: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						functions: Folder & {
							createServerMethod: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createGenericHandler: ModuleScript;
							createClientMethod: ModuleScript;
						};
						util: Folder & {
							createSignalContainer: ModuleScript;
							getNamespaceConfig: ModuleScript;
							timeoutPromise: ModuleScript;
						};
						event: Folder & {
							createEvent: ModuleScript;
							createRemoteInstance: ModuleScript;
						};
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							createGuardMiddleware: ModuleScript;
							skip: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				remo: Folder & {
					src: ModuleScript & {
						getSender: ModuleScript;
						Promise: ModuleScript;
						builder: ModuleScript;
						constants: ModuleScript;
						utils: Folder & {
							compose: ModuleScript;
							testRemote: ModuleScript;
							mockRemotes: ModuleScript;
							unwrap: ModuleScript;
							instances: ModuleScript;
						};
						types: ModuleScript;
						server: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						container: Configuration;
						client: ModuleScript & {
							createRemote: ModuleScript;
							createAsyncRemote: ModuleScript;
						};
						middleware: Folder & {
							loggerMiddleware: ModuleScript;
							throttleMiddleware: ModuleScript;
						};
						createRemotes: ModuleScript;
					};
				};
				profileservice: Folder & {
					src: ModuleScript;
				};
				["object-utils"]: ModuleScript;
				["validate-tree"]: ModuleScript;
				testez: Folder & {
					src: ModuleScript & {
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
				};
				altmake: Folder & {
					out: ModuleScript;
				};
				iris: Folder & {
					out: ModuleScript & {
						widgetsTypes: Folder;
						config: ModuleScript;
						widgets: ModuleScript & {
							Plot: ModuleScript;
							Combo: ModuleScript;
							Root: ModuleScript;
							Text: ModuleScript;
							Window: ModuleScript;
							Tree: ModuleScript;
							Table: ModuleScript;
							Menu: ModuleScript;
							RadioButton: ModuleScript;
							Input: ModuleScript;
							Format: ModuleScript;
							Checkbox: ModuleScript;
							Button: ModuleScript;
						};
						IrisDeclaration: ModuleScript;
						demoWindow: ModuleScript;
						Internal: ModuleScript;
						API: ModuleScript;
						Types: ModuleScript;
					};
				};
				["flamework-binary-serializer"]: Folder & {
					out: ModuleScript & {
						serialization: Folder & {
							createSerializer: ModuleScript;
							createDeserializer: ModuleScript;
						};
						createBinarySerializer: ModuleScript;
						processSerializerData: ModuleScript;
						metadata: ModuleScript & {
							unions: ModuleScript;
							tuples: ModuleScript;
						};
						dataType: ModuleScript;
						constants: ModuleScript;
					};
				};
				charm: Folder & {
					src: ModuleScript & {
						mapped: ModuleScript;
						atom: ModuleScript;
						effect: ModuleScript;
						observe: ModuleScript;
						modules: Folder & {
							React: ModuleScript;
							Promise: ModuleScript;
							ReactRoblox: ModuleScript;
						};
						utils: Folder & {
							collect: ModuleScript;
							count: ModuleScript;
							setInterval: ModuleScript;
						};
						sync: ModuleScript & {
							validate: ModuleScript;
							client: ModuleScript;
							patch: ModuleScript;
							server: ModuleScript;
						};
						subscribe: ModuleScript;
						react: Folder & {
							useAtom: ModuleScript;
						};
						computed: ModuleScript;
						store: ModuleScript;
						types: ModuleScript;
					};
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				signal: ModuleScript;
				partcache: Folder & {
					out: ModuleScript & {
						Table: ModuleScript;
					};
				};
				wcs: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							charm: Folder & {
								out: ModuleScript & {
									mapped: ModuleScript;
									atom: ModuleScript;
									effect: ModuleScript;
									observe: ModuleScript;
									modules: Folder & {
										React: ModuleScript;
										Promise: ModuleScript;
										ReactRoblox: ModuleScript;
									};
									utils: Folder & {
										collect: ModuleScript;
										count: ModuleScript;
										setInterval: ModuleScript;
									};
									sync: ModuleScript & {
										validate: ModuleScript;
										client: ModuleScript;
										patch: ModuleScript;
										server: ModuleScript;
									};
									subscribe: ModuleScript;
									react: Folder & {
										useAtom: ModuleScript;
									};
									computed: ModuleScript;
									store: ModuleScript;
									types: ModuleScript;
								};
							};
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					LICENSE: StringValue;
					out: ModuleScript & {
						source: Folder & {
							holdableSkill: ModuleScript;
							statusEffect: ModuleScript;
							networking: ModuleScript;
							["arg-converter"]: ModuleScript;
							skill: ModuleScript;
							utility: ModuleScript;
							message: ModuleScript;
							character: ModuleScript;
							server: ModuleScript;
							serdes: ModuleScript;
							flags: ModuleScript;
							client: ModuleScript;
							actions: ModuleScript;
							moveset: ModuleScript;
						};
						symbol: ModuleScript;
						exports: ModuleScript;
						luaSpecific: Folder & {
							defineMessage: ModuleScript;
							registerStatusEffect: ModuleScript;
							registerHoldableSkill: ModuleScript;
							registerSkill: ModuleScript;
						};
						tests: Folder & {
							["statusEffect.spec"]: ModuleScript;
							["movesets.spec"]: ModuleScript;
							["skill.spec"]: ModuleScript;
							["client.spec"]: ModuleScript;
							["init.spec"]: ModuleScript;
							["character.spec"]: ModuleScript;
						};
					};
				};
				["topbar-plus"]: Folder & {
					out: ModuleScript & {
						VERSION: ModuleScript;
						Elements: Folder & {
							Notice: ModuleScript;
							Dropdown: ModuleScript;
							Menu: ModuleScript;
							Selection: ModuleScript;
							Caption: ModuleScript;
							Indicator: ModuleScript;
							Widget: ModuleScript;
							Container: ModuleScript;
						};
						Features: Folder & {
							Gamepad: ModuleScript;
							Themes: ModuleScript & {
								Classic: ModuleScript;
								Default: ModuleScript;
							};
							Overflow: ModuleScript;
						};
						Packages: Folder & {
							Janitor: ModuleScript;
							GoodSignal: ModuleScript;
						};
						Reference: ModuleScript;
						Attribute: ModuleScript;
						Utility: ModuleScript;
					};
				};
				goodsignal: Folder & {
					src: ModuleScript;
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				refx: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
							t: Folder & {
								lib: Folder & {
									ts: ModuleScript;
								};
							};
						};
					};
					out: ModuleScript & {
						baseEffect: ModuleScript;
						tests: Folder & {
							["creation.spec"]: ModuleScript;
							["serverProxy.spec"]: ModuleScript;
							["clientProxy.spec"]: ModuleScript;
						};
						configuration: ModuleScript;
						serverProxy: ModuleScript;
						modules: Folder & {
							remo: ModuleScript;
							t: ModuleScript;
							signal: ModuleScript;
						};
						utilities: Folder & {
							idGenerator: ModuleScript;
							getModule: ModuleScript;
							logger: ModuleScript;
						};
						wrapper: ModuleScript;
						remotes: ModuleScript;
						effectsMap: ModuleScript;
						client: ModuleScript & {
							entries: ModuleScript;
						};
						exports: ModuleScript;
						clientProxy: ModuleScript;
					};
				};
				dumpster: Folder & {
					Dumpster: ModuleScript;
				};
				janitor: Folder & {
					src: ModuleScript & {
						GetPromiseLibrary: ModuleScript;
						RbxScriptConnection: ModuleScript;
						Symbol: ModuleScript;
					};
				};
				services: ModuleScript;
				maid: Folder & {
					Maid: ModuleScript;
				};
				timer: Folder & {
					out: ModuleScript & {
						Interfaces: Folder;
						Implementation: Folder & {
							Timer: ModuleScript;
						};
						Data: Folder & {
							Enums: ModuleScript;
						};
					};
				};
				immut: Folder & {
					src: ModuleScript & {
						["original.spec"]: ModuleScript;
						["finishDraft.spec"]: ModuleScript;
						produce: ModuleScript;
						["makeDraftSafe.spec"]: ModuleScript;
						constants: ModuleScript;
						getClone: ModuleScript;
						table: ModuleScript;
						["isDraftable.spec"]: ModuleScript;
						original: ModuleScript;
						["getClone.spec"]: ModuleScript;
						isDraft: ModuleScript;
						makeDraftSafeReadOnly: ModuleScript;
						Draft: ModuleScript;
						finishDraft: ModuleScript;
						isDraftable: ModuleScript;
						["makeDraftSafeReadOnly.spec"]: ModuleScript;
						["produce.spec"]: ModuleScript;
						makeDraftSafe: ModuleScript;
						["init.spec"]: ModuleScript;
						["Draft.spec"]: ModuleScript;
						["isDraft.spec"]: ModuleScript;
						None: ModuleScript;
					};
				};
				cmdr: Folder & {
					Cmdr: ModuleScript & {
						CreateGui: ModuleScript;
						Shared: Folder & {
							Registry: ModuleScript;
							Dispatcher: ModuleScript;
							Command: ModuleScript;
							Argument: ModuleScript;
							Util: ModuleScript;
						};
						BuiltInTypes: Folder & {
							PlayerId: ModuleScript;
							URL: ModuleScript;
							Duration: ModuleScript;
							StoredKey: ModuleScript;
							Primitives: ModuleScript;
							Vector: ModuleScript;
							Command: ModuleScript;
							ConditionFunction: ModuleScript;
							JSON: ModuleScript;
							Type: ModuleScript;
							UserInput: ModuleScript;
							Player: ModuleScript;
							Color3: ModuleScript;
							Team: ModuleScript;
							BindableResource: ModuleScript;
							MathOperator: ModuleScript;
							BrickColor: ModuleScript;
						};
						BuiltInCommands: Folder & {
							help: ModuleScript;
							Admin: Folder & {
								gotoPlaceServer: ModuleScript;
								kill: ModuleScript;
								teleport: ModuleScript;
								kickServer: ModuleScript;
								killServer: ModuleScript;
								respawn: ModuleScript;
								respawnServer: ModuleScript;
								gotoPlace: ModuleScript;
								kick: ModuleScript;
								teleportServer: ModuleScript;
								announce: ModuleScript;
								announceServer: ModuleScript;
							};
							Debug: Folder & {
								getPlayerPlaceInstance: ModuleScript;
								version: ModuleScript;
								thru: ModuleScript;
								blink: ModuleScript;
								uptime: ModuleScript;
								position: ModuleScript;
								fetchServer: ModuleScript;
								uptimeServer: ModuleScript;
								getPlayerPlaceInstanceServer: ModuleScript;
								fetch: ModuleScript;
							};
							Utility: Folder & {
								rand: ModuleScript;
								jsonArrayEncode: ModuleScript;
								pick: ModuleScript;
								echo: ModuleScript;
								bind: ModuleScript;
								["var"]: ModuleScript;
								math: ModuleScript;
								alias: ModuleScript;
								clear: ModuleScript;
								varSetServer: ModuleScript;
								varServer: ModuleScript;
								jsonArrayDecode: ModuleScript;
								varSet: ModuleScript;
								unbind: ModuleScript;
								run: ModuleScript;
								runLines: ModuleScript;
								runif: ModuleScript;
								history: ModuleScript;
								hover: ModuleScript;
								replace: ModuleScript;
								len: ModuleScript;
								resolve: ModuleScript;
								convertTimestamp: ModuleScript;
								edit: ModuleScript;
							};
						};
						CmdrClient: ModuleScript & {
							CmdrInterface: ModuleScript & {
								AutoComplete: ModuleScript;
								Window: ModuleScript;
							};
							DefaultEventHandlers: ModuleScript;
						};
						Initialize: ModuleScript;
					};
					TS: ModuleScript;
				};
				["signals-tooling"]: Folder & {
					out: ModuleScript & {
						Interfaces: Folder;
						Implementation: Folder & {
							ConnectionManager: ModuleScript;
							Signal: ModuleScript;
						};
						Functions: Folder & {
							ListenOnce: ModuleScript;
							WaitForFirstSignal: ModuleScript;
						};
					};
				};
			};
		};
	};
}
