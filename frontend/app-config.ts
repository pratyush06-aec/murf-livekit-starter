export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura' | 'sphere';
  audioVisualizerColor?: `#${string}`;
  audioVisualizerColorDark?: `#${string}`;
  audioVisualizerColorShift?: number;
  audioVisualizerBarCount?: number;
  audioVisualizerGridRowCount?: number;
  audioVisualizerGridColumnCount?: number;
  audioVisualizerRadialBarCount?: number;
  audioVisualizerRadialRadius?: number;
  audioVisualizerWaveLineWidth?: number;

  // agent dispatch configuration
  agentName?: string;

  // LiveKit Cloud Sandbox configuration
  sandboxId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Disaster Response Authority',
  pageTitle: 'Pooja - Flood Emergency Hotline',
  pageDescription: '24/7 Voice AI for Flood Alerts and Emergency Triage',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/murf-logo.svg',
  accent: '#ef4444',
  logoDark: '/murf-logo-dark.svg',
  accentDark: '#ef4444',
  startButtonText: 'Connect to Pooja (Emergency)',

  // optional: audio visualization configuration
  audioVisualizerType: 'wave',
  audioVisualizerColor: '#ef4444',
  audioVisualizerColorDark: '#ef4444',
  audioVisualizerWaveLineWidth: 3,
  // audioVisualizerColorShift: 0.3,
  // audioVisualizerBarCount: 5,
  // audioVisualizerType: 'radial',
  // audioVisualizerRadialBarCount: 24,
  // audioVisualizerRadialRadius: 100,
  // audioVisualizerType: 'grid',
  // audioVisualizerGridRowCount: 25,
  // audioVisualizerGridColumnCount: 25,
  // audioVisualizerType: 'wave',
  // audioVisualizerWaveLineWidth: 3,
  // audioVisualizerType: 'aura',

  // agent dispatch configuration
  agentName: process.env.AGENT_NAME ?? undefined,

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};
