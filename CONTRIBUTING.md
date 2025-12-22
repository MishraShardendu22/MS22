# Contributing to Shardendu Mishra Portfolio

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** and rationale
- **Mockups or examples** if applicable
- **Potential implementation approach**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes** with clear, descriptive commits
4. **Test your changes** thoroughly
5. **Run linting**: `pnpm lint:fix`
6. **Run formatting**: `pnpm format`
7. **Type check**: `pnpm type-check`
8. **Submit a pull request** with a clear description

## Development Setup

### Prerequisites

- Node.js 20.0.0+
- pnpm 10.0.0+
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/MS22.git
cd MS22/MishraShardendu22

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Enable strict mode
- Avoid `any` types - use proper type definitions
- Document complex types with JSDoc comments

### React

- Use functional components with hooks
- Implement proper error boundaries
- Use `"use client"` directive for client components
- React Compiler is enabled - no need for manual memoization (`memo`, `useMemo`, `useCallback`)

### File Naming

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Utilities**: camelCase (e.g., `fetchStats.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `api.types.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useAnimeOnMount.ts`)

### CSS/Tailwind

- Use Tailwind utility classes
- Keep inline class strings organized (layout → spacing → colors → effects)
- Extract repeated patterns into components
- Use CSS variables for theme customization

## Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```
feat(projects): add search and filter functionality

- Implement debounced search input
- Add skill-based filtering
- Update UI with loading states

Closes #123
```

```
fix(stats): handle missing GitHub data gracefully

Add optional chaining to prevent crashes when GitHub API
returns null/undefined values.

Fixes #456
```

## Pull Request Process

1. **Update documentation** if needed (README, API docs, etc.)
2. **Add tests** for new features
3. **Ensure all checks pass** (linting, formatting, type-checking)
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Squash commits** before merging (if requested)

### PR Title Format

Follow the same conventions as commit messages:

```
feat(component): brief description of changes
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

## Project Structure Guidelines

### Component Organization

```
src/component/
├── ComponentName/
│   ├── ComponentName.tsx    # Main component
│   ├── SubComponent.tsx     # Sub-components (if needed)
│   └── index.ts             # Re-exports
```

### API Integration

- Place API calls in `src/static/api/`
- Use `axios` with timeout wrapper
- Handle errors gracefully
- Type all API responses

### Type Definitions

- Keep types close to usage
- Use shared types from `src/types/` for cross-component types
- Export types from component files when needed

## Testing Guidelines

- Write unit tests for utilities and helpers
- Test edge cases and error conditions
- Use React Testing Library for component tests
- Aim for >80% code coverage on new features

## Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `wontfix`: Will not be worked on

## Questions?

Feel free to:
- Open an issue for questions
- Reach out via email: mishrashardendu221@gmail.com
- Check existing discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
