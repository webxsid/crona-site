---
title: Migration
description: Switch from a legacy Crona install to Homebrew, Go source installs, or Winget without losing your database.
order: 2.1
---

Use this guide when you are switching Crona install methods or release channels.

If you are moving from the legacy install script, the migration flow is intentionally the same everywhere:

1. Stop every running Crona process.
2. Download the latest beta release installer script from GitHub Releases.
3. Make the installer executable and run it, then overwrite the existing install when prompted.
4. Run `crona backup`.
5. Remove the runtime directory.
6. Remove the installed binaries.
7. Install the destination package-manager version.
8. Run `crona restore <path-to-backup>`.

Use the destination-specific guides below for exact commands and paths:

- [Legacy to Homebrew](/docs/migration/legacy-to-brew/)
- [Legacy to Go](/docs/migration/legacy-to-go/)
- [Legacy to Winget](/docs/migration/legacy-to-winget/)

If you are not sure which destination to choose, keep the package manager you want to use long term:

- Homebrew on macOS and Linux
- Go source installs when you want to keep using `go install`
- Winget on Windows
