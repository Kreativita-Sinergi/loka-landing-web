import { ChartLine, ChefHat, Clock, Layers, LayoutGrid, Monitor, NotebookPen, Package, QrCode, Receipt, ScanBarcode, Smartphone, Truck, UserRound, Wallet, WifiOff } from 'lucide-react';

import type { BusinessFeatureIcon as IconName } from '@/data/site/usaha';

const ICONS = {
  layers: Layers,
  qr: QrCode,
  monitor: Monitor,
  clock: Clock,
  grid: LayoutGrid,
  chef: ChefHat,
  receipt: Receipt,
  user: UserRound,
  package: Package,
  barcode: ScanBarcode,
  truck: Truck,
  notebook: NotebookPen,
  phone: Smartphone,
  offline: WifiOff,
  wallet: Wallet,
  chart: ChartLine,
} as const;

export default function BusinessFeatureIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} aria-hidden />;
}
