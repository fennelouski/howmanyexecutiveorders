# AWS parallel deployment

Mode: parallel. Production domains remain on Vercel. Target cutover:
22 October 2026 at 07:00 UTC, subject to the readiness rules in AGENTS.md.
AWS-only releases are not enabled yet.

Use Node 24, Python 3, GitHub CLI and AWS CLI. Sign into GitHub and the AWS
profile for account 074861507225, then commit changes and run:

```sh
npm run deploy:parallel -- --profile fishbowl-head
```

Prefer an available idle owned computer, otherwise the current computer.
The command runs where invoked; it does not automatically select a remote host.
It checks the clean revision, repository, branch, cutoff date and AWS account,
installs locked dependencies, runs checks, pushes the revision for Vercel,
deploys AWS and tests the live AWS site. Verify Vercel's commit status separately.
A plain Git push only updates Vercel. After the cutoff the parallel command
refuses to run. Establish a tested AWS-only release command before cutover.

AWS uses SST app `executiveorders`, stage `parallel`, region `us-west-2`.
Read `.sst/outputs.json` for the preview URL. The preview username is `preview`;
its password is the SST secret `PreviewPassword`. Automated checks read it
through `sst shell`. Never commit the password or AWS credentials. Direct Lambda
URLs require CloudFront origin access control. The preview is password protected
and excluded from search indexing. It has no production domain or scheduler.

The migration updates Next.js and its ESLint configuration to 16.3.6 for
OpenNext 4.1.5. Vercel still uses `npm run build`. It also fixes two existing
serverless data issues: the homepage fetched localhost, and the Federal Register
request incorrectly combined all requested fields into one invalid field.
Both the homepage and API now use the shared data function.

Validation: `npm run test:aws`, `npm run lint`, `npm run build:aws` and the live
smoke check through `npx sst shell --stage parallel -- node scripts/smoke-aws.mjs`.
The smoke check requires real data and rejects the loading-only fallback.
Browser interaction, rollback and production domain cutover need separate checks.

Rollback means redeploying a previously verified revision. Do not delete the SST
stage; deletion is protected and resources are retained. Free external services
remain unchanged. See the root AGENTS.md for the review and cancellation dates.
