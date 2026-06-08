import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : '*';

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '100kb' }));

const telemetry = [
  {
    satellite: 'SAT-CLIMA-01',
    region: 'Sudeste do Brasil',
    temperatureCelsius: 31.8,
    humidityPercent: 42,
    fireRiskIndex: 0.71,
    collectedAt: '2026-06-08T12:00:00Z'
  },
  {
    satellite: 'SAT-CLIMA-02',
    region: 'Centro-Oeste do Brasil',
    temperatureCelsius: 35.2,
    humidityPercent: 27,
    fireRiskIndex: 0.86,
    collectedAt: '2026-06-08T12:05:00Z'
  },
  {
    satellite: 'SAT-CLIMA-03',
    region: 'Sul do Brasil',
    temperatureCelsius: 22.4,
    humidityPercent: 68,
    fireRiskIndex: 0.22,
    collectedAt: '2026-06-08T12:10:00Z'
  }
];

const alerts = [
  {
    id: 1,
    type: 'CLIMATE_RISK',
    severity: 'HIGH',
    region: 'Centro-Oeste do Brasil',
    message: 'Índice elevado de risco climático detectado por dados orbitais.',
    status: 'OPEN'
  },
  {
    id: 2,
    type: 'TELEMETRY_DELAY',
    severity: 'MEDIUM',
    region: 'Sudeste do Brasil',
    message: 'Atraso moderado no recebimento de telemetria do satélite SAT-CLIMA-01.',
    status: 'MONITORING'
  }
];

app.get('/', (req, res) => {
  res.status(200).json({
    project: 'SpaceClimate',
    description: 'API modelo da Global Solution para demonstrar DevSecOps em Cybersecurity.',
    endpoints: ['/health', '/api/telemetry', '/api/alerts', '/api/alerts/simulate']
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'spaceclimate-api',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/telemetry', (req, res) => {
  res.status(200).json({
    source: 'simulated-space-ecosystem',
    count: telemetry.length,
    data: telemetry
  });
});

app.get('/api/alerts', (req, res) => {
  res.status(200).json({
    count: alerts.length,
    data: alerts
  });
});

app.post('/api/alerts/simulate', (req, res) => {
  const { region, severity, message } = req.body;
  const allowedSeverities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  if (!region || typeof region !== 'string' || region.length > 80) {
    return res.status(400).json({
      error: 'Campo region é obrigatório e deve ter até 80 caracteres.'
    });
  }

  if (!allowedSeverities.includes(severity)) {
    return res.status(400).json({
      error: 'Campo severity deve ser LOW, MEDIUM, HIGH ou CRITICAL.'
    });
  }

  if (!message || typeof message !== 'string' || message.length > 200) {
    return res.status(400).json({
      error: 'Campo message é obrigatório e deve ter até 200 caracteres.'
    });
  }

  const newAlert = {
    id: alerts.length + 1,
    type: 'SIMULATED_ALERT',
    severity,
    region,
    message,
    status: 'OPEN'
  };

  alerts.push(newAlert);

  return res.status(201).json({
    message: 'Alerta simulado registrado com sucesso.',
    data: newAlert
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada.',
    availableEndpoints: ['/health', '/api/telemetry', '/api/alerts']
  });
});

export default app;
