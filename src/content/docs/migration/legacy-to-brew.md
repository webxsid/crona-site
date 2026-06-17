---
title: Legacy to Homebrew
description: Move a legacy Crona install to Homebrew on macOS or Linux while keeping your local data intact.
order: 2.2
---

Use this guide when you are moving off the legacy Crona installer and want to keep Crona managed by Homebrew afterward.

> [!TIP]
> You need this guide if you installed Crona with the legacy curl installer, the legacy PowerShell installer, or any pre-Homebrew release.
> You do not need this guide if Crona is already installed through Homebrew.

## What Changes?

What changes:

- Crona becomes managed by Homebrew.
- Future updates happen through Homebrew.
- The Crona binary location may change.

What does not change:

- Your data.
- Your sessions.
- Your habits.
- Your momentum history.
- Your settings.

## What Happens To My Data?

Your Crona data is not modified by this migration.

The migration only changes how Crona is installed and updated.

Your local database, sessions, habits, notes, momentum history, and settings remain untouched.

## Migration Steps

If you are moving from the legacy install script, the migration flow is intentionally the same everywhere:

1. Stop every running Crona process before you touch the install.

   Close any open TUI windows, CLI sessions, and background Crona processes. If a process is still running after you close the app, stop it manually with your operating system tools.

2. Download the latest beta release installer script from GitHub Releases.

   - macOS and Linux: `install-crona-tui.sh`

3. Make the installer executable and run it, then overwrite the existing install when prompted.

   ```bash
   chmod +x install-crona-tui.sh
   ./install-crona-tui.sh
   ```

4. Run `crona backup`.

   ```bash
   crona backup
   ```

   The command prints the backup path. Keep that path for the restore step.

5. Remove the runtime directory.

   - macOS prod: `~/Library/Application Support/Crona`
   - macOS dev: `~/Library/Application Support/Crona Dev`
   - Linux prod: `${XDG_DATA_HOME:-~/.local/share}/crona`
   - Linux dev: `${XDG_DATA_HOME:-~/.local/share}/crona-dev`

   If you only use the production install, the prod path is the one to remove.

6. Remove the installed binaries.

   Typical locations:

   - `~/.local/bin/crona`
   - `~/.local/bin/crona-daemon`
   - `~/.local/bin/crona-tui`

   If you installed somewhere else, remove those copies too.

7. Install Homebrew.

   ```bash
   brew tap webxsid/tap
   brew install crona
   ```

   For the beta track, use:

   ```bash
   brew install crona-beta
   ```

8. Run `crona restore <path-to-backup>`.

   ```bash
   crona restore <path-to-backup>
   ```

   If the runtime directory already contains a `crona.db`, Crona prompts before overwriting it.

If you are on a beta build and want to stay on the beta track, install `crona-beta` instead of `crona`. The migration flow is the same either way.

## Verify the Migration

```bash
which crona
crona --version
```

You should now be using the Homebrew-managed Crona binary.

If the command resolves to an unexpected path, fix `PATH` before continuing.

## Updating Crona

```bash
brew upgrade crona
```

Once migration is complete, Crona updates are managed entirely through Homebrew.

## Troubleshooting

### Crona command not found

Check that Homebrew is installed and that its bin directory is in `PATH`.

### Homebrew reports a conflicting installation

Remove the old Crona binary before reinstalling with Homebrew.

### Old binary still appears first in PATH

Run `which crona` and remove or reorder the earlier binary location.

### Wrong version shown after migration

Run `brew upgrade crona`, then open a new shell and check `crona --version` again.

### Reinstalling Crona through Homebrew

Use `brew reinstall crona` if the package is already managed by Homebrew.

## Migration Complete

> [!NOTE]
> Migration complete.
> Your installation is now managed by Homebrew and future updates can be installed with `brew upgrade crona`.
