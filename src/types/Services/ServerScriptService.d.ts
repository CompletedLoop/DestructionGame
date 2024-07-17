interface ServerScriptService extends Instance {
	TS: Folder & {
		runtime: Script;
		Commands: Folder & {
			ClearVoxels: ModuleScript;
			ClearVoxelsServer: ModuleScript;
			VizualizeServer: ModuleScript;
			Vizualize: ModuleScript;
		};
		network: ModuleScript;
		Services: Folder & {
			BoomToolServer: ModuleScript;
			DataService: ModuleScript;
			PlayerService: ModuleScript;
			VoxelService: ModuleScript;
		};
		Scripts: Folder & {
			RegionScript: Script;
		};
		Components: Folder & {
			CharacterServer: ModuleScript;
		};
		charmtest: ModuleScript;
	};
}
