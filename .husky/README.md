# Husky Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality checks before commits and pushes.

## Installed Hooks

### Pre-Commit Hook (`.husky/pre-commit`)
Runs before every commit to ensure code quality:
- ✅ **Type Check**: Validates TypeScript types (`pnpm type-check`)
- ✅ **Lint Check**: Validates code style and quality (`pnpm lint`)

**What happens if checks fail?**
- The commit will be blocked
- Fix the errors and try committing again
- For lint errors, you can run `pnpm lint:fix` to auto-fix most issues

### Pre-Push Hook (`.husky/pre-push`)
Runs before every push to prevent broken code from reaching the repository:
- ✅ **Type Check**: Validates TypeScript types
- ✅ **Lint Check**: Validates code style and quality
- ✅ **Build Check**: Ensures the project builds successfully (`pnpm build`)

**What happens if checks fail?**
- The push will be blocked
- Fix the build/type/lint errors before pushing
- This prevents CI/CD failures and ensures deployable code

## Manual Validation

You can run all checks manually with:
```bash
pnpm validate
```

This runs the same checks as the pre-push hook:
- Type checking
- Linting
- Build verification

## Individual Commands

Run specific checks:
```bash
# Type checking only
pnpm type-check

# Linting only
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Build only
pnpm build

# Format code
pnpm format
```

## Bypassing Hooks (Not Recommended)

In rare cases where you need to bypass hooks:
```bash
# Skip pre-commit hook
git commit --no-verify

# Skip pre-push hook
git push --no-verify
```

⚠️ **Warning**: Only bypass hooks if absolutely necessary, as this can lead to broken builds in production.

## Troubleshooting

### Hooks not running?
1. Ensure Husky is installed: `pnpm install`
2. Reinitialize Husky: `pnpm exec husky install`
3. Check hook permissions: `ls -la .husky/`

### Build takes too long during push?
- Consider running `pnpm build` locally before committing
- The pre-push build check ensures no broken code reaches the repository
- This is intentional to prevent CI/CD failures

### Getting type errors?
1. Run `pnpm type-check` to see all errors
2. Fix TypeScript errors in your code
3. If errors are from dependencies, update or fix type definitions

### Getting lint errors?
1. Run `pnpm lint` to see all errors
2. Run `pnpm lint:fix` to auto-fix most issues
3. Manually fix remaining issues

## Benefits

✅ Prevents committing code with TypeScript errors
✅ Prevents committing code with lint issues
✅ Prevents pushing code that doesn't build
✅ Catches issues before CI/CD
✅ Ensures code quality and consistency
✅ Saves time by catching errors early

## Setup for New Contributors

Husky is automatically set up when running:
```bash
pnpm install
```

The `prepare` script in `package.json` runs `husky` which sets up the hooks.
