import type { GitHubRelease } from "./github-releases";

export interface MacRelease {
  version: string;
  releaseUrl: string;
  downloadUrl?: string;
  publishedAt?: string | null;
  prerelease: boolean;
}

export function toMacRelease(release: GitHubRelease): MacRelease | null {
  if (release.draft || !release.tag_name || !release.html_url) return null;
  const dmg = release.assets?.find((asset) => /-macOS\.dmg$/i.test(asset.name));
  if (!dmg) return null;

  return {
    version: release.tag_name,
    releaseUrl: release.html_url,
    downloadUrl: dmg.browser_download_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
  };
}

export function resolveMacReleases(releases: GitHubRelease[]) {
  const macReleases = releases
    .map(toMacRelease)
    .filter((release): release is MacRelease => release !== null)
    .sort((a, b) => {
      const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTime - aTime;
    });

  return {
    stable: macReleases.find((release) => !release.prerelease) ?? null,
    beta: macReleases.find((release) => release.prerelease) ?? null,
  };
}
