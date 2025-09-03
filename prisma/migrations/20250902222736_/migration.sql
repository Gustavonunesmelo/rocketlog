/*
  Warnings:

  - Added the required column `description` to the `delivery_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delivery_logs" ADD COLUMN     "description" TEXT NOT NULL;
