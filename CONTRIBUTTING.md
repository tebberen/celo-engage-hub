# Contributing to Celo Engage Hub

Thank you for your interest in contributing to Celo Engage Hub! We're excited to have you join our community of developers building the future of social engagement on the Celo blockchain.

## 🎯 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)
- [FAQ](#faq)

## 📜 Code of Conduct

### Our Pledge
We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Git
- A Celo-compatible wallet (MetaMask, Valora, etc.)
- Basic understanding of blockchain concepts

### First-Time Setup

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/celo-engage-hub.git
   cd celo-engage-hub
```

1. Set Upstream Remote
   ```bash
   git remote add upstream https://github.com/tebberen/celo-engage-hub.git
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Start Development Server
   ```bash
   npm run dev
   ```
4. Test the Application
   · Open http://localhost:3000
   · Connect your wallet to Celo testnet
   · Test the basic functionality

🔄 Development Workflow

Branch Naming Convention

```
feature/description    # New features
bugfix/description     # Bug fixes
hotfix/description     # Critical fixes
docs/description       # Documentation
refactor/description   # Code refactoring
test/description       # Test-related
```

Commit Message Guidelines

We use conventional commit messages:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:

· feat: New feature
· fix: Bug fix
· docs: Documentation
· style: Formatting changes
· refactor: Code refactoring
· test: Adding tests
· chore: Maintenance tasks

Examples:

```bash
git commit -m "feat(governance): add proposal voting mechanism"
git commit -m "fix(wallet): handle network switching errors"
git commit -m "docs(readme): update installation instructions"
```

💻 Code Standards

JavaScript/HTML/CSS Standards

· Use ES6+ features where appropriate
· Follow consistent indentation (2 spaces)
· Use meaningful variable and function names
· Comment complex logic
· Ensure mobile responsiveness

Smart Contract Standards (when added)

· Follow Solidity style guide
· Include NatSpec comments
· Implement proper error handling
· Use latest security practices

File Organization

```
celo-engage-hub/
├── index.html          # Main application
├── css/               # Stylesheets (future)
├── js/                # JavaScript modules (future)
├── contracts/         # Smart contracts (future)
├── tests/             # Test files (future)
├── docs/              # Documentation (future)
└── assets/            # Images and media (future)
```

🔧 Pull Request Process

1. Pre-PR Checklist

· Code follows project standards
· Tests pass (when available)
· Documentation updated
· No console.log statements in production code
· Mobile responsiveness tested

2. Creating a Pull Request

1. Update Your Fork
   ```bash
   git fetch upstream
   git merge upstream/main
   ```
2. Create Pull Request
   · Go to your fork on GitHub
   · Click "New Pull Request"
   · Use the PR template (when available)
3. PR Description Template
   ```markdown
   ## Description
   Brief description of the changes
   
   ## Related Issues
   Fixes #(issue number)
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   Describe how you tested these changes
   
   ## Screenshots (if applicable)
   ```

3. Review Process

· At least one maintainer must approve
· All CI checks must pass
· Address review comments promptly
· Keep PRs focused and manageable

🏗️ Project Structure

Current Architecture

```
celo-engage-hub/
├── index.html          # Single-page application
├── README.md           # Project documentation
├── CONTRIBUTING.md     # This file
├── LICENSE            # MIT License
└── (future directories)
```

Planned Structure

```
celo-engage-hub/
├── src/
│   ├── components/     # UI components
│   ├── utils/          # Utility functions
│   ├── contracts/      # Smart contract interactions
│   └── styles/         # CSS and styling
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
├── docs/
│   ├── api/            # API documentation
│   ├── tutorials/      # Step-by-step guides
│   └── architecture/   # System design docs
└── scripts/            # Build and deployment scripts
```

🧪 Testing Guidelines

Testing Standards (When Implemented)

· Write tests for new features
· Maintain test coverage above 80%
· Include both unit and integration tests
· Test on multiple browsers and devices

Test Commands (Future)

```bash
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:integration # Integration tests
npm run test:coverage # Test with coverage
npm run test:e2e      # End-to-end tests
```

📚 Documentation

Documentation Standards

· Keep documentation up-to-date with code changes
· Use clear, concise language
· Include code examples where helpful
· Document both how and why

Areas Needing Documentation

· API documentation
· Deployment guide
· Smart contract documentation
· Troubleshooting guide
· Architecture decisions

👥 Community

Getting Help

· GitHub Issues: For bug reports and feature requests
· Discussion Forums: For questions and ideas (when available)
· Celo Discord: Join the Celo ecosystem Discord

Recognition

Contributors will be:

· Listed in the README.md (for significant contributions)
· Eligible for Celo ecosystem badges (when implemented)
· Considered for project maintainer roles

Communication Channels

· Primary: GitHub Issues and Discussions
· Secondary: Celo Developer Chat
· Emergency: Direct contact for security issues

❓ FAQ

How do I start contributing?

1. Read this CONTRIBUTING.md file
2. Set up your development environment
3. Look for "good first issue" labeled issues
4. Start with small, focused changes

What if I'm new to blockchain development?

That's okay! We welcome contributors of all experience levels. Start with:

· Documentation improvements
· UI/UX enhancements
· Testing and bug reporting

How are decisions made?

· Technical decisions: Discussion + consensus
· Feature priorities: Community feedback + maintainer input
· Architecture: Based on Celo best practices

Can I add new features?

Yes! Please:

1. Open an issue to discuss the feature first
2. Get feedback from maintainers
3. Follow the PR process

What about smart contract changes?

Smart contract modifications require:

· Additional security review
· Comprehensive testing
· Community discussion due to immutability

🎉 Recognition

Contributor Tiers

· Contributor: Any accepted PR
· Active Contributor: Multiple quality contributions
· Core Contributor: Significant ongoing contributions

Hall of Fame

Significant contributors will be recognized in our project documentation and may receive:

· Celo ecosystem recognition
· Project governance rights (future)
· Special badges and roles

---

📞 Need Help?

· Create an Issue: For bugs and feature requests
· Start a Discussion: For questions and ideas
· Contact Maintainers: For sensitive matters

🙏 Thank You!

Thank you for considering contributing to Celo Engage Hub. Your efforts help build a more open, transparent, and community-driven social platform on the Celo blockchain.

Together, we're building the future of social engagement!

```
