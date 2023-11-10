import { z } from "zod";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { sheets, auth } from "@googleapis/sheets";
import { getSession } from "next-auth/react";
import { getStorage } from "firebase-admin/storage";

// Convert a string that has tabs and newlines and preserve them by escaping them so that firebase doesnt strip them.
function escapeAppList(appList: string): string {
  // Don't escape an string that is already formatted.
  if (appList.includes("\\t")) {
    console.log("Applist is already escaped....");
    return appList;
  }
  const newAppList = appList.replaceAll("\n", "\\n").replaceAll("\t", "\\t");
  console.log("Returning app list: ", newAppList);
  return newAppList;
}

const AppListEntrySchema = z.object({
  apps: z.string(),
  driveURL: z.string(),
  listname: z.string(),
  playstore: z.boolean(),
});

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  runCmd: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      let res = "";
      try {
        const runCommand = new Promise<string>((res, rej) => {
          // Define the SSH command to be executed
          // const ssh: ChildProcessWithoutNullStreams = spawn('ssh', ['samus@98.45.154.253', 'npm -v']);
          const test: ChildProcessWithoutNullStreams = spawn("curl", [
            "ifconfig.me",
          ]);

          // Handle output from the SSH command

          test.stdout.on("data", (data: any) => {
            console.log("stdout:", data);
          });

          test.stderr.on("data", (data: any) => {
            console.error("stderr:", data);
          });

          test.on("close", (code: any) => {
            console.log("child process exited with code: ", code);
            res("Closed!");
          });
        });

        res = await runCommand;
        console.log("Running command: ", res);
      } catch (err) {
        console.log("Error runnign command: ", err);
      }

      return {
        result: res,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  deleteBrokenAppsCollection: protectedProcedure
    .input(z.object({ document: z.string() }))
    .mutation(async ({ input }) => {
      // Deletes Doc and sub collection from Firestore - AmaceRuns
      console.log(
        "[NEEDS UPDATE] Deleting deleteBrokenAppsCollection docID: ",
        input.document
      );
    }),

  deleteCollection: protectedProcedure
    .input(z.object({ docID: z.string() }))
    .mutation(async ({ input }) => {
      // Deletes Doc and sub collection from Firestore - AmaceRuns
      console.log("[NEEDS UPDATE] Deleting docID: ", input.docID);
    }),

  createAppList: protectedProcedure
    .input(AppListEntrySchema)
    .mutation(async ({ input }) => {
      // Deletes Doc and sub collection from Firestore - AmaceRuns
      console.log(
        "[NEEDS UPDATE]  Creating list: ",
        input.listname,
        input.driveURL,
        input.apps
      );
    }),

  updateAppList: protectedProcedure
    .input(AppListEntrySchema)
    .mutation(async ({ input }) => {
      // Deletes Doc and sub collection from Firestore - AmaceRuns
      console.log(
        "[NEEDS UPDATE] Updating list: ",
        input.listname,
        input.driveURL,
        input.apps
      );
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
