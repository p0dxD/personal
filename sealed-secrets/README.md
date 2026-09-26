# Sealed secrets

Encrypted with the cluster's sealed-secrets key (safe to commit). The
sealed-secrets controller turns each file into the Secret the app reads.

rendimiento does not apply these; they are kept here so the secrets can be
restored if the cluster is rebuilt:

    kubectl apply -f sealed-secrets/
