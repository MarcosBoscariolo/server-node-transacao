-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "entrada" REAL NOT NULL DEFAULT 0.00,
    "saida" REAL NOT NULL DEFAULT 0.00,
    "total" REAL NOT NULL DEFAULT 0.00
);
INSERT INTO "new_Conta" ("entrada", "id", "saida", "total") SELECT "entrada", "id", "saida", "total" FROM "Conta";
DROP TABLE "Conta";
ALTER TABLE "new_Conta" RENAME TO "Conta";
CREATE TABLE "new_transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL DEFAULT 0.00,
    "categoria" TEXT NOT NULL,
    "tipo_transacao" TEXT NOT NULL,
    "data_transacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_transacao" ("categoria", "data_transacao", "descricao", "id", "preco", "tipo_transacao") SELECT "categoria", "data_transacao", "descricao", "id", "preco", "tipo_transacao" FROM "transacao";
DROP TABLE "transacao";
ALTER TABLE "new_transacao" RENAME TO "transacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
