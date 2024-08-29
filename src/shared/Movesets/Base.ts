import { CreateMoveset } from "@rbxts/wcs";
import block from "shared/Skills/Base/block";
import dash from "shared/Skills/Base/dash";
import m1 from "shared/Skills/Base/m1";

export const Base = CreateMoveset("Base", [ m1, dash, block ]);
