/*
 * Filename: authRoutes.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import { Router } from 'express';
import { createToken } from '../services/tokenService';
import { TokenLog } from '../repositories/tokenLogRepository';

const router = Router();

router.post('/token', async (req, res) => {
  const { user_id, ip, device, platform, browser, app_id } = req.body;

  const token = createToken({
    sub: user_id,
    claims: {
      roles: ['user'],
      source: { ip, device, platform, browser },
      scopes: ['read'],
      app_id,
    },
  });

  await TokenLog.create({
    user_id,
    ip,
    device,
    platform,
    browser,
    app_id,
    expires_at: new Date(Date.now() + 3600000),
  });

  res.json({ token });
});

export default router;
