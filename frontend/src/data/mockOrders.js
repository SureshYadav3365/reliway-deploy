export const initialMockOrders = [
  {
    id: 'ORD-89421',
    date: '2026-09-27T10:30:00Z',
    status: 'Shipped', // Options: 'Ordered', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'
    currentStep: 3, // 0 to 5
    paymentMethod: 'Online Payment (Prepaid)',
    paymentStatus: 'Paid',
    shippingAddress: {
      fullName: 'Alex Johnson',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'Springfield',
      state: 'Oregon',
      pincode: '97477',
    },
    items: [
      {
        id: 'prod-1',
        name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
        price: 348.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        brand: 'Sony',
      },
      {
        id: 'prod-7',
        name: 'Handcrafted Full-Grain Italian Leather Bi-Fold Wallet',
        price: 54.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
        brand: 'Vanguard',
      }
    ],
    pricing: {
      subtotal: 402.00,
      discount: 25.00,
      delivery: 0.00,
      tax: 28.14,
      total: 405.14,
    },
    trackingHistory: [
      { status: 'Ordered', title: 'Order Placed', time: 'Sep 27, 2026 - 10:30 AM', note: 'Order #ORD-89421 placed successfully.' },
      { status: 'Confirmed', title: 'Payment Confirmed', time: 'Sep 27, 2026 - 10:32 AM', note: 'Prepaid payment verified and approved.' },
      { status: 'Processing', title: 'Packed at Hub', time: 'Sep 27, 2026 - 04:15 PM', note: 'Items quality checked and boxed in Portland warehouse.' },
      { status: 'Shipped', title: 'In Transit', time: 'Sep 28, 2026 - 08:45 AM', note: 'Carrier Express Courier picked up package #TRK-98317.' },
      { status: 'Out for Delivery', title: 'Out for Delivery', time: 'Estimated Sep 30, 2026', note: 'Scheduled for local delivery courier handover.' },
      { status: 'Delivered', title: 'Delivered', time: 'Pending', note: 'Delivered to recipient address.' },
    ],
  },
  {
    id: 'ORD-76190',
    date: '2026-09-15T14:20:00Z',
    status: 'Delivered',
    currentStep: 5,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid on Delivery',
    shippingAddress: {
      fullName: 'Alex Johnson',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'Springfield',
      state: 'Oregon',
      pincode: '97477',
    },
    items: [
      {
        id: 'prod-3',
        name: 'Nike Air Max 270 React Athletic Sneakers',
        price: 139.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
        brand: 'Nike',
      },
      {
        id: 'prod-9',
        name: 'Double-Walled Vacuum Insulated Stainless Steel Sports Bottle',
        price: 28.00,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
        brand: 'HydroPeak',
      }
    ],
    pricing: {
      subtotal: 195.99,
      discount: 15.00,
      delivery: 0.00,
      tax: 13.72,
      total: 194.71,
    },
    trackingHistory: [
      { status: 'Ordered', title: 'Order Placed', time: 'Sep 15, 2026 - 02:20 PM', note: 'Order placed with Cash on Delivery.' },
      { status: 'Confirmed', title: 'Order Confirmed', time: 'Sep 15, 2026 - 02:25 PM', note: 'Order confirmed and verified.' },
      { status: 'Processing', title: 'Processed', time: 'Sep 16, 2026 - 09:10 AM', note: 'Items packed securely.' },
      { status: 'Shipped', title: 'Shipped', time: 'Sep 16, 2026 - 06:30 PM', note: 'Package dispatched via BlueDart Express.' },
      { status: 'Out for Delivery', title: 'Out for Delivery', time: 'Sep 18, 2026 - 08:15 AM', note: 'Driver assigned for delivery.' },
      { status: 'Delivered', title: 'Delivered', time: 'Sep 18, 2026 - 01:45 PM', note: 'Package handed over to customer. Payment collected.' },
    ],
  },
];

export const ORDER_STATUS_STEPS = [
  'Ordered',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];
