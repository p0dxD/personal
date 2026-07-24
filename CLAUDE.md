# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build
npm run lint       # ESLint

docker build -t podoi-tech-website .          # build container image
docker run -p 3000:3000 podoi-tech-website    # run container locally
```

## Architecture

Next.js 14 App Router portfolio site for Jose R. / Podoi Tech LLC. Glassmorphism + gradient design. Includes a Postgres-backed blog with a password-protected admin CMS.

```
app/
  layout.tsx                     — root layout, Geist fonts, metadata
  page.tsx                       — assembles Hero → Projects → LatestPosts → About → Contact (force-dynamic)
  globals.css                    — mesh-bg animation, .glass utility, .gradient-text, .btn-gradient, .post-content (markdown styling)
  api/contact/route.ts           — POST handler; sends email via Resend (`RESEND_API_KEY`)
  blog/page.tsx                  — public post list (force-dynamic)
  blog/[slug]/page.tsx           — public post page (force-dynamic)
  admin/page.tsx                 — post dashboard (list/edit/publish/delete), gated by middleware.ts
  admin/login/page.tsx           — password login form
  admin/login/actions.ts         — login/logout Server Actions
  admin/posts/new/page.tsx       — new post editor
  admin/posts/[id]/edit/page.tsx — edit post editor
  admin/posts/actions.ts         — create/update/delete/publish Server Actions (each calls requireAdmin())

components/
  Hero.tsx              — full-viewport landing with animated orbs, glass card, CTA buttons
  Projects.tsx          — grid of glass project cards; add new projects to the `projects` array
  LatestPosts.tsx       — homepage teaser, 3 most recent published posts, hidden if none
  About.tsx             — bio + tech skills grid
  Contact.tsx           — client component; form → /api/contact → success/error state
  MarkdownRenderer.tsx  — react-markdown + remark-gfm + rehype-highlight, shared by public post page and admin live preview
  admin/PostEditor.tsx  — client editor: title/slug/excerpt/tags + markdown textarea with live preview
  admin/DeleteButton.tsx, admin/PublishToggle.tsx — small client components wrapping bound Server Actions

lib/
  db.ts     — pooled `pg` client singleton, reads `DATABASE_URL`
  posts.ts  — typed data-access functions for the `posts` table
  auth.ts   — HMAC session token (Web Crypto, Edge-compatible), password check, requireAdmin()

proxy.ts — gates `/admin/**` (except `/admin/login`) behind the session cookie (Next.js 16 renamed the `middleware.ts` convention to `proxy.ts`; same `config.matcher` behavior)

db/
  schema.sql — `posts` table + index; apply manually via psql, or auto-bootstraps via the ArgoCD-managed init ConfigMap on a fresh volume

argocd/  — the directory ArgoCD actually syncs (see `argocd-application.yaml`, `path: argocd`); Jenkins builds the image and bumps `kustomization.yaml`'s tag on every push to `main`, then ArgoCD auto-syncs (`syncPolicy.automated`, self-heal on)
  argocd-application.yaml       — ArgoCD Application resource, watches this repo's `argocd/` dir, namespace `podoi`
  kustomization.yaml            — lists all resources below + the image tag Jenkins bumps
  namespace.yaml                — creates `podoi` namespace
  deployment.yaml                — 2 replicas, env from `website-contact-secret` Secret
  service.yaml                   — ClusterIP on port 80 → container 3000
  ingress.yaml                   — nginx ingressClass, host `joserod.space` / `www.joserod.space`
  postgres-pvc.yaml              — `blog-postgres-pvc`, Longhorn, 2Gi
  postgres-deployment.yaml       — `blog-postgres`, postgres:15-alpine, 1 replica, `POSTGRES_PASSWORD` from `website-contact-secret`
  postgres-service.yaml          — ClusterIP `blog-postgres` on 5432
  postgres-init-configmap.yaml   — mounts `db/schema.sql` into `/docker-entrypoint-initdb.d/` (first-boot bootstrap only)
  website-contact-sealedsecret.yaml — SealedSecret (bitnami sealed-secrets), decrypts in-cluster to `website-contact-secret`

k8s/ — an older, untracked draft of the manifests above (different registry host, no Postgres). Not referenced by ArgoCD or Jenkins; kept only until someone decides to delete it. Always edit `argocd/`, not `k8s/`.
```

## Deployment (k3s + Jenkins + ArgoCD)

Jenkins (`Jenkinsfile` + `jenkinsconfig.yaml`) builds and pushes the image on every push to `main`, and bumps the tag in `argocd/kustomization.yaml`. ArgoCD (`argocd/argocd-application.yaml`) has `syncPolicy.automated` with self-heal, so once that commit lands, the cluster converges on its own — no manual `kubectl apply` needed, including for the SealedSecret itself since it's committed to `argocd/` like everything else.

**Secrets are managed via [Bitnami sealed-secrets](https://github.com/bitnami-labs/sealed-secrets)** (the cluster already runs the controller in `kube-system`, matching the `wellness-secret`/`umami-secret` pattern in those namespaces) — never commit a plain Secret. `website-contact-secret` is one combined SealedSecret covering both the app (`RESEND_API_KEY`, `DATABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`) and the blog's Postgres pod (`POSTGRES_PASSWORD`), same as how `wellness-secret` covers both `wellness` and `wellness-postgres`.

To rotate or add a key:
```bash
kubectl create secret generic website-contact-secret -n podoi --dry-run=client -o yaml \
  --from-literal=RESEND_API_KEY=... \
  --from-literal=POSTGRES_PASSWORD=... \
  --from-literal=DATABASE_URL=postgres://blog:<postgres-password>@blog-postgres.podoi.svc.cluster.local:5432/blog \
  --from-literal=ADMIN_PASSWORD=... \
  --from-literal=SESSION_SECRET=$(openssl rand -hex 32) \
  | kubeseal --format yaml > argocd/website-contact-sealedsecret.yaml
```
Commit the resulting file (it's ciphertext, safe to commit) — never commit the plain `-o yaml` output. To read a current value out of the live secret: `kubectl get secret website-contact-secret -n podoi -o jsonpath='{.data.ADMIN_PASSWORD}' | base64 -d`.

Apply `db/schema.sql` once before first use — `postgres-init-configmap.yaml` bootstraps it automatically on the Postgres pod's first start against a fresh PVC, or run it manually:
```bash
kubectl exec -n podoi deploy/blog-postgres -- psql -U blog -d blog < db/schema.sql
```
Future schema changes are hand-written `db/migrations/000N_*.sql` files, applied manually the same way.

Ingress host is set to `joserod.space` / `www.joserod.space`; update `argocd/ingress.yaml` if the domain changes.

The public homepage and `/blog` degrade gracefully (empty state, not a crash) if Postgres/the secret isn't ready yet — but `/admin` and the blog itself won't actually work until the secret and schema are in place.

## Adding a New Project

Edit `components/Projects.tsx` and append to the `projects` array at the top of the file.

## Writing a Blog Post

Log in at `/admin/login` with `ADMIN_PASSWORD`, then use `/admin` to create, edit, publish/unpublish, or delete posts. Posts are stored in Postgres and rendered dynamically, so new content shows up immediately with no rebuild — the markdown editor has a live preview using the same renderer as the public post page.
