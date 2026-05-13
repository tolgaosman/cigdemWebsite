/*
  Warnings:

  - You are about to drop the column `destekKonusu` on the `BasvuruFormu` table. All the data in the column will be lost.
  - You are about to drop the column `mesaj` on the `BasvuruFormu` table. All the data in the column will be lost.
  - You are about to drop the column `oncekiDestek` on the `BasvuruFormu` table. All the data in the column will be lost.
  - You are about to drop the column `uygunSaatDilimi` on the `BasvuruFormu` table. All the data in the column will be lost.
  - Added the required column `anamnezJson` to the `BasvuruFormu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `BasvuruFormu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sikayet` to the `BasvuruFormu` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BasvuruFormu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adSoyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sikayet" TEXT NOT NULL,
    "anamnezJson" TEXT NOT NULL,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "okundu" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_BasvuruFormu" ("adSoyad", "id", "okundu", "olusturmaTarihi") SELECT "adSoyad", "id", "okundu", "olusturmaTarihi" FROM "BasvuruFormu";
DROP TABLE "BasvuruFormu";
ALTER TABLE "new_BasvuruFormu" RENAME TO "BasvuruFormu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
