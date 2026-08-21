export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface GitHubRelease {
  draft: boolean;
  prerelease: boolean;
  tag_name?: string | null;
  name?: string | null;
  html_url: string;
  published_at?: string | null;
  body?: string | null;
  assets?: GitHubReleaseAsset[];
}

export async function loadGitHubReleases(repoUrl: string, perPage = 20): Promise<GitHubRelease[]> {
  const apiUrl = repoUrl.replace("https://github.com", "https://api.github.com/repos");
  const response = await fetch(`${apiUrl}/releases?per_page=${perPage}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "crona-site" },
  });

  if (!response.ok) throw new Error(`GitHub releases request failed: ${response.status}`);
  return (await response.json()) as GitHubRelease[];
}
