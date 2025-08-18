-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'sales');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'DELIVERED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'customer',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_logs" (
    "id" TEXT NOT NULL,
    "delivery_id" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_logs" ADD CONSTRAINT "delivery_logs_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
