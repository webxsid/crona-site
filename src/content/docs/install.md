---
title: Install
description: Install Crona with managed package paths, understand the runtime layout, and use the migration guides when you need to switch methods.
order: 2
---

Crona ships installable binaries. You do not need Go installed to use the released builds.

Installed binaries:

- `crona`
- `crona-daemon`
- `crona-tui`

`crona-daemon` is the background local engine binary. Public docs usually call it the daemon or local engine.

## Release Artifacts

Release assets ship as:

- one platform bundle zip containing all three binaries
- one shared `crona-assets-<version>.tar.gz` archive for legacy script installers and release compatibility
- installer scripts for Unix-like systems and Windows

> [!IMPORTANT]
> Crona 1.6.x shows an install-script deprecation banner in the Updates view.
> GitHub install scripts are fallback paths, not the preferred install method.
> Use a managed installer when possible, and use [Migration](/docs/migration/) if you need to switch install methods or release channels.

## Managed Installs

### Homebrew

Prefer Homebrew on macOS and Linux:

```bash
brew tap webxsid/tap
brew install crona
```

Or:

```bash
brew install webxsid/tap/crona
```

Prerelease beta tags publish a separate opt-in formula:

```bash
brew install webxsid/tap/crona-beta
```

Update commands:

```bash
brew upgrade crona
brew upgrade crona-beta
```

### Winget

Prefer Winget on Windows:

```powershell
winget install --id Webxsid.Crona -e
```

Winget installs the Crona bundle and exposes `crona`, `crona-daemon`, and `crona-tui`.

Update command:

```powershell
winget upgrade --id Webxsid.Crona -e
```

### Source Install

If you want to keep installing from source, use:

```bash
go install github.com/webxsid/crona/...@latest
```

Make sure your `GOBIN` or `PATH` includes the directory where Go installs binaries.

## Legacy Script Fallback

If you still need the legacy installer, use the website fallback entrypoints:

```bash
curl -fsSL https://crona.work/install.sh | sh
```

```powershell
Invoke-WebRequest "https://crona.work/install.ps1" -OutFile "$env:TEMP\crona-install.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\crona-install.ps1"
```

These scripts remain available for compatibility, but Crona now treats them as fallback paths.

If you are moving from a legacy install or switching channels, use the migration guide:

- [Migration](/docs/migration/)
- [Legacy to Homebrew](/docs/migration/legacy-to-brew/)
- [Legacy to Go](/docs/migration/legacy-to-go/)
- [Legacy to Winget](/docs/migration/legacy-to-winget/)

## Manual Install

Download your platform bundle zip from the release page and extract `crona`, `crona-daemon`, and `crona-tui`.

The embedded templates and alert assets ship inside the binaries, so the shared assets archive is only needed for the legacy script installers.

The TUI starts the local engine automatically when needed. `crona-tui` remains available as a compatibility entrypoint.

## Runtime Layout

### Runtime Data

Default runtime directories:

- macOS prod: `~/Library/Application Support/Crona`
- macOS dev: `~/Library/Application Support/Crona Dev`
- Linux prod: `${XDG_DATA_HOME:-~/.local/share}/crona`
- Linux dev: `${XDG_DATA_HOME:-~/.local/share}/crona-dev`
- Windows prod: `%LocalAppData%\Crona`
- Windows dev: `%LocalAppData%\Crona Dev`

Override the runtime directory with `CRONA_HOME`.

On macOS and Linux, legacy `~/.crona` and `~/.crona-dev` directories migrate automatically on install or first local engine start unless `CRONA_HOME` is set.

### Binary Install Location

Default binary install directories:

- macOS/Linux: `~/.local/bin`
- Windows: `%LocalAppData%\Programs\Crona\bin`

Override the binary install directory with `CRONA_INSTALL_DIR`.

## Updates

Users can switch release tracks from the TUI settings.
The default track follows normal releases, and testers can opt into upcoming builds.

Use the in-app `Updates` view to check release status, read notes, and get the right migration or package-manager command.

- Homebrew installs never self-update from inside Crona.
- Winget installs never self-update from inside Crona.
- The TUI shows the source-aware update command for the current install type, but does not execute it.
- When Crona asks you to migrate, back up with `crona backup`, uninstall with your package manager, remove runtime data if you want a clean reset, then reinstall and restore with `crona restore <path>`.
- The migration guide at [Migration](/docs/migration/) is the canonical handoff for switching install methods or release channels.
- Script installs rerun the install script.
- Winget installs use `winget upgrade --id Webxsid.Crona -e`.
- Source installs show the `go install` command.
- Manual installs and unknown installs are directed to the GitHub release page.

## Notifications And Alerts

Alerts are emitted by the local engine. The TUI configures and tests them, but the background engine is the process that decides when to fire:

- timer boundary alerts
- focus inactivity alerts when an active work session runs too long without TUI activity
- update-available alerts
- support/export completion alerts
- scheduled reminders such as nightly check-in reminders

Scheduled reminders and inactivity alerts are local-only and only fire while the local engine is running.

Supported notification helpers by OS:

- macOS:
  - notifications: `terminal-notifier`, fallback `osascript`
  - sound playback: `afplay`
- Linux:
  - notifications: `notify-send`
  - sound playback: `paplay`, `aplay`, `play`, fallback `canberra-gtk-play`
- Windows:
  - notifications: `BurntToast` when installed, fallback PowerShell toast delivery
  - sound playback: PowerShell `SoundPlayer`

The `Alerts` view shows the active backend and whether subtitle, urgency, icon, and bundled sound support are currently available on the running machine.

Bundled alert sounds include royalty-free MP3 assets by Universfield and Pixabay:

- Sound effect by [Universfield](https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=494248) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=494248)

## PDF Rendering

Markdown export works without extra tooling. PDF export requires local renderer support.

Current renderer expectations:

- Daily and weekly narrative PDF exports require `weasyprint`
- Repo, stream, and issue-rollup PDF exports require `pandoc` plus one supported PDF engine:
  - `tectonic`
  - `weasyprint`
  - `wkhtmltopdf`
  - `xelatex`
  - `pdflatex`

Renderer availability is detected at runtime and surfaced in the TUI `Config` view and through `export.assets.get`.

If the required renderer chain is missing, PDF export remains unavailable but markdown export still works.
