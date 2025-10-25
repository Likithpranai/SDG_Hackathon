"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, Download, ArrowLeft, ShoppingBag, Printer } from 'lucide-react';

interface OrderItem {
  artwork: {
    id: string;
    title: string;
    images: string[];
    price?: number;
    currency?: string;
  };
  quantity: number;
}

interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  status: string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();
  const receiptRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Get order from localStorage
    const orderData = localStorage.getItem('lastOrder');
    
    if (!orderData) {
      router.push('/marketplace');
      return;
    }
    
    try {
      const parsedOrder = JSON.parse(orderData);
      setOrder(parsedOrder);
    } catch (error) {
      console.error('Error parsing order data:', error);
      router.push('/marketplace');
    }
  }, [router]);
  
  const calculateSubtotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => {
      return sum + (item.artwork.price || 0) * item.quantity;
    }, 0);
  };
  
  const handlePrintReceipt = () => {
    window.print();
  };
  
  const handleDownloadPDF = () => {
    // In a real app, we would use a library like jspdf or html2pdf
    // For this simulation, we'll create a printable version in a new window
    if (!order) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download the receipt');
      return;
    }
    
    const subtotal = calculateSubtotal(order.items);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${order.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .receipt-id {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .info-label {
            font-weight: bold;
            display: block;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            font-weight: bold;
          }
          .total-row {
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #666;
          }
          .print-button {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px auto;
            display: block;
          }
          @media print {
            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">ArtConnect</div>
          <div class="receipt-id">Receipt: ${order.id}</div>
          <div>Date: ${new Date(order.date).toLocaleDateString()}</div>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="info-grid">
            <div>
              <div class="info-item">
                <span class="info-label">Name:</span>
                ${order.shippingInfo.fullName}
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                ${order.shippingInfo.email}
              </div>
              <div class="info-item">
                <span class="info-label">Phone:</span>
                ${order.shippingInfo.phone}
              </div>
            </div>
            <div>
              <div class="info-item">
                <span class="info-label">Shipping Address:</span>
                ${order.shippingInfo.address}<br>
                ${order.shippingInfo.city}, ${order.shippingInfo.state} ${order.shippingInfo.postalCode}<br>
                ${order.shippingInfo.country}
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Payment Information</div>
          <div class="info-item">
            <span class="info-label">Payment Method:</span>
            Credit Card (${order.paymentInfo.cardNumber})
          </div>
          <div class="info-item">
            <span class="info-label">Cardholder Name:</span>
            ${order.paymentInfo.cardholderName}
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Order Items</div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.artwork.title}</td>
                  <td>${item.quantity}</td>
                  <td>${(item.artwork.price || 0).toLocaleString()} ${item.artwork.currency || 'HKD'}</td>
                  <td>${((item.artwork.price || 0) * item.quantity).toLocaleString()} ${item.artwork.currency || 'HKD'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <table>
            <tr>
              <td>Subtotal:</td>
              <td>${subtotal.toLocaleString()} HKD</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>Tax (7%):</td>
              <td>${tax.toLocaleString()} HKD</td>
            </tr>
            <tr class="total-row">
              <td>Total:</td>
              <td>${total.toLocaleString()} HKD</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>Thank you for your purchase!</p>
          <p>ArtConnect - Connecting Artists and Art Lovers</p>
        </div>
        
        <button class="print-button" onclick="window.print()">Print Receipt</button>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  };
  
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading receipt...</p>
        </div>
      </div>
    );
  }
  
  const subtotal = calculateSubtotal(order.items);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Thank you for your purchase!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your order has been successfully placed and will be processed shortly.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Order ID: <span className="font-medium">{order.id}</span>
          </p>
        </div>
        
        {/* Receipt */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8" ref={receiptRef}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Receipt</h2>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(order.date).toLocaleDateString()}
            </span>
          </div>
          
          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Customer Information</h3>
              <p className="text-gray-600 dark:text-gray-400">{order.shippingInfo.fullName}</p>
              <p className="text-gray-600 dark:text-gray-400">{order.shippingInfo.email}</p>
              <p className="text-gray-600 dark:text-gray-400">{order.shippingInfo.phone}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Shipping Address</h3>
              <p className="text-gray-600 dark:text-gray-400">{order.shippingInfo.address}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.postalCode}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{order.shippingInfo.country}</p>
            </div>
          </div>
          
          {/* Payment Info */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Payment Information</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Credit Card: {order.paymentInfo.cardNumber}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Cardholder: {order.paymentInfo.cardholderName}
            </p>
          </div>
          
          {/* Order Items */}
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h3>
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
            {order.items.map((item) => (
              <div key={item.artwork.id} className="flex items-center py-3">
                <div className="w-16 h-16 relative rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.artwork.images[0] || '/placeholder-image.jpg'}
                    alt={item.artwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 grow">
                  <p className="font-medium text-gray-900 dark:text-white">{item.artwork.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {((item.artwork.price || 0) * item.quantity).toLocaleString()} {item.artwork.currency || 'HKD'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-white">{subtotal.toLocaleString()} HKD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-gray-900 dark:text-white">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax (7%)</span>
              <span className="text-gray-900 dark:text-white">{tax.toLocaleString()} HKD</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white">Total</span>
              <span className="font-bold text-gray-900 dark:text-white">{total.toLocaleString()} HKD</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={handlePrintReceipt}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Printer className="h-5 w-5 mr-2" />
              Print Receipt
            </button>
            
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Download PDF
            </button>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="/buyers/dashboard"
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              My Dashboard
            </Link>
            
            <Link
              href="/marketplace"
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
