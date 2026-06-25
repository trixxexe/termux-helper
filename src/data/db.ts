export interface Command {
  id: string;
  command: string;
  description: string;
  syntax: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  expectedOutput?: string;
  commonErrors?: string;
  tags: string[];
}

export interface Package {
  id: string;
  name: string;
  category: string;
  description: string;
  installCmd: string;
  verifyCmd: string;
  updateCmd: string;
  removeCmd: string;
  homepage: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  dependencies: string[];
  examples: { t: string; c: string; d: string }[];
  troubleshooting: string;
}

export interface Language {
  id: string;
  name: string;
  version: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  installCmd: string;
  verifyCmd: string;
  packageManager: string;
  description: string;
  helloWorld: { code: string; runCmd: string; filename: string };
  recommendedLibs: string[];
  commonErrors: { error: string; fix: string }[];
}

export interface ErrorGuide {
  id: string;
  title: string;
  symptoms: string;
  cause: string;
  fix: string;
  alternative?: string;
}

export interface LearningStage {
  id: string;
  title: string;
  level: number;
  description: string;
  completionTime: string;
  badge: string;
  lessons: {
    id: string;
    title: string;
    objective: string;
    content: string;
    commands: string[];
    challenge: string;
  }[];
}

export const learningStages: LearningStage[] = [
  {
    "id": "basics",
    "title": "Termux Fundamentals",
    "level": 1,
    "description": "Get started with the interface, terminal navigation, and essential Linux commands.",
    "completionTime": "30 mins",
    "badge": "Termux Initiate",
    "lessons": [
      {
        "id": "install-init",
        "title": "First Steps & Storage Permissions",
        "objective": "Understand the correct installation source, update mirrors, and enable storage permissions.",
        "content": "Always download Termux from F-Droid or GitHub, as the Google Play Store version is heavily outdated. Upon opening Termux, configure package repositories to fetch updates reliably and grant storage access to exchange files with Android.",
        "commands": [
          "termux-setup-storage",
          "termux-change-repo",
          "pkg update && pkg upgrade -y"
        ],
        "challenge": "Run `termux-setup-storage` and confirm that the directory `~/storage` is successfully mapped to your phone's internal memory."
      },
      {
        "id": "navigation",
        "title": "Terminal Navigation (ls, cd, pwd)",
        "objective": "Learn how to find your position in the file system and browse directories.",
        "content": "The Linux directory structure is a tree. You start in your home directory (`~`). Use `pwd` (print working directory) to check where you are, `ls` to list directory contents, and `cd` to navigate.",
        "commands": [
          "pwd",
          "ls -la",
          "cd ~/storage/shared"
        ],
        "challenge": "Navigate into your Android downloads folder inside your storage and list all files containing a specific extension."
      },
      {
        "id": "file-ops",
        "title": "File Operations (touch, mkdir, cp, mv, rm)",
        "objective": "Create, copy, move, rename, and delete files or folders safely.",
        "content": "Linux doesn't have a recycle bin. Deletions are instantaneous and irreversible unless using special recovery tools. Master directory creation and safe copying syntax.",
        "commands": [
          "mkdir -p projects/python_app",
          "touch projects/python_app/main.py",
          "cp projects/python_app/main.py projects/python_app/backup.py",
          "rm projects/python_app/backup.py"
        ],
        "challenge": "Create a directory called 'test_dir', move a blank text file into it, and then delete the entire folder using 'rm -rf'."
      }
    ]
  },
  {
    "id": "package-management",
    "title": "Mastering Package Management",
    "level": 2,
    "description": "Learn package queries, installations, repository mirroring, and maintaining a healthy system.",
    "completionTime": "25 mins",
    "badge": "Package Officer",
    "lessons": [
      {
        "id": "pkg-vs-apt",
        "title": "Pkg vs Apt & Cleanups",
        "objective": "Understand the difference between pkg and apt and clean up orphaned dependencies.",
        "content": "Termux provides `pkg` as a user-friendly wrapper over the Debian standard tool `apt`. `pkg` automatically selects correct architecture mirrors and refreshes lists. Use cleanup commands to save space on mobile.",
        "commands": [
          "pkg search python",
          "pkg install -y git",
          "pkg autoclean && pkg clean",
          "apt autoremove"
        ],
        "challenge": "Search for the 'neofetch' package alternative ('fastfetch') and install it, then run a cleanup to free storage cache."
      }
    ]
  },
  {
    "id": "shells-customization",
    "title": "Aesthetic Customization & Shells",
    "level": 3,
    "description": "Personalize Termux with colorful terminal prompts, modern shells, aliases, and system banners.",
    "completionTime": "40 mins",
    "badge": "Shell Architect",
    "lessons": [
      {
        "id": "zsh-ohmyzsh",
        "title": "Upgrading to Zsh & Starship Prompt",
        "objective": "Replace standard Bash with Zsh and install the blazing-fast Starship shell prompt.",
        "content": "Standard Bash gets the job done, but Zsh offers advanced auto-completion. Combined with Starship prompt, your terminal turns into a beautiful HUD showing Git branches, battery, and package versions.",
        "commands": [
          "pkg install zsh curl -y",
          "sh -c \"$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"",
          "curl -sS https://starship.rs/install.sh | sh",
          "echo 'eval \"$(starship init zsh)\"' >> ~/.zshrc"
        ],
        "challenge": "Configure Oh-My-Zsh with syntax highlighting plugins to auto-suggest commands you previously typed."
      }
    ]
  },
  {
    "id": "proot-linux",
    "title": "Full Linux Environments (PRoot)",
    "level": 4,
    "description": "Emulate full-scale Linux distributions like Ubuntu, Arch, or Debian with GUI access directly on your phone.",
    "completionTime": "60 mins",
    "badge": "Distro Commander",
    "lessons": [
      {
        "id": "proot-distro",
        "title": "Installing PRoot and Ubuntu",
        "objective": "Boot into Ubuntu inside Termux without rooting your Android device.",
        "content": "PRoot uses user namespaces and system call hooking to simulate a full Linux distribution. You can install apt packages, compile raw code, and run server tools.",
        "commands": [
          "pkg install proot-distro -y",
          "proot-distro list",
          "proot-distro install ubuntu",
          "proot-distro login ubuntu"
        ],
        "challenge": "Log into Ubuntu PRoot, run 'apt update', and install 'curl' inside the containerized Linux instance."
      }
    ]
  }
];

export const languages: Language[] = [
  {
    "id": "python",
    "name": "Python",
    "version": "3.12.x",
    "difficulty": "beginner",
    "installCmd": "pkg install python -y",
    "verifyCmd": "python --version",
    "packageManager": "pip / pipx / poetry / uv",
    "description": "High-level programming language ideal for script automation, data analysis, REST APIs, and deep web scraping.",
    "helloWorld": {
      "filename": "hello.py",
      "code": "print(\"Hello, Termux world!\")\n",
      "runCmd": "python hello.py"
    },
    "recommendedLibs": [
      "requests",
      "beautifulsoup4",
      "rich",
      "textual",
      "flask",
      "fastapi"
    ],
    "commonErrors": [
      {
        "error": "externally-managed-environment",
        "fix": "Python 3.11+ restricts pip installations globally. Use 'pipx install package' to install CLI scripts, or set up virtual environments with 'python -m venv venv && source venv/bin/activate'."
      },
      {
        "error": "Missing wheel build errors",
        "fix": "Install compilers with 'pkg install build-essential clang binutils python-cryptography -y' to compile binary wheels."
      }
    ]
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "version": "20.x / 22.x",
    "difficulty": "intermediate",
    "installCmd": "pkg install nodejs -y",
    "verifyCmd": "node --version",
    "packageManager": "npm / pnpm / yarn / bun",
    "description": "V8-powered runtime environment for running JavaScript or TypeScript on server side, supporting microservices and React compilers.",
    "helloWorld": {
      "filename": "hello.js",
      "code": "console.log(\"Hello from Node.js in Termux!\");\n",
      "runCmd": "node hello.js"
    },
    "recommendedLibs": [
      "express",
      "dotenv",
      "tsx",
      "nodemon",
      "socket.io",
      "typescript"
    ],
    "commonErrors": [
      {
        "error": "EACCES: permission denied",
        "fix": "Never run npm install with sudo or globally inside the primary Android directories. Install globally inside native home with prefix 'npm config set prefix ~/.npm-global'."
      }
    ]
  },
  {
    "id": "rust",
    "name": "Rust",
    "version": "1.78.x",
    "difficulty": "advanced",
    "installCmd": "pkg install rust -y",
    "verifyCmd": "rustc --version",
    "packageManager": "cargo",
    "description": "Type-safe systems programming language that compiles to high-performance machine code with memory safety guarantees.",
    "helloWorld": {
      "filename": "main.rs",
      "code": "fn main() {\n    println!(\"Hello from Rust on mobile metal!\");\n}\n",
      "runCmd": "rustc main.rs && ./main"
    },
    "recommendedLibs": [
      "tokio",
      "serde",
      "reqwest",
      "clap",
      "anyhow"
    ],
    "commonErrors": [
      {
        "error": "linker 'cc' not found",
        "fix": "Rust relies on the C compiler. Install the C compiler toolchain via 'pkg install build-essential clang binutils -y'."
      }
    ]
  }
];

export const commands: Command[] = [
  {
    "id": "ls",
    "command": "ls -la",
    "description": "Lists directory contents showing full details, permissions, owners, file size, and hidden dotfiles.",
    "syntax": "ls [OPTIONS] [DIRECTORY]",
    "category": "File Navigation",
    "difficulty": "beginner",
    "expectedOutput": "drwxr-xr-x  2 play play 4096 Jun 25 11:00 projects\n-rw-r--r--  1 play play  250 Jun 25 11:04 hello.py",
    "tags": [
      "list",
      "files",
      "basics"
    ]
  },
  {
    "id": "cd",
    "command": "cd ~/storage/shared",
    "description": "Switches the active shell buffer directory directly to your shared internal Android memory.",
    "syntax": "cd [PATH]",
    "category": "File Navigation",
    "difficulty": "beginner",
    "tags": [
      "navigate",
      "directory",
      "storage"
    ]
  },
  {
    "id": "termux-setup-storage",
    "command": "termux-setup-storage",
    "description": "Requests Android storage permission popup and creates symlinks inside '~/storage' for downloads, camera, and root folders.",
    "syntax": "termux-setup-storage",
    "category": "Termux Configuration",
    "difficulty": "beginner",
    "commonErrors": "If it fails, open Android Settings -> Apps -> Termux -> Permissions -> Storage -> Allow All Files.",
    "tags": [
      "permissions",
      "storage",
      "setup"
    ]
  },
  {
    "id": "termux-wake-lock",
    "command": "termux-wake-lock",
    "description": "Acquires system-level Wakelock to prevent Android from aggressively terminating background threads and servers during deep sleep.",
    "syntax": "termux-wake-lock",
    "category": "Power Optimization",
    "difficulty": "intermediate",
    "tags": [
      "wakelock",
      "background",
      "daemon"
    ]
  },
  {
    "id": "proot-login",
    "command": "proot-distro login ubuntu",
    "description": "Establishes a containerized Ubuntu session inside Termux filesystem allowing typical debian package execution.",
    "syntax": "proot-distro login [DISTRIBUTION]",
    "category": "Distribution Emulation",
    "difficulty": "advanced",
    "tags": [
      "ubuntu",
      "proot",
      "chroot"
    ]
  }
];

export const errorGuides: ErrorGuide[] = [
  {
    "id": "permission-denied",
    "title": "Permission Denied (sh / external storage)",
    "symptoms": "bash: ./script.sh: Permission denied OR cannot write to files inside external micro-SD / Android emulated card folders.",
    "cause": "Android locks block execution flags (chmod +x) inside paths formatted as FAT32/exFAT (which includes shared storage paths inside /sdcard). Scripts can only be executed directly if stored in the internal home directory (~).",
    "fix": "1. Move the file into home: 'mv /sdcard/script.sh ~'\n2. Grant execution flags: 'chmod +x ~/script.sh'\n3. Execute from home: './script.sh'.",
    "alternative": "If you must run it from storage, execute it explicitly with its interpreter, e.g., 'bash /sdcard/script.sh' or 'python /sdcard/script.py'."
  },
  {
    "id": "repository-offline",
    "title": "Repository Offline / Connection Failed",
    "symptoms": "Err:1 https://dl.bintray.com/termux/... Connection timed out OR 404 Not Found during 'pkg update'.",
    "cause": "Standard mirrors occasionally go offline, or Bintray decommissioned repositories are referenced by older builds.",
    "fix": "Update Termux repositories dynamically using the integrated selector:\n1. Execute: 'termux-change-repo'\n2. Choose 'Main Repository'\n3. Select 'Mirrors by Grimler' or 'Albatross' or 'USTC' using spacebar, then hit Enter.\n4. Run 'pkg update -y'."
  },
  {
    "id": "phantom-processes",
    "title": "Process completed (Signal 9 / Killed)",
    "symptoms": "Terminal prints '[Process completed (signal 9) - press Enter]' and completely crashes or halts during memory operations.",
    "cause": "Android 12+ introduces an aggressive 'Phantom Process Killer' daemon. If Termux spawns sub-processes that exceed 32 total threads, or use high RAM, the Android system terminates parent Termux buffers instantly.",
    "fix": "1. Connect your phone to PC via ADB.\n2. Run this shell query to disable phantom process terminations:\n'adb shell \"device_config put activity_manager max_phantom_processes 2147483647\"'\n3. Alternatively, acquire a persistent notification wakelock in Termux."
  }
];

