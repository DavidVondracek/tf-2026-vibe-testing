# Setup troubleshooting

Find the step that failed in the [setup checklist](../README.md#get-ready-for-the-workshop), fix it
here, then run `npm run verify` again. When all seven checks are green, you are done.

## Windows: do these first

Two things stop almost every Windows laptop. Fix both before step 3.

**1. PowerShell refuses to run npm.** You see *"npm.ps1 cannot be loaded because running scripts
is disabled on this system."* This is Windows' default policy. Allow it for your user (no admin
rights needed):

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

If your company's policy overrides this, use `-Scope Process` (it lasts until you close the
window), or run npm from **Command Prompt** instead of PowerShell.

**2. The tools are not installed.** Windows has no Git, Node.js or GitHub CLI by default. Install
all three with `winget`:

```powershell
winget install --id Git.Git -e --source winget
winget install --id OpenJS.NodeJS.LTS -e --source winget
winget install --id GitHub.cli -e --source winget
```

Then **close VS Code completely and open it again.** A terminal that was open before the install
still cannot find `git`, `node` or `gh`.

Use Git from the [git-scm.com installer](https://git-scm.com/download/win) if `winget` is missing.
GitHub Desktop is not enough: it does not put `git` on the terminal's path.

## Step 3 — Install the tools

| What you see | Fix |
| --- | --- |
| `git`, `node` or `gh` "is not recognized" / "command not found" | Install it (see [Windows: do these first](#windows-do-these-first)), then restart VS Code completely. |
| The installer asks for admin rights you do not have | Tell me in the form or on LinkedIn **before** the workshop. You can pair with a neighbour on the day, but you will get more out of it on your own laptop. |
| `gh auth login` asks how to authenticate | Choose **GitHub.com**, **HTTPS**, **Login with a web browser**. |

## Step 5 — Clone and install

| What you see | Fix |
| --- | --- |
| `npm.ps1 cannot be loaded` | See [Windows: do these first](#windows-do-these-first). |
| `npm install` hangs or fails with `ETIMEDOUT` / `ECONNRESET` | A company proxy. Set it for npm: `npm config set proxy http://proxy:port` and `npm config set https-proxy http://proxy:port`, using your company's proxy address. |
| `npm install` fails with `EACCES` / permission denied | You cloned into a folder you cannot write to. Clone into your home folder instead. |

## Steps 6 and 7 — Extensions and AI models

| What you see | Fix |
| --- | --- |
| VS Code did not offer the recommended extensions | `Ctrl/Cmd+Shift+P` → **Extensions: Show Recommended Extensions** → install all three. |
| The Chat view asks you to sign in | Sign in with your GitHub account. The free Copilot plan is enough. |
| **DeepSeek V4.1 Flash** is not in the model picker | Run **Vercel AI Gateway: Manage Authentication** again and paste the key. Then **Developer: Reload Window**. |
| The model answers with an authentication error | The key was pasted incompletely. It starts with `vck_`. Paste it again. |

## Step 8 — Wopee.io

| What you see | Fix |
| --- | --- |
| No demo project option on the home page | In [cmd.wopee.io](https://cmd.wopee.io), click **NEW PROJECT** and select the demo project there. |
| Sign-up email never arrives | Check spam, or sign up with the same email as your GitHub account. |

## Step 9 — Download the browser

| What you see | Fix |
| --- | --- |
| `npm run browsers` hangs or fails behind a company proxy | Set `HTTPS_PROXY` before running it: `$env:HTTPS_PROXY="http://proxy:port"` in PowerShell, `export HTTPS_PROXY=http://proxy:port` on macOS or Linux. |
| Antivirus quarantines the download | Allow the Playwright browser folder, then run `npm run browsers` again. |

## Step 10 — `npm run verify`, check by check

| Red check | Fix |
| --- | --- |
| Node.js 20 or newer | Install the Node.js LTS, then restart VS Code. |
| Dependencies installed | Run `npm install` in the repository root, not in a subfolder. |
| Playwright 1.62.0 or newer | Run `npm install` in the repository root. It installs the pinned version. |
| Browser CLI available | Same as above. Both checks come from the `playwright` package. |
| Test-runner MCP server available | Same as above. |
| Chromium downloaded | Run `npm run browsers` (step 9). |
| Demo app reachable | Open [foodora.lovable.app](https://foodora.lovable.app/) in your own browser. If it does not load, your network or a company proxy blocks it. Try another network, such as a phone hotspot. |

## On the workshop day

| What you see | Fix |
| --- | --- |
| `head` "is not recognized" in PowerShell (Exhibit 3) | Use `Get-Content <file> -TotalCount 4`, or open the file in VS Code. `ls` and `cat` work in PowerShell; `head` does not. |

The workshop-day problems with the exhibits themselves are in the
[root README](../README.md#when-something-breaks).

## Still stuck?

Message me on LinkedIn **before** the workshop, with a screenshot of the red line. A setup
fixed on Tuesday is worth three fixed at 09:05 on Thursday.
