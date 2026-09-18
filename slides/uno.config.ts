import { defineConfig } from 'unocss'

// UnoCSS skips its local icon loader when VSCODE_CWD is set (any VS Code terminal),
// which blanks every Slidev control icon. Clear it for this process.
delete process.env.VSCODE_CWD

export default defineConfig({})
