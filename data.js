// Periodic Table of Google Cloud Products - Dataset & Reference Architectures
const CATEGORIES = {
  compute: {
    id: 'compute',
    name: 'Compute',
    chemGroup: 'Alkali Metals',
    color: '#4285F4',
    bgGlow: 'rgba(66, 133, 244, 0.18)',
    description: 'Virtual machines, bare metal, and high-performance computing infrastructure.'
  },
  serverless: {
    id: 'serverless',
    name: 'Containers & Serverless',
    chemGroup: 'Alkaline Earth',
    color: '#00ACC1',
    bgGlow: 'rgba(0, 172, 193, 0.18)',
    description: 'Managed Kubernetes, container runtime, functions, and orchestration.'
  },
  storage: {
    id: 'storage',
    name: 'Storage & Backup',
    chemGroup: 'Transition Metals',
    color: '#34A853',
    bgGlow: 'rgba(52, 168, 83, 0.18)',
    description: 'Object, block, file, and archival storage systems.'
  },
  databases: {
    id: 'databases',
    name: 'Databases',
    chemGroup: 'Post-Transition',
    color: '#10B981',
    bgGlow: 'rgba(16, 185, 129, 0.18)',
    description: 'Relational, NoSQL, in-memory, and globally distributed transactional databases.'
  },
  analytics: {
    id: 'analytics',
    name: 'Data & Analytics',
    chemGroup: 'Metalloids',
    color: '#FBBC04',
    bgGlow: 'rgba(251, 188, 4, 0.18)',
    description: 'Data warehousing, stream/batch processing, business intelligence, and governance.'
  },
  networking: {
    id: 'networking',
    name: 'Networking & Edge',
    chemGroup: 'Reactive Nonmetals',
    color: '#FF7043',
    bgGlow: 'rgba(255, 112, 67, 0.18)',
    description: 'Global VPC, load balancing, CDN, DNS, and hybrid connectivity.'
  },
  security: {
    id: 'security',
    name: 'Security & Identity',
    chemGroup: 'Halogens',
    color: '#EA4335',
    bgGlow: 'rgba(234, 67, 53, 0.18)',
    description: 'Identity management, encryption keys, zero-trust access, and threat detection.'
  },
  operations: {
    id: 'operations',
    name: 'DevOps & Operations',
    chemGroup: 'Noble Gases',
    color: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.18)',
    description: 'Observability, CI/CD pipelines, infrastructure as code, and developer tools.'
  },
  aiml: {
    id: 'aiml',
    name: 'AI & Machine Learning',
    chemGroup: 'Lanthanides (Rare Earth)',
    color: '#EC4899',
    bgGlow: 'rgba(236, 72, 153, 0.18)',
    description: 'Foundation models, generative AI agents, custom ML training, and pre-trained APIs.'
  },
  integration: {
    id: 'integration',
    name: 'Integration, API & Migration',
    chemGroup: 'Actinides (Synthetic)',
    color: '#6366F1',
    bgGlow: 'rgba(99, 102, 241, 0.18)',
    description: 'API management, event-driven messaging, workflows, and cloud migration tools.'
  }
};

const STATES_OF_MATTER = {
  serverless: { id: 'serverless', label: 'Gas (Serverless)', badge: 'Serverless', desc: 'Zero infrastructure management, auto-scales to zero' },
  managed: { id: 'managed', label: 'Liquid (Managed)', badge: 'Managed PaaS', desc: 'Automated patching, scaling & high availability' },
  infra: { id: 'infra', label: 'Solid (IaaS / Core)', badge: 'IaaS / Infra', desc: 'Direct control over VMs, nodes, networks, or hardware' },
  hybrid: { id: 'hybrid', label: 'Plasma (Edge / Hybrid)', badge: 'Hybrid / Edge', desc: 'Spans on-premises, multi-cloud, or global edge PoPs' }
};

