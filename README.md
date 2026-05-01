# BELIEVE 文字雲

這是一個連接 Firebase Cloud Firestore 的即時文字雲網頁，適合班級活動、課堂回饋或即時蒐集關鍵詞。

## 網址

- GitHub repo: https://github.com/darma0406/believe-wordcloud
- GitHub Pages: https://darma0406.github.io/believe-wordcloud/

## 功能

- 新增文字到 Firebase `wordcloud_words`
- 同一個文字再次輸入時自動累加次數
- 文字雲即時同步 Firestore
- 右側清單可刪除文字

## Firebase

- Project ID: `believe-darma0406`
- Firestore database: `(default)`
- Firestore collection: `wordcloud_words`
- Rules: `wordcloud_words` 允許公開讀寫，其他集合禁止讀寫

## 專案工作模式

本專案依 #07 班級工具工作模式設定：

- 專案規則：`AGENTS.md`
- 開工：使用 `startup-sync`
- 收工：使用 `shutdown-sync`
- 初始化：使用 `project-init-sync`
- Obsidian 筆記：`believe-wordcloud/專案工作模式.md`

## 本機使用

直接開啟 `index.html`，或透過 GitHub Pages 使用部署版本。
