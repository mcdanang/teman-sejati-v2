-- CreateTable
CREATE TABLE "RSVP" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "guest_name" TEXT NOT NULL,
    "will_attend" BOOLEAN NOT NULL,
    "people_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RSVP_invitation_id_idx" ON "RSVP"("invitation_id");

-- AddForeignKey
ALTER TABLE "RSVP" ADD CONSTRAINT "RSVP_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
