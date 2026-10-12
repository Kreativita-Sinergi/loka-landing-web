import type { ComponentType } from 'react';

import type { FeatureVideoId } from './meta';
import BookingVideo, { BOOKING_DURATION } from './BookingVideo';
import ConsignmentVideo, { CONSIGNMENT_DURATION } from './ConsignmentVideo';
import PreOrderVideo, { PRE_ORDER_DURATION } from './PreOrderVideo';
import QrOrderVideo, { QR_ORDER_DURATION } from './QrOrderVideo';
import QrisVideo, { QRIS_DURATION } from './QrisVideo';
import ReferralVideo, { REFERRAL_DURATION } from './ReferralVideo';
import RentalVideo, { RENTAL_DURATION } from './RentalVideo';
import ReportsVideo, { REPORTS_DURATION } from './ReportsVideo';
import SupplierPoVideo, { SUPPLIER_PO_DURATION } from './SupplierPoVideo';
import VerticalsVideo, { VERTICALS_DURATION } from './VerticalsVideo';
import WeightVideo, { WEIGHT_DURATION } from './WeightVideo';

export const VIDEO_FPS = 30;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;

/** Id komposisi Remotion (juga nama berkas saat dirender) → komponen & durasi dalam frame. */
export const FEATURE_VIDEOS: Record<FeatureVideoId, { component: ComponentType; duration: number }> = {
  QrOrder: { component: QrOrderVideo, duration: QR_ORDER_DURATION },
  RentalTimer: { component: RentalVideo, duration: RENTAL_DURATION },
  BookingLapangan: { component: BookingVideo, duration: BOOKING_DURATION },
  QrisOtomatis: { component: QrisVideo, duration: QRIS_DURATION },
  ProdukPO: { component: PreOrderVideo, duration: PRE_ORDER_DURATION },
  SatuanBerat: { component: WeightVideo, duration: WEIGHT_DURATION },
  BarangTitipan: { component: ConsignmentVideo, duration: CONSIGNMENT_DURATION },
  SupplierPO: { component: SupplierPoVideo, duration: SUPPLIER_PO_DURATION },
  Laporan: { component: ReportsVideo, duration: REPORTS_DURATION },
  Referal: { component: ReferralVideo, duration: REFERRAL_DURATION },
  SemuaUsaha: { component: VerticalsVideo, duration: VERTICALS_DURATION },
};
