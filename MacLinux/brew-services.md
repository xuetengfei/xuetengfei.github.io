# Homebrew Services

Integrates Homebrew formulae with macOS' `launchctl` manager.

## Install、Usage

`brew services` is automatically installed when run.

### Start

Start the MySQL service at login with:

```bash
brew services start mysql
```

Start the Dnsmasq service at boot with:

```bash
sudo brew services start dnsmasq
```

Start all available services with:

```bash
brew services start --all
```

### Run

Run the MySQL service but don't start it at login (nor boot) with:

```bash
brew services run mysql
```

### Stop

Stop the MySQL service with:

```bash
brew services stop mysql
```

### Restart

Restart the MySQL service with:

```bash
brew services restart mysql
```

### List

List all services managed by `brew services` with:

```bash
brew services list
```

### Cleanup

Remove all unused services with:

```bash
brew services cleanup
```

---

[Homebrew/homebrew-services: 🚀 Manage background services with macOS' launchctl daemon manager](https://github.com/Homebrew/homebrew-services)
