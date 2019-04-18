## Index ME!
Like tree command, but more format.

### Installtion
```bash
npm install indexme -g
```

### TL;DR
```bash
indexme # after install
npx indexme # with npx
```

### Useage
```bash
➔ indexme --help

  Usage: indexme [options] path


  Options:

    -V, --version         output the version number
    -i, --ignore [globs]  A ignore list
    -m, --mode [value]    markdown[default], pure, tree
    -d, --deep [n]        >=1, default=2
    -h, --help            output usage information

```

### Recipes

**In terminal, quick open files.**
```
➔ indexme -i node_modules,.git
# Then click your file path, quick open your file.
```

**Index your markdown notes.**
```bash
➔ indexme notes -i README.md > notes/README.md
```

**Tree your node.js project.**
```bash
➔ indexme -i _*,.*,node_modules -m tree
```

Enjoy! :heart:
