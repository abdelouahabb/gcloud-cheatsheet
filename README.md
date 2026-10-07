# ⚛️ The Periodic Table of Google Cloud (4-Word Cheat Sheet Edition)

An interactive Single-Page Web Application that organizes **118 Google Cloud products** into a scientific **Periodic Table of Cloud Elements**, inspired by the classic *Google Cloud Developer's Cheat Sheet*.

## ✨ Features

- **118 Cloud Elements across 10 Chemical Families**:
  - 🟦 **Compute** (*Alkali Metals*) — Compute Engine (`Ce`), Bare Metal (`Bm`), Cloud TPU (`Tp`), VMware Engine (`Ve`), Shielded & Confidential VMs
  - 🩵 **Containers & Serverless** (*Alkaline Earth*) — Kubernetes Engine (`Gk`), Cloud Run (`Cr`), Cloud Run Functions (`Cf`), App Engine (`Ae`), GDC Distributed (`Gd`)
  - 🟩 **Storage & Backup** (*Transition Metals*) — Cloud Storage (`Cs`), Persistent Disk (`Pd`), Hyperdisk (`Hd`), Filestore (`Fl`), Parallelstore (`Pa`), NetApp Volumes (`Nv`)
  - 🟢 **Databases** (*Post-Transition*) — Cloud Spanner (`Sp`), AlloyDB (`Ab`), Cloud SQL (`Sq`), Bigtable (`Bg`), Firestore (`Fs`), Memorystore (`Ms`), Oracle@GCP (`Or`)
  - 🟨 **Data & Analytics** (*Metalloids*) — BigQuery (`Bq`), Dataflow (`Df`), Dataproc (`Dp`), Pub/Sub (`Ps`), Looker (`Lk`), Dataplex (`Px`), Managed Kafka (`Kf`)
  - 🟧 **Networking & Edge** (*Reactive Nonmetals*) — VPC (`Vp`), Cloud Load Balancing (`Lb`), Cloud CDN (`Cd`), Cloud Armor (`Ca`), Cloud DNS (`Dn`), Cloud Interconnect (`Ic`)
  - 🟥 **Security & Identity** (*Halogens*) — Cloud IAM (`Ia`), Cloud KMS (`Km`), Secret Manager (`Sm`), Security Command Center (`Sc`), Google SecOps (`Ch`), IAP (`Zp`)
  - 🟪 **DevOps & Operations** (*Noble Gases*) — Cloud Logging (`Cl`), Cloud Monitoring (`Cm`), Cloud Build (`Cb`), Artifact Registry (`Ar`), Cloud Deploy (`Cd2`), Gemini Cloud Assist (`Gc`)
  - 🩷 **AI & Machine Learning** (*Lanthanides Series, 57–71*) — Vertex AI (`Vx`), Gemini Models (`Gm`), Agent Builder (`Ag`), Model Garden (`Mg`), Imagen & Veo (`Im2`), Vector Search (`Ve2`)
  - 靛 **Integration, API & Migration** (*Actinides Series, 89–103*) — Apigee (`Ap`), Eventarc (`Eb`), Workflows (`Wf`), Cloud Tasks (`Tk`), Firebase (`Fb`), Migration Center (`Mc2`)
- **4-Word Taglines**: Every product features a crisp 4-word summary alongside a detailed description, `gcloud` CLI quickstart command, and Terraform resource name.
- **States of Matter Filter**: Filter products by *Gas (Serverless)*, *Liquid (Managed PaaS)*, *Solid (IaaS / Core)*, or *Plasma (Hybrid / Edge)*.
- **Chemical Bonds & Reference Cloud Compounds**: Hover any element to highlight the services it commonly integrates with, or click a pre-built **Cloud Compound** (*Global Serverless Web App*, *Enterprise GenAI RAG Agent*, *Real-Time Streaming Lakehouse*, *Zero-Trust Microservices Mesh*) to visualize its architecture pathway.
- **🧪 Cloud Lab Synthesizer**: Combine elements in a virtual beaker to synthesize a custom `gcloud` + Terraform provisioning script.
- **📜 4-Word Poster View & 🎓 Quiz Mode**: Switch between the Periodic Table, a categorized Cheat Sheet Poster, and an interactive flashcard quiz.

## 🚀 Quick Start

No build step or external dependencies required!

```bash
# Option 1: Serve locally with Python
python3 -m http.server 8080
# Open http://localhost:8080

# Option 2: Open index.html directly in any browser
```
