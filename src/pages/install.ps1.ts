import type { APIRoute } from "astro";

const repo = "webxsid/crona";
const installerUrl = `https://github.com/${repo}/releases/latest/download/install-crona-tui.ps1`;

const script = `
$ErrorActionPreference = "Stop"

$InstallerUrl = "${installerUrl}"
$TempDir = Join-Path $env:TEMP "crona-install"
$InstallerPath = Join-Path $TempDir "install-crona-tui.ps1"

if (-not (Test-Path $TempDir)) {
  New-Item -ItemType Directory -Path $TempDir | Out-Null
}

if (-not (Get-Command Invoke-WebRequest -ErrorAction SilentlyContinue)) {
  throw "Required command not found: Invoke-WebRequest"
}

Write-Host "Downloading Crona installer from $InstallerUrl"
Invoke-WebRequest $InstallerUrl -OutFile $InstallerPath
& powershell -NoProfile -ExecutionPolicy Bypass -File $InstallerPath
`;

export const GET: APIRoute = () =>
  new Response(script.trimStart(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
