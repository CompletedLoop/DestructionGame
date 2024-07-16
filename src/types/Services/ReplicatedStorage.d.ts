interface ReplicatedStorage extends Instance {
	DestructionSounds: Folder & {
		Normal: Folder & {
			["Rock breaking SFX"]: Sound;
		};
		Glass: Folder & {
			["glass shatter"]: Sound;
			["Glass Shatter SFX"]: Sound;
		};
	};
	TS: Folder & {
		Movesets: Folder & {
			Saitama: ModuleScript;
		};
		network: ModuleScript;
		Skills: Folder & {
			m1: ModuleScript;
		};
		StatusEffects: Folder & {
			Stun: ModuleScript;
		};
		VoxBreaker: ModuleScript;
		components: Folder;
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
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				signal: ModuleScript;
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
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
				["compiler-types"]: Folder & {
					types: Folder;
				};
				charm: ModuleScript & {
					mapped: ModuleScript;
					computed: ModuleScript;
					effect: ModuleScript;
					observe: ModuleScript;
					modules: Folder & {
						React: ModuleScript;
						Promise: ModuleScript;
						ReactRoblox: ModuleScript;
					};
					atom: ModuleScript;
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
					utils: Folder & {
						collect: ModuleScript;
						count: ModuleScript;
						setInterval: ModuleScript;
					};
					store: ModuleScript;
					types: ModuleScript;
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
				wcs: Folder & {
					node_modules: Folder & {
						["@rbxts"]: Folder & {
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
							utility: ModuleScript;
							["arg-converter"]: ModuleScript;
							skill: ModuleScript;
							server: ModuleScript;
							message: ModuleScript;
							character: ModuleScript;
							["immediate-syncer"]: ModuleScript & {
								["set-interval"]: ModuleScript;
								client: ModuleScript;
								patch: ModuleScript;
								server: ModuleScript;
							};
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
	Modules: Folder & {
		VoxBreaker: ModuleScript;
		Icon: ModuleScript & {
			Packages: Folder & {
				Janitor: ModuleScript;
				GoodSignal: ModuleScript;
			};
			Utility: ModuleScript;
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
			VERSION: ModuleScript;
			Reference: ModuleScript;
			Attribute: ModuleScript;
			PackageLink: PackageLink;
		};
		Signal: ModuleScript;
	};
	COMMUNICATION: Folder & {
		m1: RemoteFunction;
		m1_hit: RemoteEvent;
		make_destruction: RemoteEvent;
		click: RemoteEvent;
	};
}
