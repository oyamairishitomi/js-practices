```mermaid
classDiagram
  class Memo {
    -int id
    -string content
    +int id
    +string content
    +string firstLine
  }

  class MemoStorage {
    +db
    +create(content) Memo
    +findAll() Memo[]
    +delete(id)
  }

  class MemoApp {
    +options
    +storage MemoStorage
    +run()
    -list()
    -read()
    -delete()
    -add()
    -readStdin() string
  }

  MemoApp --> MemoStorage : uses
  MemoStorage --> Memo : creates
```
