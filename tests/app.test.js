import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('GET /health deve retornar status ok', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(response.body.service, 'spaceclimate-api');
});

test('GET /api/telemetry deve retornar lista de telemetria simulada', async () => {
  const response = await request(app).get('/api/telemetry');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
  assert.ok(response.body.count >= 1);
});

test('POST /api/alerts/simulate deve validar severidade inválida', async () => {
  const response = await request(app)
    .post('/api/alerts/simulate')
    .send({
      region: 'Sudeste do Brasil',
      severity: 'INVALID',
      message: 'Teste de severidade inválida.'
    });

  assert.equal(response.status, 400);
  assert.match(response.body.error, /severity/);
});

test('POST /api/alerts/simulate deve criar alerta válido', async () => {
  const response = await request(app)
    .post('/api/alerts/simulate')
    .send({
      region: 'Sudeste do Brasil',
      severity: 'HIGH',
      message: 'Alerta simulado para teste de API.'
    });

  assert.equal(response.status, 201);
  assert.equal(response.body.data.severity, 'HIGH');
});
