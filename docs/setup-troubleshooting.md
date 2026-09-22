# Setup troubleshooting

Find the step that failed in the [setup checklist](../README.md#get-ready-for-the-workshop), fix it
here, then run `npm run verify` again. When all seven checks are green, you are done.

## Windows: do these first

Two things, about 10 minutes, and Windows behaves like any other laptop for the rest of the day.

**1. Install the tools.** Windows comes without Git, Node.js and the GitHub CLI, but it does come
with `winget`, which installs all three. Open **PowerShell** or **Command Prompt** and run:

```powershell
winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-package-agreements
winget install --id GitHub.cli -e --source winget --accept-package-agreements
```

Click **Yes** when Windows asks for permission. Then **close VS Code completely and open it
again** — a terminal opened before the install cannot see the new tools.

`winget` not found? Install Git from [git-scm.com](https://git-scm.com/install/windows) and Node.js
from [nodejs.org](https://nodejs.org/en/download/) instead (default options are fine). GitHub
Desktop is not enough: it does not put `git` on the terminal's path.

**2. Use Git Bash as your terminal.** Git for Windows brings **Git Bash**, and this repository tells
VS Code to use it on Windows. Open a new terminal in VS Code (`` Ctrl+` ``): its tab should say
**bash**. In Git Bash `npm` just works, and every command in these docs works exactly as written.

The tab still says **powershell**? Click the **⌄** next to **+** in the terminal panel and pick
**Git Bash** (or `Ctrl+Shift+P` → **Terminal: Select Default Profile** → **Git Bash**).

Prefer to stay in PowerShell? Then allow `npm` to run once — otherwise you get *"npm.ps1 cannot be
loaded because running scripts is disabled on this system"*. Either switch on **Settings → System →
For developers → PowerShell** (named **Advanced** on the newest Windows 11), or run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

No admin rights needed. If your company's policy blocks both, use Git Bash.

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
| **Workspace Recommendations** says *No extensions found* | You already have them — type `@installed` and look for **Vercel AI Gateway** and **Playwright Test for VSCode**. Copilot Chat never shows there on current VS Code: it is built in. |
| No **Workspace Recommendations** section at all | VS Code is not open at the repository root. **File → Open Folder…** → the `tf-2026-vibe-testing-web-apps` folder itself, not a folder inside it. |
| No Copilot Chat | It is built into current VS Code. Update VS Code (**Help → Check for Updates**), then sign in with your GitHub account. |
| The Chat view asks you to sign in | Sign in with your GitHub account. The free Copilot plan is enough. |
| **DeepSeek V4.1 Flash** is not in the model picker | Run **Vercel AI Gateway: Manage Authentication** again and paste the key. Then **Developer: Reload Window**. |
| The model answers with an authentication error | The key was pasted incompletely. It starts with `vck_`. Paste it again. |

## Step 8 — Wopee.io

| What you see | Fix |
| --- | --- |
| No demo project option on the home page | In [cmd.wopee.io](https://cmd.wopee.io), click **NEW PROJECT** → **App URL** → **Demo app**. |
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
| `npm run verify` red on *Playwright version* | You are on an older Playwright. The CLI, the agents and the skills all need **1.62+**. Run `npm install` at the repository root. |
| `init-agents` prints `Using project ""` | It did not find a config. Use `npm run agents` from the repository root — see [Exhibit 2](../experiments/1_Zoo/2-PlaywrightAgents/README.md#setup). |
| The agent answers but cannot edit files or run commands | Set the agent picker in the chat input to **Agent** (not Ask or Plan). |
| `Executable doesn't exist at …ms-playwright/` | Run `npm run browsers`. |
| Copilot Chat has no model | The gateway key is not set. `Ctrl/Cmd+Shift+P` → **Vercel AI Gateway: Manage Authentication**, and paste the key handed out in the room. |
| MCP tools do not appear in chat | The servers are preset in `.vscode/mcp.json`. Reload the VS Code window and set the agent picker to **Agent**. Ran a bare `init-agents`? Run `npm run agents` instead — it repairs `.vscode/mcp.json`. |
| Wopee tools answer `WOPEE_PROJECT_UUID is not set` | Fill in `WOPEE_PROJECT_UUID` and `WOPEE_API_KEY` in `.env` (see [Exhibit 4](../experiments/1_Zoo/4-Wopee/)), then `Ctrl/Cmd+Shift+P` → **MCP: List Servers** → **wopee** → **Restart Server**. No `.env`? Run `npm install` once — it creates it. |
| A test passes locally and fails on the venue wifi | The demo app is live and remote. The configs retry once; if it persists, raise your hand. |
| `head` "is not recognized" in PowerShell (Exhibit 3) | Use `Get-Content <file> -TotalCount 4`, or open the file in VS Code. `ls` and `cat` work in PowerShell; `head` does not. |

Still stuck? Ask your neighbour, then raise your hand. Do not spend 10 of your 20 minutes on setup.

## Still stuck?

Message me on LinkedIn **before** the workshop, with a screenshot of the red line. A setup
fixed on Tuesday is worth three fixed at 09:05 on Thursday.
