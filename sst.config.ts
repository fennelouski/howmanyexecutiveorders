/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    if (input.stage !== "parallel") throw new Error("Only the parallel test stage is enabled.");
    return {
      name: "executiveorders",
      home: "aws",
      removal: "retain",
      protect: true,
      providers: { aws: { region: "us-west-2", allowedAccountIds: ["074861507225"] } },
    };
  },
  async run() {
    const { previewRequest, previewResponse } = await import("./scripts/aws-preview.mjs");
    const password = new sst.Secret("PreviewPassword");
    const site = new sst.aws.Nextjs("Site", {
      buildCommand: "npm run build:aws",
      openNextVersion: "4.1.5",
      // This read-only site has no POST endpoints or server actions.
      protection: "oac",
      server: { runtime: "nodejs24.x" },
      edge: {
        viewerRequest: { injection: password.value.apply(previewRequest) },
        viewerResponse: { injection: previewResponse },
      },
    });
    return { url: site.url };
  },
});
