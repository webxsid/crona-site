---
title: Usage & Diagnostics
description: Learn what Crona's Privacy & Diagnostics setting controls, what diagnostic data looks like, and how to use it when you need support.
order: 9.5
---

Crona's Privacy & Diagnostics setting is the place to decide whether the app can send usage telemetry and error reports. It is not a separate cloud service and it is not where your work lives. It is a local control for the app's diagnostic signals.

This page explains what the setting does, what each toggle means, and how to use the diagnostic tools when you need help.

## What The Setting Controls

The Privacy & Diagnostics pane has two separate controls:

- usage telemetry
- error reporting

Usage telemetry helps Crona understand how the app is being used at a high level. Error reporting helps Crona capture handled errors and panics so problems can be diagnosed.

You can turn one on without the other.

## What Gets Sent

When telemetry is enabled, Crona sends a small set of app-level metadata:

- app name
- app version
- environment mode
- running release channel
- whether the build is beta
- basic platform details like operating system and architecture

When an error report is sent, Crona keeps the error kind and a short sanitized message. It does not try to bundle your issues, sessions, check-ins, or exports into the report.

## What Stays Local

Your work stays on your machine.

That includes:

- issues
- habits
- sessions
- check-ins
- exports
- notes
- support bundle contents

The diagnostic setting changes whether Crona can send app signals, not whether your work data exists locally.

## Bundled Release Builds

Bundled release installs include telemetry defaults so they work without extra environment setup. That does not mean telemetry is on by default.

You still have to complete onboarding and turn the setting on in the app before Crona sends anything.

## Diagnostics And Support

The same area of the app is useful when something needs troubleshooting.

From the diagnostics side, Crona can:

- copy a lightweight diagnostics summary
- generate a redacted support bundle
- include release channel context in support information

Use the copied diagnostics when you want a quick report. Use the support bundle when you need the fuller artifact for a bug report.

## Where To Change It

Open the in-app Privacy & Diagnostics pane from Settings. From there you can review the current state, enable or disable telemetry, and generate diagnostics for support.

## What To Read Next

- Read [Privacy](/privacy/) for the site-facing privacy policy.
- Read [Alerts and Reminders](/docs/alerts-and-reminders/) if you want to understand how diagnostics relate to local notifications.
- Read [Support](/support/) if you want help deciding which diagnostic artifact to share.