// Periodic Table Grid Layout:
// Main table: rows 1-7, cols 1-18
// Lanthanides (AI/ML): row 8, cols 3-17 (15 elements)
// Actinides (Integration & Migration): row 9, cols 3-17 (15 elements)
const GCP_ELEMENTS = [
  // ================= ROW 1 =================
  {
    number: 1, symbol: 'Ce', name: 'Compute Engine', category: 'compute', state: 'infra',
    row: 1, col: 1, mass: '2012.1',
    fourWords: 'Virtual machines on Google',
    summary: 'Secure and customizable compute service that lets you create and run virtual machines on Google’s global infrastructure.',
    cli: 'gcloud compute instances create my-vm --zone=us-central1-a',
    terraform: 'google_compute_instance',
    bondsWith: ['Vp', 'Pd', 'Lb', 'Ia'],
    docs: 'https://cloud.google.com/compute/docs'
  },
  {
    number: 2, symbol: 'Cl', name: 'Cloud Logging', category: 'operations', state: 'serverless',
    row: 1, col: 18, mass: '99.95%',
    fourWords: 'Real-time log management analysis',
    summary: 'Fully managed real-time log management with storage, search, analysis, and alerting at exabyte scale.',
    cli: 'gcloud logging read "severity>=ERROR" --limit=10',
    terraform: 'google_logging_metric',
    bondsWith: ['Cm', 'Ct', 'Bq', 'Ps'],
    docs: 'https://cloud.google.com/logging/docs'
  },

  // ================= ROW 2 =================
  {
    number: 3, symbol: 'Bm', name: 'Bare Metal Solution', category: 'compute', state: 'infra',
    row: 2, col: 1, mass: '99.99%',
    fourWords: 'Dedicated hardware for specialized',
    summary: 'Run specialized workloads (like Oracle) on dedicated, low-latency hardware near Google Cloud services.',
    cli: 'gcloud bms instances list --region=us-central1',
    terraform: 'google_bare_metal_solution_instance',
    bondsWith: ['Ce', 'Ic', 'Vp'],
    docs: 'https://cloud.google.com/bare-metal/docs'
  },
  {
    number: 4, symbol: 'Gk', name: 'Kubernetes Engine', category: 'serverless', state: 'managed',
    row: 2, col: 2, mass: '2015.8',
    fourWords: 'Managed Kubernetes container orchestration',
    summary: 'Production-ready managed Kubernetes environment with Autopilot mode, auto-scaling, and multi-cluster fleet support.',
    cli: 'gcloud container clusters create-auto my-cluster --region=us-central1',
    terraform: 'google_container_cluster',
    bondsWith: ['Ar', 'Sm', 'Cb', 'Lb'],
    docs: 'https://cloud.google.com/kubernetes-engine/docs'
  },
  {
    number: 5, symbol: 'Bq', name: 'BigQuery', category: 'analytics', state: 'serverless',
    row: 2, col: 13, mass: '99.99%',
    fourWords: 'Serverless petabyte data warehouse',
    summary: 'Serverless, cost-effective, multi-cloud data warehouse with built-in ML, BI Engine, and geospatial analysis.',
    cli: 'bq query --use_legacy_sql=false "SELECT * FROM dataset.table LIMIT 10"',
    terraform: 'google_bigquery_dataset',
    bondsWith: ['Df', 'Ps', 'Ls', 'Vx'],
    docs: 'https://cloud.google.com/bigquery/docs'
  },
  {
    number: 6, symbol: 'Vp', name: 'Virtual Private Cloud', category: 'networking', state: 'infra',
    row: 2, col: 14, mass: 'Global',
    fourWords: 'Global virtual network fabric',
    summary: 'Global, scalable, and flexible software-defined networking for all your Google Cloud resources.',
    cli: 'gcloud compute networks create my-vpc --subnet-mode=custom',
    terraform: 'google_compute_network',
    bondsWith: ['Ce', 'Gk', 'Ca', 'Lb'],
    docs: 'https://cloud.google.com/vpc/docs'
  },
  {
    number: 7, symbol: 'Lb', name: 'Cloud Load Balancing', category: 'networking', state: 'serverless',
    row: 2, col: 15, mass: 'Anycast',
    fourWords: 'Global traffic distribution scaling',
    summary: 'High-performance, scalable load balancing across global regions using a single anycast IP address.',
    cli: 'gcloud compute forwarding-rules list',
    terraform: 'google_compute_global_forwarding_rule',
    bondsWith: ['Cd', 'Ca', 'Cr', 'Gk'],
    docs: 'https://cloud.google.com/load-balancing/docs'
  },
  {
    number: 8, symbol: 'Cd', name: 'Cloud CDN', category: 'networking', state: 'hybrid',
    row: 2, col: 16, mass: 'Edge',
    fourWords: 'Global edge content delivery',
    summary: 'Fast, reliable web and video content delivery network using Google’s global edge points of presence.',
    cli: 'gcloud compute backend-services update my-backend --enable-cdn',
    terraform: 'google_compute_backend_service',
    bondsWith: ['Lb', 'Cs', 'Ca', 'Cr'],
    docs: 'https://cloud.google.com/cdn/docs'
  },
  {
    number: 9, symbol: 'Ia', name: 'Cloud IAM', category: 'security', state: 'serverless',
    row: 2, col: 17, mass: 'ZeroTrust',
    fourWords: 'Fine-grained access control policies',
    summary: 'Unified identity and access management to authorize who can take action on specific Google Cloud resources.',
    cli: 'gcloud projects add-iam-policy-binding my-project --member=user:a@b.com --role=roles/viewer',
    terraform: 'google_project_iam_binding',
    bondsWith: ['rm', 'Km', 'Sc', 'Ip'],
    docs: 'https://cloud.google.com/iam/docs'
  },
  {
    number: 10, symbol: 'Cm', name: 'Cloud Monitoring', category: 'operations', state: 'serverless',
    row: 2, col: 18, mass: 'Metrics',
    fourWords: 'Infrastructure and application metrics',
    summary: 'Gain visibility into the performance, availability, and health of your applications and infrastructure.',
    cli: 'gcloud monitoring dashboards list',
    terraform: 'google_monitoring_alert_policy',
    bondsWith: ['Cl', 'Ct', 'Cp', 'Ce'],
    docs: 'https://cloud.google.com/monitoring/docs'
  },

  // ================= ROW 3 =================
  {
    number: 11, symbol: 'ig', name: 'Instance Groups', category: 'compute', state: 'managed',
    row: 3, col: 1, mass: 'Auto',
    fourWords: 'Auto-scaling identical VM fleets',
    summary: 'Managed Instance Groups (MIGs) provide auto-scaling, auto-healing, and regional multi-zone deployment for VMs.',
    cli: 'gcloud compute instance-groups managed create my-mig --size=3',
    terraform: 'google_compute_region_instance_group_manager',
    bondsWith: ['Ce', 'Lb', 'Vp'],
    docs: 'https://cloud.google.com/compute/docs/instance-groups'
  },
  {
    number: 12, symbol: 'Cr', name: 'Cloud Run', category: 'serverless', state: 'serverless',
    row: 3, col: 2, mass: '2019.4',
    fourWords: 'Serverless stateless containers anywhere',
    summary: 'Build and deploy scalable containerized apps and jobs written in any language on a fully managed serverless platform.',
    cli: 'gcloud run deploy my-service --image=gcr.io/my-proj/app --region=us-central1',
    terraform: 'google_cloud_run_v2_service',
    bondsWith: ['Ar', 'Cb', 'Eb', 'Sq'],
    docs: 'https://cloud.google.com/run/docs'
  },
  {
    number: 13, symbol: 'Sq', name: 'Cloud SQL', category: 'databases', state: 'managed',
    row: 3, col: 13, mass: '99.99%',
    fourWords: 'Managed MySQL PostgreSQL SQLServer',
    summary: 'Fully managed relational database service for MySQL, PostgreSQL, and SQL Server with automated backups and replicas.',
    cli: 'gcloud sql instances create my-db --database-version=POSTGRES_15',
    terraform: 'google_sql_database_instance',
    bondsWith: ['Cr', 'Gk', 'Dm', 'Vp'],
    docs: 'https://cloud.google.com/sql/docs'
  },
  {
    number: 14, symbol: 'Df', name: 'Dataflow', category: 'analytics', state: 'serverless',
    row: 3, col: 14, mass: 'Beam',
    fourWords: 'Streaming and batch data',
    summary: 'Unified stream and batch data processing that is serverless, fast, and cost-effective, built on Apache Beam.',
    cli: 'gcloud dataflow jobs run my-job --gcs-location=gs://dataflow-templates/...',
    terraform: 'google_dataflow_job',
    bondsWith: ['Ps', 'Bq', 'Cs', 'Bt'],
    docs: 'https://cloud.google.com/dataflow/docs'
  },
  {
    number: 15, symbol: 'Dn', name: 'Cloud DNS', category: 'networking', state: 'serverless',
    row: 3, col: 15, mass: '100% SLA',
    fourWords: 'Programmable authoritative DNS serving',
    summary: 'High-performance, resilient, global Domain Name System service with 100% SLA and DNSSEC support.',
    cli: 'gcloud dns managed-zones create my-zone --dns-name=example.com.',
    terraform: 'google_dns_managed_zone',
    bondsWith: ['Lb', 'Vp', 'Sd'],
    docs: 'https://cloud.google.com/dns/docs'
  },
  {
    number: 16, symbol: 'Ca', name: 'Cloud Armor', category: 'networking', state: 'hybrid',
    row: 3, col: 16, mass: 'WAF/DDoS',
    fourWords: 'DDoS defense and WAF',
    summary: 'Protect your applications and websites against denial of service and web attacks (OWASP Top 10) at the global edge.',
    cli: 'gcloud compute security-policies create my-waf-policy',
    terraform: 'google_compute_security_policy',
    bondsWith: ['Lb', 'Cd', 'Rc', 'Sc'],
    docs: 'https://cloud.google.com/armor/docs'
  },
  {
    number: 17, symbol: 'Km', name: 'Cloud KMS', category: 'security', state: 'serverless',
    row: 3, col: 17, mass: 'FIPS140-3',
    fourWords: 'Cryptographic key management service',
    summary: 'Manage cryptographic keys for your cloud services the same way you do on-premises, including Cloud HSM and EKM.',
    cli: 'gcloud kms keyrings create my-keyring --location=global',
    terraform: 'google_kms_crypto_key',
    bondsWith: ['Sm', 'Cs', 'Bq', 'Ia'],
    docs: 'https://cloud.google.com/kms/docs'
  },
  {
    number: 18, symbol: 'Cb', name: 'Cloud Build', category: 'operations', state: 'serverless',
    row: 3, col: 18, mass: 'CI/CD',
    fourWords: 'Serverless continuous integration platform',
    summary: 'Execute your builds on Google Cloud infrastructure continuously with deep container security scanning.',
    cli: 'gcloud builds submit --tag us-central1-docker.pkg.dev/proj/repo/img',
    terraform: 'google_cloud_build_trigger',
    bondsWith: ['Ar', 'Dp', 'Cr', 'Gk'],
    docs: 'https://cloud.google.com/build/docs'
  },

  // ================= ROW 4 =================
  {
    number: 19, symbol: 'Bt', name: 'Batch', category: 'compute', state: 'managed',
    row: 4, col: 1, mass: 'HPC',
    fourWords: 'Fully managed batch scheduler',
    summary: 'Schedule, queue, and execute batch processing workloads at scale on Compute Engine VMs or Spot instances.',
    cli: 'gcloud batch jobs submit my-batch-job --location=us-central1',
    terraform: 'google_batch_job',
    bondsWith: ['Ce', 'Cs', 'Fl'],
    docs: 'https://cloud.google.com/batch/docs'
  },
  {
    number: 20, symbol: 'Cf', name: 'Cloud Run Functions', category: 'serverless', state: 'serverless',
    row: 4, col: 2, mass: 'FaaS',
    fourWords: 'Event-driven single-purpose serverless code',
    summary: 'Write simple, single-purpose functions that are attached to events emitted from your cloud infrastructure and services.',
    cli: 'gcloud functions deploy my-func --runtime=nodejs20 --trigger-http',
    terraform: 'google_cloudfunctions2_function',
    bondsWith: ['Eb', 'Ps', 'Cs', 'Fs'],
    docs: 'https://cloud.google.com/functions/docs'
  },
  {
    number: 21, symbol: 'Cs', name: 'Cloud Storage', category: 'storage', state: 'serverless',
    row: 4, col: 3, mass: '11-9s',
    fourWords: 'Global durable object storage',
    summary: 'Unified object storage for developers and enterprises, with Standard, Nearline, Coldline, and Archive classes.',
    cli: 'gcloud storage buckets create gs://my-unique-bucket',
    terraform: 'google_storage_bucket',
    bondsWith: ['Bq', 'Cd', 'Df', 'Vx'],
    docs: 'https://cloud.google.com/storage/docs'
  },
  {
    number: 22, symbol: 'Pd', name: 'Persistent Disk', category: 'storage', state: 'infra',
    row: 4, col: 4, mass: 'Block',
    fourWords: 'Reliable block storage volumes',
    summary: 'High-performance, reliable block storage for Compute Engine and GKE with instant snapshots and encryption.',
    cli: 'gcloud compute disks create my-disk --size=200GB --type=pd-ssd',
    terraform: 'google_compute_disk',
    bondsWith: ['Ce', 'Gk', 'Bk'],
    docs: 'https://cloud.google.com/persistent-disk'
  },
  {
    number: 23, symbol: 'Hd', name: 'Hyperdisk', category: 'storage', state: 'infra',
    row: 4, col: 5, mass: '500K IOPS',
    fourWords: 'Next-gen sub-millisecond block storage',
    summary: 'Next-generation block storage with decoupled IOPS/throughput provisioning and Storage Pools for mission-critical workloads.',
    cli: 'gcloud compute disks create my-hyperdisk --type=hyperdisk-extreme',
    terraform: 'google_compute_disk',
    bondsWith: ['Ce', 'Ab', 'Sq'],
    docs: 'https://cloud.google.com/compute/docs/disks/hyperdisks'
  },
  {
    number: 24, symbol: 'Fl', name: 'Filestore', category: 'storage', state: 'managed',
    row: 4, col: 6, mass: 'NFS',
    fourWords: 'Managed high-performance NFS file',
    summary: 'Fully managed network-attached storage (NAS) for Compute Engine and GKE workloads needing shared file systems.',
    cli: 'gcloud filestore instances create my-nas --tier=BASIC_HDD',
    terraform: 'google_filestore_instance',
    bondsWith: ['Gk', 'Ce', 'Bt'],
    docs: 'https://cloud.google.com/filestore/docs'
  },
  {
    number: 25, symbol: 'Ls', name: 'Local SSD', category: 'storage', state: 'infra',
    row: 4, col: 7, mass: 'NVMe',
    fourWords: 'Ephemeral ultra-fast NVMe scratch',
    summary: 'Physically attached NVMe SSD storage on the same host server as your VM for ultra-low latency scratch data.',
    cli: 'gcloud compute instances create vm-1 --local-ssd=interface=NVME',
    terraform: 'google_compute_instance',
    bondsWith: ['Ce', 'Dp', 'Gk'],
    docs: 'https://cloud.google.com/compute/docs/disks/local-ssd'
  },
  {
    number: 26, symbol: 'St', name: 'Storage Transfer', category: 'storage', state: 'managed',
    row: 4, col: 8, mass: 'Gbps',
    fourWords: 'Petabyte data movement service',
    summary: 'Securely transfer large datasets between on-premises, other clouds (AWS S3, Azure), and Google Cloud Storage.',
    cli: 'gcloud transfer jobs create gs://source gs://dest',
    terraform: 'google_storage_transfer_job',
    bondsWith: ['Cs', 'Bq', 'Ic'],
    docs: 'https://cloud.google.com/storage-transfer-service'
  },
  {
    number: 27, symbol: 'Bk', name: 'Backup and DR', category: 'storage', state: 'managed',
    row: 4, col: 9, mass: 'Vault',
    fourWords: 'Centralized immutable backup recovery',
    summary: 'Centralized, application-consistent backup and disaster recovery for VMs, databases, and file systems.',
    cli: 'gcloud backup-dr management-servers list',
    terraform: 'google_backup_dr_backup_vault',
    bondsWith: ['Ce', 'Sq', 'Pd', 'Ve'],
    docs: 'https://cloud.google.com/backup-disaster-recovery'
  },
  {
    number: 28, symbol: 'Nv', name: 'NetApp Volumes', category: 'storage', state: 'managed',
    row: 4, col: 10, mass: 'SMB/NFS',
    fourWords: 'Enterprise multiprotocol file storage',
    summary: 'Fully managed cloud file storage service powered by NetApp ONTAP supporting SMB and NFS v3/v4.1.',
    cli: 'gcloud netapp volumes list --location=us-central1',
    terraform: 'google_netapp_volume',
    bondsWith: ['Ce', 'Ve', 'Gk'],
    docs: 'https://cloud.google.com/netapp/volumes/docs'
  },
  {
    number: 29, symbol: 'Sp', name: 'Cloud Spanner', category: 'databases', state: 'serverless',
    row: 4, col: 11, mass: '99.999%',
    fourWords: 'Global strongly-consistent relational database',
    summary: 'Unlimited scale, global strong consistency (TrueTime), and up to 99.999% availability with SQL and graph queries.',
    cli: 'gcloud spanner instances create my-spanner --config=regional-us-central1',
    terraform: 'google_spanner_instance',
    bondsWith: ['Gk', 'Cr', 'Bq', 'Df'],
    docs: 'https://cloud.google.com/spanner/docs'
  },
  {
    number: 30, symbol: 'Ab', name: 'AlloyDB', category: 'databases', state: 'managed',
    row: 4, col: 12, mass: '4x PG',
    fourWords: 'Cloud-native ultra-fast PostgreSQL engine',
    summary: 'Fully managed PostgreSQL-compatible database for demanding transactional and hybrid analytical/vector workloads.',
    cli: 'gcloud alloydb clusters create my-cluster --region=us-central1',
    terraform: 'google_alloydb_cluster',
    bondsWith: ['Vx', 'Cr', 'Gk', 'Vp'],
    docs: 'https://cloud.google.com/alloydb/docs'
  },
  {
    number: 31, symbol: 'Bg', name: 'Cloud Bigtable', category: 'databases', state: 'managed',
    row: 4, col: 13, mass: '<10ms',
    fourWords: 'Low-latency wide-column NoSQL store',
    summary: 'Petabyte-scale, sparsely populated wide-column NoSQL database with single-digit millisecond latency.',
    cli: 'gcloud bigtable instances create my-bt --cluster-config=id=c1,zone=us-central1-a',
    terraform: 'google_bigtable_instance',
    bondsWith: ['Df', 'Bq', 'Vx'],
    docs: 'https://cloud.google.com/bigtable/docs'
  },
  {
    number: 32, symbol: 'Dp', name: 'Dataproc', category: 'analytics', state: 'managed',
    row: 4, col: 14, mass: 'Spark',
    fourWords: 'Managed Spark and Hadoop',
    summary: 'Fast, easy-to-use, fully managed cloud service for running Apache Spark, Flink, Presto, and Hadoop clusters or serverless batches.',
    cli: 'gcloud dataproc batches submit spark --region=us-central1',
    terraform: 'google_dataproc_cluster',
    bondsWith: ['Cs', 'Bq', 'Px'],
    docs: 'https://cloud.google.com/dataproc/docs'
  },
  {
    number: 33, symbol: 'Na', name: 'Cloud NAT', category: 'networking', state: 'serverless',
    row: 4, col: 15, mass: 'Egress',
    fourWords: 'Managed network address translation',
    summary: 'Let private instances without external IP addresses access the internet or other VPCs securely and scalably.',
    cli: 'gcloud compute routers nats create my-nat --router=my-router',
    terraform: 'google_compute_router_nat',
    bondsWith: ['Vp', 'Cr', 'Gk', 'Ce'],
    docs: 'https://cloud.google.com/nat/docs'
  },
  {
    number: 34, symbol: 'Ic', name: 'Cloud Interconnect', category: 'networking', state: 'hybrid',
    row: 4, col: 16, mass: '100Gbps',
    fourWords: 'Dedicated hybrid physical links',
    summary: 'Low-latency, high-availability Dedicated or Partner connections that transfer data between on-premises and Google Cloud.',
    cli: 'gcloud compute interconnects list',
    terraform: 'google_compute_interconnect_attachment',
    bondsWith: ['Vp', 'Rt', 'Ve', 'Bm'],
    docs: 'https://cloud.google.com/network-connectivity/docs/interconnect'
  },
  {
    number: 35, symbol: 'Sm', name: 'Secret Manager', category: 'security', state: 'serverless',
    row: 4, col: 17, mass: 'Vaulted',
    fourWords: 'Secure API keys passwords',
    summary: 'Store, manage, audit, and rotate API keys, passwords, certificates, and other sensitive configuration data.',
    cli: 'gcloud secrets create my-secret --replication-policy="automatic"',
    terraform: 'google_secret_manager_secret',
    bondsWith: ['Cr', 'Gk', 'Cb', 'Km'],
    docs: 'https://cloud.google.com/secret-manager/docs'
  },
  {
    number: 36, symbol: 'Ar', name: 'Artifact Registry', category: 'operations', state: 'serverless',
    row: 4, col: 18, mass: 'OCI/Pkg',
    fourWords: 'Universal container package repository',
    summary: 'Single place to manage container images (Docker/OCI) and language packages (Maven, npm, Python, Go, Apt).',
    cli: 'gcloud artifacts repositories create my-repo --repository-format=docker',
    terraform: 'google_artifact_registry_repository',
    bondsWith: ['Cb', 'Cd', 'Gk', 'Cr'],
    docs: 'https://cloud.google.com/artifact-registry/docs'
  },

  // ================= ROW 5 =================
  {
    number: 37, symbol: 'Tp', name: 'Cloud TPU', category: 'compute', state: 'infra',
    row: 5, col: 1, mass: 'ExaFLOPS',
    fourWords: 'Custom AI accelerator supercomputers',
    summary: 'Custom-designed machine learning ASICs (Tensor Processing Units) that power Gemini and large-scale training/inference.',
    cli: 'gcloud compute tpus tpu-vm create my-tpu --zone=us-central2-b',
    terraform: 'google_tpu_v2_vm',
    bondsWith: ['Vx', 'Gk', 'Cs'],
    docs: 'https://cloud.google.com/tpu/docs'
  },
  {
    number: 38, symbol: 'Ae', name: 'App Engine', category: 'serverless', state: 'serverless',
    row: 5, col: 2, mass: '2008.4',
    fourWords: 'Original managed application platform',
    summary: 'Google Cloud’s original serverless PaaS for building monolithic and microservice web applications at scale.',
    cli: 'gcloud app deploy app.yaml',
    terraform: 'google_app_engine_standard_app_version',
    bondsWith: ['Fs', 'Sq', 'Tk', 'Ms'],
    docs: 'https://cloud.google.com/appengine/docs'
  },
  {
    number: 39, symbol: 'Pa', name: 'Parallelstore', category: 'storage', state: 'infra',
    row: 5, col: 3, mass: 'DAOS',
    fourWords: 'Scratch storage for HPC/AI',
    summary: 'High-performance distributed parallel file system based on DAOS, built for AI training and HPC workloads.',
    cli: 'gcloud beta parallelstore instances create my-pstore',
    terraform: 'google_parallelstore_instance',
    bondsWith: ['Tp', 'Gk', 'Bt', 'Cs'],
    docs: 'https://cloud.google.com/parallelstore/docs'
  },
  {
    number: 40, symbol: 'Fs', name: 'Firestore', category: 'databases', state: 'serverless',
    row: 5, col: 4, mass: '99.999%',
    fourWords: 'Serverless document database sync',
    summary: 'Flexible, scalable NoSQL document database with live client sync, ACID transactions, and offline support for mobile/web.',
    cli: 'gcloud firestore databases create --location=nam5',
    terraform: 'google_firestore_database',
    bondsWith: ['Cr', 'Cf', 'Fb', 'Ip'],
    docs: 'https://cloud.google.com/firestore/docs'
  },
  {
    number: 41, symbol: 'Ms', name: 'Memorystore', category: 'databases', state: 'managed',
    row: 5, col: 5, mass: '<1ms',
    fourWords: 'Managed Redis and Valkey',
    summary: 'Sub-millisecond in-memory data store service built on Valkey, Redis, and Memcached for caching and session management.',
    cli: 'gcloud redis instances create my-cache --size=5 --region=us-central1',
    terraform: 'google_redis_instance',
    bondsWith: ['Cr', 'Gk', 'Sq', 'Vp'],
    docs: 'https://cloud.google.com/memorystore/docs'
  },
  {
    number: 42, symbol: 'Dm', name: 'Database Migration', category: 'databases', state: 'serverless',
    row: 5, col: 6, mass: 'CDC',
    fourWords: 'Serverless minimal-downtime DB migration',
    summary: 'Easily and securely migrate databases to Cloud SQL and AlloyDB with minimal downtime using continuous CDC.',
    cli: 'gcloud database-migration migration-jobs list --region=us-central1',
    terraform: 'google_database_migration_service_migration_job',
    bondsWith: ['Sq', 'Ab', 'Sp', 'Ds'],
    docs: 'https://cloud.google.com/database-migration/docs'
  },
  {
    number: 43, symbol: 'Or', name: 'Oracle Database@GCP', category: 'databases', state: 'infra',
    row: 5, col: 7, mass: 'Exadata',
    fourWords: 'OCI Exadata inside GCP',
    summary: 'Run Oracle Exadata and Autonomous Database workloads on OCI hardware collocated directly inside Google Cloud data centers.',
    cli: 'gcloud oracle-database autonomous-databases list --location=us-east4',
    terraform: 'google_oracle_database_autonomous_database',
    bondsWith: ['Vp', 'Bq', 'Vx'],
    docs: 'https://cloud.google.com/oracle/docs'
  },
  {
    number: 44, symbol: 'Ps', name: 'Pub/Sub', category: 'analytics', state: 'serverless',
    row: 5, col: 8, mass: 'Global',
    fourWords: 'Global asynchronous event messaging',
    summary: 'Ingest and distribute hundreds of millions of events per second globally for streaming analytics and microservice decoupling.',
    cli: 'gcloud pubsub topics create my-events-topic',
    terraform: 'google_pubsub_topic',
    bondsWith: ['Df', 'Bq', 'Cr', 'Eb'],
    docs: 'https://cloud.google.com/pubsub/docs'
  },
  {
    number: 45, symbol: 'Cm2', name: 'Cloud Composer', category: 'analytics', state: 'managed',
    row: 5, col: 9, mass: 'Airflow',
    fourWords: 'Managed Apache Airflow orchestration',
    summary: 'Fully managed workflow orchestration service built on Apache Airflow to author, schedule, and monitor data pipelines.',
    cli: 'gcloud composer environments create my-env --location=us-central1',
    terraform: 'google_composer_environment',
    bondsWith: ['Bq', 'Df', 'Dp', 'Cs'],
    docs: 'https://cloud.google.com/composer/docs'
  },
  {
    number: 46, symbol: 'Df2', name: 'Dataform', category: 'analytics', state: 'serverless',
    row: 5, col: 10, mass: 'SQLX',
    fourWords: 'Version-controlled BigQuery SQL pipelines',
    summary: 'Develop, test, version control, and schedule complex SQL workflows for data transformation inside BigQuery.',
    cli: 'gcloud dataform repositories list --region=us-central1',
    terraform: 'google_dataform_repository',
    bondsWith: ['Bq', 'Px', 'Cm2'],
    docs: 'https://cloud.google.com/dataform/docs'
  },
  {
    number: 47, symbol: 'Fu', name: 'Cloud Data Fusion', category: 'analytics', state: 'managed',
    row: 5, col: 11, mass: 'CDAP',
    fourWords: 'Code-free visual ETL pipelines',
    summary: 'Fully managed, cloud-native, enterprise data integration service for quickly building and managing ETL/ELT pipelines visually.',
    cli: 'gcloud beta data-fusion instances list',
    terraform: 'google_data_fusion_instance',
    bondsWith: ['Bq', 'Dp', 'Cs'],
    docs: 'https://cloud.google.com/data-fusion/docs'
  },
  {
    number: 48, symbol: 'Ds', name: 'Datastream', category: 'analytics', state: 'serverless',
    row: 5, col: 12, mass: 'CDC',
    fourWords: 'Serverless change data capture',
    summary: 'Serverless real-time Change Data Capture (CDC) and replication service from Oracle, MySQL, PostgreSQL, and SQL Server to BigQuery.',
    cli: 'gcloud datastream streams list --location=us-central1',
    terraform: 'google_datastream_stream',
    bondsWith: ['Bq', 'Cs', 'Sq', 'Df'],
    docs: 'https://cloud.google.com/datastream/docs'
  },
  {
    number: 49, symbol: 'Lk', name: 'Looker', category: 'analytics', state: 'managed',
    row: 5, col: 13, mass: 'LookML',
    fourWords: 'Enterprise BI and analytics',
    summary: 'Modern business intelligence, semantic modeling (LookML), conversational analytics, and embedded dashboards.',
    cli: 'gcloud looker instances list --region=us-central1',
    terraform: 'google_looker_instance',
    bondsWith: ['Bq', 'Sp', 'Ab', 'Gm'],
    docs: 'https://cloud.google.com/looker/docs'
  },
  {
    number: 50, symbol: 'Px', name: 'Dataplex', category: 'analytics', state: 'serverless',
    row: 5, col: 14, mass: 'Mesh',
    fourWords: 'Intelligent data fabric governance',
    summary: 'Unify distributed data across data lakes, warehouses, and marts with centralized cataloging, lineage, and quality governance.',
    cli: 'gcloud dataplex lakes create my-lake --location=us-central1',
    terraform: 'google_dataplex_lake',
    bondsWith: ['Bq', 'Cs', 'Dp', 'Vx'],
    docs: 'https://cloud.google.com/dataplex/docs'
  },
  {
    number: 51, symbol: 'Rt', name: 'Cloud Router', category: 'networking', state: 'managed',
    row: 5, col: 15, mass: 'BGP',
    fourWords: 'Dynamic BGP route exchange',
    summary: 'Fully distributed and managed BGP speaker and responder for dynamic routing between your VPC and hybrid networks.',
    cli: 'gcloud compute routers create my-router --network=my-vpc --region=us-central1',
    terraform: 'google_compute_router',
    bondsWith: ['Ic', 'Vn', 'Na', 'Vp'],
    docs: 'https://cloud.google.com/network-connectivity/docs/router'
  },
  {
    number: 52, symbol: 'Vn', name: 'Cloud VPN', category: 'networking', state: 'hybrid',
    row: 5, col: 16, mass: 'IPsec',
    fourWords: 'Encrypted IPsec hybrid tunnels',
    summary: 'Securely connect your peer network to your Virtual Private Cloud (VPC) network through an IPsec VPN connection with 99.99% HA.',
    cli: 'gcloud compute vpn-gateways create my-ha-vpn --network=my-vpc',
    terraform: 'google_compute_ha_vpn_gateway',
    bondsWith: ['Rt', 'Vp', 'Ic'],
    docs: 'https://cloud.google.com/network-connectivity/docs/vpn'
  },
  {
    number: 53, symbol: 'Sc', name: 'Security Command Center', category: 'security', state: 'serverless',
    row: 5, col: 17, mass: 'CNAPP',
    fourWords: 'Centralized cloud posture threat-defense',
    summary: 'Built-in security and risk management platform offering vulnerability discovery, attack path simulation, and threat detection.',
    cli: 'gcloud scc findings list organizations/123456',
    terraform: 'google_scc_notification_config',
    bondsWith: ['Ia', 'Ch', 'Ca', 'Gk'],
    docs: 'https://cloud.google.com/security-command-center/docs'
  },
  {
    number: 54, symbol: 'Cd2', name: 'Cloud Deploy', category: 'operations', state: 'serverless',
    row: 5, col: 18, mass: 'Skaffold',
    fourWords: 'Managed continuous delivery pipelines',
    summary: 'Opinionated continuous delivery service for GKE, Cloud Run, and Anthos built on Skaffold with approvals and rollbacks.',
    cli: 'gcloud deploy releases create rel-01 --delivery-pipeline=my-pipe',
    terraform: 'google_cloud_deploy_delivery_pipeline',
    bondsWith: ['Cb', 'Ar', 'Gk', 'Cr'],
    docs: 'https://cloud.google.com/deploy/docs'
  },

  // ================= ROW 6 =================
  {
    number: 55, symbol: 'Ve', name: 'VMware Engine', category: 'compute', state: 'hybrid',
    row: 6, col: 1, mass: 'vSphere',
    fourWords: 'Native VMware SDDC cloud',
    summary: 'Migrate and run your VMware vSphere environments natively on dedicated bare metal infrastructure inside Google Cloud.',
    cli: 'gcloud vmware private-clouds list',
    terraform: 'google_vmwareengine_private_cloud',
    bondsWith: ['Vp', 'Ic', 'Nv', 'Bk'],
    docs: 'https://cloud.google.com/vmware-engine/docs'
  },
  {
    number: 56, symbol: 'Gd', name: 'GDC Distributed', category: 'serverless', state: 'hybrid',
    row: 6, col: 2, mass: 'Air-Gap',
    fourWords: 'Kubernetes on edge hardware',
    summary: 'Google Distributed Cloud (formerly Anthos) brings Google Cloud Kubernetes and AI to your edge, data center, or air-gapped sites.',
    cli: 'gcloud edge-cloud container clusters list',
    terraform: 'google_edgenetwork_network',
    bondsWith: ['Gk', 'Sm2', 'Ic'],
    docs: 'https://cloud.google.com/distributed-cloud'
  },
  // Col 3 is Lanthanide indicator (57-71 are in Row 8)
  {
    number: 72, symbol: 'Kf', name: 'Managed Kafka', category: 'analytics', state: 'managed',
    row: 6, col: 4, mass: 'Apache',
    fourWords: 'Fully managed Apache Kafka',
    summary: 'Google Cloud Managed Service for Apache Kafka with automatic cluster sizing, multi-zone availability, and BigQuery integration.',
    cli: 'gcloud managed-kafka clusters list --location=us-central1',
    terraform: 'google_managed_kafka_cluster',
    bondsWith: ['Df', 'Bq', 'Gk', 'Ps'],
    docs: 'https://cloud.google.com/managed-service-for-apache-kafka/docs'
  },
  {
    number: 73, symbol: 'Ch', name: 'Google SecOps', category: 'security', state: 'serverless',
    row: 6, col: 5, mass: 'Chronicle',
    fourWords: 'Planet-scale SIEM and SOAR',
    summary: 'Cloud-native security operations (Chronicle SIEM + SOAR) infused with Mandiant threat intelligence and Gemini AI.',
    cli: 'gcloud alpha chronicle instances list',
    terraform: 'google_chronicle_rule',
    bondsWith: ['Sc', 'Cl', 'Ia', 'Gm'],
    docs: 'https://cloud.google.com/security/products/security-operations'
  },
  {
    number: 74, symbol: 'Ip', name: 'Identity Platform', category: 'security', state: 'serverless',
    row: 6, col: 6, mass: 'CIAM',
    fourWords: 'Customer identity authentication service',
    summary: 'Drop-in customer identity and access management (CIAM) supporting OAuth, SAML, OIDC, MFA, and passkeys for your apps.',
    cli: 'gcloud identity-platform config describe',
    terraform: 'google_identity_platform_config',
    bondsWith: ['Cr', 'Fs', 'Ap', 'Ia'],
    docs: 'https://cloud.google.com/identity-platform/docs'
  },
  {
    number: 75, symbol: 'Zp', name: 'IAP (Identity-Aware Proxy)', category: 'security', state: 'serverless',
    row: 6, col: 7, mass: 'BeyondCorp',
    fourWords: 'Zero-trust application access guard',
    summary: 'Verify user identity and context of the request to allow zero-trust access to internal web apps and VMs without a VPN.',
    cli: 'gcloud compute start-iap-tunnel my-vm 22',
    terraform: 'google_iap_web_iam_binding',
    bondsWith: ['Lb', 'Ce', 'Cr', 'Ia'],
    docs: 'https://cloud.google.com/iap/docs'
  },
  {
    number: 76, symbol: 'Dl', name: 'Sensitive Data Protection', category: 'security', state: 'serverless',
    row: 6, col: 8, mass: 'Cloud DLP',
    fourWords: 'Discover classify redact PII',
    summary: 'Discover, classify, mask, and de-identify sensitive PII and credential data across BigQuery, Cloud Storage, and AI prompts.',
    cli: 'gcloud alpha dlp text inspect --content="SSN 123-45-6789"',
    terraform: 'google_data_loss_prevention_inspect_template',
    bondsWith: ['Bq', 'Cs', 'Vx', 'Px'],
    docs: 'https://cloud.google.com/sensitive-data-protection/docs'
  },
  {
    number: 77, symbol: 'Rc', name: 'reCAPTCHA Enterprise', category: 'security', state: 'serverless',
    row: 6, col: 9, mass: 'Anti-Bot',
    fourWords: 'Frictionless fraud bot protection',
    summary: 'Protect your websites and mobile apps from fraudulent activity, scraping, credential stuffing, and automated bots.',
    cli: 'gcloud recaptcha keys create --display-name=web-key --web',
    terraform: 'google_recaptcha_enterprise_key',
    bondsWith: ['Ca', 'Lb', 'Ip'],
    docs: 'https://cloud.google.com/recaptcha-enterprise/docs'
  },
  {
    number: 78, symbol: 'Ca2', name: 'Certificate Authority', category: 'security', state: 'serverless',
    row: 6, col: 10, mass: 'PKI/mTLS',
    fourWords: 'Managed private PKI certificates',
    summary: 'Simplify, automate, and customize the deployment, management, and security of private Certificate Authorities (PKI).',
    cli: 'gcloud privateca pools list --location=us-central1',
    terraform: 'google_privateca_ca_pool',
    bondsWith: ['Sm2', 'Lb', 'Gk', 'Km'],
    docs: 'https://cloud.google.com/certificate-authority-service/docs'
  },
  {
    number: 79, symbol: 'Nc', name: 'Network Connectivity', category: 'networking', state: 'hybrid',
    row: 6, col: 11, mass: 'Hub/Spoke',
    fourWords: 'Central hub-and-spoke network management',
    summary: 'Network Connectivity Center connects VPCs, on-premises interconnects, and SD-WAN appliances in a central hub-and-spoke model.',
    cli: 'gcloud network-connectivity hubs create my-hub',
    terraform: 'google_network_connectivity_hub',
    bondsWith: ['Vp', 'Ic', 'Vn', 'Rt'],
    docs: 'https://cloud.google.com/network-connectivity/docs/network-connectivity-center'
  },
  {
    number: 80, symbol: 'Sd', name: 'Service Directory', category: 'networking', state: 'serverless',
    row: 6, col: 12, mass: 'Registry',
    fourWords: 'Managed service discovery registry',
    summary: 'Single place to publish, discover, and connect services consistently across Google Cloud, multi-cloud, and on-premises.',
    cli: 'gcloud service-directory namespaces create my-ns --location=us-central1',
    terraform: 'google_service_directory_service',
    bondsWith: ['Dn', 'Vp', 'Gk', 'Cr'],
    docs: 'https://cloud.google.com/service-directory/docs'
  },
  {
    number: 81, symbol: 'Sm2', name: 'Cloud Service Mesh', category: 'networking', state: 'managed',
    row: 6, col: 13, mass: 'Istio',
    fourWords: 'Managed Istio microservice mesh',
    summary: 'Managed service mesh providing mTLS security, observability, and traffic management across GKE and Compute Engine.',
    cli: 'gcloud container fleet mesh enable',
    terraform: 'google_gke_hub_feature',
    bondsWith: ['Gk', 'Ca2', 'Ct', 'Lb'],
    docs: 'https://cloud.google.com/service-mesh/docs'
  },
  {
    number: 82, symbol: 'Ni', name: 'Network Intelligence', category: 'networking', state: 'serverless',
    row: 6, col: 14, mass: 'Probes',
    fourWords: 'Network topology connectivity verification',
    summary: 'Network topology visualization, Connectivity Tests, Performance Dashboard, and Firewall Insights for proactive operations.',
    cli: 'gcloud network-management connectivity-tests list',
    terraform: 'google_network_management_connectivity_test',
    bondsWith: ['Vp', 'Cm', 'Ic', 'Lb'],
    docs: 'https://cloud.google.com/network-intelligence-center/docs'
  },
  {
    number: 83, symbol: 'Id', name: 'Cloud IDS', category: 'security', state: 'managed',
    row: 6, col: 15, mass: 'PaloAlto',
    fourWords: 'Network threat intrusion detection',
    summary: 'Cloud-native network intrusion detection system powered by Palo Alto Networks threat intelligence for east-west and north-south traffic.',
    cli: 'gcloud ids endpoints list',
    terraform: 'google_cloud_ids_endpoint',
    bondsWith: ['Vp', 'Sc', 'Ch'],
    docs: 'https://cloud.google.com/intrusion-detection-system/docs'
  },
  {
    number: 84, symbol: 'Ac', name: 'VPC Service Controls', category: 'security', state: 'serverless',
    row: 6, col: 16, mass: 'Perimeter',
    fourWords: 'Data exfiltration security perimeters',
    summary: 'Define fine-grained security perimeters around Google Cloud APIs (like BigQuery and Cloud Storage) to prevent data exfiltration.',
    cli: 'gcloud access-context-manager perimeters list',
    terraform: 'google_access_context_manager_service_perimeter',
    bondsWith: ['Bq', 'Cs', 'Ia', 'Vp'],
    docs: 'https://cloud.google.com/vpc-service-controls/docs'
  },
  {
    number: 85, symbol: 'As', name: 'Assured Workloads', category: 'security', state: 'serverless',
    row: 6, col: 17, mass: 'FedRAMP',
    fourWords: 'Sovereign compliance boundary controls',
    summary: 'Enforce data residency, personnel access controls, and regulatory compliance regimes (FedRAMP, CJIS, IL4, EU Sovereign) automatically.',
    cli: 'gcloud assured workloads list --organization=12345',
    terraform: 'google_assured_workloads_workload',
    bondsWith: ['Km', 'Ia', 'rm'],
    docs: 'https://cloud.google.com/assured-workloads/docs'
  },
  {
    number: 86, symbol: 'Ct', name: 'Cloud Trace', category: 'operations', state: 'serverless',
    row: 6, col: 18, mass: 'OpenTel',
    fourWords: 'Distributed request latency tracing',
    summary: 'Distributed tracing system that collects OpenTelemetry latency data from your applications to pinpoint performance bottlenecks.',
    cli: 'gcloud trace sinks list',
    terraform: 'google_project_service',
    bondsWith: ['Cm', 'Cl', 'Cp', 'Cr'],
    docs: 'https://cloud.google.com/trace/docs'
  },

  // ================= ROW 7 =================
  {
    number: 87, symbol: 'Sw', name: 'Shielded VMs', category: 'compute', state: 'infra',
    row: 7, col: 1, mass: 'vTPM',
    fourWords: 'Verifiable integrity rootkit-proof VMs',
    summary: 'Hardened virtual machines with Secure Boot, virtual Trusted Platform Module (vTPM), and integrity monitoring.',
    cli: 'gcloud compute instances create vm1 --shielded-secure-boot',
    terraform: 'google_compute_instance',
    bondsWith: ['Ce', 'Cc', 'Ia'],
    docs: 'https://cloud.google.com/compute/shielded-vm/docs'
  },
  {
    number: 88, symbol: 'Cc', name: 'Confidential Computing', category: 'compute', state: 'infra',
    row: 7, col: 2, mass: 'RAM-Enc',
    fourWords: 'Encrypt data in-use RAM',
    summary: 'Encrypt data in-use while it is being processed in memory on Confidential VMs, GKE nodes, and Dataflow workers.',
    cli: 'gcloud compute instances create c-vm --confidential-compute',
    terraform: 'google_compute_instance',
    bondsWith: ['Ce', 'Gk', 'Km', 'As'],
    docs: 'https://cloud.google.com/confidential-computing'
  },
  // Col 3 is Actinide indicator (89-103 are in Row 9)
  {
    number: 104, symbol: 'Cp', name: 'Cloud Profiler', category: 'operations', state: 'serverless',
    row: 7, col: 4, mass: 'Flame',
    fourWords: 'Continuous low-overhead CPU/Heap profiling',
    summary: 'Statistical, low-overhead profiler that continuously gathers CPU usage and memory-allocation information from production apps.',
    cli: 'gcloud services enable cloudprofiler.googleapis.com',
    terraform: 'google_project_service',
    bondsWith: ['Ct', 'Cm', 'Gk', 'Cr'],
    docs: 'https://cloud.google.com/profiler/docs'
  },
  {
    number: 105, symbol: 'Er', name: 'Error Reporting', category: 'operations', state: 'serverless',
    row: 7, col: 5, mass: 'Stack',
    fourWords: 'Real-time exception crash grouping',
    summary: 'Counts, analyzes, and aggregates crashes and exceptions in your running cloud services with instant alerts.',
    cli: 'gcloud beta error-reporting events report --service=my-app',
    terraform: 'google_project_service',
    bondsWith: ['Cl', 'Cm', 'Cr'],
    docs: 'https://cloud.google.com/error-reporting/docs'
  },
  {
    number: 106, symbol: 'Ws', name: 'Cloud Workstations', category: 'operations', state: 'managed',
    row: 7, col: 6, mass: 'CloudIDE',
    fourWords: 'Managed secure cloud dev-environments',
    summary: 'Fully managed, secure, and pre-configured development environments running inside your VPC with browser or local IDE access.',
    cli: 'gcloud workstations start my-ws --cluster=c1 --config=cfg1',
    terraform: 'google_workstations_workstation_config',
    bondsWith: ['Vp', 'Ia', 'Ar', 'Gc'],
    docs: 'https://cloud.google.com/workstations/docs'
  },
  {
    number: 107, symbol: 'Sh', name: 'Cloud Shell', category: 'operations', state: 'serverless',
    row: 7, col: 7, mass: '5GB Home',
    fourWords: 'Browser command-line and editor',
    summary: 'Online development and operations environment accessible anywhere with your browser, preloaded with gcloud, kubectl, and Terraform.',
    cli: 'gcloud cloud-shell ssh',
    terraform: 'N/A (Built-in Console Tool)',
    bondsWith: ['Ws', 'Gc', 'Ia'],
    docs: 'https://cloud.google.com/shell/docs'
  },
  {
    number: 108, symbol: 'Im', name: 'Infrastructure Manager', category: 'operations', state: 'serverless',
    row: 7, col: 8, mass: 'Terraform',
    fourWords: 'Managed Terraform IaC deployment',
    summary: 'Automate the deployment and management of Google Cloud infrastructure resources using Terraform as a managed service.',
    cli: 'gcloud infra-manager deployments apply projects/p/locations/us-central1/deployments/d1',
    terraform: 'google_config_deployment',
    bondsWith: ['Cb', 'Cs', 'Ia'],
    bondsWith: ['Cb', 'Ar', 'rm'],
    docs: 'https://cloud.google.com/infrastructure-manager/docs'
  },
  {
    number: 109, symbol: 'rm', name: 'Resource Manager', category: 'operations', state: 'serverless',
    row: 7, col: 9, mass: 'Hierarchy',
    fourWords: 'Organization folder project hierarchy',
    summary: 'Hierarchically manage resources by project, folder, and organization with Organization Policies and Tagging.',
    cli: 'gcloud projects list',
    terraform: 'google_project',
    bondsWith: ['Ia', 'Bg2', 'As'],
    docs: 'https://cloud.google.com/resource-manager/docs'
  },
  {
    number: 110, symbol: 'Bg2', name: 'Cloud Billing', category: 'operations', state: 'serverless',
    row: 7, col: 10, mass: 'FinOps',
    fourWords: 'FinOps cost budgets optimization',
    summary: 'Track cloud spend, configure budget alerts, analyze FinOps Hub recommendations, and manage Committed Use Discounts (CUDs).',
    cli: 'gcloud billing accounts list',
    terraform: 'google_billing_budget',
    bondsWith: ['rm', 'Bq', 'Ah'],
    docs: 'https://cloud.google.com/billing/docs'
  },
  {
    number: 111, symbol: 'Ah', name: 'App Hub', category: 'operations', state: 'serverless',
    row: 7, col: 11, mass: 'AppCentric',
    fourWords: 'Application-centric topology resource registry',
    summary: 'Organize cloud resources into logical business applications and services for unified observability and governance.',
    cli: 'gcloud apphub applications list --location=us-central1',
    terraform: 'google_apphub_application',
    bondsWith: ['Cm', 'Cl', 'Gc', 'Gk'],
    docs: 'https://cloud.google.com/app-hub/docs'
  },
  {
    number: 112, symbol: 'Bc', name: 'Binary Authorization', category: 'security', state: 'serverless',
    row: 7, col: 12, mass: 'SLSA',
    fourWords: 'Deploy only trusted containers',
    summary: 'Supply-chain security control that ensures only cryptographically attested and verified container images are deployed on GKE or Cloud Run.',
    cli: 'gcloud container binauthz policy export',
    terraform: 'google_binary_authorization_policy',
    bondsWith: ['Ar', 'Cb', 'Gk', 'Cr'],
    docs: 'https://cloud.google.com/binary-authorization/docs'
  },
  {
    number: 113, symbol: 'Wa', name: 'Workload Identity', category: 'security', state: 'serverless',
    row: 7, col: 13, mass: 'Keyless',
    fourWords: 'Keyless federated identity exchange',
    summary: 'Workload Identity Federation lets external workloads (GitHub Actions, AWS, Azure, K8s) access Google Cloud without service account keys.',
    cli: 'gcloud iam workload-identity-pools create my-pool --location=global',
    terraform: 'google_iam_workload_identity_pool',
    bondsWith: ['Ia', 'Gk', 'Cb', 'Sm'],
    docs: 'https://cloud.google.com/iam/docs/workload-identity-federation'
  },
  {
    number: 114, symbol: 'Kt', name: 'Key Access Justifications', category: 'security', state: 'serverless',
    row: 7, col: 14, mass: 'Sovereign',
    fourWords: 'Approve every decryption request',
    summary: 'Provides visibility and automated policy approval/denial over every encryption key request with a justification reason.',
    cli: 'gcloud kms key-handles list',
    terraform: 'google_kms_ekm_connection',
    bondsWith: ['Km', 'As', 'Ia'],
    docs: 'https://cloud.google.com/kms/docs/kaj-overview'
  },
  {
    number: 115, symbol: 'Sw2', name: 'Secure Web Proxy', category: 'networking', state: 'managed',
    row: 7, col: 15, mass: 'EgressURL',
    fourWords: 'Inspect control egress web-traffic',
    summary: 'Protect egress web traffic from your cloud workloads (VMs, containers) with URL filtering, TLS inspection, and IAM policies.',
    cli: 'gcloud network-security gateway-security-policies list',
    terraform: 'google_network_security_gateway_security_policy',
    bondsWith: ['Vp', 'Na', 'Ia', 'Ca2'],
    docs: 'https://cloud.google.com/secure-web-proxy/docs'
  },
  {
    number: 116, symbol: 'Mc', name: 'Media CDN', category: 'networking', state: 'hybrid',
    row: 7, col: 16, mass: 'Streaming',
    fourWords: 'Planet-scale video streaming edge',
    summary: 'Leverage Google’s YouTube edge infrastructure to deliver ultra-high throughput streaming video and large media files globally.',
    cli: 'gcloud edge-cache services list',
    terraform: 'google_network_services_edge_cache_service',
    bondsWith: ['Cs', 'Lb', 'Cd'],
    docs: 'https://cloud.google.com/media-cdn/docs'
  },
  {
    number: 117, symbol: 'Ca3', name: 'Cloud Asset Inventory', category: 'security', state: 'serverless',
    row: 7, col: 17, mass: 'CMDB',
    fourWords: 'Historical resource configuration metadata',
    summary: 'View, monitor, and analyze all Google Cloud and Anthos assets across your organization with point-in-time history and BigQuery export.',
    cli: 'gcloud asset search-all-resources --scope=organizations/123',
    terraform: 'google_cloud_asset_organization_feed',
    bondsWith: ['Sc', 'Ia', 'Bq', 'rm'],
    docs: 'https://cloud.google.com/asset-inventory/docs'
  },
  {
    number: 118, symbol: 'Gc', name: 'Gemini Cloud Assist', category: 'operations', state: 'serverless',
    row: 7, col: 18, mass: 'AI-Ops',
    fourWords: 'AI assistant for cloud',
    summary: 'AI-powered collaborator across the Google Cloud console and IDEs to design architectures, troubleshoot incidents, and optimize costs.',
    cli: 'gcloud gemini cloud-assist',
    terraform: 'google_project_service',
    bondsWith: ['Gm', 'Ah', 'Cm', 'Cl'],
    docs: 'https://cloud.google.com/products/gemini/cloud-assist'
  },

  // ================= ROW 8: LANTHANIDES (AI & MACHINE LEARNING, 57-71) =================
  {
    number: 57, symbol: 'Vx', name: 'Vertex AI Platform', category: 'aiml', state: 'managed',
    row: 8, col: 3, mass: 'UnifiedML',
    fourWords: 'Unified enterprise ML/GenAI platform',
    summary: 'Unified AI platform to access foundation models, build generative AI agents, and train, deploy, and manage custom ML models.',
    cli: 'gcloud ai models list --region=us-central1',
    terraform: 'google_vertex_ai_endpoint',
    bondsWith: ['Gm', 'Bq', 'Cs', 'Tp'],
    docs: 'https://cloud.google.com/vertex-ai/docs'
  },
  {
    number: 58, symbol: 'Gm', name: 'Gemini Models', category: 'aiml', state: 'serverless',
    row: 8, col: 4, mass: '2M Token',
    fourWords: 'Multimodal frontier foundation models',
    summary: 'Google’s flagship multimodal models (Gemini Pro, Flash, Ultra) natively understanding text, code, images, audio, and video.',
    cli: 'gcloud ai endpoints predict ...',
    terraform: 'google_vertex_ai_endpoint',
    bondsWith: ['Vx', 'Ag', 'Cr', 'Bq'],
    docs: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models'
  },
  {
    number: 59, symbol: 'Ag', name: 'Vertex AI Agent Builder', category: 'aiml', state: 'serverless',
    row: 8, col: 5, mass: 'Agentic',
    fourWords: 'Build grounded enterprise AI-agents',
    summary: 'Build and deploy production-grade multi-agent systems grounded in enterprise data, Google Search, and custom OpenAPI tools.',
    cli: 'gcloud alpha discovery-engine engines list',
    terraform: 'google_discovery_engine_chat_engine',
    bondsWith: ['Gm', 'Vx', 'Bq', 'Ap'],
    docs: 'https://cloud.google.com/products/agent-builder'
  },
  {
    number: 60, symbol: 'Mg', name: 'Model Garden', category: 'aiml', state: 'serverless',
    row: 8, col: 6, mass: '200+ LLMs',
    fourWords: 'Curated open & partner models',
    summary: 'Discover, test, customize, and deploy 200+ first-party (Gemini, Imagen), open-source (Gemma, Llama, Mistral), and partner (Claude) models.',
    cli: 'gcloud ai model-garden models list',
    terraform: 'google_vertex_ai_endpoint',
    bondsWith: ['Vx', 'Gm', 'Gk', 'Tp'],
    docs: 'https://cloud.google.com/model-garden'
  },
  {
    number: 61, symbol: 'Im2', name: 'Imagen & Veo', category: 'aiml', state: 'serverless',
    row: 8, col: 7, mass: 'MediaGen',
    fourWords: 'Photorealistic image video generation',
    summary: 'State-of-the-art text-to-image (Imagen) and text-to-video (Veo) generative models with SynthID watermarking on Vertex AI.',
    cli: 'gcloud ai endpoints predict --region=us-central1',
    terraform: 'google_vertex_ai_endpoint',
    bondsWith: ['Vx', 'Cs', 'Gm'],
    docs: 'https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview'
  },
  {
    number: 62, symbol: 'Vs', name: 'Vertex AI Search', category: 'aiml', state: 'serverless',
    row: 8, col: 8, mass: 'RAG',
    fourWords: 'Out-of-the-box enterprise RAG search',
    summary: 'Google-quality semantic and hybrid search over your unstructured documents, websites, and structured databases with citations.',
    cli: 'gcloud discovery-engine data-stores list',
    terraform: 'google_discovery_engine_data_store',
    bondsWith: ['Ag', 'Cs', 'Bq', 'Gm'],
    docs: 'https://cloud.google.com/enterprise-search'
  },
  {
    number: 63, symbol: 'Ve2', name: 'Vector Search', category: 'aiml', state: 'managed',
    row: 8, col: 9, mass: 'ScaNN',
    fourWords: 'Billion-scale low-latency ANN embeddings',
    summary: 'Powered by Google Research ScaNN algorithm for ultra-fast approximate nearest neighbor (ANN) vector similarity matching.',
    cli: 'gcloud ai index-endpoints list --region=us-central1',
    terraform: 'google_vertex_ai_index',
    bondsWith: ['Vx', 'Gm', 'Ab', 'Fs'],
    docs: 'https://cloud.google.com/vertex-ai/docs/vector-search/overview'
  },
  {
    number: 64, symbol: 'Vp2', name: 'Vertex AI Pipelines', category: 'aiml', state: 'serverless',
    row: 8, col: 10, mass: 'Kubeflow',
    fourWords: 'Serverless MLOps workflow orchestration',
    summary: 'Automate, monitor, and govern your ML systems by orchestrating serverless Kubeflow Pipelines or TFX workflows.',
    cli: 'gcloud ai pipeline-jobs list --region=us-central1',
    terraform: 'google_vertex_ai_tensorboard',
    bondsWith: ['Vx', 'Bq', 'Cs', 'Ar'],
    docs: 'https://cloud.google.com/vertex-ai/docs/pipelines/introduction'
  },
  {
    number: 65, symbol: 'Fs2', name: 'Vertex Feature Store', category: 'aiml', state: 'managed',
    row: 8, col: 11, mass: 'OnlineML',
    fourWords: 'Centralized low-latency ML features',
    summary: 'Manage and serve ML features and embeddings at low latency, directly backed by BigQuery offline storage.',
    cli: 'gcloud ai featurestores list --region=us-central1',
    terraform: 'google_vertex_ai_feature_online_store',
    bondsWith: ['Bq', 'Vx', 'Ve2'],
    docs: 'https://cloud.google.com/vertex-ai/docs/featurestore'
  },
  {
    number: 66, symbol: 'Co', name: 'Colab Enterprise', category: 'aiml', state: 'managed',
    row: 8, col: 12, mass: 'Notebook',
    fourWords: 'Managed collaborative Python notebooks',
    summary: 'Collaborative Python notebook environment combining the ease of Google Colab with enterprise VPC, IAM, and BigQuery integration.',
    cli: 'gcloud colab runtimes list --region=us-central1',
    terraform: 'google_colab_runtime_template',
    bondsWith: ['Bq', 'Vx', 'Vp', 'Gm'],
    docs: 'https://cloud.google.com/colab/docs'
  },
  {
    number: 67, symbol: 'Da', name: 'Document AI', category: 'aiml', state: 'serverless',
    row: 8, col: 13, mass: 'OCR+LLM',
    fourWords: 'Extract structured data documents',
    summary: 'Turn unstructured PDFs, invoices, receipts, and forms into structured data using specialized layout parsers and generative AI.',
    cli: 'gcloud documentai processors list --location=us',
    terraform: 'google_document_ai_processor',
    bondsWith: ['Cs', 'Bq', 'Vx', 'Wf'],
    docs: 'https://cloud.google.com/document-ai/docs'
  },
  {
    number: 68, symbol: 'Cc2', name: 'Customer Engagement Suite', category: 'aiml', state: 'serverless',
    row: 8, col: 14, mass: 'CCAI',
    fourWords: 'Conversational contact center AI',
    summary: 'Transform contact centers with Conversational Agents (Dialogflow CX), Agent Assist, and Conversational Insights.',
    cli: 'gcloud dialogflow agent describe',
    terraform: 'google_dialogflow_cx_agent',
    bondsWith: ['Ag', 'Sp2', 'Gm', 'Bq'],
    docs: 'https://cloud.google.com/solutions/contact-center'
  },
  {
    number: 69, symbol: 'Sp2', name: 'Cloud Speech & TTS', category: 'aiml', state: 'serverless',
    row: 8, col: 15, mass: 'Chirp',
    fourWords: 'Chirp speech recognition synthesis',
    summary: 'Convert audio to text with Chirp universal speech models (100+ languages) and synthesize natural lifelike voices with Text-to-Speech.',
    cli: 'gcloud ml speech recognize audio.flac --language-code=en-US',
    terraform: 'google_project_service',
    bondsWith: ['Cc2', 'Vx', 'Tr'],
    docs: 'https://cloud.google.com/speech-to-text/docs'
  },
  {
    number: 70, symbol: 'Vi', name: 'Cloud Vision & Video', category: 'aiml', state: 'serverless',
    row: 8, col: 16, mass: 'VisualAI',
    fourWords: 'Image and video analysis',
    summary: 'Derive insights from images and videos with pre-trained APIs for object detection, OCR, scene changes, and content moderation.',
    cli: 'gcloud ml vision detect-labels gs://my-bucket/img.jpg',
    terraform: 'google_project_service',
    bondsWith: ['Cs', 'Vx', 'Im2'],
    docs: 'https://cloud.google.com/vision/docs'
  },
  {
    number: 71, symbol: 'Tr', name: 'Cloud Translation', category: 'aiml', state: 'serverless',
    row: 8, col: 17, mass: '130+ Lang',
    fourWords: 'Neural machine language translation',
    summary: 'Dynamically translate text and documents between 130+ languages with custom glossaries and Adaptive Translation.',
    cli: 'gcloud services enable translate.googleapis.com',
    terraform: 'google_project_service',
    bondsWith: ['Sp2', 'Da', 'Gm'],
    docs: 'https://cloud.google.com/translate/docs'
  },

  // ================= ROW 9: ACTINIDES (INTEGRATION, API & MIGRATION, 89-103) =================
  {
    number: 89, symbol: 'Ap', name: 'Apigee API Management', category: 'integration', state: 'managed',
    row: 9, col: 3, mass: 'FullLife',
    fourWords: 'Enterprise API gateway monetization',
    summary: 'Design, secure, analyze, rate-limit, and monetize APIs anywhere with enterprise visibility and developer portals.',
    cli: 'gcloud apigee organizations list',
    terraform: 'google_apigee_organization',
    bondsWith: ['Lb', 'Ca', 'Cr', 'Ah2'],
    docs: 'https://cloud.google.com/apigee/docs'
  },
  {
    number: 90, symbol: 'Ag2', name: 'API Gateway', category: 'integration', state: 'serverless',
    row: 9, col: 4, mass: 'OpenAPI',
    fourWords: 'Lightweight serverless API proxy',
    summary: 'Develop, deploy, and secure APIs for Serverless workloads (Cloud Run, Functions, App Engine) using OpenAPI specs.',
    cli: 'gcloud api-gateway gateways create my-gw --api=my-api',
    terraform: 'google_api_gateway_gateway',
    bondsWith: ['Cr', 'Cf', 'Ae'],
    docs: 'https://cloud.google.com/api-gateway/docs'
  },
  {
    number: 91, symbol: 'Ah2', name: 'API Hub', category: 'integration', state: 'serverless',
    row: 9, col: 5, mass: 'Catalog',
    fourWords: 'Central enterprise API catalog',
    summary: 'Consolidate and govern API specifications, versions, dependencies, and linting rules across your entire organization.',
    cli: 'gcloud alpha apihub apis list',
    terraform: 'google_apigee_addons_config',
    bondsWith: ['Ap', 'Ah', 'Gc'],
    docs: 'https://cloud.google.com/apigee/docs/apihub/what-is-api-hub'
  },
  {
    number: 92, symbol: 'Eb', name: 'Eventarc', category: 'integration', state: 'serverless',
    row: 9, col: 6, mass: 'CloudEvnt',
    fourWords: 'Unified CloudEvents routing bus',
    summary: 'Route events asynchronously from 130+ Google sources, audit logs, Pub/Sub, and third-party SaaS to Cloud Run, GKE, or Workflows.',
    cli: 'gcloud eventarc triggers create my-trig --destination-run-service=app',
    terraform: 'google_eventarc_trigger',
    bondsWith: ['Cr', 'Wf', 'Ps', 'Cs'],
    docs: 'https://cloud.google.com/eventarc/docs'
  },
  {
    number: 93, symbol: 'Wf', name: 'Workflows', category: 'integration', state: 'serverless',
    row: 9, col: 7, mass: 'YAML/JSON',
    fourWords: 'Serverless stateful service orchestration',
    summary: 'Orchestrate and automate Google Cloud and HTTP-based API services with stateful, low-latency, durable step execution.',
    cli: 'gcloud workflows deploy my-wf --source=workflow.yaml',
    terraform: 'google_workflows_workflow',
    bondsWith: ['Eb', 'Cr', 'Cf', 'Sc2'],
    docs: 'https://cloud.google.com/workflows/docs'
  },
  {
    number: 94, symbol: 'Ai', name: 'Application Integration', category: 'integration', state: 'serverless',
    row: 9, col: 8, mass: 'iPaaS',
    fourWords: 'Visual enterprise iPaaS connectors',
    summary: 'Point-and-click enterprise iPaaS with 100+ pre-built connectors for Salesforce, SAP, ServiceNow, Workday, and databases.',
    cli: 'gcloud alpha integrations list',
    terraform: 'google_integrations_client',
    bondsWith: ['Ap', 'Wf', 'Bq', 'Ps'],
    docs: 'https://cloud.google.com/application-integration/docs'
  },
  {
    number: 95, symbol: 'Tk', name: 'Cloud Tasks', category: 'integration', state: 'serverless',
    row: 9, col: 9, mass: 'Queues',
    fourWords: 'Distributed asynchronous task execution',
    summary: 'Manage the execution, dispatch, rate-limiting, and retries of large numbers of distributed HTTP background tasks.',
    cli: 'gcloud tasks queues create my-queue --location=us-central1',
    terraform: 'google_cloud_tasks_queue',
    bondsWith: ['Cr', 'Cf', 'Ae', 'Wf'],
    docs: 'https://cloud.google.com/tasks/docs'
  },
  {
    number: 96, symbol: 'Sc2', name: 'Cloud Scheduler', category: 'integration', state: 'serverless',
    row: 9, col: 10, mass: 'Cron',
    fourWords: 'Fully managed enterprise cron',
    summary: 'Schedule virtually any batch job, big data pipeline, or cloud infrastructure operation using standard cron syntax.',
    cli: 'gcloud scheduler jobs create http my-cron --schedule="0 * * * *" --uri=...',
    terraform: 'google_cloud_scheduler_job',
    bondsWith: ['Wf', 'Cr', 'Ps', 'Cf'],
    docs: 'https://cloud.google.com/scheduler/docs'
  },
  {
    number: 97, symbol: 'Mv', name: 'Migrate to VMs', category: 'integration', state: 'managed',
    row: 9, col: 11, mass: 'LiftShift',
    fourWords: 'Agentless VM lift-and-shift migration',
    summary: 'Quickly and safely migrate VMs from on-premises vSphere, AWS, or Azure to Compute Engine with continuous background replication.',
    cli: 'gcloud migration vms migrating-vms list',
    terraform: 'google_vmmigration_source',
    bondsWith: ['Ce', 'Mc2', 'Ve'],
    docs: 'https://cloud.google.com/migrate/virtual-machines/docs'
  },
  {
    number: 98, symbol: 'Mc3', name: 'Migrate to Containers', category: 'integration', state: 'managed',
    row: 9, col: 12, mass: 'Modernize',
    fourWords: 'Convert VMs into containers',
    summary: 'Modernize traditional VM-based applications (Linux/Windows, Tomcat, WebSphere, .NET) directly into GKE or Cloud Run containers.',
    cli: 'migctl migration create my-mig --source=my-src',
    terraform: 'N/A (CLI Tooling)',
    bondsWith: ['Gk', 'Cr', 'Ar'],
    docs: 'https://cloud.google.com/migrate/containers/docs'
  },
  {
    number: 99, symbol: 'Mc2', name: 'Migration Center', category: 'integration', state: 'serverless',
    row: 9, col: 13, mass: 'TCO',
    fourWords: 'Unified cloud discovery assessment',
    summary: 'Estimate TCO, discover on-premises inventory, and receive right-sizing and modernization recommendations before migrating.',
    cli: 'gcloud migration-center assets list --location=us-central1',
    terraform: 'google_migration_center_group',
    bondsWith: ['Mv', 'Dm', 'Ce', 'Sq'],
    docs: 'https://cloud.google.com/migration-center/docs'
  },
  {
    number: 100, symbol: 'Fb', name: 'Firebase Platform', category: 'integration', state: 'serverless',
    row: 9, col: 14, mass: 'AppDev',
    fourWords: 'Mobile web app development',
    summary: 'Comprehensive app development platform (App Hosting, Crashlytics, FCM, Remote Config, Genkit) backed directly by Google Cloud.',
    cli: 'firebase deploy',
    terraform: 'google_firebase_project',
    bondsWith: ['Fs', 'Cr', 'Ip', 'Gm'],
    docs: 'https://firebase.google.com/docs'
  },
  {
    number: 101, symbol: 'Mp', name: 'Cloud Marketplace', category: 'integration', state: 'serverless',
    row: 9, col: 15, mass: 'SaaS/ISV',
    fourWords: 'Deploy third-party enterprise software',
    summary: 'Quickly discover, procure, and deploy 10,000+ certified third-party software solutions, SaaS, and datasets on unified GCP billing.',
    cli: 'gcloud services enable ...',
    terraform: 'google_project_service',
    bondsWith: ['Bg2', 'Gk', 'Ce', 'Bq'],
    docs: 'https://cloud.google.com/marketplace/docs'
  },
  {
    number: 102, symbol: 'Ah3', name: 'Analytics Hub', category: 'integration', state: 'serverless',
    row: 9, col: 16, mass: 'CleanRoom',
    fourWords: 'Secure data exchange clean-rooms',
    summary: 'Efficiently and securely exchange data assets and AI models across organizational boundaries and Data Clean Rooms in BigQuery.',
    cli: 'gcloud bigquery analytics-hub exchanges list',
    terraform: 'google_bigquery_analytics_hub_data_exchange',
    bondsWith: ['Bq', 'Px', 'Dl'],
    docs: 'https://cloud.google.com/bigquery/docs/analytics-hub-introduction'
  },
  {
    number: 103, symbol: 'Maps', name: 'Google Maps Platform', category: 'integration', state: 'serverless',
    row: 9, col: 17, mass: 'GeoSpatial',
    fourWords: 'Global location geospatial APIs',
    summary: 'Embed real-world maps, routes, places, solar, air quality, and 3D photorealistic tiles into applications and BigQuery.',
    cli: 'gcloud services api-keys create --display-name="Maps Key"',
    terraform: 'google_apikeys_key',
    bondsWith: ['Bq', 'Vx', 'Cr', 'Fb'],
    docs: 'https://developers.google.com/maps/documentation'
  }
];

