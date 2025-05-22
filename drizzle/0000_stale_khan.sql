CREATE TABLE "chapterNotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterId" varchar NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "studyMaterial" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"courseType" varchar NOT NULL,
	"topic" varchar NOT NULL,
	"difficultyLevel" varchar DEFAULT 'Easy',
	"courseLayout" jsonb,
	"createdBy" varchar NOT NULL,
	"status" varchar DEFAULT 'Generating'
);
--> statement-breakpoint
CREATE TABLE "studyTypeContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"content" json,
	"type" varchar NOT NULL,
	"status" varchar DEFAULT 'Generating'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"isMember" boolean DEFAULT false
);
