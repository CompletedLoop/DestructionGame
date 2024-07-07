local RunService = game:GetService("RunService")

--Hitbox Utilizing Roblox's Spatial Query Methods

local GoodSignal = require(script.GoodSignal)

local Hitbox = {}
Hitbox.__index = Hitbox

function Hitbox.new(Parts)
    local self = setmetatable({
        -- Public

        Parts = Parts,
        OverlapParams = nil,
        PartEntered = GoodSignal.new(),
        PlayerEntered = GoodSignal.new(),
        Completed = GoodSignal.new(),
        FrameRate = "Unlimited",
        Options = nil, -- "Once", "Wait"

        -- Private

        _PartCache = {},
        _Heartbeat = nil,
    }, Hitbox)

    return self
end

function Hitbox:_Identify(Part, Class)
    return Part.Parent ~= workspace and Part.Parent.ClassName == Class or Part.ClassName == Class
end

function Hitbox:_Delay()
    return self.FrameRate ~= "Unlimited" and os.clock() - self._t < 1 / self.FrameRate
end

function Hitbox:_Enabled()
    for _, Part in self.Parts do
        local PartsInPart = workspace:GetPartsInPart(Part, self.OverlapParams)

        for _, FoundPart in PartsInPart do
            -- Get Parent Of Part
            local Parent = FoundPart.Parent ~= workspace and FoundPart.Parent or FoundPart

            -- Dont Fire If Its In The Cache
            if self._PartCache[Parent] then continue end

            self.PartEntered:Fire(FoundPart)

            if Hitbox:_Identify(FoundPart, "Model") then
                local Humanoid = Parent:FindFirstChildOfClass("Humanoid")

                if not Humanoid then continue end

                -- Its A Character

                self.PlayerEntered:Fire(Parent, FoundPart)
            end

            -- This Allows For Indexing Instead Of A Find Search
            self._PartCache[Parent] = true
        end

        -- Check Options

        if (self.Options == "Once" or self.Options == "Wait") and #PartsInPart > 0 then
            self:Disable()
            return
        end
    end
end

function Hitbox:Enable(Time)
    assert((self._Heartbeat and not self._Heartbeat.Connected) or (not self._Heartbeat and true), "Hitbox Is Already Enabled")

    self._CurrentThread = coroutine.running()

    self._t = os.clock()

    self._Heartbeat = RunService.Heartbeat:Connect(function()
        if self:_Delay() then return end
        
        self._t = os.clock()

        self:_Enabled()
    end)

    task.delay(Time, function()
        self:Disable()
        self.Completed:Fire()
    end)

    if self.Options == "Wait" then
        return coroutine.yield()
    end
end

function Hitbox:Disable()
    if not self._Heartbeat.Connected then return end

    self._Heartbeat:Disconnect()

    -- Clear Part Cache

    self._PartCache = {}

    if self.Options == "Wait" then
        task.spawn(self._CurrentThread)
    end
end

function Hitbox:Destroy()
    for key in self do
        self[key] = nil
    end

    setmetatable(self, nil)
end

return Hitbox