```mermaid
classDiagram
  class Memo {
    +int id
    +string content
  }

  class MemoStorage {
    -db
    +create(content) Memo
    +findAll() Memo[]
    +delete(id)
  }

  class MemoApp {
    -storage MemoStorage
    -options
    +run()
    -list()
    -read()
    -delete()
    -add()
    -readStdin() string
    -firstLine(memo) string
  }

  MemoApp --> MemoStorage : uses
  MemoStorage --> Memo : creates
```
