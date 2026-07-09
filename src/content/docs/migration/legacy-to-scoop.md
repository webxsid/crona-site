---
title: "Legacy to Scoop"
description: "Move a legacy Crona install to Scoop on Windows."
order: 2.4
---

Use this guide when you are moving off the legacy install script and want Crona managed by Scoop on Windows.

Stop Crona, run the beta installer once, back up the database, clear the old runtime, remove the old binaries, install Scoop, install Crona from the Scoop bucket, and restore the backup.

## 1. Stop Crona

Close every Crona client and stop the local engine:

```powershell
crona daemon stop
```

## 2. Refresh the legacy install one last time

Download `install-crona-tui.ps1` from the latest beta release page on GitHub Releases and run it once so the legacy layout is normalized before migration.

```powershell
$version = "<latest-beta-version>"
Invoke-WebRequest "https://github.com/webxsid/crona/releases/download/$version/install-crona-tui.ps1" -OutFile "$env:TEMP\install-crona-tui.ps1"
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\install-crona-tui.ps1"
```

## 3. Back up the database

Create a backup before removing anything:

```powershell
crona backup
```

Keep the generated path close. The restore step uses it directly.

## 4. Remove runtime data if you want a clean switch

The default runtime directory is:

```text
%LocalAppData%\Crona
```

Remove it only after the backup is complete.

## 5. Remove the old binaries

Legacy installs typically place binaries under:

```text
%LocalAppData%\Programs\Crona\bin
```

Remove the old binaries from that directory if they are still present.

## 6. Install Scoop and Crona

Install Scoop if it is not already present, then add the Crona bucket and install the stable manifest:

```powershell
scoop bucket add webxsid https://github.com/webxsid/scoop-bucket
scoop install crona
```

Use the beta channel instead when the final target should stay on prerelease builds:

```powershell
scoop bucket add webxsid https://github.com/webxsid/scoop-bucket
scoop install crona-beta
```

## 7. Restore the backup

Restore the saved database into the new install:

```powershell
crona restore <path-to-backup>
```

## After Migration

- Scoop owns install, update, and uninstall.
- Stable updates use `scoop update crona`.
- Beta updates use `scoop update crona-beta`.
- GitHub Releases remain the canonical binary source.
