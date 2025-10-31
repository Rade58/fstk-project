# Full stack app with nextjs

construction-in-progress

## Auth (using neon auth)

After you get neon env variables

```bash
npx @stackframe/init-stack@latest --no-browser
```

This didn't work for me so I did a manual [setup](https://docs.stack-auth.com/docs/getting-started/setup)

## CRON job syntax used in `vercel.json`

calling weekly (every Sunday) (at 00:00 Sunday)

[0 0 * * 7](https://crontab.guru/#0_0_*_*_0)
