# Contributing to Orbitfolio

Thank you for your interest in contributing to Orbitfolio! 🎉

## 🤝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/orbitfolio/orbitfolio/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (browser, OS, etc.)

### Suggesting Features
1. Check [Discussions](https://github.com/orbitfolio/orbitfolio/discussions) for similar ideas
2. Create a new discussion with:
   - Clear use case
   - Expected behavior
   - Why it would benefit users
   - Potential implementation approach

### Code Contributions

#### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/orbitfolio.git
cd orbitfolio

# Install dependencies
npm install

# Create .env.local with your Supabase credentials
cp .env.local.example .env.local

# Run development server
npm run dev
```

#### Making Changes
1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards:
   - Use TypeScript for type safety
   - Follow existing code style
   - Write meaningful commit messages
   - Add comments for complex logic

3. Test your changes:
   ```bash
   npm run build
   npm run lint
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Link related issues

## 📝 Coding Standards

### TypeScript
- Use strict type checking
- Define interfaces for all data structures
- Avoid `any` type unless absolutely necessary

### React/Next.js
- Use functional components with hooks
- Prefer server components when possible
- Use client components only when needed (interactivity, hooks)

### Styling
- Use TailwindCSS utility classes
- Follow existing color scheme
- Ensure responsive design (mobile-first)
- Support both light and dark modes

### File Structure
```
app/
  ├── (auth)/          # Auth-related pages
  ├── (dashboard)/     # Dashboard pages
  └── api/             # API routes

components/
  ├── ui/              # Reusable UI components
  └── [feature]/       # Feature-specific components

lib/
  └── [utility].ts     # Utility functions

types/
  └── index.ts         # TypeScript types
```

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add CSV upload functionality
fix: resolve price fetching timeout issue
docs: update deployment guide
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication (Google, GitHub)
- [ ] Portfolio CRUD operations
- [ ] Price fetching (stocks, crypto)
- [ ] Search functionality
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark/light mode switching
- [ ] Error handling

### Future: Automated Testing
We plan to add:
- Unit tests (Jest)
- Integration tests (React Testing Library)
- E2E tests (Playwright)

## 📚 Documentation

When adding features, update:
- `README.md` - If it affects setup or usage
- `DEPLOYMENT.md` - If it affects deployment
- Code comments - For complex logic
- Type definitions - For new data structures

## 🎨 Design Guidelines

### Colors
- Primary: Blue (#3B82F6) + Purple (#8B5CF6)
- Success: Emerald (#10B981)
- Danger: Coral Red (#EF4444)
- Use CSS variables from `globals.css`

### Typography
- Font: Inter (already configured)
- Headings: Bold, gradient text for emphasis
- Body: Regular weight, high contrast

### Components
- Use shadcn/ui components when possible
- Maintain consistent spacing (Tailwind scale)
- Add hover states for interactive elements
- Include loading states for async operations

## 🚀 Release Process

1. Features are merged to `main` branch
2. Vercel automatically deploys to production
3. Version tags follow semantic versioning (v1.0.0)
4. Release notes document changes

## 💬 Communication

- **Questions**: Use [GitHub Discussions](https://github.com/orbitfolio/orbitfolio/discussions)
- **Bugs**: Use [GitHub Issues](https://github.com/orbitfolio/orbitfolio/issues)
- **Security**: Email security@orbitfolio.com (if applicable)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in commit history

Thank you for making Orbitfolio better! 🚀
