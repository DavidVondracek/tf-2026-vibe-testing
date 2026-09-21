# MCP in general

Researched 21 September 2026. Confidence: **H** primary source checked · **M** reputable secondary,
or primary partly checked · **L** could not verify (not used on slides).

## What it is

MCP — the **Model Context Protocol** — is one standard way to plug tools into an AI application.

- A **host** is the AI app (Claude Code, VS Code, Copilot). It opens one **client** per **server**.
- A server offers three kinds of things: **tools** (actions the model can call), **resources** (data
  it can read) and **prompts** (reusable templates).
- Two transports: **stdio** for a local process, **Streamable HTTP** for remote servers (OAuth
  recommended). Messages are JSON-RPC 2.0.

Source: [MCP architecture docs](https://modelcontextprotocol.io/docs/learn/architecture) (spec
2026-07-28). **H**

## Where it came from, and who runs it

| When | What | Source | |
| --- | --- | --- | --- |
| 25 Nov 2024 | Anthropic open-sources MCP | [MCP blog, first anniversary](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) | H |
| 9 Dec 2025 | Donated to the **Agentic AI Foundation**, a Linux Foundation fund co-founded by Anthropic, Block and OpenAI, with Google, Microsoft, AWS, Cloudflare and Bloomberg supporting. MCP keeps its own technical direction. | [Anthropic](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) · [Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) | H |
| 28 Jul 2026 | Spec **2026-07-28**: stateless (no handshake, no sessions); Roots, Sampling, Logging and the old HTTP+SSE transport deprecated; stricter authorization | [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/) | H |

## How widely it is used

- **SDK downloads:** 97M+ a month (Dec 2025), then close to **half a billion a month** across the
  four Tier-1 SDKs (Jul 2026); TypeScript and Python have each passed 1 billion in total. **H**
  ([Anthropic, 9 Dec 2025](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation);
  [MCP blog, 28 Jul 2026](https://blog.modelcontextprotocol.io/posts/2026-07-28/))
- **Official registry:** **33,919** distinct servers (33,560 active), counted from
  `registry.modelcontextprotocol.io/v0/servers?version=latest` on 21 Sep 2026 — up from about 300
  in Sep 2025 and 2,000+ in Nov 2025. Raw entry counts are much higher because every version is
  listed. **H**
- **Clients and vendors:**

| Date | Adoption | Source |
| --- | --- | --- |
| 26 Mar 2025 | OpenAI Agents SDK | [Sam Altman](https://x.com/sama/status/1904957253456941061) |
| 9 Apr 2025 | Google Gemini models and SDK | [TechCrunch](https://techcrunch.com/2025/04/09/google-says-itll-embrace-anthropics-standard-for-connecting-ai-models-to-data/) |
| 17 Jun 2025 | Copilot agent mode with MCP, GA in Visual Studio 17.14 | [GitHub changelog](https://github.blog/changelog/2025-06-17-visual-studio-17-14-june-release/) |
| 14 Jul 2025 | MCP GA in VS Code 1.102 | [GitHub changelog](https://github.blog/changelog/2025-07-14-model-context-protocol-mcp-support-in-vs-code-is-generally-available/) |
| 29 Jul 2026 | Copilot code review with MCP, GA | [GitHub changelog](https://github.blog/changelog/2026-07-29-copilot-code-review-agent-skills-and-mcp-now-generally-available/) |

## What it costs

### Tool definitions are loaded before the agent starts

A setup with five servers and 58 tools uses about **55,000 tokens before any work starts**. GitHub
alone is about 26,000 (35 tools), Slack about 21,000 (11 tools). Anthropic saw one internal case of
134,000. **H** — [Anthropic, "Advanced tool use", 24 Nov 2025](https://www.anthropic.com/engineering/advanced-tool-use)

### Clients now load tools only when needed

- **Tool search** (same source): **85% fewer tokens**, and accuracy on MCP evaluations rose from
  **49% to 74%** (Opus 4) and **79.5% to 88.1%** (Opus 4.5). **H**
- Claude Code turns tool search on by default, and caps MCP tool output at 25,000 tokens by
  default. **H** — [Claude Code MCP docs](https://code.claude.com/docs/en/mcp)

### Or run code instead of calling tools

Anthropic presents MCP tools as code files the agent explores and calls from a sandbox, so
intermediate data never enters the model's context. One Google Drive → Salesforce workflow went from
**150,000 to 2,000 tokens (−98.7%)** — a single example, not a benchmark. It needs sandboxing,
resource limits and monitoring. **H** — [Anthropic, "Code execution with MCP", 4 Nov 2025](https://www.anthropic.com/engineering/code-execution-with-mcp)

## Security

- A study of **1,899 open-source MCP servers**: 7.2% had general vulnerabilities and **5.5% had
  MCP-specific tool poisoning**. **H** — [Hasan et al., arXiv 2506.13538](https://arxiv.org/abs/2506.13538) (Jun 2025, revised Apr 2026)
- **MCPTox** benchmark (45 real servers, 353 tools, 20 agents): poisoned tool descriptions succeeded
  in up to **72.8%** of attacks (o1-mini). More capable models were often *more* susceptible; the
  best refusal rate was under 3%. **H** — [arXiv 2508.14925](https://arxiv.org/abs/2508.14925) (Aug 2025)

Practical rule: vet every server you add, as you would any dependency that can act on your behalf.

## "Is MCP dying?"

- **Perplexity** (CTO Denis Yarats, ~11 Mar 2026) is moving away from MCP *internally*, towards APIs
  and CLIs, citing context overhead and awkward auth; it still offers MCP to outside clients. **M**
- **Anthropic** (co-creator David Soria Parra, Apr 2026): skills, MCP and CLIs *compose* — "agents in
  2026 use all of them." **M** — [talk](https://www.youtube.com/watch?v=v3Fr2JR47KA)
- **The data:** SDK downloads about 5× the Dec 2025 level, the registry about 17× larger than in Nov
  2025, and a major spec release in Jul 2026. The criticism that holds up is about *how tools are
  loaded*, and clients are answering it with tool search and code execution.

## Could not verify (not used)

- Perplexity's "72% of context / 143K tokens" figure — secondary blogs only.
- Garry Tan's "MCP sucks" quote.
- The widely repeated "43% command injection", "36.7% SSRF" and "82% path traversal" security
  figures — no primary study found.
- The exact launch date of tool search in Claude Code (secondary sources say 14 Jan 2026).
