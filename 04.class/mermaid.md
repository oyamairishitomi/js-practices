https://mermaid.ai/app/projects/a33ce01d-ab8a-4242-be54-cfc26b860757/diagrams/bbb8fafe-4f33-47bd-8cc2-1fd46124a45e/share/invite/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudElEIjoiYmJiOGZhZmUtNGYzMy00N2JkLThjYzItMWZkNDYxMjRhNDVlIiwiYWNjZXNzIjoiVmlldyIsImlhdCI6MTc4MDMxNTQ4NH0.8PQLqJNDkTmLBdJBz5Ul0clhh82UeFHjb2ht4R0ea8A?entryPoint=share-modal

classDiagram
class Memo {
+int id
+string content
+string title
}

class MemoStorage {
-db
+create(content) Memo
+findAll() Memo[]
+destroy(id)
}

class MemoApp {
-storage MemoStorage
-argv
+run()
-list()
-add()
-read()
-delete()
-readStdin() string
}

MemoApp --> MemoStorage : uses
MemoStorage --> Memo : creates
