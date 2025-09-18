-- CreateTable
CREATE TABLE "WeddingWish" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "wish_message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeddingWish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WeddingWish_invitation_id_idx" ON "WeddingWish"("invitation_id");

-- AddForeignKey
ALTER TABLE "WeddingWish" ADD CONSTRAINT "WeddingWish_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
