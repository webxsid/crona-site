---
title: Install
description: Get Crona installed, verified, and running quickly on macOS, Linux, or Windows.
order: 2
---

Crona ships installable binaries. Start with Homebrew, then verify, launch, and decide whether you need any of the optional setup below.

## Contents

- [Install Crona](#homebrew)
- [Verify Installation](#verify-installation)
- [Launch Crona](#launch-crona)
- [Updating Crona](#updates)
- [Source Installation](#source-install)
- [Windows Support](#winget)
- [Legacy Installation](#legacy)
- [Notifications](#notifications)
- [PDF Export Support](#pdf-export-support)
- [Shell Integration](#shell-integration)
- [Runtime Layout](#runtime-layout)

<a id="homebrew"></a>
## Install Crona

Recommended for most macOS and Linux users.

```bash
brew install webxsid/tap/crona
```

This installs the latest stable release.

<a id="verify-installation"></a>
## Verify Installation

```bash
crona --version
```

Expected output:

```text
Crona v1.6.0
```

This confirms that Crona is on your `PATH` and that the install completed successfully.

<a id="launch-crona"></a>
## Launch Crona

```bash
crona
```

This launches the terminal interface. First launch will guide you through onboarding.

<a id="updates"></a>
## Updating Crona

```bash
brew upgrade crona
```

If you installed with Homebrew, use this to move to the next stable release.

## Alternative Installation Methods

<a id="source-install"></a>
### Source Installation

For contributors, package maintainers, and advanced users who prefer building directly from source.

```bash
go install github.com/webxsid/crona/...@latest
```

Make sure your `GOBIN` or `PATH` includes the directory where Go installs binaries.

Update by rerunning the same command.

<a id="winget"></a>
### Windows Support

Native Winget support is currently being finalized.

For Windows today, use the legacy installer section below.

<a id="legacy"></a>
### Legacy Installation

Legacy installers are retained for users upgrading from older Crona versions. New installations should use Homebrew.

If you still need the legacy installer, use the pinned `v1.6.0` release assets:

```bash
curl -fsSL https://github.com/webxsid/crona/releases/download/v1.6.0/install-crona-tui.sh | sh
```

```powershell
Invoke-WebRequest "https://github.com/webxsid/crona/releases/download/v1.6.0/install-crona-tui.ps1" -OutFile "$env:TEMP\crona-install.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\crona-install.ps1"
```

Already using the legacy installer? [Migration Guide](/docs/migration/)

## Optional Enhancements

These improve the Crona experience but are not required to get started.

<a id="notifications"></a>
### Notifications

Crona uses platform notification helpers for timer boundaries, reminders, updates, and export completion. If the helper is missing, Crona still works, but delivery falls back to the capabilities available on that machine.

Supported helpers:

| Platform | Notifications | Sound |
| --- | --- | --- |
| macOS | `terminal-notifier`, fallback `osascript` | `afplay` |
| Linux | `notify-send` | `paplay`, `aplay`, `play`, fallback `canberra-gtk-play` |
| Windows | `BurntToast` or PowerShell toast delivery | PowerShell `SoundPlayer` |

Read [Alerts and Reminders](/docs/alerts-and-reminders/) for the full alert model and the current local-engine behavior.

<a id="pdf-export-support"></a>
### PDF Export Support

Markdown export works without extra tooling. PDF export needs renderer support on your machine.

Required tools:

- Daily and weekly narrative PDFs require `weasyprint`
- Repo, stream, and issue-rollup PDFs require `pandoc` plus one supported PDF engine:
  - `tectonic`
  - `weasyprint`
  - `wkhtmltopdf`
  - `xelatex`
  - `pdflatex`

If the renderer chain is missing, Crona still exports markdown, but PDF export stays unavailable.

Read [Exports and Reports](/docs/exports-and-reports/) for the output types and when PDF is the right fit.

<a id="shell-integration"></a>
### Shell Integration

Generate completions with:

```bash
crona completion zsh
crona completion bash
crona completion fish
```

Wire the generated script into your shell setup however you normally manage completions.

Read [CLI and Local Engine](/docs/cli-and-local-engine/) for the public CLI surface and the completion commands in context.

## Reference Details

<a id="release-artifacts"></a>
### Release Artifacts

Release assets ship as:

- one platform bundle zip containing all three binaries
- one shared `crona-assets-<version>.tar.gz` archive for legacy script installers and release compatibility
- installer scripts for Unix-like systems and Windows

> [!IMPORTANT]
> Crona 1.6.x shows an install-script deprecation banner in the Updates view.
> GitHub install scripts are fallback paths, not the preferred install method.
> Use a managed installer when possible, and use [Migration](/docs/migration/) if you need to switch install methods or release channels.

<a id="manual-install"></a>
### Manual Install

Download your platform bundle zip from the release page and extract `crona`, `crona-daemon`, and `crona-tui`.

The TUI starts the local engine automatically when needed. `crona-tui` remains available as a compatibility entrypoint.

### Updates

Users can switch release tracks from the TUI settings.

Use the in-app `Updates` view to check release status, read notes, and get the right migration or package-manager command.

- Homebrew installs never self-update from inside Crona.
- Winget installs never self-update from inside Crona.
- The TUI shows the source-aware update command for the current install type, but does not execute it.
- The migration guide at [Migration](/docs/migration/) is the canonical handoff for switching install methods or release channels.
- Script installs rerun the install script.
- Winget installs use `winget upgrade --id Webxsid.Crona -e`.
- Source installs show the `go install` command.
- Manual installs and unknown installs are directed to the GitHub release page.

<a id="runtime-layout"></a>
### Runtime Layout

#### Runtime Data

Default runtime directories:

- macOS prod: `~/Library/Application Support/Crona`
- macOS dev: `~/Library/Application Support/Crona Dev`
- Linux prod: `${XDG_DATA_HOME:-~/.local/share}/crona`
- Linux dev: `${XDG_DATA_HOME:-~/.local/share}/crona-dev`
- Windows prod: `%LocalAppData%\Crona`
- Windows dev: `%LocalAppData%\Crona Dev`

Override the runtime directory with `CRONA_HOME`.

On macOS and Linux, legacy `~/.crona` and `~/.crona-dev` directories migrate automatically on install or first local engine start unless `CRONA_HOME` is set.

#### Binary Install Location

Default binary install directories:

- macOS/Linux: `~/.local/bin`
- Windows: `%LocalAppData%\Programs\Crona\bin`

Override the binary install directory with `CRONA_INSTALL_DIR`.
