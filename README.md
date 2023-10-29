# laf-storage-deploy-action

Deploy static file into laf storage with github action.

Then you can deploy your static website easy with laf static server

## Usage

```yml
- name: Deploy to laf storage
  uses: moonrailgun/laf-storage-deploy-action@v1.1
  with:
    laf-server: https://laf.dev
    laf-pat: ${{ secrets.LAF_PAT }}
    laf-appid: xxxxxx
    laf-bucket-name: yyyyyy
    dist-path: ./dist
```

You can get server `pat`, `appid`, `bucket-name` from laf platform

| name | required | default | description |
| ----- | ----- | ----- | ---- |
| laf-server | false | https://laf.run | The server url of laf |
| laf-pat | true |  | Laf pat which use for login |
| laf-appid | true |  | Laf appid which use for upload |
| laf-bucket-name | true |  | Bucket name of you wanna store |
| dist-path | false | ./dist | The path which upload static file |

## Example in real world

- [Laf deploy on Tailchat](https://github.com/msgbyte/tailchat/blob/master/.github/workflows/deploy-laf.yml)
