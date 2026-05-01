# BELIEVE 文字雲 AGENTS.md

## 專案基本資料

專案名稱：BELIEVE 文字雲
專案類型：班級互動工具，使用 Firebase Firestore 即時同步文字雲資料
本機路徑：C:\Users\rpes2\OneDrive\桌面\資料整理\07_媒體素材\02_Codex\2026 database
GitHub repo：https://github.com/darma0406/believe-wordcloud
部署網址：https://darma0406.github.io/believe-wordcloud/
主要 branch：main

## Firebase

Firebase project id：believe-darma0406
Firestore database：(default)
主要 collection：wordcloud_words

目前 Firestore 規則：
- `wordcloud_words` 允許公開讀寫，供網頁即時新增、累加、刪除文字。
- 其他集合禁止讀寫。

安全規則：
- 不要提交 Firebase Admin 私鑰、service account、`.env`、token 或 credentials。
- Firebase Web config 可以出現在前端，但不要加入任何伺服器端密鑰。
- 若日後給學生公開使用，應重新評估公開寫入規則，必要時加上驗證或限流。

## Obsidian 工作紀錄

Obsidian vault：C:\Users\rpes2\Documents\Obsidian Vault
專案筆記：believe-wordcloud/專案工作模式.md

若 Obsidian MCP 無法使用，但 vault 路徑存在，可以直接寫入上述 Markdown 檔。

## 開工

當使用者只說「開工」或「?極」時：
1. 使用 `startup-sync` 工作流程。
2. 讀取本檔與 Obsidian 專案筆記。
3. 檢查 Git 狀態與 GitHub Pages 狀態。
4. 如任務與資料有關，讀取 Firebase `wordcloud_words` 的近期資料。
5. 回覆今天的優先事項、可能卡住的事項、建議工作順序。

不要在開工流程中自動 pull、commit、push 或部署，除非使用者明確要求。

## 收工

當使用者只說「收工」或「?嗅極」時：
1. 使用 `shutdown-sync` 工作流程。
2. 整理本次完成事項、未完成事項、下一步。
3. 寫入 Obsidian 專案筆記。
4. 檢查 Git diff。
5. 若本次有專案檔案變更，提交並推送到 GitHub。

摘要要簡潔、可接續，不要寫成完整聊天逐字稿。

## 專案初始化

當使用者說「專案工具初始化」、「初始化班級工具工作模式」或要求執行 #07：
1. 使用 `project-init-sync` 工作流程。
2. 補齊或更新 `AGENTS.md`、`README.md`、`.gitignore`。
3. 確認 GitHub repo、GitHub Pages、Firebase、Obsidian 筆記與三個 skills。
4. 保留既有網頁功能，不做無關重構。

## Git 與部署

- 修改後先檢查 `git status`。
- 只提交與本專案有關的檔案。
- 不提交 `.codex/`、`.claude/`、`.env*`、secrets、credentials。
- 推送後確認 GitHub Pages 狀態。

## 常用檢查

- Firebase 文字雲資料：讀取 `wordcloud_words`
- 網頁入口：`index.html`
- 前端邏輯：`app.js`
- 樣式：`styles.css`
- Firestore rules：`firestore.rules`
