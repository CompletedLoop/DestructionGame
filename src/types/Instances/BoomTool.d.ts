export type BoomTool = Tool & {
	RadiusGui: ScreenGui & {
		input: TextBox & {
			UICorner: UICorner;
		};
	};
	BoomHandler: LocalScript;
}
