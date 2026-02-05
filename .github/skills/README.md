# GitHub Copilot Skills for learnin10

GitHub Copilot Skills are self-contained bundles of instructions and reference materials that enhance AI capabilities for specialized tasks. Each skill provides comprehensive documentation and context-specific guidance.

## 📊 Available Skills (7)

### 1. 🎨 **copilot-sdk**
**Purpose**: Build agentic applications with GitHub Copilot SDK  
**Use Cases**:
- Embedding AI agents in applications
- Creating custom tools and workflows
- Implementing streaming responses
- Managing sessions and connecting to MCP servers
- Building programmable agents

**Triggers**: Copilot SDK, GitHub SDK, agentic app, embed Copilot, custom agent  
**Languages**: Python, TypeScript, Go, .NET

**When to Use**: Building MCP servers, integrating Copilot into your Next.js app, creating custom AI-powered features

---

### 2. 💻 **gh-cli**
**Purpose**: Comprehensive GitHub CLI (gh) reference  
**Use Cases**:
- Repository management
- Issues and pull requests automation
- GitHub Actions operations
- Project management
- Releases and gists
- Codespaces management
- Organization operations

**Version**: 2.85.0 (as of January 2026)

**When to Use**: Automating GitHub workflows, managing issues/PRs from CLI, CI/CD operations, creating releases

---

### 3. 📝 **git-commit**
**Purpose**: Conventional commit message generation and analysis  
**Use Cases**:
- Auto-detecting commit type and scope from changes
- Generating conventional commit messages from diffs
- Interactive commits with type/scope/description
- Intelligent file staging for logical grouping

**Commit Types**: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

**When to Use**: Creating standardized commits, maintaining changelog, semantic versioning, improving git history readability

---

### 4. 🔧 **refactor**
**Purpose**: Surgical code refactoring without changing behavior  
**Use Cases**:
- Extracting functions and methods
- Renaming variables for clarity
- Breaking down large functions
- Improving type safety
- Eliminating code smells
- Applying design patterns

**Principles**: Behavior preservation, small steps, version control, test-driven

**When to Use**: Improving code maintainability, cleaning up technical debt, preparing code for new features, addressing code smells

---

### 5. 🧪 **webapp-testing**
**Purpose**: Playwright-based web application testing toolkit  
**Use Cases**:
- Testing frontend functionality in real browsers
- Verifying UI behavior and interactions
- Debugging web application issues
- Capturing screenshots for documentation
- Inspecting browser console logs
- Validating form submissions and user flows
- Checking responsive design across viewports

**Tech Stack**: Node.js, Playwright (auto-installed)

**When to Use**: E2E testing Next.js pages, validating user flows, debugging UI issues, visual regression testing

---

### 6. 🔍 **chrome-devtools**
**Purpose**: Browser automation, debugging, and performance analysis  
**Use Cases**:
- Browser automation (navigation, clicks, forms)
- Visual inspection (screenshots, text snapshots)
- Debugging (console messages, JavaScript evaluation, network analysis)
- Performance profiling (traces, Core Web Vitals)
- Device and network emulation

**Tool Categories**: Navigation, Input/Interaction, Visual Inspection, Debugging, Performance

**When to Use**: Performance debugging, analyzing Core Web Vitals, network inspection, visual testing, browser automation

---

### 7. 📋 **prd**
**Purpose**: Generate high-quality Product Requirements Documents  
**Use Cases**:
- Creating comprehensive technical specifications
- Defining user stories and acceptance criteria
- Documenting AI-powered features
- Risk analysis and mitigation planning
- Stakeholder alignment

**Sections**: Executive Summary, User Stories, Technical Specs, Success Metrics, Risk Analysis

**When to Use**: Starting new features, translating ideas to specs, documenting requirements, planning development cycles

---

## 🚀 How to Use Skills

### Via Copilot Chat
Skills are automatically available when their trigger keywords are mentioned in conversation:

```
# Example 1: Using git-commit skill
"Create a conventional commit message for my staged changes"

# Example 2: Using refactor skill
"Refactor this function to be more maintainable"

# Example 3: Using webapp-testing skill
"Generate a Playwright test for the login flow"

# Example 4: Using copilot-sdk skill
"How do I embed Copilot in my Next.js app using the SDK?"

# Example 5: Using gh-cli skill
"How do I create a GitHub issue using the CLI?"
```

### Skill Activation
Skills activate based on:
- **Keywords**: Trigger words in conversations (defined in skill frontmatter)
- **Context**: Working files and project structure
- **Explicit invocation**: Mentioning skill names directly

### Best Practices
1. **Be specific**: Clearly state your goal when invoking a skill
2. **Provide context**: Share relevant code snippets or file paths
3. **Iterate**: Skills work best with feedback loops
4. **Combine skills**: Use multiple skills together for complex workflows

---

## 🔄 Workflows Using Skills

### Workflow 1: Feature Development with Testing
1. **Planning**: Use `prd` skill to document requirements
2. **Development**: Build feature in Next.js (following instructions)
3. **Testing**: Use `webapp-testing` to create E2E tests
4. **Debugging**: Use `chrome-devtools` for performance analysis
5. **Commit**: Use `git-commit` for conventional commits

### Workflow 2: Code Quality Improvement
1. **Refactor**: Use `refactor` skill to improve code structure
2. **Review**: Use code review instructions
3. **Test**: Use `webapp-testing` to ensure behavior preserved
4. **Commit**: Use `git-commit` with type `refactor`

### Workflow 3: GitHub Automation
1. **Issue Management**: Use `gh-cli` to create/manage issues
2. **PRD Generation**: Use `prd` skill for issue descriptions
3. **Pull Requests**: Use `gh-cli` for automated PR workflows
4. **Commits**: Use `git-commit` for conventional commits

### Workflow 4: MCP Development
1. **SDK Setup**: Use `copilot-sdk` skill for MCP server setup
2. **Development**: Build TypeScript MCP server
3. **Testing**: Use `webapp-testing` for integration tests
4. **Debugging**: Use `chrome-devtools` for browser-based testing

---

## 📂 Skill Structure

Each skill follows this structure:
```
skill-name/
├── SKILL.md           # Main skill documentation and instructions
├── references/        # Optional: Additional reference materials
│   └── *.md
└── assets/           # Optional: Templates, schemas, examples
    └── *.md
```

## 🎯 Skills for This Project (T3 Stack)

### Core Development
- **copilot-sdk**: TypeScript MCP development
- **refactor**: Maintaining clean code architecture
- **webapp-testing**: E2E testing with Playwright

### Version Control
- **git-commit**: Conventional commits for semantic versioning
- **gh-cli**: GitHub workflow automation

### Quality & Performance
- **chrome-devtools**: Next.js performance optimization
- **webapp-testing**: UI/UX validation

### Planning & Documentation
- **prd**: Feature requirement documentation

---

## 📚 Additional Resources

- [VS Code Copilot Skills Documentation](https://code.visualstudio.com/docs/copilot/copilot-skills)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Playwright Documentation](https://playwright.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)

---

**Last Updated**: February 6, 2026  
**Source**: [github/awesome-copilot/skills](https://github.com/github/awesome-copilot/tree/main/skills)
