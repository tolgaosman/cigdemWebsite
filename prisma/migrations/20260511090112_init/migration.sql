-- CreateTable
CREATE TABLE "BasvuruFormu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adSoyad" TEXT NOT NULL,
    "oncekiDestek" BOOLEAN NOT NULL,
    "destekKonusu" TEXT NOT NULL,
    "uygunSaatDilimi" TEXT NOT NULL,
    "mesaj" TEXT,
    "olusturmaTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "okundu" BOOLEAN NOT NULL DEFAULT false
);
