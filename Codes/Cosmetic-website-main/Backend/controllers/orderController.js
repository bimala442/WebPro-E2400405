const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { customer, items, totalAmount, paymentMethod } = req.body;
        
        // Validate required fields
        if (!customer || !items || !totalAmount) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }
        
        // Create the order
        const order = new Order({
            customer,
            items,
            totalAmount,
            paymentMethod: paymentMethod || 'cod',
            status: 'pending',
            paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
        });
        
        await order.save();
        
        // Send confirmation email
        sendOrderConfirmationEmail(order);
        
        res.status(201).json({
            success: true,
            data: order,
            message: 'Order placed successfully'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all orders (admin only)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get orders by email
exports.getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        
        const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }
        
        if (status) {
            order.status = status;
        }
        
        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }
        
        await order.save();
        
        res.status(200).json({
            success: true,
            data: order,
            message: 'Order status updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Helper function to send order confirmation email
const sendOrderConfirmationEmail = async (order) => {
    try {
        // Create a test account or use environment variables for production
        // const testAccount = await nodemailer.createTestAccount();
        
        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: process.env.EMAIL_PORT || 587,
            secure: process.env.EMAIL_SECURE === 'true' || false,
            auth: {
                user: process.env.EMAIL_USER, // || testAccount.user,
                pass: process.env.EMAIL_PASS, // || testAccount.pass
            }
        });
        
        // Generate the order items HTML
        const itemsHTML = order.items.map(item => 
            `<tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">Nrs.${item.price}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">Nrs.${item.price * item.quantity}</td>
            </tr>`
        ).join('');
        
        // Send email
        const info = await transporter.sendMail({
            from: `"S'appeal Cosmetics" <${process.env.EMAIL_FROM || 'cosmetic20@gmail.com'}>`,
            to: order.customer.email,
            subject: `Order Confirmation #${order.orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background-color: #FFB6C1; padding: 20px; text-align: center; color: white;">
                        <h1>Thank You for Your Order!</h1>
                        <p>Order #${order.orderId}</p>
                    </div>
                    
                    <div style="padding: 20px;">
                        <p>Hello ${order.customer.name},</p>
                        
                        <p>Thank you for shopping with S'appeal Cosmetics. Your order has been received and is being processed.</p>
                        
                        <h2 style="color: #333; margin-top: 30px;">Order Summary</h2>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background-color: #f9f9f9;">
                                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Product</th>
                                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Quantity</th>
                                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Price</th>
                                    <th style="padding: 10px; text-align: left; border-bottom: 2px solid #eee;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHTML}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Order Total:</td>
                                    <td style="padding: 10px; font-weight: bold;">Nrs.${order.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                        
                        <div style="margin-top: 30px; background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                            <h3 style="color: #333; margin-top: 0;">Shipping Information</h3>
                            <p><strong>Name:</strong> ${order.customer.name}</p>
                            <p><strong>Address:</strong> ${order.customer.address}</p>
                            <p><strong>Payment Method:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}</p>
                        </div>
                        
                        <p style="margin-top: 30px;">
                            If you have any questions about your order, please contact our customer support at
                            <a href="mailto:cosmetic20@gmail.com">cosmetic20@gmail.com</a> or call us at 
                            <a href="tel:9876555000">9876555000</a>.
                        </p>
                        
                        <p>Thank you for choosing S'appeal Cosmetics!</p>
                    </div>
                    
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                        <p>&copy; 2025 S'appeal Cosmetics. All Rights Reserved.</p>
                        <p>123 Lazimpat, Kathmandu, Nepal</p>
                    </div>
                </div>
            `
        });
        
        console.log('Order confirmation email sent:', info.messageId);
        // For testing with Ethereal: console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
}; 