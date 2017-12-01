## Index ME!
Like windows-trees, but more format.

### Installtion
```bash
npm install indexme -g
```
### Useage
```bash
➔ indexme --help

  Usage: indexme [options] path


  Options:

    -V, --version         output the version number
    -i, --ignore [globs]  A ignore list
    -h, --help            output usage information

```

### Recipes

**Index your markdown notes.**
```bash
➔ indexme notes -i README.md > notes/README.md
```

**Tree your node.js project.**
```bash
➔ indexme -i _*,.*,node_modules -m pure
```

Enjoy! :heart: