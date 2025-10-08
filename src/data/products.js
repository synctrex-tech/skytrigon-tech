const products = [
  {
    id: 'quantum-insight-platform',
    name: 'Quantum Insight Platform',
    price: 9600,
    category: 'Analytics',
    shortDescription: 'Unified analytics hub delivering predictive insights for fast-moving teams.',
    description:
      'Quantum Insight Platform brings together data ingestion, AI-assisted modeling, and interactive dashboards so teams can surface critical trends faster. Built for scalability with real-time collaboration baked in.',
    highlights: [
      'Real-time anomaly detection with adaptive thresholds',
      '360° journey analytics across web, mobile, and IoT touchpoints',
      'Guided model builder with reusable templates'
    ],
    specifications: [
      { label: 'Deployment', value: 'Cloud-native (AWS, Azure, GCP)' },
      { label: 'Compliance', value: 'SOC2, ISO 27001' },
      { label: 'Users', value: 'Unlimited viewers, 250 creators' }
    ],
    images: [
      '/assets/products/quantum-insight-1.jpg',
      '/assets/products/quantum-insight-2.jpg',
      '/assets/products/quantum-insight-3.jpg'
    ],
    badges: ['AI Assisted', 'Enterprise']
  },
  {
    id: 'stellar-commerce-suite',
    name: 'Stellar Commerce Suite',
    price: 6800,
    category: 'Commerce',
    shortDescription: 'Composable commerce foundation to orchestrate personalized storefronts at scale.',
    description:
      'Stellar Commerce Suite gives merchandisers modular building blocks, advanced personalization, and seamless checkout experiences across every channel. Adapt faster with catalog automation and headless APIs.',
    highlights: [
      'Composable architecture with 70+ starter blueprints',
      'Adaptive merchandising rules powered by behavioral scoring',
      'Unified inventory and fulfillment orchestration'
    ],
    specifications: [
      { label: 'Channels', value: 'Web, mobile, POS, voice' },
      { label: 'Integrations', value: 'ERP, OMS, CDP connectors included' },
      { label: 'Support', value: '24/7 concierge launch team' }
    ],
    images: [
      '/assets/products/stellar-commerce-1.jpg',
      '/assets/products/stellar-commerce-2.jpg'
    ],
    badges: ['Composable', 'Omnichannel']
  },
  {
    id: 'nebula-security-fabric',
    name: 'Nebula Security Fabric',
    price: 5400,
    category: 'Security',
    shortDescription: 'Adaptive security mesh detecting unknown threats with zero trust enforcement.',
    description:
      'Nebula Security Fabric protects distributed environments with behavioral analytics, automated threat response, and policy-driven segmentation. Visualize posture in minutes with contextual heatmaps.',
    highlights: [
      'Behavioral engines tuned to your environment',
      'Micro-segmentation with automated policy propagation',
      'Response playbooks with human-in-the-loop approvals'
    ],
    specifications: [
      { label: 'Coverage', value: 'Endpoints, cloud workloads, SaaS' },
      { label: 'Integrations', value: 'SIEM, SOAR, identity providers' },
      { label: 'Remediation', value: 'Guided automation with rollback plans' }
    ],
    images: ['/assets/products/nebula-security-1.jpg'],
    badges: ['Zero Trust']
  },
  {
    id: 'orion-devops-cloud',
    name: 'Orion DevOps Cloud',
    price: 4200,
    category: 'DevOps',
    shortDescription: 'Continuous delivery toolkit enabling autonomous release pipelines.',
    description:
      'Orion DevOps Cloud merges observability, feature flagging, and deployment automation into a single command center. Empower teams with safe experimentation and frictionless rollbacks.',
    highlights: [
      'Progressive delivery with traffic shaping controls',
      'Golden path blueprints curated by platform engineers',
      'Cross-team insights with service health scorecards'
    ],
    specifications: [
      { label: 'Runtimes', value: 'Kubernetes, serverless, edge' },
      { label: 'Pipelines', value: 'GitOps, GitHub Actions, Bitbucket' },
      { label: 'SLOs', value: 'Built-in error budget guardrails' }
    ],
    images: ['/assets/products/orion-devops-1.jpg', '/assets/products/orion-devops-2.jpg'],
    badges: ['DevOps', 'Observability']
  },
  {
    id: 'aurora-experience-studio',
    name: 'Aurora Experience Studio',
    price: 3600,
    category: 'Experience',
    shortDescription: 'Experience orchestration studio to fuse design systems with real-time data.',
    description:
      'Aurora Experience Studio helps product teams compose immersive journeys using dynamic content, personalization triggers, and rapid experimentation suites.',
    highlights: [
      'Visual canvas with live data binding',
      'Audience-based content rules and personalization',
      'Experience analytics with embedded heatmaps'
    ],
    specifications: [
      { label: 'Design Systems', value: 'Figma, Sketch, Adobe XD' },
      { label: 'Experiments', value: 'Multi-armed bandit & Bayesian testing' },
      { label: 'Latency', value: '<100ms edge delivery' }
    ],
    images: ['/assets/products/aurora-studio-1.jpg'],
    badges: ['Personalization']
  },
  {
    id: 'luna-customer-os',
    name: 'Luna Customer OS',
    price: 7800,
    category: 'CRM',
    shortDescription: 'Unified customer operating system centralizing revenue, service, and success.',
    description:
      'Luna Customer OS gives go-to-market teams a shared reality with smart playbooks, collaborative workspaces, and AI copilots that surface the next best action.',
    highlights: [
      'RevOps command center with predictive forecasting',
      'Customer health scoring and churn prevention signals',
      'Collaboration workflows with contextual tasking'
    ],
    specifications: [
      { label: 'Data Sources', value: 'CRM, billing, product usage, tickets' },
      { label: 'Automation', value: 'No-code workflow designer' },
      { label: 'Permissions', value: 'Granular roles with audit trails' }
    ],
    images: ['/assets/products/luna-customer-1.jpg', '/assets/products/luna-customer-2.jpg'],
    badges: ['Revenue Intelligence']
  }
];

export default products;
