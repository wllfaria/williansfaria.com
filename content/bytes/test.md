+++
title = 'Test byutes'
date = 2023-12-30T17:01:29-03:00
draft = false
description = "literally testing"
author = "Willians Faria"
hiden = true
+++

this is literally a iausfhuisdgtest

```lua
-- lol imagine using lua
local GroveConstants = require("grove.constants")
local GroveState = require("grove.state")

---@class GroveFileSystem
local GroveFileSystem = {}
function GroveFileSystem:load_sessions()
    local file_path = vim.fn.stdpath("data") .. "/grove_history.json"
    if vim.fn.filereadable(file_path) == 0 then
        GroveFileSystem:_create_sessions_dir()
    end
    local file = io.open(file_path, "r")
    if file then
        local content = file:read("*a")
        file:close()
        GroveState.projects = vim.fn.json_decode(content)
    end
end

function GroveFileSystem:_create_sessions_dir()
    local file_path = vim.fn.stdpath("data") .. "/grove_history.json"
    if vim.fn.filereadable(file_path) == 0 then
        local file = io.open(file_path, "w")
        if file then
            file:write("{}")
            file:close()
        end
    end
end

---@return GroveProject?
function GroveFileSystem:get_current_project()
    local project_name = GroveFileSystem:get_project_name()
    return GroveState.projects[project_name]
end

---@param project_path string
---@param file_path string
---
---@return string
function GroveFileSystem:get_relative_path(project_path, file_path)
    local relative_path = file_path:gsub(project_path, "")
    print(relative_path)
    return relative_path
end

function GroveFileSystem:write_projects()
    local file_path = vim.fn.stdpath("data") .. "/grove_history.json"
    local file = io.open(file_path, "w")
    if file then
        local content = vim.fn.json_encode(GroveState.projects)
        file:write(content)
        file:close()
    end
end

---@return string
function GroveFileSystem:get_project_name()
    local cwd = vim.fn.getcwd()
    if not cwd then
        return ""
    end
    ---@type string[]
    local segments = {}
    local separator = package.config:sub(1, 1)
    for segment in cwd:gmatch("[^" .. separator .. "]+") do
        segments[#segments + 1] = segment
    end
    return segments[#segments]
end

return GroveFileSystem
```
