# GitHub Copilot Resources for learnin10

**Project**: Learn in 10 (T3 Stack - Next.js 14, TypeScript, Drizzle ORM, PostgreSQL, Tailwind CSS, shadcn/ui)

## 📊 Summary

- **7 Agents** - Specialized AI personas for development workflows
- **9 Instructions** - Auto-applying coding standards and best practices
- **3 Prompts** - Task-specific code generation commands  
- **7 Skills** - Self-contained capability bundles with comprehensive documentation

---

## 🤖 Agents (.github/agents/)

### Development & Code Quality
- **debug.agent.md** - Cross-stack debugging assistance
- **janitor.agent.md** - Code cleanup and automated refactoring
- **playwright-tester.agent.md** - E2E testing with Playwright
- **prompt-engineer.agent.md** - AI prompt optimization and engineering

### Software Engineering Team
- **se-product-manager-advisor.agent.md** - Product management and roadmap guidance
- **se-security-reviewer.agent.md** - Security audits and OWASP compliance
- **se-technical-writer.agent.md** - Technical documentation and ADRs

**Usage**: In Copilot Chat, invoke with `@agent-name`  
**Example**: `@debug Help me debug this Next.js Server Component issue`

---

## 📋 Instructions (.github/instructions/)

### Framework & Language
- **nextjs.instructions.md** - Next.js 16.1.1 best practices (App Router, Server Components)
- **nextjs-tailwind.instructions.md** - Next.js + Tailwind CSS development standards
- **reactjs.instructions.md** - React patterns and component best practices
- **typescript-5-es2022.instructions.md** - TypeScript 5 and ES2022 standards

### Code Quality & Standards
- **code-review-generic.instructions.md** - Comprehensive code review guidelines
- **self-explanatory-code-commenting.instructions.md** - Comment best practices
- **performance-optimization.instructions.md** - Frontend/backend performance patterns

### Security & Accessibility
- **security-and-owasp.instructions.md** - OWASP Top 10 and secure coding
- **a11y.instructions.md** - Web accessibility (WCAG 2.2 Level AA)

**Usage**: Instructions auto-apply based on file patterns (e.g., `**/*.tsx` for Next.js instructions)  
**Example**: When editing `.tsx` files, Next.js and React instructions automatically provide context

---

## 🎯 Prompts (.github/prompts/)

### Documentation
- **create-readme.prompt.md** - `/create-readme` - Generate comprehensive README files

### Testing
- **playwright-generate-test.prompt.md** - `/playwright-generate-test` - Generate E2E tests

### Code Quality
- **review-and-refactor.prompt.md** - `/review-and-refactor` - Code review and refactoring

**Usage**: In Copilot Chat, invoke with `/prompt-name`  
**Example**: `/create-readme`

---

## 🎨 Skills (.github/skills/)

### 1. **copilot-sdk**
Build agentic applications with GitHub Copilot SDK (Python, TypeScript, Go, .NET)  
**Use**: MCP server development, embedding Copilot in apps

### 2. **gh-cli**
Comprehensive GitHub CLI reference (v2.85.0)  
**Use**: Automating GitHub workflows, issue/PR management

### 3. **git-commit**
Conventional commit message generation and analysis  
**Use**: Semantic versioning, standardized git history

### 4. **refactor**
Surgical code refactoring without behavior changes  
**Use**: Code cleanup, technical debt reduction

### 5. **webapp-testing**
Playwright-based web application testing toolkit  
**Use**: E2E testing, UI validation, visual regression

### 6. **chrome-devtools**
Browser automation, debugging, and performance analysis  
**Use**: Performance profiling, Core Web Vitals optimization

### 7. **prd**
Product Requirements Document generation  
**Use**: Feature planning, technical specifications

**Usage**: Skills activate automatically based on conversation keywords and context  
**Example**: "Create a conventional commit message" → triggers `git-commit` skill

---

## 🔄 Recommended Workflows

### Feature Development Flow
1. **Plan**: Use `prd` skill
2. **Develop**: Follow Next.js + TypeScript instructions
3. **Refactor**: Use `refactor` skill
4. **Test**: `/playwright-generate-test` + `webapp-testing` skill
5. **Security**: `@se-security-reviewer`
6. **Commit**: `git-commit` skill (conventional commits)
7. **Document**: `/create-readme` + `@se-technical-writer`

### Performance Optimization Flow
1. **Profile**: `chrome-devtools` skill
2. **Fix**: Apply `performance-optimization` instructions
3. **Test**: `webapp-testing` skill
4. **Commit**: `git-commit` (type: `perf`)

### Security Hardening Flow
1. **Audit**: `@se-security-reviewer` + `security-and-owasp` instructions
2. **Fix**: Apply OWASP best practices
3. **Validate**: `/review-and-refactor`
4. **Commit**: `git-commit` (type: `fix` or `security`)

### Code Quality Flow
1. **Refactor**: `refactor` skill
2. **Review**: `/review-and-refactor`
3. **Test**: `webapp-testing` skill (preserve behavior)
4. **Commit**: `git-commit` (type: `refactor`)

---

## 🚀 Quick Start

### Use Agents
```
@debug Fix this TypeScript error in my Server Component
@se-security-reviewer Check this auth implementation
@playwright-tester Help me test the user registration flow
```

### Use Prompts
```
/create-readme
/playwright-generate-test for the shopping cart
/review-and-refactor this component
```

### Use Skills
```
"Create a conventional commit for these changes"
"Refactor this function to improve readability"
"How do I profile Core Web Vitals for this page?"
```

### Instructions
Instructions work automatically! Just open a `.tsx` file and start coding - Next.js, React, TypeScript, and security instructions will provide contextual guidance.

---

## 📚 Additional Resources

- **Skills Documentation**: See [.github/skills/README.md](.github/skills/README.md)
- **Project Instructions**: See [.github/copilot-instructions.md](.github/copilot-instructions.md)
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)

---

**Last Updated**: February 6, 2026  
**Source**: [github/awesome-copilot](https://github.com/github/awesome-copilot)