// Pre-built Reference Architectures ("Cloud Compounds / Molecules")
const CLOUD_COMPOUNDS = [
  {
    id: 'serverless-web',
    formula: 'Cd · Lb · Ca · Cr₂ · Ab · Ms',
    name: 'Global Serverless Web App',
    tagline: 'Auto-scaling zero-ops web application with edge protection & sub-ms caching',
    elements: ['Cd', 'Lb', 'Ca', 'Cr', 'Ab', 'Ms', 'Sm'],
    flow: 'User → Cloud CDN (Cd) + Cloud Armor (Ca) → Cloud Load Balancing (Lb) → Cloud Run (Cr) → Memorystore (Ms) & AlloyDB (Ab)',
    useCase: 'Ideal for high-traffic SaaS, e-commerce, and API backends that need instant global scale and zero server patching.'
  },
  {
    id: 'enterprise-rag',
    formula: 'Cs · Da · Vs · Gm · Ag · Cr',
    name: 'Enterprise GenAI RAG Agent',
    tagline: 'Grounded multimodal AI agent over enterprise PDFs and databases',
    elements: ['Cs', 'Da', 'Vs', 'Ve2', 'Gm', 'Ag', 'Cr', 'Dl'],
    flow: 'Cloud Storage (Cs) → Document AI (Da) → Vertex AI Search / Vector Search (Vs/Ve2) → Gemini (Gm) + Agent Builder (Ag) → Cloud Run (Cr)',
    useCase: 'Customer support bots, internal knowledge assistants, and automated document workflows with strict PII redaction.'
  },
  {
    id: 'streaming-lakehouse',
    formula: 'Ps · Df · Cs · Bq · Px · Lk',
    name: 'Real-Time Streaming Lakehouse',
    tagline: 'Ingest millions of events/sec into governed analytics & BI',
    elements: ['Ps', 'Df', 'Cs', 'Bq', 'Px', 'Lk', 'Vx'],
    flow: 'Pub/Sub (Ps) → Dataflow (Df) → Cloud Storage (Cs) & BigQuery (Bq) → Dataplex (Px) Governance → Looker (Lk) & Vertex AI (Vx)',
    useCase: 'IoT telemetry, real-time fraud detection, clickstream analytics, and live operational dashboards.'
  },
  {
    id: 'zero-trust-k8s',
    formula: 'Cb · Ar · Bc · Gk · Sm2 · Sp',
    name: 'Zero-Trust Microservices Mesh',
    tagline: 'SLSA-attested containers on GKE Autopilot with mTLS & global Spanner',
    elements: ['Cb', 'Ar', 'Bc', 'Gk', 'Sm2', 'Sp', 'Sc', 'Ct'],
    flow: 'Cloud Build (Cb) → Artifact Registry (Ar) → Binary Authorization (Bc) → GKE (Gk) + Service Mesh (Sm2) → Cloud Spanner (Sp)',
    useCase: 'Financial services, global payments, and regulated multi-region microservice platforms.'
  },
  {
    id: 'event-driven-workflow',
    formula: 'Cs · Eb · Wf · Cf · Sq · Cl',
    name: 'Event-Driven Micro-Orchestration',
    tagline: 'Choreographed and orchestrated serverless pipelines triggered by cloud events',
    elements: ['Cs', 'Eb', 'Wf', 'Cf', 'Sq', 'Cl'],
    flow: 'Cloud Storage Upload (Cs) → Eventarc (Eb) → Workflows (Wf) → Cloud Run Functions (Cf) → Cloud SQL (Sq)',
    useCase: 'Order fulfillment, media transcoding pipelines, and automated back-office approvals.'
  }
];
