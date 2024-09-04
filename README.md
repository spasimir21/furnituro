# Instructions

1. Add the lines from the `hosts` file to your machine's `etc/hosts` file.
2. Copy the `env.template` folder, rename it to `env` and make any needed changes.
3. `npm install`
4. Open **2** _terminals_ and run the following commands in _parallel_.

## First Terminal

1. `npm run watch`

## Second Terminal

1. `cd scripts`
2. `./run.dev.bat` - Add the `--build` flag whenever you need to rebuild the docker images.

## Browser

1. Go to `http://dialogic.com`
