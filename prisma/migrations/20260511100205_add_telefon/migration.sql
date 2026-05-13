/*
  Warnings:

  - Added the required column `telefon` to the `BasvuruFormu` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BasvuruFormu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adSoyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "sikayet" TEXT NOT NULL,
    "anamnezJson" TEXT NOT NULL,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "okundu" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_BasvuruFormu" ("adSoyad", "anamnezJson", "email", "id", "okundu", "olusturmaTarihi", "sikayet") SELECT "adSoyad", "anamnezJson", "email", "id", "okundu", "olusturmaTarihi", "sikayet" FROM "BasvuruFormu";
DROP TABLE "BasvuruFormu";
ALTER TABLE "new_BasvuruFormu" RENAME TO "BasvuruFormu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