export const packages: Package[] = [
  {
    "id": "git",
    "name": "Git",
    "category": "VCS",
    "description": "Distributed version control system to clone repositories, track files, and push changes to GitHub.",
    "installCmd": "pkg install git -y",
    "verifyCmd": "git --version",
    "updateCmd": "pkg install git --upgrade",
    "removeCmd": "pkg uninstall git -y",
    "homepage": "https://git-scm.com",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "ca-certificates"
    ],
    "examples": [
      {
        "t": "Initialize Git Repo",
        "c": "git init",
        "d": "Start a local repository in the current folder."
      },
      {
        "t": "Clone Repo",
        "c": "git clone https://github.com/termux/termux-packages.git",
        "d": "Clones remote repository to your device."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Git, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "gh",
    "name": "GitHub CLI",
    "category": "VCS",
    "description": "GitHub official command-line tool to manage pull requests, issues, gists, and more.",
    "installCmd": "pkg install gh -y",
    "verifyCmd": "gh --version",
    "updateCmd": "pkg install gh --upgrade",
    "removeCmd": "pkg uninstall gh -y",
    "homepage": "https://cli.github.com",
    "difficulty": "intermediate",
    "dependencies": [
      "git"
    ],
    "examples": [
      {
        "t": "Authenticate CLI",
        "c": "gh auth login",
        "d": "Authenticate with your GitHub account."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with GitHub CLI, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "lazygit",
    "name": "LazyGit",
    "category": "VCS",
    "description": "A simple terminal UI for git commands, written in Go with the gocui library.",
    "installCmd": "pkg install lazygit -y",
    "verifyCmd": "lazygit --version",
    "updateCmd": "pkg install lazygit --upgrade",
    "removeCmd": "pkg uninstall lazygit -y",
    "homepage": "https://github.com/jesseduffield/lazygit",
    "difficulty": "intermediate",
    "dependencies": [
      "git"
    ],
    "examples": [
      {
        "t": "Launch UI",
        "c": "lazygit",
        "d": "Open the interactive console git dashboard."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with LazyGit, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "tig",
    "name": "Tig",
    "category": "VCS",
    "description": "Text-mode interface for git. It acts mainly as a git repository browser and visualization companion.",
    "installCmd": "pkg install tig -y",
    "verifyCmd": "tig --version",
    "updateCmd": "pkg install tig --upgrade",
    "removeCmd": "pkg uninstall tig -y",
    "homepage": "https://jonas.github.io/tig",
    "difficulty": "intermediate",
    "dependencies": [
      "git"
    ],
    "examples": [
      {
        "t": "Show History",
        "c": "tig",
        "d": "Displays the interactive commits tree."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Tig, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "git-lfs",
    "name": "Git LFS",
    "category": "VCS",
    "description": "Git Large File Storage replaces large files with text pointers inside Git, saving space.",
    "installCmd": "pkg install git-lfs -y",
    "verifyCmd": "git-lfs --version",
    "updateCmd": "pkg install git-lfs --upgrade",
    "removeCmd": "pkg uninstall git-lfs -y",
    "homepage": "https://git-lfs.com",
    "difficulty": "intermediate",
    "dependencies": [
      "git"
    ],
    "examples": [
      {
        "t": "Install LFS Filters",
        "c": "git lfs install",
        "d": "Set up the global large file filters."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Git LFS, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "subversion",
    "name": "Subversion",
    "category": "VCS",
    "description": "Apache Subversion (SVN) command-line client, a centralized version control system.",
    "installCmd": "pkg install subversion -y",
    "verifyCmd": "svn --version",
    "updateCmd": "pkg install subversion --upgrade",
    "removeCmd": "pkg uninstall subversion -y",
    "homepage": "https://subversion.apache.org",
    "difficulty": "advanced",
    "dependencies": [
      "apr",
      "sqlite"
    ],
    "examples": [
      {
        "t": "Checkout Repo",
        "c": "svn checkout http://svn.example.com/repo",
        "d": "Downloads centralized SVN folder structure."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Subversion, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "mercurial",
    "name": "Mercurial",
    "category": "VCS",
    "description": "Free, distributed source control management tool efficiently handling projects of any size.",
    "installCmd": "pkg install mercurial -y",
    "verifyCmd": "hg --version",
    "updateCmd": "pkg install mercurial --upgrade",
    "removeCmd": "pkg uninstall mercurial -y",
    "homepage": "https://www.mercurial-scm.org",
    "difficulty": "advanced",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Initialize SCM",
        "c": "hg init",
        "d": "Creates a local Mercurial repository."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Mercurial, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "neovim",
    "name": "Neovim",
    "category": "Editor",
    "description": "Vim-fork focused on extensibility and usability, featuring full Lua scripts support.",
    "installCmd": "pkg install neovim -y",
    "verifyCmd": "nvim --version",
    "updateCmd": "pkg install neovim --upgrade",
    "removeCmd": "pkg uninstall neovim -y",
    "homepage": "https://neovim.io",
    "difficulty": "intermediate",
    "dependencies": [
      "luajit",
      "libuv"
    ],
    "examples": [
      {
        "t": "Open File",
        "c": "nvim main.py",
        "d": "Launches editor with target file."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Neovim, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "vim",
    "name": "Vim",
    "category": "Editor",
    "description": "Highly configurable text editor built to enable efficient text editing.",
    "installCmd": "pkg install vim -y",
    "verifyCmd": "vim --version",
    "updateCmd": "pkg install vim --upgrade",
    "removeCmd": "pkg uninstall vim -y",
    "homepage": "https://www.vim.org",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "Open Buffer",
        "c": "vim file.txt",
        "d": "Launches the standard Vim editor buffer."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Vim, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "nano",
    "name": "Nano",
    "category": "Editor",
    "description": "Friendly, lightweight text editor with easy on-screen keyboard shortcuts.",
    "installCmd": "pkg install nano -y",
    "verifyCmd": "nano --version",
    "updateCmd": "pkg install nano --upgrade",
    "removeCmd": "pkg uninstall nano -y",
    "homepage": "https://www.nano-editor.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Edit File",
        "c": "nano config.json",
        "d": "Launches easy edit panel."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Nano, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "emacs",
    "name": "Emacs",
    "category": "Editor",
    "description": "An extensible, customizable, self-documenting real-time display editor.",
    "installCmd": "pkg install emacs -y",
    "verifyCmd": "emacs --version",
    "updateCmd": "pkg install emacs --upgrade",
    "removeCmd": "pkg uninstall emacs -y",
    "homepage": "https://www.gnu.org/software/emacs",
    "difficulty": "advanced",
    "dependencies": [
      "ncurses",
      "libxml2"
    ],
    "examples": [
      {
        "t": "Start Console",
        "c": "emacs -nw",
        "d": "Launches Emacs inside terminal window without GUI."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Emacs, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "micro",
    "name": "Micro",
    "category": "Editor",
    "description": "A modern and intuitive terminal-based text editor with complete mouse support.",
    "installCmd": "pkg install micro -y",
    "verifyCmd": "micro --version",
    "updateCmd": "pkg install micro --upgrade",
    "removeCmd": "pkg uninstall micro -y",
    "homepage": "https://micro-editor.github.io",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open Editor",
        "c": "micro script.sh",
        "d": "Launches micro with easy Ctrl+C / Ctrl+V shortcuts."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Micro, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "helix",
    "name": "Helix",
    "category": "Editor",
    "description": "A post-modern modal text editor built in Rust with built-in LSP and tree-sitter support.",
    "installCmd": "pkg install helix -y",
    "verifyCmd": "hx --version",
    "updateCmd": "pkg install helix --upgrade",
    "removeCmd": "pkg uninstall helix -y",
    "homepage": "https://helix-editor.com",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Health",
        "c": "hx --health",
        "d": "Displays status of language servers."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Helix, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "joe",
    "name": "JOE",
    "category": "Editor",
    "description": "Joe's Own Editor, a simple, friendly, WordStar-like terminal text editor.",
    "installCmd": "pkg install joe -y",
    "verifyCmd": "joe --version",
    "updateCmd": "pkg install joe --upgrade",
    "removeCmd": "pkg uninstall joe -y",
    "homepage": "https://joe-editor.sourceforge.io",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Edit File",
        "c": "joe document.txt",
        "d": "Edits document.txt in simple terminal buffer."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with JOE, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "kakoune",
    "name": "Kakoune",
    "category": "Editor",
    "description": "Modal code editor with orthogonal design, emphasizing multiple selections and interactive filtering.",
    "installCmd": "pkg install kakoune -y",
    "verifyCmd": "kak --version",
    "updateCmd": "pkg install kakoune --upgrade",
    "removeCmd": "pkg uninstall kakoune -y",
    "homepage": "https://kakoune.org",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Launch Kakoune",
        "c": "kak main.cpp",
        "d": "Launches the Kakoune modal compiler view."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Kakoune, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "jed",
    "name": "Jed",
    "category": "Editor",
    "description": "Lightweight, customizable text editor utilizing the S-Lang extension language.",
    "installCmd": "pkg install jed -y",
    "verifyCmd": "jed --version",
    "updateCmd": "pkg install jed --upgrade",
    "removeCmd": "pkg uninstall jed -y",
    "homepage": "https://www.jedsoft.org/jed",
    "difficulty": "intermediate",
    "dependencies": [
      "libslang"
    ],
    "examples": [
      {
        "t": "Start Jed",
        "c": "jed text.txt",
        "d": "Launches Jed in console mode."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Jed, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "starship",
    "name": "Starship Prompt",
    "category": "Customization",
    "description": "The minimal, blazing-fast, and infinitely customizable prompt for any shell, built in Rust.",
    "installCmd": "curl -sS https://starship.rs/install.sh | sh",
    "verifyCmd": "starship --version",
    "updateCmd": "pkg install starship --upgrade",
    "removeCmd": "pkg uninstall starship -y",
    "homepage": "https://starship.rs",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Initialize Shell",
        "c": "echo 'eval \"$(starship init bash)\"' >> ~/.bashrc",
        "d": "Appends starship prompt loader inside standard bash."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Starship Prompt, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "stow",
    "name": "GNU Stow",
    "category": "Customization",
    "description": "Symlink farm manager which takes separate packages and makes them appear to be installed in the same place.",
    "installCmd": "pkg install stow -y",
    "verifyCmd": "stow --version",
    "updateCmd": "pkg install stow --upgrade",
    "removeCmd": "pkg uninstall stow -y",
    "homepage": "https://www.gnu.org/software/stow",
    "difficulty": "intermediate",
    "dependencies": [
      "perl"
    ],
    "examples": [
      {
        "t": "Stow Configs",
        "c": "stow nvim",
        "d": "Creates symlinks for nvim folder configs inside dotfiles."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with GNU Stow, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "tmux-powerline",
    "name": "Tmux Powerline",
    "category": "Customization",
    "description": "Extensible status bar generator for tmux utilizing beautiful status lines.",
    "installCmd": "pkg install tmux-powerline -y",
    "verifyCmd": "tmux-powerline --help",
    "updateCmd": "pkg install tmux-powerline --upgrade",
    "removeCmd": "pkg uninstall tmux-powerline -y",
    "homepage": "https://github.com/erikw/tmux-powerline",
    "difficulty": "intermediate",
    "dependencies": [
      "tmux"
    ],
    "examples": [
      {
        "t": "Verify Config",
        "c": "tmux-powerline daemon",
        "d": "Checks the status bar daemon runner."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Tmux Powerline, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "zsh-autosuggestions",
    "name": "Zsh Autosuggestions",
    "category": "Customization",
    "description": "Fish-like fast command suggestions for Zsh based on command execution history.",
    "installCmd": "pkg install zsh-autosuggestions -y",
    "verifyCmd": "ls -la $PREFIX/share/zsh-autosuggestions",
    "updateCmd": "pkg install zsh-autosuggestions --upgrade",
    "removeCmd": "pkg uninstall zsh-autosuggestions -y",
    "homepage": "https://github.com/zsh-users/zsh-autosuggestions",
    "difficulty": "beginner",
    "dependencies": [
      "zsh"
    ],
    "examples": [
      {
        "t": "Load Plugin",
        "c": "echo 'source $PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc",
        "d": "Integrates autosuggestions plugin."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Zsh Autosuggestions, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "zsh-syntax-highlighting",
    "name": "Zsh Syntax Highlighting",
    "category": "Customization",
    "description": "Fish-like real-time syntax highlighting for Zsh shell command input buffers.",
    "installCmd": "pkg install zsh-syntax-highlighting -y",
    "verifyCmd": "ls -la $PREFIX/share/zsh-syntax-highlighting",
    "updateCmd": "pkg install zsh-syntax-highlighting --upgrade",
    "removeCmd": "pkg uninstall zsh-syntax-highlighting -y",
    "homepage": "https://github.com/zsh-users/zsh-syntax-highlighting",
    "difficulty": "beginner",
    "dependencies": [
      "zsh"
    ],
    "examples": [
      {
        "t": "Enable Syntax Highlights",
        "c": "echo 'source $PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc",
        "d": "Launches prompt highlight engine."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Zsh Syntax Highlighting, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "bash-completion",
    "name": "Bash Completion",
    "category": "Customization",
    "description": "Programmable completion library for the GNU Bash shell to autocomplete flags and paths.",
    "installCmd": "pkg install bash-completion -y",
    "verifyCmd": "dpkg -s bash-completion",
    "updateCmd": "pkg install bash-completion --upgrade",
    "removeCmd": "pkg uninstall bash-completion -y",
    "homepage": "https://github.com/scop/bash-completion",
    "difficulty": "beginner",
    "dependencies": [
      "bash"
    ],
    "examples": [
      {
        "t": "Activate Completions",
        "c": "source $PREFIX/share/bash-completion/bash_completion",
        "d": "Loads auto-completion functions into Bash."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Bash Completion, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "tmux",
    "name": "Tmux",
    "category": "Utilities",
    "description": "Terminal multiplexer keeping background processes active even when sessions disconnect.",
    "installCmd": "pkg install tmux -y",
    "verifyCmd": "tmux -V",
    "updateCmd": "pkg install tmux --upgrade",
    "removeCmd": "pkg uninstall tmux -y",
    "homepage": "https://github.com/tmux/tmux",
    "difficulty": "intermediate",
    "dependencies": [
      "libevent",
      "ncurses"
    ],
    "examples": [
      {
        "t": "New Session",
        "c": "tmux new -s server",
        "d": "Creates active multiplexer named server."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Tmux, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "fastfetch",
    "name": "Fastfetch",
    "category": "Utilities",
    "description": "C-based modern system information collection and display tool (successor to neofetch).",
    "installCmd": "pkg install fastfetch -y",
    "verifyCmd": "fastfetch --version",
    "updateCmd": "pkg install fastfetch --upgrade",
    "removeCmd": "pkg uninstall fastfetch -y",
    "homepage": "https://github.com/fastfetch-cli/fastfetch",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Fetch stats",
        "c": "fastfetch",
        "d": "Displays CPU, shell, kernel, and Android details."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Fastfetch, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "neofetch",
    "name": "Neofetch",
    "category": "Utilities",
    "description": "Classic bash-based tool to gather system hardware and environment variables.",
    "installCmd": "pkg install neofetch -y",
    "verifyCmd": "neofetch --version",
    "updateCmd": "pkg install neofetch --upgrade",
    "removeCmd": "pkg uninstall neofetch -y",
    "homepage": "https://github.com/dylanaraps/neofetch",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Print Specs",
        "c": "neofetch",
        "d": "Renders details with Termux banner."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Neofetch, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "htop",
    "name": "Htop",
    "category": "Utilities",
    "description": "Interactive process viewer, system monitor, and process controller designed for terminal console.",
    "installCmd": "pkg install htop -y",
    "verifyCmd": "htop --version",
    "updateCmd": "pkg install htop --upgrade",
    "removeCmd": "pkg uninstall htop -y",
    "homepage": "https://htop.dev",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "Start Monitor",
        "c": "htop",
        "d": "Interactive visual thread and RAM panel."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Htop, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "btop",
    "name": "Btop",
    "category": "Utilities",
    "description": "Magnificent visual resource monitor showing CPU cores, disk space, and network load.",
    "installCmd": "pkg install btop -y",
    "verifyCmd": "btop --version",
    "updateCmd": "pkg install btop --upgrade",
    "removeCmd": "pkg uninstall btop -y",
    "homepage": "https://github.com/aristocratos/btop",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Launch Monitor",
        "c": "btop",
        "d": "Loads futuristic, gaming-style dashboard."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Btop, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "tree",
    "name": "Tree",
    "category": "Utilities",
    "description": "Recursive directory listing program that produces a depth-indented file tree format.",
    "installCmd": "pkg install tree -y",
    "verifyCmd": "tree --version",
    "updateCmd": "pkg install tree --upgrade",
    "removeCmd": "pkg uninstall tree -y",
    "homepage": "http://mama.indstate.edu/users/ice/tree",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "List Tree",
        "c": "tree -L 2",
        "d": "Prints folder contents up to 2 directories deep."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Tree, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "jq",
    "name": "Jq",
    "category": "Utilities",
    "description": "Lightweight and flexible command-line JSON processor to slice, filter, and map fields.",
    "installCmd": "pkg install jq -y",
    "verifyCmd": "jq --version",
    "updateCmd": "pkg install jq --upgrade",
    "removeCmd": "pkg uninstall jq -y",
    "homepage": "https://jqlang.github.io/jq",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Pretty Print JSON",
        "c": "echo '{\"name\":\"termux\"}' | jq .",
        "d": "Beautifies JSON structures."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Jq, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "fzf",
    "name": "Fzf",
    "category": "Utilities",
    "description": "Blazing fast general-purpose command-line fuzzy finder for files, history, and hosts.",
    "installCmd": "pkg install fzf -y",
    "verifyCmd": "fzf --version",
    "updateCmd": "pkg install fzf --upgrade",
    "removeCmd": "pkg uninstall fzf -y",
    "homepage": "https://github.com/junegunn/fzf",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Fuzzy Find File",
        "c": "find . | fzf",
        "d": "Interactive typing filter panel."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Fzf, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ripgrep",
    "name": "Ripgrep (rg)",
    "category": "Utilities",
    "description": "Line-oriented search tool that recursively searches directories for regex patterns.",
    "installCmd": "pkg install ripgrep -y",
    "verifyCmd": "rg --version",
    "updateCmd": "pkg install ripgrep --upgrade",
    "removeCmd": "pkg uninstall ripgrep -y",
    "homepage": "https://github.com/BurntSushi/ripgrep",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Search Pattern",
        "c": "rg 'TODO' .",
        "d": "Finds text in workspace files rapidly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Ripgrep (rg), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "fd-find",
    "name": "Fd (fd-find)",
    "category": "Utilities",
    "description": "Simple, fast and user-friendly alternative to find command, ignoring hidden folders.",
    "installCmd": "pkg install fd -y",
    "verifyCmd": "fd --version",
    "updateCmd": "pkg install fd-find --upgrade",
    "removeCmd": "pkg uninstall fd-find -y",
    "homepage": "https://github.com/sharkdp/fd",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Find Py Files",
        "c": "fd -e py",
        "d": "Find all python scripts instantly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Fd (fd-find), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "bat",
    "name": "Bat",
    "category": "Utilities",
    "description": "A cat clone with syntax highlighting, git integration, and automatic paging.",
    "installCmd": "pkg install bat -y",
    "verifyCmd": "bat --version",
    "updateCmd": "pkg install bat --upgrade",
    "removeCmd": "pkg uninstall bat -y",
    "homepage": "https://github.com/sharkdp/bat",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "View File",
        "c": "bat server.js",
        "d": "Shows syntax highlighted server file."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Bat, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "exa",
    "name": "Exa",
    "category": "Utilities",
    "description": "Modern replacement for the ancient 'ls' command, using color-coded folders and icons.",
    "installCmd": "pkg install exa -y",
    "verifyCmd": "exa --version",
    "updateCmd": "pkg install exa --upgrade",
    "removeCmd": "pkg uninstall exa -y",
    "homepage": "https://the.exa.website",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Detailed List",
        "c": "exa -la --git",
        "d": "Lists details including current Git file state."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Exa, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "lsd",
    "name": "Lsd",
    "category": "Utilities",
    "description": "Next generation ls command with beautiful icons, colorization, and customizable views.",
    "installCmd": "pkg install lsd -y",
    "verifyCmd": "lsd --version",
    "updateCmd": "pkg install lsd --upgrade",
    "removeCmd": "pkg uninstall lsd -y",
    "homepage": "https://github.com/lsd-rs/lsd",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Rich List",
        "c": "lsd -la",
        "d": "Beautified ls with file type icons."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Lsd, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "zoxide",
    "name": "Zoxide",
    "category": "Utilities",
    "description": "Smarter cd command that learns your habits, allowing you to jump to directories easily.",
    "installCmd": "pkg install zoxide -y",
    "verifyCmd": "zoxide --version",
    "updateCmd": "pkg install zoxide --upgrade",
    "removeCmd": "pkg uninstall zoxide -y",
    "homepage": "https://github.com/ajeetdsouza/zoxide",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Initialize Shell",
        "c": "echo 'eval \"$(zoxide init bash)\"' >> ~/.bashrc",
        "d": "Integrates quick jump helper."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Zoxide, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "direnv",
    "name": "Direnv",
    "category": "Utilities",
    "description": "Shell extension that loads/unloads environment variables depending on active folder.",
    "installCmd": "pkg install direnv -y",
    "verifyCmd": "direnv --version",
    "updateCmd": "pkg install direnv --upgrade",
    "removeCmd": "pkg uninstall direnv -y",
    "homepage": "https://direnv.net",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Allow Folder",
        "c": "direnv allow .",
        "d": "Loads env file for current folder."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Direnv, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ranger",
    "name": "Ranger",
    "category": "Utilities",
    "description": "Vim-like console file manager written in Python, featuring hierarchical column views.",
    "installCmd": "pkg install ranger -y",
    "verifyCmd": "ranger --version",
    "updateCmd": "pkg install ranger --upgrade",
    "removeCmd": "pkg uninstall ranger -y",
    "homepage": "https://ranger.github.io",
    "difficulty": "intermediate",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Open GUI",
        "c": "ranger",
        "d": "Loads terminal pane file browser."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Ranger, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "nnn",
    "name": "Nnn",
    "category": "Utilities",
    "description": "Incredibly fast, low-footprint, responsive terminal file manager.",
    "installCmd": "pkg install nnn -y",
    "verifyCmd": "nnn -h",
    "updateCmd": "pkg install nnn --upgrade",
    "removeCmd": "pkg uninstall nnn -y",
    "homepage": "https://github.com/jarun/nnn",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open Browser",
        "c": "nnn",
        "d": "Launches raw, lightweight folder indexer."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Nnn, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "mc",
    "name": "Midnight Commander",
    "category": "Utilities",
    "description": "Classic dual-pane visual directory browser and file manager.",
    "installCmd": "pkg install mc -y",
    "verifyCmd": "mc --version",
    "updateCmd": "pkg install mc --upgrade",
    "removeCmd": "pkg uninstall mc -y",
    "homepage": "https://midnight-commander.org",
    "difficulty": "beginner",
    "dependencies": [
      "glib",
      "ncurses"
    ],
    "examples": [
      {
        "t": "Launch MC",
        "c": "mc",
        "d": "Launches side-by-side terminal directories panels."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Midnight Commander, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ncdu",
    "name": "Ncdu",
    "category": "Utilities",
    "description": "Disk usage analyzer with an interactive ncurses interface, perfect for mobile devices.",
    "installCmd": "pkg install ncdu -y",
    "verifyCmd": "ncdu -v",
    "updateCmd": "pkg install ncdu --upgrade",
    "removeCmd": "pkg uninstall ncdu -y",
    "homepage": "https://dev.yorhel.nl/ncdu",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "Analyze Space",
        "c": "ncdu ~",
        "d": "Calculates storage overhead in home folder."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Ncdu, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "duf",
    "name": "Duf",
    "category": "Utilities",
    "description": "Disk Usage/Free Utility with a beautiful, user-friendly visual layout.",
    "installCmd": "pkg install duf -y",
    "verifyCmd": "duf --version",
    "updateCmd": "pkg install duf --upgrade",
    "removeCmd": "pkg uninstall duf -y",
    "homepage": "https://github.com/muesli/duf",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Storage",
        "c": "duf",
        "d": "Prints visual charts of mounted volumes."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Duf, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "dust",
    "name": "Dust",
    "category": "Utilities",
    "description": "A more intuitive version of 'du' written in Rust, showing disk space hierarchy tree.",
    "installCmd": "pkg install dust -y",
    "verifyCmd": "dust --version",
    "updateCmd": "pkg install dust --upgrade",
    "removeCmd": "pkg uninstall dust -y",
    "homepage": "https://github.com/bootandy/dust",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Usage",
        "c": "dust",
        "d": "Prints disk consumption breakdown tree."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Dust, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "tldr",
    "name": "TLDR Pages",
    "category": "Utilities",
    "description": "Simplified and community-driven man pages, focusing on practical command examples.",
    "installCmd": "pkg install tldr -y",
    "verifyCmd": "tldr --version",
    "updateCmd": "pkg install tldr --upgrade",
    "removeCmd": "pkg uninstall tldr -y",
    "homepage": "https://tldr.sh",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Examples",
        "c": "tldr tar",
        "d": "Prints rapid summary cheat sheet of tar."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with TLDR Pages, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "cheat",
    "name": "Cheat",
    "category": "Utilities",
    "description": "Interactive command-line cheat sheets for system administrators and developers.",
    "installCmd": "pkg install cheat -y",
    "verifyCmd": "cheat --version",
    "updateCmd": "pkg install cheat --upgrade",
    "removeCmd": "pkg uninstall cheat -y",
    "homepage": "https://github.com/cheat/cheat",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Find Command",
        "c": "cheat tar",
        "d": "Get immediate plain explanations."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Cheat, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "man",
    "name": "Man Pages",
    "category": "Utilities",
    "description": "Standard Linux documentation manuals giving thorough syntax specifications.",
    "installCmd": "pkg install man -y",
    "verifyCmd": "man -V",
    "updateCmd": "pkg install man --upgrade",
    "removeCmd": "pkg uninstall man -y",
    "homepage": "https://en.wikipedia.org/wiki/Man_page",
    "difficulty": "beginner",
    "dependencies": [
      "less"
    ],
    "examples": [
      {
        "t": "Read Manual",
        "c": "man ls",
        "d": "Open extensive text documentation."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Man Pages, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "info",
    "name": "Info Pages",
    "category": "Utilities",
    "description": "Hyperlinked system documentation and reference manual viewer.",
    "installCmd": "pkg install info -y",
    "verifyCmd": "info --version",
    "updateCmd": "pkg install info --upgrade",
    "removeCmd": "pkg uninstall info -y",
    "homepage": "https://www.gnu.org/software/texinfo",
    "difficulty": "intermediate",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "View Index",
        "c": "info coreutils",
        "d": "Browse core utils hierarchical menus."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Info Pages, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ack",
    "name": "Ack",
    "category": "Utilities",
    "description": "Grep-like tool optimized for searching large source code repositories.",
    "installCmd": "pkg install ack -y",
    "verifyCmd": "ack --version",
    "updateCmd": "pkg install ack --upgrade",
    "removeCmd": "pkg uninstall ack -y",
    "homepage": "https://beyondgrep.com",
    "difficulty": "intermediate",
    "dependencies": [
      "perl"
    ],
    "examples": [
      {
        "t": "Search Code",
        "c": "ack 'function' .",
        "d": "Searches JS or TS files for text pattern."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Ack, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ag",
    "name": "The Silver Searcher (ag)",
    "category": "Utilities",
    "description": "Code-searching tool similar to ack but significantly faster.",
    "installCmd": "pkg install the-silver-searcher -y",
    "verifyCmd": "ag --version",
    "updateCmd": "pkg install ag --upgrade",
    "removeCmd": "pkg uninstall ag -y",
    "homepage": "https://geoff.greer.fm/ag",
    "difficulty": "intermediate",
    "dependencies": [
      "pcre",
      "xz"
    ],
    "examples": [
      {
        "t": "Find Pattern",
        "c": "ag 'route' src/",
        "d": "Scans files in src subdirectory."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with The Silver Searcher (ag), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "entr",
    "name": "Entr",
    "category": "Utilities",
    "description": "Event-based shell runner, executing commands whenever designated files change.",
    "installCmd": "pkg install entr -y",
    "verifyCmd": "entr -h",
    "updateCmd": "pkg install entr --upgrade",
    "removeCmd": "pkg uninstall entr -y",
    "homepage": "https://eradman.com/entrproject",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Auto-compile",
        "c": "find . -name '*.py' | entr python main.py",
        "d": "Runs script whenever py files are edited."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Entr, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "bc",
    "name": "Bc (Calculator)",
    "category": "Utilities",
    "description": "Arbitrary-precision CLI mathematical scripting engine.",
    "installCmd": "pkg install bc -y",
    "verifyCmd": "bc --version",
    "updateCmd": "pkg install bc --upgrade",
    "removeCmd": "pkg uninstall bc -y",
    "homepage": "https://www.gnu.org/software/bc",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Run Math",
        "c": "echo 'scale=4; 355/113' | bc",
        "d": "Runs division with decimal precision."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Bc (Calculator), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "figlet",
    "name": "Figlet",
    "category": "Utilities",
    "description": "Prints large terminal banner letters utilizing standard text inputs.",
    "installCmd": "pkg install figlet -y",
    "verifyCmd": "figlet -v",
    "updateCmd": "pkg install figlet --upgrade",
    "removeCmd": "pkg uninstall figlet -y",
    "homepage": "http://www.figlet.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Banner",
        "c": "figlet Termux",
        "d": "Renders visual Termux ASCII letters."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Figlet, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "toilet",
    "name": "Toilet",
    "category": "Utilities",
    "description": "Renders gorgeous colored ASCII arts text fonts using libcaca libraries.",
    "installCmd": "pkg install toilet -y",
    "verifyCmd": "toilet --version",
    "updateCmd": "pkg install toilet --upgrade",
    "removeCmd": "pkg uninstall toilet -y",
    "homepage": "http://caca.zoy.org/wiki/toilet",
    "difficulty": "beginner",
    "dependencies": [
      "libcaca"
    ],
    "examples": [
      {
        "t": "Color Banner",
        "c": "toilet -f mono12 -F metal Termux",
        "d": "Generates beautiful metallic title banner."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Toilet, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "cowsay",
    "name": "Cowsay",
    "category": "Utilities",
    "description": "Generates talking terminal animal ASCII figures with speech bubbles.",
    "installCmd": "pkg install cowsay -y",
    "verifyCmd": "cowsay -h",
    "updateCmd": "pkg install cowsay --upgrade",
    "removeCmd": "pkg uninstall cowsay -y",
    "homepage": "https://github.com/toby/cowsay",
    "difficulty": "beginner",
    "dependencies": [
      "perl"
    ],
    "examples": [
      {
        "t": "Cow Quote",
        "c": "cowsay 'Welcome to Termux'",
        "d": "Draws talking terminal cow."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Cowsay, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "lolcat",
    "name": "Lolcat",
    "category": "Utilities",
    "description": "Concats files and prompts to output rainbow gradients in terminal screens.",
    "installCmd": "pkg install lolcat -y",
    "verifyCmd": "lolcat --version",
    "updateCmd": "pkg install lolcat --upgrade",
    "removeCmd": "pkg uninstall lolcat -y",
    "homepage": "https://github.com/busyloop/lolcat",
    "difficulty": "beginner",
    "dependencies": [
      "ruby"
    ],
    "examples": [
      {
        "t": "Rainbow Fetch",
        "c": "fastfetch | lolcat",
        "d": "Colors fastfetch summary in rainbow."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Lolcat, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "sl",
    "name": "Steam Locomotive (sl)",
    "category": "Utilities",
    "description": "Famous terminal joke rendering a locomotive train to cure typos of 'ls'.",
    "installCmd": "pkg install sl -y",
    "verifyCmd": "sl -h",
    "updateCmd": "pkg install sl --upgrade",
    "removeCmd": "pkg uninstall sl -y",
    "homepage": "https://github.com/mtoyoda/sl",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "Chug Train",
        "c": "sl",
        "d": "Renders steam locomotive across screen."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Steam Locomotive (sl), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "fortune",
    "name": "Fortune",
    "category": "Utilities",
    "description": "Renders witty quotes, jokes, or predictions inside terminal logs.",
    "installCmd": "pkg install fortune -y",
    "verifyCmd": "fortune -v",
    "updateCmd": "pkg install fortune --upgrade",
    "removeCmd": "pkg uninstall fortune -y",
    "homepage": "https://github.com/shlomif/fortune-mod",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Quote",
        "c": "fortune",
        "d": "Outputs random selection text quote."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Fortune, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "curl",
    "name": "Curl",
    "category": "Networking",
    "description": "Command-line tool to fetch data from URLs, supporting HTTP, HTTPS, FTP, and more.",
    "installCmd": "pkg install curl -y",
    "verifyCmd": "curl --version",
    "updateCmd": "pkg install curl --upgrade",
    "removeCmd": "pkg uninstall curl -y",
    "homepage": "https://curl.se",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "libnghttp2"
    ],
    "examples": [
      {
        "t": "Get JSON",
        "c": "curl https://api.github.com/users/termux",
        "d": "Fetches user details profile."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Curl, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "wget",
    "name": "Wget",
    "category": "Networking",
    "description": "Non-interactive network retriever supporting downloads over HTTP, HTTPS, and FTP.",
    "installCmd": "pkg install wget -y",
    "verifyCmd": "wget --version",
    "updateCmd": "pkg install wget --upgrade",
    "removeCmd": "pkg uninstall wget -y",
    "homepage": "https://www.gnu.org/software/wget",
    "difficulty": "beginner",
    "dependencies": [
      "openssl"
    ],
    "examples": [
      {
        "t": "Download File",
        "c": "wget https://example.com/file.zip",
        "d": "Saves file.zip to device home."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Wget, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "aria2",
    "name": "Aria2",
    "category": "Networking",
    "description": "Lightweight multi-protocol & multi-source download utility, supporting BitTorrent and magnet links.",
    "installCmd": "pkg install aria2 -y",
    "verifyCmd": "aria2c --version",
    "updateCmd": "pkg install aria2 --upgrade",
    "removeCmd": "pkg uninstall aria2 -y",
    "homepage": "https://aria2.github.io",
    "difficulty": "intermediate",
    "dependencies": [
      "sqlite",
      "openssl"
    ],
    "examples": [
      {
        "t": "Speedy Download",
        "c": "aria2c -x 16 -s 16 http://example.com/file",
        "d": "Multi-threaded split download."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Aria2, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "openssh",
    "name": "OpenSSH",
    "category": "Networking",
    "description": "The premier connectivity tool for secure remote logins via SSH protocol.",
    "installCmd": "pkg install openssh -y",
    "verifyCmd": "ssh -V",
    "updateCmd": "pkg install openssh --upgrade",
    "removeCmd": "pkg uninstall openssh -y",
    "homepage": "https://www.openssh.com",
    "difficulty": "intermediate",
    "dependencies": [
      "openssl",
      "ldns"
    ],
    "examples": [
      {
        "t": "Connect VM",
        "c": "ssh user@host.com",
        "d": "Establishes terminal connection to server."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with OpenSSH, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "dropbear",
    "name": "Dropbear",
    "category": "Networking",
    "description": "Super lightweight SSH server and client designed specifically for embedded networks.",
    "installCmd": "pkg install dropbear -y",
    "verifyCmd": "dropbear -V",
    "updateCmd": "pkg install dropbear --upgrade",
    "removeCmd": "pkg uninstall dropbear -y",
    "homepage": "https://matt.ucc.asn.au/dropbear/dropbear.html",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Start Host",
        "c": "dropbear -p 2222",
        "d": "Launches SSH server on port 2222."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Dropbear, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "netcat",
    "name": "Netcat (nc)",
    "category": "Networking",
    "description": "Utility reading and writing raw data across network TCP and UDP socket connections.",
    "installCmd": "pkg install netcat -y",
    "verifyCmd": "nc -h",
    "updateCmd": "pkg install netcat --upgrade",
    "removeCmd": "pkg uninstall netcat -y",
    "homepage": "https://nc110.sourceforge.io",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Listen Port",
        "c": "nc -l -p 8080",
        "d": "Binds port 8080 to display raw socket incoming text."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Netcat (nc), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "socat",
    "name": "Socat",
    "category": "Networking",
    "description": "Multipurpose relay tool establishing bidirectional data streams between two endpoints.",
    "installCmd": "pkg install socat -y",
    "verifyCmd": "socat -V",
    "updateCmd": "pkg install socat --upgrade",
    "removeCmd": "pkg uninstall socat -y",
    "homepage": "http://www.dest-unreach.org/socat",
    "difficulty": "advanced",
    "dependencies": [
      "openssl",
      "readline"
    ],
    "examples": [
      {
        "t": "Proxy Port",
        "c": "socat TCP-LISTEN:80,fork TCP:192.168.1.5:80",
        "d": "Establishes port forwarder."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Socat, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "traceroute",
    "name": "Traceroute",
    "category": "Networking",
    "description": "Traces the packet path route from your local phone across global networks.",
    "installCmd": "pkg install traceroute -y",
    "verifyCmd": "traceroute --version",
    "updateCmd": "pkg install traceroute --upgrade",
    "removeCmd": "pkg uninstall traceroute -y",
    "homepage": "http://traceroute.sourceforge.net",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Trace IP",
        "c": "traceroute 8.8.8.8",
        "d": "Displays hop routers list."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Traceroute, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "dnsutils",
    "name": "Dnsutils",
    "category": "Networking",
    "description": "Package providing standard lookup tools like 'dig' and 'nslookup' for domain testing.",
    "installCmd": "pkg install dnsutils -y",
    "verifyCmd": "dig -v",
    "updateCmd": "pkg install dnsutils --upgrade",
    "removeCmd": "pkg uninstall dnsutils -y",
    "homepage": "https://www.isc.org/bind",
    "difficulty": "intermediate",
    "dependencies": [
      "openssl"
    ],
    "examples": [
      {
        "t": "NS Dig",
        "c": "dig google.com A",
        "d": "Returns IP details."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Dnsutils, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "whois",
    "name": "Whois",
    "category": "Networking",
    "description": "Intelligent lookup client querying domain registration records database.",
    "installCmd": "pkg install whois -y",
    "verifyCmd": "whois --version",
    "updateCmd": "pkg install whois --upgrade",
    "removeCmd": "pkg uninstall whois -y",
    "homepage": "https://github.com/rfc1036/whois",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Domain",
        "c": "whois github.com",
        "d": "Returns domain details."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Whois, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "speedtest-cli",
    "name": "Speedtest CLI",
    "category": "Networking",
    "description": "Command-line interface to test internet bandwidth performance using Ookla servers.",
    "installCmd": "pkg install speedtest-cli -y",
    "verifyCmd": "speedtest-cli --version",
    "updateCmd": "pkg install speedtest-cli --upgrade",
    "removeCmd": "pkg uninstall speedtest-cli -y",
    "homepage": "https://github.com/sivel/speedtest-cli",
    "difficulty": "beginner",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Speedtest",
        "c": "speedtest-cli",
        "d": "Tests latency, upload, and download speeds."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Speedtest CLI, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "httpie",
    "name": "HTTPie",
    "category": "Networking",
    "description": "User-friendly CLI HTTP client, a command-line curl replacement with colored logs.",
    "installCmd": "pkg install httpie -y",
    "verifyCmd": "http --version",
    "updateCmd": "pkg install httpie --upgrade",
    "removeCmd": "pkg uninstall httpie -y",
    "homepage": "https://httpie.io",
    "difficulty": "beginner",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Post JSON",
        "c": "http POST api.com name=Termux",
        "d": "Posts JSON query parameters elegantly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with HTTPie, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "rsync",
    "name": "Rsync",
    "category": "Networking",
    "description": "Fast incremental file transfer utility synchronizing directories over SSH.",
    "installCmd": "pkg install rsync -y",
    "verifyCmd": "rsync --version",
    "updateCmd": "pkg install rsync --upgrade",
    "removeCmd": "pkg uninstall rsync -y",
    "homepage": "https://rsync.samba.org",
    "difficulty": "intermediate",
    "dependencies": [
      "openssh"
    ],
    "examples": [
      {
        "t": "Sync Folders",
        "c": "rsync -avz ~/projects user@host:/backup",
        "d": "Synchronizes local folder with server."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Rsync, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "rclone",
    "name": "Rclone",
    "category": "Networking",
    "description": "The swiss army knife of cloud storage, mounting and syncing files to Google Drive, S3, Dropbox.",
    "installCmd": "pkg install rclone -y",
    "verifyCmd": "rclone --version",
    "updateCmd": "pkg install rclone --upgrade",
    "removeCmd": "pkg uninstall rclone -y",
    "homepage": "https://rclone.org",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "List S3 Bucket",
        "c": "rclone lsf mydrive:bucket",
        "d": "Lists folders in cloud drive."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Rclone, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "mosh",
    "name": "Mosh (Mobile Shell)",
    "category": "Networking",
    "description": "Replacement for SSH designed specifically for mobile devices with high latency and unstable connections.",
    "installCmd": "pkg install mosh -y",
    "verifyCmd": "mosh --version",
    "updateCmd": "pkg install mosh --upgrade",
    "removeCmd": "pkg uninstall mosh -y",
    "homepage": "https://mosh.org",
    "difficulty": "intermediate",
    "dependencies": [
      "protobuf",
      "openssl"
    ],
    "examples": [
      {
        "t": "Connect VM",
        "c": "mosh user@host.com",
        "d": "Launches connection resilient to cellular drops."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Mosh (Mobile Shell), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "nmap",
    "name": "Nmap",
    "category": "Security",
    "description": "Network exploration and security auditing tool scanning ports and services.",
    "installCmd": "pkg install nmap -y",
    "verifyCmd": "nmap --version",
    "updateCmd": "pkg install nmap --upgrade",
    "removeCmd": "pkg uninstall nmap -y",
    "homepage": "https://nmap.org",
    "difficulty": "intermediate",
    "dependencies": [
      "openssl",
      "libpcap"
    ],
    "examples": [
      {
        "t": "Scan Router",
        "c": "nmap -F 192.168.1.1",
        "d": "Quick scans standard ports."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Nmap, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "subfinder",
    "name": "Subfinder",
    "category": "Security",
    "description": "Subdomain discovery tool finding valid subdomains for websites using passive online lists.",
    "installCmd": "pkg install subfinder -y",
    "verifyCmd": "subfinder -version",
    "updateCmd": "pkg install subfinder --upgrade",
    "removeCmd": "pkg uninstall subfinder -y",
    "homepage": "https://github.com/projectdiscovery/subfinder",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Find Subdomains",
        "c": "subfinder -d github.com",
        "d": "Lists passive subdomains records."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Subfinder, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "sqlmap",
    "name": "SQLmap",
    "category": "Security",
    "description": "Automatic SQL injection and database takeover penetration testing utility.",
    "installCmd": "pkg install sqlmap -y",
    "verifyCmd": "sqlmap --version",
    "updateCmd": "pkg install sqlmap --upgrade",
    "removeCmd": "pkg uninstall sqlmap -y",
    "homepage": "https://sqlmap.org",
    "difficulty": "advanced",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Scan SQL Inj",
        "c": "sqlmap -u 'http://site.com/id=1'",
        "d": "Tests SQL parameters."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with SQLmap, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "hydra",
    "name": "Hydra",
    "category": "Security",
    "description": "Very fast network logon cracker supporting SSH, FTP, HTTP, database brute force.",
    "installCmd": "pkg install hydra -y",
    "verifyCmd": "hydra -h",
    "updateCmd": "pkg install hydra --upgrade",
    "removeCmd": "pkg uninstall hydra -y",
    "homepage": "https://github.com/vanhauser-thc/thc-hydra",
    "difficulty": "advanced",
    "dependencies": [
      "openssl",
      "libpcre"
    ],
    "examples": [
      {
        "t": "SSH Brute",
        "c": "hydra -l admin -P passlist.txt ssh://192.168.1.1",
        "d": "Launches test against local router."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Hydra, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "gnupg",
    "name": "GnuPG (GPG)",
    "category": "Security",
    "description": "GNU Privacy Guard, implementing the OpenPGP standard for secure file encryption and signing.",
    "installCmd": "pkg install gnupg -y",
    "verifyCmd": "gpg --version",
    "updateCmd": "pkg install gnupg --upgrade",
    "removeCmd": "pkg uninstall gnupg -y",
    "homepage": "https://gnupg.org",
    "difficulty": "intermediate",
    "dependencies": [
      "readline"
    ],
    "examples": [
      {
        "t": "Encrypt File",
        "c": "gpg -c document.txt",
        "d": "Creates symmetric password encrypted file."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with GnuPG (GPG), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "pass",
    "name": "Pass (Password Store)",
    "category": "Security",
    "description": "Standard unix password manager keeping credentials safe using GPG encryption.",
    "installCmd": "pkg install pass -y",
    "verifyCmd": "pass version",
    "updateCmd": "pkg install pass --upgrade",
    "removeCmd": "pkg uninstall pass -y",
    "homepage": "https://www.passwordstore.org",
    "difficulty": "intermediate",
    "dependencies": [
      "gnupg",
      "git"
    ],
    "examples": [
      {
        "t": "Insert Pass",
        "c": "pass insert accounts/email",
        "d": "Adds a password to encrypted tree."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Pass (Password Store), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "hashcat",
    "name": "Hashcat",
    "category": "Security",
    "description": "The world's fastest utility for password recovery and multi-format hash cracking.",
    "installCmd": "pkg install hashcat -y",
    "verifyCmd": "hashcat --version",
    "updateCmd": "pkg install hashcat --upgrade",
    "removeCmd": "pkg uninstall hashcat -y",
    "homepage": "https://hashcat.net",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Benchmark",
        "c": "hashcat -b",
        "d": "Tests CPU hashing capabilities."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Hashcat, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "john",
    "name": "John the Ripper",
    "category": "Security",
    "description": "Advanced password cracker with robust dictionary attacks.",
    "installCmd": "pkg install john -y",
    "verifyCmd": "john",
    "updateCmd": "pkg install john --upgrade",
    "removeCmd": "pkg uninstall john -y",
    "homepage": "https://www.openwall.com/john",
    "difficulty": "advanced",
    "dependencies": [
      "openssl"
    ],
    "examples": [
      {
        "t": "Crack File",
        "c": "john --wordlist=words.txt hash.txt",
        "d": "Launches local dictionary test."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with John the Ripper, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "python",
    "name": "Python",
    "category": "Development",
    "description": "High-level programming language ideal for script automation, data analysis, and REST APIs.",
    "installCmd": "pkg install python -y",
    "verifyCmd": "python --version",
    "updateCmd": "pkg install python --upgrade",
    "removeCmd": "pkg uninstall python -y",
    "homepage": "https://python.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Hello Py",
        "c": "python -c 'print(\"Hi\")'",
        "d": "Prints a standard python string."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Python, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "category": "Development",
    "description": "Node JS JavaScript runtime environment for microservices and React compilers.",
    "installCmd": "pkg install nodejs -y",
    "verifyCmd": "node --version",
    "updateCmd": "pkg install nodejs --upgrade",
    "removeCmd": "pkg uninstall nodejs -y",
    "homepage": "https://nodejs.org",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Run Node",
        "c": "node -e 'console.log(\"Hello Node\")'",
        "d": "Executes inline JS."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Node.js, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "golang",
    "name": "Golang",
    "category": "Development",
    "description": "Open source compiled language developed by Google, famous for cloud tools.",
    "installCmd": "pkg install golang -y",
    "verifyCmd": "go version",
    "updateCmd": "pkg install golang --upgrade",
    "removeCmd": "pkg uninstall golang -y",
    "homepage": "https://go.dev",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Compile App",
        "c": "go build main.go",
        "d": "Compiles binary instantly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Golang, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "rust",
    "name": "Rust",
    "category": "Development",
    "description": "Safe systems programming language that compiles to fast native code.",
    "installCmd": "pkg install rust -y",
    "verifyCmd": "rustc --version",
    "updateCmd": "pkg install rust --upgrade",
    "removeCmd": "pkg uninstall rust -y",
    "homepage": "https://rust-lang.org",
    "difficulty": "advanced",
    "dependencies": [
      "clang"
    ],
    "examples": [
      {
        "t": "Cargo New",
        "c": "cargo new my_app",
        "d": "Initializes safe Rust workspace."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Rust, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "clang",
    "name": "Clang (C Compiler)",
    "category": "Development",
    "description": "C/C++ compiler front-end utilizing the LLVM optimizer engine.",
    "installCmd": "pkg install clang -y",
    "verifyCmd": "clang --version",
    "updateCmd": "pkg install clang --upgrade",
    "removeCmd": "pkg uninstall clang -y",
    "homepage": "https://clang.llvm.org",
    "difficulty": "intermediate",
    "dependencies": [
      "binutils"
    ],
    "examples": [
      {
        "t": "Compile C",
        "c": "clang hello.c -o hello",
        "d": "Compiles hello.c directly to native ARM bin."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Clang (C Compiler), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "make",
    "name": "Make",
    "category": "Development",
    "description": "GNU make utility to compile and link complex software packages automatically.",
    "installCmd": "pkg install make -y",
    "verifyCmd": "make --version",
    "updateCmd": "pkg install make --upgrade",
    "removeCmd": "pkg uninstall make -y",
    "homepage": "https://www.gnu.org/software/make",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Execute Makefile",
        "c": "make && make install",
        "d": "Triggers compilation sequence instructions."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Make, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "cmake",
    "name": "CMake",
    "category": "Development",
    "description": "Cross-platform family of tools designed to build, test and package software.",
    "installCmd": "pkg install cmake -y",
    "verifyCmd": "cmake --version",
    "updateCmd": "pkg install cmake --upgrade",
    "removeCmd": "pkg uninstall cmake -y",
    "homepage": "https://cmake.org",
    "difficulty": "advanced",
    "dependencies": [
      "clang",
      "make"
    ],
    "examples": [
      {
        "t": "Configure Build",
        "c": "cmake .",
        "d": "Generates platform Makefiles automatically."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with CMake, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "sqlite",
    "name": "SQLite",
    "category": "Database",
    "description": "C-library implementing a self-contained, serverless, zero-configuration SQL database.",
    "installCmd": "pkg install sqlite -y",
    "verifyCmd": "sqlite3 --version",
    "updateCmd": "pkg install sqlite --upgrade",
    "removeCmd": "pkg uninstall sqlite -y",
    "homepage": "https://sqlite.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open DB",
        "c": "sqlite3 database.db",
        "d": "Opens interactive SQL console storage."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with SQLite, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "postgresql",
    "name": "PostgreSQL",
    "category": "Database",
    "description": "The world's most advanced open source relational database server.",
    "installCmd": "pkg install postgresql -y",
    "verifyCmd": "postgres --version",
    "updateCmd": "pkg install postgresql --upgrade",
    "removeCmd": "pkg uninstall postgresql -y",
    "homepage": "https://www.postgresql.org",
    "difficulty": "advanced",
    "dependencies": [
      "openssl"
    ],
    "examples": [
      {
        "t": "Start Server",
        "c": "pg_ctl -D $PREFIX/var/lib/postgresql start",
        "d": "Spawns active local server daemon."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with PostgreSQL, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "mariadb",
    "name": "MariaDB (MySQL)",
    "category": "Database",
    "description": "Robust relatiional database server fork of standard Oracle MySQL.",
    "installCmd": "pkg install mariadb -y",
    "verifyCmd": "mariadb --version",
    "updateCmd": "pkg install mariadb --upgrade",
    "removeCmd": "pkg uninstall mariadb -y",
    "homepage": "https://mariadb.org",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Init DB",
        "c": "mysql_install_db",
        "d": "Builds standard starting database files."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with MariaDB (MySQL), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "redis",
    "name": "Redis",
    "category": "Database",
    "description": "In-memory database, cache, and message broker with blazing-fast speeds.",
    "installCmd": "pkg install redis -y",
    "verifyCmd": "redis-server --version",
    "updateCmd": "pkg install redis --upgrade",
    "removeCmd": "pkg uninstall redis -y",
    "homepage": "https://redis.io",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Start Redis",
        "c": "redis-server",
        "d": "Runs in-memory server dashboard."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Redis, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "ffmpeg",
    "name": "FFmpeg",
    "category": "Multimedia",
    "description": "Leading multimedia framework, able to decode, encode, transcode, mux, and play anything.",
    "installCmd": "pkg install ffmpeg -y",
    "verifyCmd": "ffmpeg -version",
    "updateCmd": "pkg install ffmpeg --upgrade",
    "removeCmd": "pkg uninstall ffmpeg -y",
    "homepage": "https://ffmpeg.org",
    "difficulty": "intermediate",
    "dependencies": [
      "libmp3lame",
      "libx264"
    ],
    "examples": [
      {
        "t": "Transcode Video",
        "c": "ffmpeg -i input.mp4 output.mkv",
        "d": "Converts video formats instantly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with FFmpeg, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "mpv",
    "name": "Mpv Player",
    "category": "Multimedia",
    "description": "Command-line media player with excellent audio decoding, fully usable in Termux.",
    "installCmd": "pkg install mpv -y",
    "verifyCmd": "mpv --version",
    "updateCmd": "pkg install mpv --upgrade",
    "removeCmd": "pkg uninstall mpv -y",
    "homepage": "https://mpv.io",
    "difficulty": "beginner",
    "dependencies": [
      "ffmpeg"
    ],
    "examples": [
      {
        "t": "Play Stream",
        "c": "mpv https://example.com/audio.mp3",
        "d": "Plays streaming link inside console buffers."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Mpv Player, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "yt-dlp",
    "name": "Yt-Dlp",
    "category": "Multimedia",
    "description": "Highly popular video and audio downloader supporting YouTube and thousands of other sites.",
    "installCmd": "pkg install yt-dlp -y",
    "verifyCmd": "yt-dlp --version",
    "updateCmd": "pkg install yt-dlp --upgrade",
    "removeCmd": "pkg uninstall yt-dlp -y",
    "homepage": "https://github.com/yt-dlp/yt-dlp",
    "difficulty": "beginner",
    "dependencies": [
      "python",
      "ffmpeg"
    ],
    "examples": [
      {
        "t": "Extract Audio",
        "c": "yt-dlp -x --audio-format mp3 https://youtube.com/watch?id",
        "d": "Saves video directly as audio file."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Yt-Dlp, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "imagemagick",
    "name": "ImageMagick",
    "category": "Multimedia",
    "description": "Software suite to create, edit, compose, or convert bitmap images.",
    "installCmd": "pkg install imagemagick -y",
    "verifyCmd": "magick --version",
    "updateCmd": "pkg install imagemagick --upgrade",
    "removeCmd": "pkg uninstall imagemagick -y",
    "homepage": "https://imagemagick.org",
    "difficulty": "intermediate",
    "dependencies": [
      "libjpeg-turbo",
      "libpng"
    ],
    "examples": [
      {
        "t": "Resize Image",
        "c": "magick convert photo.png -resize 50% photo_small.png",
        "d": "Compresses photo instantly."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with ImageMagick, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "cmus",
    "name": "Cmus",
    "category": "Multimedia",
    "description": "Ncurses-based music player. Blazing fast, lightweight, and supports playlists.",
    "installCmd": "pkg install cmus -y",
    "verifyCmd": "cmus --version",
    "updateCmd": "pkg install cmus --upgrade",
    "removeCmd": "pkg uninstall cmus -y",
    "homepage": "https://cmus.github.io",
    "difficulty": "intermediate",
    "dependencies": [
      "libmad",
      "flac"
    ],
    "examples": [
      {
        "t": "Launch Cmus",
        "c": "cmus",
        "d": "Loads gorgeous dual-pane keyboard audio player."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Cmus, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "proot",
    "name": "PRoot",
    "category": "System",
    "description": "User-space implementation of chroot, mount --bind, and binfmt_misc, allowing distrib emulations.",
    "installCmd": "pkg install proot -y",
    "verifyCmd": "proot --version",
    "updateCmd": "pkg install proot --upgrade",
    "removeCmd": "pkg uninstall proot -y",
    "homepage": "https://proot-me.github.io",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Mock Root",
        "c": "proot -0",
        "d": "Simulates root UID inside terminal session bounds."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with PRoot, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "proot-distro",
    "name": "PRoot Distro",
    "category": "System",
    "description": "Easy orchestrator utility to download, install, and run full Linux distros (Ubuntu, Arch).",
    "installCmd": "pkg install proot-distro -y",
    "verifyCmd": "proot-distro list",
    "updateCmd": "pkg install proot-distro --upgrade",
    "removeCmd": "pkg uninstall proot-distro -y",
    "homepage": "https://github.com/termux/proot-distro",
    "difficulty": "intermediate",
    "dependencies": [
      "proot",
      "curl"
    ],
    "examples": [
      {
        "t": "Ubuntu Install",
        "c": "proot-distro install ubuntu",
        "d": "Saves complete Ubuntu arm rootfs."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with PRoot Distro, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-chroot",
    "name": "Termux Chroot (PRoot)",
    "category": "System",
    "description": "Wrapper setting up mock directories mimicking typical standard GNU Linux paths (/bin, /var).",
    "installCmd": "pkg install termux-exec -y",
    "verifyCmd": "termux-chroot",
    "updateCmd": "pkg install termux-chroot --upgrade",
    "removeCmd": "pkg uninstall termux-chroot -y",
    "homepage": "https://github.com/termux/termux-exec",
    "difficulty": "intermediate",
    "dependencies": [
      "proot"
    ],
    "examples": [
      {
        "t": "Standardize Paths",
        "c": "termux-chroot",
        "d": "Resolves standard shebang scripts (/bin/sh)."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Chroot (PRoot), clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "zsh",
    "name": "Zsh",
    "category": "Shells",
    "description": "Interactive customizable shell prompt containing robust tab completion engines.",
    "installCmd": "pkg install zsh -y",
    "verifyCmd": "zsh --version",
    "updateCmd": "pkg install zsh --upgrade",
    "removeCmd": "pkg uninstall zsh -y",
    "homepage": "https://www.zsh.org",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses"
    ],
    "examples": [
      {
        "t": "Switch Shell",
        "c": "zsh",
        "d": "Switches current buffer process to Zsh."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Zsh, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "fish",
    "name": "Fish Shell",
    "category": "Shells",
    "description": "User-friendly shell featuring syntax highlighting, autosuggestions, and clean configuration.",
    "installCmd": "pkg install fish -y",
    "verifyCmd": "fish --version",
    "updateCmd": "pkg install fish --upgrade",
    "removeCmd": "pkg uninstall fish -y",
    "homepage": "https://fishshell.com",
    "difficulty": "beginner",
    "dependencies": [
      "ncurses",
      "pcre2"
    ],
    "examples": [
      {
        "t": "Open Fish",
        "c": "fish",
        "d": "Boot friendly shell."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Fish Shell, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-api",
    "name": "Termux API Services",
    "category": "Termux API",
    "description": "Allows accessing core Android hardware parameters (GPS, Camera, Clipboard, SMS) from scripts.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-battery-status",
    "updateCmd": "pkg install termux-api --upgrade",
    "removeCmd": "pkg uninstall termux-api -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Toast Message",
        "c": "termux-toast 'Hello from Android Core!'",
        "d": "Spawns native Android toast window."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux API Services, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-vibrate",
    "name": "Termux Vibrate",
    "category": "Termux API",
    "description": "Allows scripts to trigger Android device physical vibration feedback motor.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-vibrate -h",
    "updateCmd": "pkg install termux-vibrate --upgrade",
    "removeCmd": "pkg uninstall termux-vibrate -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "intermediate",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Pulse Motor",
        "c": "termux-vibrate -d 500",
        "d": "Vibrates device for 500ms."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Vibrate, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-torch",
    "name": "Termux Torch",
    "category": "Termux API",
    "description": "Toggles Android camera flash LED on or off dynamically via commands.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-torch -h",
    "updateCmd": "pkg install termux-torch --upgrade",
    "removeCmd": "pkg uninstall termux-torch -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "beginner",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Flashlight On",
        "c": "termux-torch on",
        "d": "Turns flashlight on."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Torch, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-battery-status",
    "name": "Termux Battery Status",
    "category": "Termux API",
    "description": "Returns local hardware battery stats (charge, temp, health) in structured JSON formats.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-battery-status",
    "updateCmd": "pkg install termux-battery-status --upgrade",
    "removeCmd": "pkg uninstall termux-battery-status -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "beginner",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Get Charge %",
        "c": "termux-battery-status | jq .percentage",
        "d": "Retrieves raw charge percentage."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Battery Status, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-clipboard-set",
    "name": "Termux Clipboard Set",
    "category": "Termux API",
    "description": "Sets the Android system-wide copy paste clipboard buffer text value.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-clipboard-set -h",
    "updateCmd": "pkg install termux-clipboard-set --upgrade",
    "removeCmd": "pkg uninstall termux-clipboard-set -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "beginner",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Copy String",
        "c": "termux-clipboard-set 'Copied from command line'",
        "d": "Copies string into memory clipboard."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Clipboard Set, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-clipboard-get",
    "name": "Termux Clipboard Get",
    "category": "Termux API",
    "description": "Retrieves the current contents of the Android copy paste clipboard.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-clipboard-get",
    "updateCmd": "pkg install termux-clipboard-get --upgrade",
    "removeCmd": "pkg uninstall termux-clipboard-get -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "beginner",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Paste Clipboard",
        "c": "termux-clipboard-get",
        "d": "Outputs whatever text is in memory clipboard."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Clipboard Get, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-tts-speak",
    "name": "Termux TTS Speak",
    "category": "Termux API",
    "description": "Speaks any input string out loud utilizing Android text-to-speech speaker motors.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-tts-speak 'Test'",
    "updateCmd": "pkg install termux-tts-speak --upgrade",
    "removeCmd": "pkg uninstall termux-tts-speak -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "intermediate",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Speak Out Loud",
        "c": "termux-tts-speak 'Attention: Backup sequence completed.'",
        "d": "Triggers voice prompt synthesizer."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux TTS Speak, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "termux-location",
    "name": "Termux Location GPS",
    "category": "Termux API",
    "description": "Retrieves current coordinates (longitude, latitude, altitude) from phone GPS sensors.",
    "installCmd": "pkg install termux-api -y",
    "verifyCmd": "termux-location",
    "updateCmd": "pkg install termux-location --upgrade",
    "removeCmd": "pkg uninstall termux-location -y",
    "homepage": "https://github.com/termux/termux-api",
    "difficulty": "intermediate",
    "dependencies": [
      "termux-api"
    ],
    "examples": [
      {
        "t": "Get Coordinates",
        "c": "termux-location -p gps",
        "d": "Queries GPS sensor once."
      }
    ],
    "troubleshooting": "If you encounter library mapping errors or compile warnings with Termux Location GPS, clean the cache utilizing 'pkg clean && pkg update' and then re-install."
  },
  {
    "id": "w3m-v1",
    "name": "W3M Browser (Mod 1)",
    "category": "Utilities",
    "description": "[Extended Pack 1] Text-based web browser and pager that renders tables, frames, and colors directly inside logs.",
    "installCmd": "pkg install w3m -y",
    "verifyCmd": "w3m -version",
    "updateCmd": "pkg install w3m --upgrade",
    "removeCmd": "pkg uninstall w3m -y",
    "homepage": "http://w3m.sourceforge.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "gc"
    ],
    "examples": [
      {
        "t": "Browse Web (1)",
        "c": "w3m https://google.com",
        "d": "Loads google search inside terminal console."
      }
    ],
    "troubleshooting": "If W3M Browser (Mod 1) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lynx-v2",
    "name": "Lynx Browser (Mod 2)",
    "category": "Utilities",
    "description": "[Extended Pack 2] Highly popular classic terminal text-based web browser with full security support.",
    "installCmd": "pkg install lynx -y",
    "verifyCmd": "lynx -version",
    "updateCmd": "pkg install lynx --upgrade",
    "removeCmd": "pkg uninstall lynx -y",
    "homepage": "https://lynx.invisible-island.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "ncurses"
    ],
    "examples": [
      {
        "t": "Browse URL (2)",
        "c": "lynx https://en.wikipedia.org",
        "d": "Launches Wikipedia reader."
      }
    ],
    "troubleshooting": "If Lynx Browser (Mod 2) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "unzip-v3",
    "name": "Unzip (Mod 3)",
    "category": "Utilities",
    "description": "[Extended Pack 3] List, test, and extract compressed zip archives inside terminal structures.",
    "installCmd": "pkg install unzip -y",
    "verifyCmd": "unzip -v",
    "updateCmd": "pkg install unzip --upgrade",
    "removeCmd": "pkg uninstall unzip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Archive (3)",
        "c": "unzip backup.zip -d ~/storage",
        "d": "Unpacks backup.zip into targeted directory."
      }
    ],
    "troubleshooting": "If Unzip (Mod 3) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "zip-v4",
    "name": "Zip Packer (Mod 4)",
    "category": "Utilities",
    "description": "[Extended Pack 4] Compress files into high-compatibility ZIP archive directories directly from shell.",
    "installCmd": "pkg install zip -y",
    "verifyCmd": "zip -v",
    "updateCmd": "pkg install zip --upgrade",
    "removeCmd": "pkg uninstall zip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Zip Directory (4)",
        "c": "zip -r backup.zip ~/projects",
        "d": "Saves projects folder into backup.zip."
      }
    ],
    "troubleshooting": "If Zip Packer (Mod 4) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pigz-v5",
    "name": "Pigz Compressor (Mod 5)",
    "category": "Utilities",
    "description": "[Extended Pack 5] Multi-threaded implementation of gzip designed to maximize compression speeds on multi-core phones.",
    "installCmd": "pkg install pigz -y",
    "verifyCmd": "pigz --version",
    "updateCmd": "pkg install pigz --upgrade",
    "removeCmd": "pkg uninstall pigz -y",
    "homepage": "https://zlib.net/pigz",
    "difficulty": "intermediate",
    "dependencies": [
      "zlib"
    ],
    "examples": [
      {
        "t": "Fast Gzip (5)",
        "c": "pigz backup.tar",
        "d": "Compresses tar folder in seconds."
      }
    ],
    "troubleshooting": "If Pigz Compressor (Mod 5) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sed-v6",
    "name": "GNU Sed (Mod 6)",
    "category": "Utilities",
    "description": "[Extended Pack 6] GNU stream editor for filtering and transforming text stream inputs recursively.",
    "installCmd": "pkg install sed -y",
    "verifyCmd": "sed --version",
    "updateCmd": "pkg install sed --upgrade",
    "removeCmd": "pkg uninstall sed -y",
    "homepage": "https://www.gnu.org/software/sed",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Replace Text (6)",
        "c": "sed -i 's/foo/bar/g' file.txt",
        "d": "Replaces all instances of foo with bar in file.txt."
      }
    ],
    "troubleshooting": "If GNU Sed (Mod 6) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "awk-v7",
    "name": "GNU Awk (Mod 7)",
    "category": "Utilities",
    "description": "[Extended Pack 7] Pattern scanning and processing language widely used for column data extractions.",
    "installCmd": "pkg install awk -y",
    "verifyCmd": "awk --version",
    "updateCmd": "pkg install awk --upgrade",
    "removeCmd": "pkg uninstall awk -y",
    "homepage": "https://www.gnu.org/software/gawk",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Column (7)",
        "c": "ls -l | awk '{print $9}'",
        "d": "Prints names column from directory list."
      }
    ],
    "troubleshooting": "If GNU Awk (Mod 7) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "tar-v8",
    "name": "GNU Tar (Mod 8)",
    "category": "Utilities",
    "description": "[Extended Pack 8] Archiving utility to bundle multiple folders and files into single high-compatibility tarball files.",
    "installCmd": "pkg install tar -y",
    "verifyCmd": "tar --version",
    "updateCmd": "pkg install tar --upgrade",
    "removeCmd": "pkg uninstall tar -y",
    "homepage": "https://www.gnu.org/software/tar",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Tarball (8)",
        "c": "tar -xvf package.tar.gz",
        "d": "Decompresses gzip-tar files."
      }
    ],
    "troubleshooting": "If GNU Tar (Mod 8) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "strace-v9",
    "name": "Strace (Mod 9)",
    "category": "Utilities",
    "description": "[Extended Pack 9] Diagnostic, debugging and instructional userspace utility monitoring system calls between apps and kernel.",
    "installCmd": "pkg install strace -y",
    "verifyCmd": "strace -V",
    "updateCmd": "pkg install strace --upgrade",
    "removeCmd": "pkg uninstall strace -y",
    "homepage": "https://strace.io",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Trace Execution (9)",
        "c": "strace ls",
        "d": "Displays kernel calls triggered by ls."
      }
    ],
    "troubleshooting": "If Strace (Mod 9) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lsof-v10",
    "name": "Lsof (Mod 10)",
    "category": "Utilities",
    "description": "[Extended Pack 10] List Open Files utility displaying active ports, sockets, and files open by processes.",
    "installCmd": "pkg install lsof -y",
    "verifyCmd": "lsof -v",
    "updateCmd": "pkg install lsof --upgrade",
    "removeCmd": "pkg uninstall lsof -y",
    "homepage": "https://github.com/lsof-org/lsof",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Active Ports (10)",
        "c": "lsof -i",
        "d": "Lists internet sockets used by terminal servers."
      }
    ],
    "troubleshooting": "If Lsof (Mod 10) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pass-clip-v11",
    "name": "Pass Clipboard (Mod 11)",
    "category": "Security",
    "description": "[Extended Pack 11] Extension for Password Store to automatically copy decrypted pass secrets into Android clipboard.",
    "installCmd": "pkg install pass-clip -y",
    "verifyCmd": "pass version",
    "updateCmd": "pkg install pass-clip --upgrade",
    "removeCmd": "pkg uninstall pass-clip -y",
    "homepage": "https://www.passwordstore.org",
    "difficulty": "intermediate",
    "dependencies": [
      "pass",
      "termux-api"
    ],
    "examples": [
      {
        "t": "Copy Password (11)",
        "c": "pass -c accounts/github",
        "d": "Copies password to memory clip safely."
      }
    ],
    "troubleshooting": "If Pass Clipboard (Mod 11) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "dnsrecon-v12",
    "name": "Dnsrecon (Mod 12)",
    "category": "Security",
    "description": "[Extended Pack 12] Advanced DNS enumeration and scanning tool querying SRV records and zone transfers.",
    "installCmd": "pkg install dnsrecon -y",
    "verifyCmd": "dnsrecon -h",
    "updateCmd": "pkg install dnsrecon --upgrade",
    "removeCmd": "pkg uninstall dnsrecon -y",
    "homepage": "https://github.com/darkoperator/dnsrecon",
    "difficulty": "advanced",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Enum DNS (12)",
        "c": "dnsrecon -d target.com",
        "d": "Lists passive record catalogs."
      }
    ],
    "troubleshooting": "If Dnsrecon (Mod 12) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "gobuster-v13",
    "name": "Gobuster (Mod 13)",
    "category": "Security",
    "description": "[Extended Pack 13] Directory, file, DNS, and VHost busting tool written in Go to scan sites for hidden endpoints.",
    "installCmd": "pkg install gobuster -y",
    "verifyCmd": "gobuster version",
    "updateCmd": "pkg install gobuster --upgrade",
    "removeCmd": "pkg uninstall gobuster -y",
    "homepage": "https://github.com/OJ/gobuster",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Scan Endpoints (13)",
        "c": "gobuster dir -u http://site.com -w words.txt",
        "d": "Brute-forces directories catalog."
      }
    ],
    "troubleshooting": "If Gobuster (Mod 13) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sox-v14",
    "name": "SoX (Sound eXchange) (Mod 14)",
    "category": "Multimedia",
    "description": "[Extended Pack 14] The Swiss Army knife of sound processing. Plays, records, and translates audio files.",
    "installCmd": "pkg install sox -y",
    "verifyCmd": "sox --version",
    "updateCmd": "pkg install sox --upgrade",
    "removeCmd": "pkg uninstall sox -y",
    "homepage": "http://sox.sourceforge.net",
    "difficulty": "intermediate",
    "dependencies": [
      "libflac"
    ],
    "examples": [
      {
        "t": "Merge Tracks (14)",
        "c": "sox track1.wav track2.wav merged.wav",
        "d": "Merges two sound buffers."
      }
    ],
    "troubleshooting": "If SoX (Sound eXchange) (Mod 14) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "mediainfo-v15",
    "name": "MediaInfo (Mod 15)",
    "category": "Multimedia",
    "description": "[Extended Pack 15] Convenient unified cataloger providing structural metadata details of audio and video frames.",
    "installCmd": "pkg install mediainfo -y",
    "verifyCmd": "mediainfo --version",
    "updateCmd": "pkg install mediainfo --upgrade",
    "removeCmd": "pkg uninstall mediainfo -y",
    "homepage": "https://mediaarea.net/MediaInfo",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Bitrate (15)",
        "c": "mediainfo song.mp3",
        "d": "Lists tags, sample rate, and codec."
      }
    ],
    "troubleshooting": "If MediaInfo (Mod 15) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "bash-v16",
    "name": "GNU Bash (Mod 16)",
    "category": "Shells",
    "description": "[Extended Pack 16] The standard default command execution shell interpreter present on most Unix boxes.",
    "installCmd": "pkg install bash -y",
    "verifyCmd": "bash --version",
    "updateCmd": "pkg install bash --upgrade",
    "removeCmd": "pkg uninstall bash -y",
    "homepage": "https://www.gnu.org/software/bash",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open Shell (16)",
        "c": "bash",
        "d": "Opens standard bash buffer session."
      }
    ],
    "troubleshooting": "If GNU Bash (Mod 16) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "w3m-v17",
    "name": "W3M Browser (Mod 17)",
    "category": "Utilities",
    "description": "[Extended Pack 17] Text-based web browser and pager that renders tables, frames, and colors directly inside logs.",
    "installCmd": "pkg install w3m -y",
    "verifyCmd": "w3m -version",
    "updateCmd": "pkg install w3m --upgrade",
    "removeCmd": "pkg uninstall w3m -y",
    "homepage": "http://w3m.sourceforge.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "gc"
    ],
    "examples": [
      {
        "t": "Browse Web (17)",
        "c": "w3m https://google.com",
        "d": "Loads google search inside terminal console."
      }
    ],
    "troubleshooting": "If W3M Browser (Mod 17) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lynx-v18",
    "name": "Lynx Browser (Mod 18)",
    "category": "Utilities",
    "description": "[Extended Pack 18] Highly popular classic terminal text-based web browser with full security support.",
    "installCmd": "pkg install lynx -y",
    "verifyCmd": "lynx -version",
    "updateCmd": "pkg install lynx --upgrade",
    "removeCmd": "pkg uninstall lynx -y",
    "homepage": "https://lynx.invisible-island.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "ncurses"
    ],
    "examples": [
      {
        "t": "Browse URL (18)",
        "c": "lynx https://en.wikipedia.org",
        "d": "Launches Wikipedia reader."
      }
    ],
    "troubleshooting": "If Lynx Browser (Mod 18) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "unzip-v19",
    "name": "Unzip (Mod 19)",
    "category": "Utilities",
    "description": "[Extended Pack 19] List, test, and extract compressed zip archives inside terminal structures.",
    "installCmd": "pkg install unzip -y",
    "verifyCmd": "unzip -v",
    "updateCmd": "pkg install unzip --upgrade",
    "removeCmd": "pkg uninstall unzip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Archive (19)",
        "c": "unzip backup.zip -d ~/storage",
        "d": "Unpacks backup.zip into targeted directory."
      }
    ],
    "troubleshooting": "If Unzip (Mod 19) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "zip-v20",
    "name": "Zip Packer (Mod 20)",
    "category": "Utilities",
    "description": "[Extended Pack 20] Compress files into high-compatibility ZIP archive directories directly from shell.",
    "installCmd": "pkg install zip -y",
    "verifyCmd": "zip -v",
    "updateCmd": "pkg install zip --upgrade",
    "removeCmd": "pkg uninstall zip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Zip Directory (20)",
        "c": "zip -r backup.zip ~/projects",
        "d": "Saves projects folder into backup.zip."
      }
    ],
    "troubleshooting": "If Zip Packer (Mod 20) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pigz-v21",
    "name": "Pigz Compressor (Mod 21)",
    "category": "Utilities",
    "description": "[Extended Pack 21] Multi-threaded implementation of gzip designed to maximize compression speeds on multi-core phones.",
    "installCmd": "pkg install pigz -y",
    "verifyCmd": "pigz --version",
    "updateCmd": "pkg install pigz --upgrade",
    "removeCmd": "pkg uninstall pigz -y",
    "homepage": "https://zlib.net/pigz",
    "difficulty": "intermediate",
    "dependencies": [
      "zlib"
    ],
    "examples": [
      {
        "t": "Fast Gzip (21)",
        "c": "pigz backup.tar",
        "d": "Compresses tar folder in seconds."
      }
    ],
    "troubleshooting": "If Pigz Compressor (Mod 21) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sed-v22",
    "name": "GNU Sed (Mod 22)",
    "category": "Utilities",
    "description": "[Extended Pack 22] GNU stream editor for filtering and transforming text stream inputs recursively.",
    "installCmd": "pkg install sed -y",
    "verifyCmd": "sed --version",
    "updateCmd": "pkg install sed --upgrade",
    "removeCmd": "pkg uninstall sed -y",
    "homepage": "https://www.gnu.org/software/sed",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Replace Text (22)",
        "c": "sed -i 's/foo/bar/g' file.txt",
        "d": "Replaces all instances of foo with bar in file.txt."
      }
    ],
    "troubleshooting": "If GNU Sed (Mod 22) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "awk-v23",
    "name": "GNU Awk (Mod 23)",
    "category": "Utilities",
    "description": "[Extended Pack 23] Pattern scanning and processing language widely used for column data extractions.",
    "installCmd": "pkg install awk -y",
    "verifyCmd": "awk --version",
    "updateCmd": "pkg install awk --upgrade",
    "removeCmd": "pkg uninstall awk -y",
    "homepage": "https://www.gnu.org/software/gawk",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Column (23)",
        "c": "ls -l | awk '{print $9}'",
        "d": "Prints names column from directory list."
      }
    ],
    "troubleshooting": "If GNU Awk (Mod 23) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "tar-v24",
    "name": "GNU Tar (Mod 24)",
    "category": "Utilities",
    "description": "[Extended Pack 24] Archiving utility to bundle multiple folders and files into single high-compatibility tarball files.",
    "installCmd": "pkg install tar -y",
    "verifyCmd": "tar --version",
    "updateCmd": "pkg install tar --upgrade",
    "removeCmd": "pkg uninstall tar -y",
    "homepage": "https://www.gnu.org/software/tar",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Tarball (24)",
        "c": "tar -xvf package.tar.gz",
        "d": "Decompresses gzip-tar files."
      }
    ],
    "troubleshooting": "If GNU Tar (Mod 24) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "strace-v25",
    "name": "Strace (Mod 25)",
    "category": "Utilities",
    "description": "[Extended Pack 25] Diagnostic, debugging and instructional userspace utility monitoring system calls between apps and kernel.",
    "installCmd": "pkg install strace -y",
    "verifyCmd": "strace -V",
    "updateCmd": "pkg install strace --upgrade",
    "removeCmd": "pkg uninstall strace -y",
    "homepage": "https://strace.io",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Trace Execution (25)",
        "c": "strace ls",
        "d": "Displays kernel calls triggered by ls."
      }
    ],
    "troubleshooting": "If Strace (Mod 25) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lsof-v26",
    "name": "Lsof (Mod 26)",
    "category": "Utilities",
    "description": "[Extended Pack 26] List Open Files utility displaying active ports, sockets, and files open by processes.",
    "installCmd": "pkg install lsof -y",
    "verifyCmd": "lsof -v",
    "updateCmd": "pkg install lsof --upgrade",
    "removeCmd": "pkg uninstall lsof -y",
    "homepage": "https://github.com/lsof-org/lsof",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Active Ports (26)",
        "c": "lsof -i",
        "d": "Lists internet sockets used by terminal servers."
      }
    ],
    "troubleshooting": "If Lsof (Mod 26) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pass-clip-v27",
    "name": "Pass Clipboard (Mod 27)",
    "category": "Security",
    "description": "[Extended Pack 27] Extension for Password Store to automatically copy decrypted pass secrets into Android clipboard.",
    "installCmd": "pkg install pass-clip -y",
    "verifyCmd": "pass version",
    "updateCmd": "pkg install pass-clip --upgrade",
    "removeCmd": "pkg uninstall pass-clip -y",
    "homepage": "https://www.passwordstore.org",
    "difficulty": "intermediate",
    "dependencies": [
      "pass",
      "termux-api"
    ],
    "examples": [
      {
        "t": "Copy Password (27)",
        "c": "pass -c accounts/github",
        "d": "Copies password to memory clip safely."
      }
    ],
    "troubleshooting": "If Pass Clipboard (Mod 27) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "dnsrecon-v28",
    "name": "Dnsrecon (Mod 28)",
    "category": "Security",
    "description": "[Extended Pack 28] Advanced DNS enumeration and scanning tool querying SRV records and zone transfers.",
    "installCmd": "pkg install dnsrecon -y",
    "verifyCmd": "dnsrecon -h",
    "updateCmd": "pkg install dnsrecon --upgrade",
    "removeCmd": "pkg uninstall dnsrecon -y",
    "homepage": "https://github.com/darkoperator/dnsrecon",
    "difficulty": "advanced",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Enum DNS (28)",
        "c": "dnsrecon -d target.com",
        "d": "Lists passive record catalogs."
      }
    ],
    "troubleshooting": "If Dnsrecon (Mod 28) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "gobuster-v29",
    "name": "Gobuster (Mod 29)",
    "category": "Security",
    "description": "[Extended Pack 29] Directory, file, DNS, and VHost busting tool written in Go to scan sites for hidden endpoints.",
    "installCmd": "pkg install gobuster -y",
    "verifyCmd": "gobuster version",
    "updateCmd": "pkg install gobuster --upgrade",
    "removeCmd": "pkg uninstall gobuster -y",
    "homepage": "https://github.com/OJ/gobuster",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Scan Endpoints (29)",
        "c": "gobuster dir -u http://site.com -w words.txt",
        "d": "Brute-forces directories catalog."
      }
    ],
    "troubleshooting": "If Gobuster (Mod 29) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sox-v30",
    "name": "SoX (Sound eXchange) (Mod 30)",
    "category": "Multimedia",
    "description": "[Extended Pack 30] The Swiss Army knife of sound processing. Plays, records, and translates audio files.",
    "installCmd": "pkg install sox -y",
    "verifyCmd": "sox --version",
    "updateCmd": "pkg install sox --upgrade",
    "removeCmd": "pkg uninstall sox -y",
    "homepage": "http://sox.sourceforge.net",
    "difficulty": "intermediate",
    "dependencies": [
      "libflac"
    ],
    "examples": [
      {
        "t": "Merge Tracks (30)",
        "c": "sox track1.wav track2.wav merged.wav",
        "d": "Merges two sound buffers."
      }
    ],
    "troubleshooting": "If SoX (Sound eXchange) (Mod 30) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "mediainfo-v31",
    "name": "MediaInfo (Mod 31)",
    "category": "Multimedia",
    "description": "[Extended Pack 31] Convenient unified cataloger providing structural metadata details of audio and video frames.",
    "installCmd": "pkg install mediainfo -y",
    "verifyCmd": "mediainfo --version",
    "updateCmd": "pkg install mediainfo --upgrade",
    "removeCmd": "pkg uninstall mediainfo -y",
    "homepage": "https://mediaarea.net/MediaInfo",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Bitrate (31)",
        "c": "mediainfo song.mp3",
        "d": "Lists tags, sample rate, and codec."
      }
    ],
    "troubleshooting": "If MediaInfo (Mod 31) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "bash-v32",
    "name": "GNU Bash (Mod 32)",
    "category": "Shells",
    "description": "[Extended Pack 32] The standard default command execution shell interpreter present on most Unix boxes.",
    "installCmd": "pkg install bash -y",
    "verifyCmd": "bash --version",
    "updateCmd": "pkg install bash --upgrade",
    "removeCmd": "pkg uninstall bash -y",
    "homepage": "https://www.gnu.org/software/bash",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open Shell (32)",
        "c": "bash",
        "d": "Opens standard bash buffer session."
      }
    ],
    "troubleshooting": "If GNU Bash (Mod 32) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "w3m-v33",
    "name": "W3M Browser (Mod 33)",
    "category": "Utilities",
    "description": "[Extended Pack 33] Text-based web browser and pager that renders tables, frames, and colors directly inside logs.",
    "installCmd": "pkg install w3m -y",
    "verifyCmd": "w3m -version",
    "updateCmd": "pkg install w3m --upgrade",
    "removeCmd": "pkg uninstall w3m -y",
    "homepage": "http://w3m.sourceforge.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "gc"
    ],
    "examples": [
      {
        "t": "Browse Web (33)",
        "c": "w3m https://google.com",
        "d": "Loads google search inside terminal console."
      }
    ],
    "troubleshooting": "If W3M Browser (Mod 33) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lynx-v34",
    "name": "Lynx Browser (Mod 34)",
    "category": "Utilities",
    "description": "[Extended Pack 34] Highly popular classic terminal text-based web browser with full security support.",
    "installCmd": "pkg install lynx -y",
    "verifyCmd": "lynx -version",
    "updateCmd": "pkg install lynx --upgrade",
    "removeCmd": "pkg uninstall lynx -y",
    "homepage": "https://lynx.invisible-island.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "ncurses"
    ],
    "examples": [
      {
        "t": "Browse URL (34)",
        "c": "lynx https://en.wikipedia.org",
        "d": "Launches Wikipedia reader."
      }
    ],
    "troubleshooting": "If Lynx Browser (Mod 34) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "unzip-v35",
    "name": "Unzip (Mod 35)",
    "category": "Utilities",
    "description": "[Extended Pack 35] List, test, and extract compressed zip archives inside terminal structures.",
    "installCmd": "pkg install unzip -y",
    "verifyCmd": "unzip -v",
    "updateCmd": "pkg install unzip --upgrade",
    "removeCmd": "pkg uninstall unzip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Archive (35)",
        "c": "unzip backup.zip -d ~/storage",
        "d": "Unpacks backup.zip into targeted directory."
      }
    ],
    "troubleshooting": "If Unzip (Mod 35) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "zip-v36",
    "name": "Zip Packer (Mod 36)",
    "category": "Utilities",
    "description": "[Extended Pack 36] Compress files into high-compatibility ZIP archive directories directly from shell.",
    "installCmd": "pkg install zip -y",
    "verifyCmd": "zip -v",
    "updateCmd": "pkg install zip --upgrade",
    "removeCmd": "pkg uninstall zip -y",
    "homepage": "http://www.info-zip.org",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Zip Directory (36)",
        "c": "zip -r backup.zip ~/projects",
        "d": "Saves projects folder into backup.zip."
      }
    ],
    "troubleshooting": "If Zip Packer (Mod 36) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pigz-v37",
    "name": "Pigz Compressor (Mod 37)",
    "category": "Utilities",
    "description": "[Extended Pack 37] Multi-threaded implementation of gzip designed to maximize compression speeds on multi-core phones.",
    "installCmd": "pkg install pigz -y",
    "verifyCmd": "pigz --version",
    "updateCmd": "pkg install pigz --upgrade",
    "removeCmd": "pkg uninstall pigz -y",
    "homepage": "https://zlib.net/pigz",
    "difficulty": "intermediate",
    "dependencies": [
      "zlib"
    ],
    "examples": [
      {
        "t": "Fast Gzip (37)",
        "c": "pigz backup.tar",
        "d": "Compresses tar folder in seconds."
      }
    ],
    "troubleshooting": "If Pigz Compressor (Mod 37) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sed-v38",
    "name": "GNU Sed (Mod 38)",
    "category": "Utilities",
    "description": "[Extended Pack 38] GNU stream editor for filtering and transforming text stream inputs recursively.",
    "installCmd": "pkg install sed -y",
    "verifyCmd": "sed --version",
    "updateCmd": "pkg install sed --upgrade",
    "removeCmd": "pkg uninstall sed -y",
    "homepage": "https://www.gnu.org/software/sed",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Replace Text (38)",
        "c": "sed -i 's/foo/bar/g' file.txt",
        "d": "Replaces all instances of foo with bar in file.txt."
      }
    ],
    "troubleshooting": "If GNU Sed (Mod 38) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "awk-v39",
    "name": "GNU Awk (Mod 39)",
    "category": "Utilities",
    "description": "[Extended Pack 39] Pattern scanning and processing language widely used for column data extractions.",
    "installCmd": "pkg install awk -y",
    "verifyCmd": "awk --version",
    "updateCmd": "pkg install awk --upgrade",
    "removeCmd": "pkg uninstall awk -y",
    "homepage": "https://www.gnu.org/software/gawk",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Column (39)",
        "c": "ls -l | awk '{print $9}'",
        "d": "Prints names column from directory list."
      }
    ],
    "troubleshooting": "If GNU Awk (Mod 39) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "tar-v40",
    "name": "GNU Tar (Mod 40)",
    "category": "Utilities",
    "description": "[Extended Pack 40] Archiving utility to bundle multiple folders and files into single high-compatibility tarball files.",
    "installCmd": "pkg install tar -y",
    "verifyCmd": "tar --version",
    "updateCmd": "pkg install tar --upgrade",
    "removeCmd": "pkg uninstall tar -y",
    "homepage": "https://www.gnu.org/software/tar",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Extract Tarball (40)",
        "c": "tar -xvf package.tar.gz",
        "d": "Decompresses gzip-tar files."
      }
    ],
    "troubleshooting": "If GNU Tar (Mod 40) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "strace-v41",
    "name": "Strace (Mod 41)",
    "category": "Utilities",
    "description": "[Extended Pack 41] Diagnostic, debugging and instructional userspace utility monitoring system calls between apps and kernel.",
    "installCmd": "pkg install strace -y",
    "verifyCmd": "strace -V",
    "updateCmd": "pkg install strace --upgrade",
    "removeCmd": "pkg uninstall strace -y",
    "homepage": "https://strace.io",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Trace Execution (41)",
        "c": "strace ls",
        "d": "Displays kernel calls triggered by ls."
      }
    ],
    "troubleshooting": "If Strace (Mod 41) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "lsof-v42",
    "name": "Lsof (Mod 42)",
    "category": "Utilities",
    "description": "[Extended Pack 42] List Open Files utility displaying active ports, sockets, and files open by processes.",
    "installCmd": "pkg install lsof -y",
    "verifyCmd": "lsof -v",
    "updateCmd": "pkg install lsof --upgrade",
    "removeCmd": "pkg uninstall lsof -y",
    "homepage": "https://github.com/lsof-org/lsof",
    "difficulty": "intermediate",
    "dependencies": [],
    "examples": [
      {
        "t": "Get Active Ports (42)",
        "c": "lsof -i",
        "d": "Lists internet sockets used by terminal servers."
      }
    ],
    "troubleshooting": "If Lsof (Mod 42) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "pass-clip-v43",
    "name": "Pass Clipboard (Mod 43)",
    "category": "Security",
    "description": "[Extended Pack 43] Extension for Password Store to automatically copy decrypted pass secrets into Android clipboard.",
    "installCmd": "pkg install pass-clip -y",
    "verifyCmd": "pass version",
    "updateCmd": "pkg install pass-clip --upgrade",
    "removeCmd": "pkg uninstall pass-clip -y",
    "homepage": "https://www.passwordstore.org",
    "difficulty": "intermediate",
    "dependencies": [
      "pass",
      "termux-api"
    ],
    "examples": [
      {
        "t": "Copy Password (43)",
        "c": "pass -c accounts/github",
        "d": "Copies password to memory clip safely."
      }
    ],
    "troubleshooting": "If Pass Clipboard (Mod 43) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "dnsrecon-v44",
    "name": "Dnsrecon (Mod 44)",
    "category": "Security",
    "description": "[Extended Pack 44] Advanced DNS enumeration and scanning tool querying SRV records and zone transfers.",
    "installCmd": "pkg install dnsrecon -y",
    "verifyCmd": "dnsrecon -h",
    "updateCmd": "pkg install dnsrecon --upgrade",
    "removeCmd": "pkg uninstall dnsrecon -y",
    "homepage": "https://github.com/darkoperator/dnsrecon",
    "difficulty": "advanced",
    "dependencies": [
      "python"
    ],
    "examples": [
      {
        "t": "Enum DNS (44)",
        "c": "dnsrecon -d target.com",
        "d": "Lists passive record catalogs."
      }
    ],
    "troubleshooting": "If Dnsrecon (Mod 44) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "gobuster-v45",
    "name": "Gobuster (Mod 45)",
    "category": "Security",
    "description": "[Extended Pack 45] Directory, file, DNS, and VHost busting tool written in Go to scan sites for hidden endpoints.",
    "installCmd": "pkg install gobuster -y",
    "verifyCmd": "gobuster version",
    "updateCmd": "pkg install gobuster --upgrade",
    "removeCmd": "pkg uninstall gobuster -y",
    "homepage": "https://github.com/OJ/gobuster",
    "difficulty": "advanced",
    "dependencies": [],
    "examples": [
      {
        "t": "Scan Endpoints (45)",
        "c": "gobuster dir -u http://site.com -w words.txt",
        "d": "Brute-forces directories catalog."
      }
    ],
    "troubleshooting": "If Gobuster (Mod 45) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "sox-v46",
    "name": "SoX (Sound eXchange) (Mod 46)",
    "category": "Multimedia",
    "description": "[Extended Pack 46] The Swiss Army knife of sound processing. Plays, records, and translates audio files.",
    "installCmd": "pkg install sox -y",
    "verifyCmd": "sox --version",
    "updateCmd": "pkg install sox --upgrade",
    "removeCmd": "pkg uninstall sox -y",
    "homepage": "http://sox.sourceforge.net",
    "difficulty": "intermediate",
    "dependencies": [
      "libflac"
    ],
    "examples": [
      {
        "t": "Merge Tracks (46)",
        "c": "sox track1.wav track2.wav merged.wav",
        "d": "Merges two sound buffers."
      }
    ],
    "troubleshooting": "If SoX (Sound eXchange) (Mod 46) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "mediainfo-v47",
    "name": "MediaInfo (Mod 47)",
    "category": "Multimedia",
    "description": "[Extended Pack 47] Convenient unified cataloger providing structural metadata details of audio and video frames.",
    "installCmd": "pkg install mediainfo -y",
    "verifyCmd": "mediainfo --version",
    "updateCmd": "pkg install mediainfo --upgrade",
    "removeCmd": "pkg uninstall mediainfo -y",
    "homepage": "https://mediaarea.net/MediaInfo",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Check Bitrate (47)",
        "c": "mediainfo song.mp3",
        "d": "Lists tags, sample rate, and codec."
      }
    ],
    "troubleshooting": "If MediaInfo (Mod 47) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "bash-v48",
    "name": "GNU Bash (Mod 48)",
    "category": "Shells",
    "description": "[Extended Pack 48] The standard default command execution shell interpreter present on most Unix boxes.",
    "installCmd": "pkg install bash -y",
    "verifyCmd": "bash --version",
    "updateCmd": "pkg install bash --upgrade",
    "removeCmd": "pkg uninstall bash -y",
    "homepage": "https://www.gnu.org/software/bash",
    "difficulty": "beginner",
    "dependencies": [],
    "examples": [
      {
        "t": "Open Shell (48)",
        "c": "bash",
        "d": "Opens standard bash buffer session."
      }
    ],
    "troubleshooting": "If GNU Bash (Mod 48) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  },
  {
    "id": "w3m-v49",
    "name": "W3M Browser (Mod 49)",
    "category": "Utilities",
    "description": "[Extended Pack 49] Text-based web browser and pager that renders tables, frames, and colors directly inside logs.",
    "installCmd": "pkg install w3m -y",
    "verifyCmd": "w3m -version",
    "updateCmd": "pkg install w3m --upgrade",
    "removeCmd": "pkg uninstall w3m -y",
    "homepage": "http://w3m.sourceforge.net",
    "difficulty": "beginner",
    "dependencies": [
      "openssl",
      "gc"
    ],
    "examples": [
      {
        "t": "Browse Web (49)",
        "c": "w3m https://google.com",
        "d": "Loads google search inside terminal console."
      }
    ],
    "troubleshooting": "If W3M Browser (Mod 49) experiences network interruptions, verify that your active Termux mirror is set to an active repository via termux-change-repo."
  }
];
