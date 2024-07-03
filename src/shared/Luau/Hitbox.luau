local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

--Hitbox Utilizing Roblox's Spatial Query Methods B)

local GoodSignal = require(ReplicatedStorage.Modules.GoodSignal)

local Hitbox = {}
Hitbox.__index = Hitbox

function Hitbox.new(Parts)
    local self = setmetatable({
        -- Public

        Parts = Parts,
        OverlapParams = nil,
        Signal = GoodSignal.new(),
        PlayerSignal = GoodSignal.new(),
        FrameRate = "Unlimited",

        -- Private

        _PartCache = {},
        _Heartbeat = nil,
    }, Hitbox)

    return self
end

function Hitbox:_Identify(Part, Class)
    return Part.Parent ~= workspace and Part.Parent.ClassName or Part.ClassName
end

function Hitbox:_Delay()
    return self.FrameRate ~= "Unlimited" and os.clock() - self.t < 1 / self.FrameRate
end

function Hitbox:_Enabled()
    for _, Part in self.Parts do
        local PartsInPart = workspace:GetPartsInPart(Part, self.OverlapParams)

        for _, FoundPart in PartsInPart do
            -- Get Parent Of Part
            local Parent = FoundPart.Parent ~= workspace and FoundPart.Parent or FoundPart

            -- Dont Fire If Its In The Cache
            if table.find(self._PartCache, Parent) then continue end

            self.Signal:Fire(FoundPart)

            if Hitbox:_Identify(FoundPart, "Model") then
                local Humanoid = Parent:FindFirstChildOfClass("Humanoid")

                if not Humanoid then continue end

                -- Its A Character

                self.PlayerSignal:Fire(Parent, FoundPart)
            end

            table.insert(self._PartCache, Parent)
        end
    end
end

function Hitbox:Enable(Time)
    assert((self._Heartbeat and not self._Heartbeat.Connected) or (not self._Heartbeat and true), "Hitbox Is Already Enabled")

    self.t = os.clock()

    self._Heartbeat = RunService.Heartbeat:Connect(function()
        if self:_Delay() then return end

        self.t = os.clock()

        self:_Enabled()
    end)

    task.delay(Time, function()
        self:Disable()
    end)
end

function Hitbox:Disable()
    if not self._Heartbeat.Connected then return end

    self._Heartbeat:Disconnect()
end

return Hitbox