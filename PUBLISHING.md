# Публикация

Запустить **Publish** или **Publish pre-relase** действие на странице https://github.com/VKCOM/mini-apps-analytics/actions.

Подробности процессов можно посмотреть в [.github/workflows/publish.yml](./.github/workflows/publish.yml) и
[.github/workflows/publish_release.yml](./.github/workflows/publish_release.yml) 

## F.A.Q.

### Скрипт `g:npm:version` в [package.json](./package.json) - что это такое?

Начиная с версии `yarn >= 2`, команда `version` имеет ограничения. Для обхода ограничения используется
[`npm version`](https://docs.npmjs.com/cli/v8/commands/npm-version).

Подробнее о команде `cd $INIT_CWD` можно посмотреть тут: [How to share scripts between workspaces?](https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces).

### Какой lifecycle для скриптов нужно использовать для пакета?

[Yarn Lifecycle Scripts](https://yarnpkg.com/advanced/lifecycle-scripts).