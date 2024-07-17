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
		Modules: Folder & {
			Logger: ModuleScript;
			TimedConnection: ModuleScript;
			SoundPlayer: ModuleScript;
		};
		Movesets: Folder & {
			Base: ModuleScript;
			Roach: Folder & {
				RoachAwakened: ModuleScript;
				RoachBase: ModuleScript;
			};
		};
		network: ModuleScript;
		StatusEffects: Folder & {
			Stun: ModuleScript;
			Attacking: ModuleScript;
			Ragdolled: ModuleScript;
			Blocking: ModuleScript;
		};
		Skills: Folder & {
			Base: Folder & {
				m1: ModuleScript;
			};
			Roach: Folder & {
				RoachAwakened: Folder;
				RoachBase: Folder;
			};
		};
		Luau: Folder & {
			VoxBreaker: ModuleScript;
			VoxelDestruct: ModuleScript;
			Hitbox: ModuleScript;
		};
		Constants: ModuleScript;
	};
	Animations: Folder & {
		Dashes: Folder;
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
