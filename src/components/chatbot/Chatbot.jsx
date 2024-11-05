import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaComments } from 'react-icons/fa';
import { assets } from '../../assets/assets'; // Ensure you have the correct path to your assets

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const lastPopupTime = localStorage.getItem('lastPopupTime');
    const now = Date.now();

    if (!lastPopupTime || now - lastPopupTime >= 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        handleUserInteraction();
        localStorage.setItem('lastPopupTime', now.toString());
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const playNotificationSound = () => {
    document.body.click();
    const audio = new Audio(assets.notificationSound);
    audio.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        console.log("Audio playback blocked. Waiting for user interaction.");
      }
    });
  };

  const handleUserInteraction = () => {
    if (!isOpen) {
      setIsOpen(true);
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "What can I call you?", time: new Date().toLocaleTimeString() }]);
      playNotificationSound();
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (!input.trim()) return;

    if (!isNameSet) {
      setUserName(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: input, time: new Date().toLocaleTimeString() },
        { sender: "bot", text: `Hello ${input}! How can we assist you today?`, time: new Date().toLocaleTimeString() },
      ]);
      setIsNameSet(true);
      setInput("");
      return;
    }

    const userMessage = { sender: "user", text: input, time: new Date().toLocaleTimeString() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsTyping(true);
    const botResponse = getBotResponse(input);

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1000); // Simulate typing delay

    setInput("");
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    const keywords = [
      { keyword: "shipping", response: "We offer standard, express, and international shipping options." },
      { keyword: "hi", response: "Hi there! How can I assist you?" },
      { keyword: "hello", response: "Hello! How can I assist you today?" },
      { keyword: "help", response: "I'm here to help! What would you like assistance with?" },
      { keyword: "product details", response: "Please click on a product to see its details, reviews, and specifications." },
      { keyword: "returns", response: "We have a 30-day return policy for unused items." },
      { keyword: "exchange", response: "You can exchange items within 30 days of purchase." },
      { keyword: "refund", response: "Refunds are processed within 7-10 business days." },
      { keyword: "order status", response: "You can check your order status in your account under 'Orders'." },
      { keyword: "track order", response: "Use the tracking number sent to your email to track your order." },
      { keyword: "account", response: "Log in to your account to view orders, save items, and manage your preferences." },
      { keyword: "register", response: "You can register for an account on our website to enjoy exclusive benefits." },
      { keyword: "login", response: "Please enter your email and password to log in." },
      { keyword: "password reset", response: "Click on 'Forgot Password?' to reset your password." },
      { keyword: "promotions", response: "Check our Promotions page for the latest discounts and offers." },
      { keyword: "discount code", response: "Enter your discount code at checkout to apply the savings." },
      { keyword: "loyalty program", response: "Join our loyalty program to earn points on every purchase." },
      { keyword: "gift card", response: "Purchase a gift card for a perfect gift option." },
      { keyword: "customer service", response: "Contact our customer service team via email or chat for assistance." },
      { keyword: "payment methods", response: "We accept credit cards, PayPal, and other secure payment methods." },
      { keyword: "size guide", response: "Refer to our size guide to find the perfect fit." },
      { keyword: "availability", response: "Product availability can be checked on the product page." },
      { keyword: "shipping costs", response: "Shipping costs vary based on location and selected shipping method." },
      { keyword: "international shipping", response: "We offer international shipping to select countries." },
      { keyword: "order history", response: "View your order history in your account settings." },
      { keyword: "wishlist", response: "Save your favorite products to your wishlist for easy access." },
      { keyword: "shopping cart", response: "View and edit items in your shopping cart before checkout." },
      { keyword: "checkout", response: "Proceed to checkout to complete your order." },
      { keyword: "payment confirmation", response: "You will receive a payment confirmation email once your order is processed." },
      { keyword: "sale", response: "Check our Sale section for amazing deals on selected items." },
      { keyword: "new arrivals", response: "Explore our New Arrivals section for the latest products." },
      { keyword: "best sellers", response: "Discover our Best Sellers for popular items among customers." },
      { keyword: "featured products", response: "Browse our Featured Products for highlighted selections." },
      { keyword: "customer reviews", response: "Read customer reviews to make informed purchasing decisions." },
      { keyword: "FAQs", response: "Visit our FAQs page for answers to common questions." },
      { keyword: "contact us", response: "Get in touch through our Contact Us page." },
      { keyword: "social media", response: "Follow us on social media for updates and exclusive offers." },
      { keyword: "privacy policy", response: "Review our Privacy Policy to understand how we protect your data." },
      { keyword: "terms of service", response: "Check our Terms of Service for information on your rights and responsibilities." },
      { keyword: "blog", response: "Visit our blog for tips, trends, and updates." },
      { keyword: "events", response: "Stay tuned for upcoming events and promotions." },
      { keyword: "careers", response: "Explore career opportunities on our Careers page." },
      { keyword: "feedback", response: "We value your feedback! Share your thoughts with us." },
      { keyword: "sustainability", response: "Learn about our sustainability initiatives on our website." },
      { keyword: "accessibility", response: "We strive to make our website accessible for everyone." },
      { keyword: "gift wrapping", response: "Gift wrapping is available at checkout for a small fee." },
      { keyword: "product recommendations", response: "Based on your preferences, we recommend checking these products." },
      { keyword: "special offers", response: "Sign up for our newsletter to receive special offers." },
      { keyword: "return label", response: "A return label will be provided with your return instructions." },
      { keyword: "store locator", response: "Use our store locator to find a physical location near you." },
      { keyword: "out of stock", response: "If an item is out of stock, you can sign up for restock notifications." },
      { keyword: "bulk orders", response: "For bulk orders, please contact our sales team." },
      { keyword: "clearance", response: "Check out our Clearance section for last-chance deals." },
      { keyword: "subscription", response: "Subscribe to our newsletter for exclusive deals and updates." },
      { keyword: "returns policy", response: "Read about our returns policy on our Returns page." },
      { keyword: "shipping policy", response: "View our Shipping Policy for details on shipping times and costs." },
      { keyword: "purchase history", response: "You can view your purchase history in your account." },
      { keyword: "product warranty", response: "Most products come with a warranty; check the product details for specifics." },
      { keyword: "payment security", response: "Your payment information is secured with encryption technology." },
      { keyword: "order cancellation", response: "Orders can be canceled within a specified timeframe before shipping." },
      { keyword: "special requests", response: "If you have special requests, please contact customer service." },
      { keyword: "backorder", response: "Items on backorder will be shipped as soon as they are available." },
      { keyword: "price match", response: "We offer a price match guarantee on select items." },
      { keyword: "subscription box", response: "Discover our subscription box for curated products delivered to your door." },
      { keyword: "video reviews", response: "Check out video reviews of our products on our website." },
      { keyword: "trending", response: "See what's trending right now in our Trending section." },
      { keyword: "personalization", response: "Personalize your products with our customization options." },
      { keyword: "support", response: "Our support team is available 24/7 to assist you." },
      { keyword: "international returns", response: "For international returns, please contact customer service for guidance." },
      { keyword: "member benefits", response: "Enjoy exclusive member benefits by signing up for an account." },
      { keyword: "about us", response: "Learn more about our company and mission on the About Us page." },
      { keyword: "corporate sales", response: "For corporate sales inquiries, please contact our sales department." },
      { keyword: "customer testimonials", response: "Read testimonials from our satisfied customers." },
      { keyword: "video tutorials", response: "Watch video tutorials on how to use our products effectively." },
      { keyword: "live chat", response: "Chat with our support team in real time using the live chat feature." },
      { keyword: "limited edition", response: "Explore our limited edition products for unique offerings." },
      { keyword: "collaborations", response: "Discover exciting collaborations with popular brands." },
      { keyword: "mobile app", response: "Download our mobile app for a better shopping experience." },
      { keyword: "gift ideas", response: "Browse our gift ideas section for inspiration." },
      { keyword: "size chart", response: "Refer to our size chart for accurate measurements." },
      { keyword: "contact support", response: "For immediate assistance, contact our support team via chat." },
      { keyword: "featured collection", response: "Check out our featured collection for curated selections." },
      { keyword: "coming soon", response: "Stay tuned for our upcoming products coming soon!" },
      { keyword: "shopping guide", response: "Follow our shopping guide for tips on choosing the right products." },
      { keyword: "community", response: "Join our community for tips, tricks, and discussions." },
      { keyword: "rewards", response: "Earn rewards points with every purchase." },
      { keyword: "trending products", response: "See the products currently trending among our customers." },
      { keyword: "business inquiries", response: "For business inquiries, please reach out to our business development team." },
      { keyword: "order modification", response: "Contact us quickly if you need to modify your order." },
      { keyword: "out of stock notification", response: "Sign up for notifications when out-of-stock items become available." },
      { keyword: "purchase options", response: "Explore various purchase options including buy now and pay later." },
      { keyword: "shopping cart total", response: "Your shopping cart total will be displayed at checkout." },
      { keyword: "packaging", response: "We prioritize eco-friendly packaging for all shipments." },
      { keyword: "merchandise", response: "Explore our range of merchandise including apparel and accessories." },
      { keyword: "surveys", response: "Participate in our surveys for a chance to win discounts." },
      { keyword: "educational content", response: "Access educational content related to our products." },
      { keyword: "brand partnerships", response: "Learn about our brand partnerships and collaborations." },
      { keyword: "gift giving", response: "Find the perfect gift for any occasion in our gift section." },
      { keyword: "user-generated content", response: "Share your photos and experiences using our products!" },
      { keyword: "special collections", response: "Discover our special collections curated for unique tastes." },
      { keyword: "limited time offers", response: "Act fast! Limited-time offers are available for a short period." },
      { keyword: "charity", response: "Learn how we support charitable causes through your purchases." },
      { keyword: "online safety", response: "Your safety while shopping online is our priority." },
      { keyword: "holiday hours", response: "Check our holiday hours for customer service availability." },
      { keyword: "business account", response: "Set up a business account for exclusive discounts and offers." },
      { keyword: "contact information", response: "Find our contact information on the Contact Us page." },
      { keyword: "flash sales", response: "Don't miss our flash sales for significant savings!" },
      { keyword: "online events", response: "Join our online events for product launches and more." },
      { keyword: "personal shopper", response: "Our personal shopper service can help you find the perfect items." },
      { keyword: "sizing assistance", response: "Need help with sizing? Contact our support team for assistance." },
      { keyword: "tracking your package", response: "Tracking your package is easy with our order tracking feature." },
      { keyword: "product guides", response: "Access product guides for detailed usage instructions." },
      { keyword: "brand history", response: "Learn about our brand's history and values." },
      { keyword: "community events", response: "Participate in our community events and meet other customers." },
      { keyword: "referral program", response: "Refer a friend and earn rewards for both of you!" },
      { keyword: "clothing care", response: "Follow our clothing care instructions to maintain your items." },
      { keyword: "size inclusivity", response: "We offer a range of sizes to ensure everyone can find something they love." },
      { keyword: "product origins", response: "Discover the origins of our products and their materials." },
      { keyword: "how to order", response: "Follow our step-by-step guide on how to place an order." },
      { keyword: "cancel subscription", response: "You can cancel your subscription anytime in your account settings." },
      { keyword: "pre-order", response: "Pre-order items to secure them before they are released." },
      { keyword: "product comparisons", response: "Use our product comparison tool to choose the right item for you." },
      { keyword: "eco-friendly products", response: "Shop our selection of eco-friendly products." },
      { keyword: "fashion tips", response: "Explore our blog for the latest fashion tips and trends." },
      { keyword: "featured articles", response: "Check out our featured articles for in-depth insights." },
      { keyword: "social responsibility", response: "Learn about our commitment to social responsibility." },
      { keyword: "holiday gifts", response: "Find the perfect holiday gifts for everyone on your list." },
      { keyword: "last-minute gifts", response: "Explore our last-minute gift ideas for quick shopping." },
      { keyword: "unboxing", response: "Watch unboxing videos to see our products in action." },
      { keyword: "fashion trends", response: "Stay updated on the latest fashion trends with our articles." },
      { keyword: "shop local", response: "Support local artisans and shop our curated local collection." },
      { keyword: "event promotions", response: "Look out for event promotions and special offers." },
      { keyword: "virtual events", response: "Join our virtual events for exclusive access and behind-the-scenes." },
      { keyword: "gift recommendations", response: "Need gift recommendations? Let us help you find the right one!" },
      { keyword: "customer satisfaction", response: "We strive for 100% customer satisfaction in every order." },
      { keyword: "order inquiries", response: "For inquiries about your order, contact our support team." },
      { keyword: "partnerships", response: "We collaborate with brands to bring you exclusive products." },
      { keyword: "personalized gifts", response: "Explore our selection of personalized gifts for that special touch." },
      { keyword: "eco-conscious shopping", response: "Shop with us for eco-conscious products that make a difference." },
      { keyword: "gift guides", response: "Browse our gift guides for ideas tailored to specific occasions." },
      { keyword: "upcoming products", response: "Stay tuned for announcements about our upcoming products." },
      { keyword: "returns process", response: "Follow our returns process for a hassle-free return experience." },
      { keyword: "shopping trends", response: "Keep up with shopping trends to enhance your experience." },
      { keyword: "vintage items", response: "Explore our collection of unique vintage items." },
      { keyword: "sustainable brands", response: "Discover our curated list of sustainable brands." },
      { keyword: "new technology", response: "Stay ahead with our selection of new technology products." },
      { keyword: "loyalty rewards", response: "Redeem your loyalty rewards during checkout for discounts." },
      { keyword: "partner brands", response: "Explore our partner brands for a wider range of products." },
      { keyword: "event registration", response: "Register for our events to secure your spot." },
      { keyword: "donations", response: "Learn how we support communities through donations." },
      { keyword: "holiday sales", response: "Don’t miss our holiday sales for unbeatable prices." },
      { keyword: "subscription benefits", response: "Enjoy exclusive benefits when you subscribe to our service." },
      { keyword: "recycling program", response: "Join our recycling program to promote sustainability." },
      { keyword: "community support", response: "We are committed to supporting our local community." },
      { keyword: "trend alerts", response: "Sign up for trend alerts to stay updated on new arrivals." },
      { keyword: "weekly deals", response: "Check our website for weekly deals and promotions." },
      { keyword: "product sourcing", response: "Learn about our product sourcing practices." },
      { keyword: "vouchers", response: "Redeem vouchers at checkout for discounts on your purchase." },
      { keyword: "gift wrap service", response: "Choose our gift wrap service for a special touch." },
      { keyword: "fashion advice", response: "Get fashion advice from our style experts." },
      { keyword: "product recalls", response: "Stay informed about product recalls for your safety." },
      { keyword: "feedback form", response: "Fill out our feedback form to share your experience." },
      { keyword: "delivery options", response: "Choose from various delivery options to suit your needs." },
      { keyword: "restocking", response: "We will notify you when popular items are restocked." },
      { keyword: "fashion collections", response: "Explore our fashion collections for seasonal trends." },
      { keyword: "charitable causes", response: "Find out about the charitable causes we support." },
      { keyword: "free shipping", response: "Enjoy free shipping on orders over a certain amount." },
      { keyword: "customer loyalty", response: "We value our customers and reward loyalty with special offers." },
      { keyword: "stock availability", response: "Check stock availability directly on the product page." },
      { keyword: "limited time sales", response: "Act fast to take advantage of our limited time sales." },
      { keyword: "upcoming events", response: "Stay tuned for announcements about upcoming events." },
      { keyword: "personalized shopping", response: "Enjoy personalized shopping experiences tailored to your preferences." },
      { keyword: "sizing assistance", response: "If you need help with sizing, reach out to our support team." },
      { keyword: "celebrity collaborations", response: "Discover our exclusive products from celebrity collaborations." },
      { keyword: "exclusive access", response: "Get exclusive access to new collections by subscribing." },
      { keyword: "free trials", response: "Sign up for free trials on selected products." },
      { keyword: "wishlist sharing", response: "Share your wishlist with friends and family for special occasions." },
      { keyword: "order customization", response: "Customize your order with our personalization options." },
      { keyword: "in-store pickup", response: "Choose in-store pickup for convenience." },
      { keyword: "instant discounts", response: "Receive instant discounts by signing up for our newsletter." },
      { keyword: "brand loyalty", response: "We appreciate your brand loyalty and offer rewards." },
      { keyword: "home delivery", response: "Enjoy home delivery for your convenience." },
      { keyword: "frequently asked questions", response: "Check our FAQ section for answers to common questions." },
      { keyword: "customer feedback", response: "We value customer feedback to improve our services." },
      { keyword: "exclusive offers", response: "Sign up for our newsletter for exclusive offers." },
      { keyword: "new arrivals", response: "Browse our new arrivals section for the latest products." },
      { keyword: "product safety", response: "We ensure all products meet safety standards." },
      { keyword: "satisfaction guarantee", response: "We offer a satisfaction guarantee on all products." },
      { keyword: "shopping assistance", response: "Contact our shopping assistance team for help." },
      { keyword: "feedback survey", response: "Complete our feedback survey for a chance to win a gift card." },
      { keyword: "store locator", response: "Use our store locator to find a location near you." },
      { keyword: "outlet store", response: "Visit our outlet store for discounted items." },
      { keyword: "membership program", response: "Join our membership program for exclusive benefits." },
      { keyword: "product warranty", response: "Learn about our product warranty policies." },
      { keyword: "seasonal promotions", response: "Check out our seasonal promotions for great deals." },
      { keyword: "charitable donations", response: "A portion of our sales goes to charitable donations." },
      { keyword: "bulk orders", response: "Contact us for special pricing on bulk orders." },
      { keyword: "customer testimonials", response: "Read customer testimonials to see what others are saying." },
      { keyword: "fashion inspirations", response: "Get fashion inspirations from our curated collections." },
      { keyword: "contact support", response: "If you need assistance, contact our support team." },
      { keyword: "product features", response: "Explore the features of our products on the product pages." },
      { keyword: "shopping rewards", response: "Earn shopping rewards with every purchase." },
      { keyword: "latest trends", response: "Stay updated with the latest trends on our blog." },
      { keyword: "gift cards", response: "Purchase gift cards for your loved ones." },
      { keyword: "digital products", response: "Explore our selection of digital products available for download." },
      { keyword: "event discounts", response: "Look for event discounts available during special occasions." },
      { keyword: "customer support hours", response: "Check our customer support hours for availability." },
      { keyword: "holiday return policy", response: "Our holiday return policy offers extended returns." },
      { keyword: "shopping experience", response: "We aim to provide the best shopping experience possible." },
      { keyword: "community engagement", response: "Learn how we engage with the community." },
      { keyword: "gift wrapping", response: "Select our gift wrapping option for special occasions." },
      { keyword: "exclusive collections", response: "Discover our exclusive collections available for a limited time." },
      { keyword: "international shipping", response: "We offer international shipping to select countries." },
      { keyword: "product usage", response: "Find tips on product usage in our blog section." },
      { keyword: "community support", response: "We support local communities through various initiatives." },
      { keyword: "discount codes", response: "Apply discount codes at checkout for savings." },
      { keyword: "shop by category", response: "Browse products by category for easier navigation." },
      { keyword: "trending products", response: "Check out our trending products section." },
      { keyword: "special promotions", response: "Keep an eye out for our special promotions throughout the year." },
      { keyword: "mobile app", response: "Download our mobile app for a seamless shopping experience." },
      { keyword: "fashion collaborations", response: "Explore our fashion collaborations with top designers." },
      { keyword: "shopping history", response: "View your shopping history in your account." },
      { keyword: "price match guarantee", response: "We offer a price match guarantee for competitive pricing." },
      { keyword: "product reviews", response: "Read product reviews from other customers to make informed choices." },
      { keyword: "weekly newsletters", response: "Sign up for our weekly newsletters for updates." },
      { keyword: "member-only sales", response: "Enjoy member-only sales by joining our program." },
      { keyword: "product availability", response: "Check product availability on the product detail page." },
      { keyword: "brand news", response: "Stay updated with the latest news from your favorite brands." },
      { keyword: "checkout process", response: "Our checkout process is quick and secure." },
      { keyword: "event invitations", response: "Receive event invitations by subscribing to our newsletter." },
      { keyword: "home decor", response: "Shop our selection of home decor items." },
      { keyword: "charitable initiatives", response: "Learn about our charitable initiatives and how you can help." },
      { keyword: "promotional events", response: "Participate in our promotional events for exclusive deals." },
      { keyword: "safety standards", response: "We adhere to strict safety standards for all products." },
      { keyword: "product quality", response: "We guarantee the quality of our products." },
      { keyword: "charitable partnerships", response: "Learn about our partnerships with charitable organizations." },
      { keyword: "seasonal items", response: "Explore our seasonal items for festive occasions." },
      { keyword: "gift guides by occasion", response: "Browse gift guides tailored for specific occasions." },
      { keyword: "order history", response: "View your order history in your account settings." },
      { keyword: "delivery tracking", response: "Track your delivery status with our tracking tool." },
      { keyword: "community initiatives", response: "Get involved with our community initiatives." },
      { keyword: "customer experience", response: "We prioritize customer experience in every aspect." },
      { keyword: "online exclusives", response: "Shop our online exclusives for unique products." },
      { keyword: "event ticketing", response: "Purchase tickets for our upcoming events." },
      { keyword: "user accounts", response: "Create a user account for personalized shopping." },
      { keyword: "customer support options", response: "Explore our customer support options for assistance." },
      { keyword: "gift shopping", response: "Get tips for effective gift shopping on our blog." },
      { keyword: "sustainable practices", response: "Learn about our sustainable practices in sourcing and packaging." },
      { keyword: "frequent shopper program", response: "Join our frequent shopper program for exclusive benefits." },
      { keyword: "rewards points", response: "Accumulate rewards points with every purchase." },
      { keyword: "delivery delays", response: "We will notify you of any delivery delays." },
      { keyword: "product tutorials", response: "Watch product tutorials for a better understanding." },
      { keyword: "community involvement", response: "Discover how we are involved in the community." },
      { keyword: "customer service email", response: "Contact us at our customer service email for support." },
      { keyword: "safety measures", response: "We implement safety measures for secure shopping." },
      { keyword: "reward program", response: "Join our reward program to earn points and discounts." },
      { keyword: "payment methods", response: "We accept various payment methods for your convenience." },
      { keyword: "current promotions", response: "Check our current promotions for savings opportunities." },
      { keyword: "product sizes", response: "Select your preferred product sizes on the product page." },
      { keyword: "mobile-friendly site", response: "Our website is mobile-friendly for shopping on the go." },
      { keyword: "gift options", response: "Explore various gift options for special occasions." },
      { keyword: "special edition products", response: "Discover our special edition products for collectors." },
      { keyword: "sale events", response: "Stay updated on upcoming sale events." },
      { keyword: "customer service chat", response: "Use our chat feature for instant customer service." },
      { keyword: "return instructions", response: "Follow our return instructions for hassle-free returns." },
      { keyword: "trending categories", response: "Check out our trending categories for popular items." },
      { keyword: "seasonal discounts", response: "Enjoy seasonal discounts during festive times." },
      { keyword: "exclusive discounts", response: "Subscribe to receive exclusive discounts and offers." },
      { keyword: "product sourcing information", response: "Learn about our product sourcing information." },
      { keyword: "product certifications", response: "Find information about product certifications on the detail page." },
      { keyword: "user reviews", response: "Read user reviews for insights into our products." },
      { keyword: "flash deal notifications", response: "Sign up for notifications about flash deals." },
      { keyword: "customer loyalty program", response: "Join our customer loyalty program for rewards." },
      { keyword: "seasonal gift ideas", response: "Explore seasonal gift ideas for every occasion." },
      { keyword: "custom orders", response: "Contact us for custom orders tailored to your needs." },
      { keyword: "gift registry", response: "Create a gift registry for special occasions." },
      { keyword: "customer loyalty benefits", response: "Enjoy various benefits through our customer loyalty program." },
      { keyword: "product care tips", response: "Find product care tips on our website." },
      { keyword: "exclusive access", response: "Get exclusive access to new collections." },
      { keyword: "online shopping tutorials", response: "Watch our online shopping tutorials for guidance." },
      { keyword: "gift subscription", response: "Consider a gift subscription for ongoing gifts." },
      { keyword: "shopping cart reminders", response: "Receive reminders for items in your shopping cart." },
      { keyword: "product availability alerts", response: "Sign up for product availability alerts." },
      { keyword: "shipping options", response: "Explore our shipping options for delivery." },
      { keyword: "curated collections", response: "Shop our curated collections for unique finds." },
      { keyword: "event experiences", response: "Attend our event experiences for exclusive insights." },
      { keyword: "shopping tips", response: "Get helpful shopping tips on our blog." },
      { keyword: "community partnerships", response: "Learn about our community partnerships." },
      { keyword: "return policy details", response: "Read our return policy details for clarity." },
      { keyword: "discount promotions", response: "Stay updated on our discount promotions." },
      { keyword: "product exploration", response: "Explore our range of products on our website." },
      { keyword: "promotional merchandise", response: "Browse our promotional merchandise." },
      { keyword: "special shopping hours", response: "Check our special shopping hours during holidays." },
      { keyword: "user feedback", response: "We welcome user feedback for improvement." },
      { keyword: "gift options by occasion", response: "Find gift options categorized by occasion." },
      { keyword: "limited time offers", response: "Take advantage of our limited time offers." },
      { keyword: "customer service number", response: "Contact our customer service number for support." },
      { keyword: "brand loyalty rewards", response: "Join our brand loyalty rewards program." },
      { keyword: "online purchasing guide", response: "Follow our online purchasing guide for help." },
      { keyword: "brand engagement", response: "Engage with us through our brand channels." },
      { keyword: "shopping suggestions", response: "Get shopping suggestions based on your preferences." },
      { keyword: "member-only events", response: "Attend our member-only events for exclusive access." },
      { keyword: "satisfaction survey", response: "Complete our satisfaction survey to help us improve." },
      { keyword: "product testing", response: "Learn about our product testing processes." },
      { keyword: "loyalty points redemption", response: "Discover how to redeem your loyalty points." },
      { keyword: "upcoming events", response: "Stay informed about our upcoming events." },
      { keyword: "shopping history access", response: "Access your shopping history from your account." },
      { keyword: "customer service follow-up", response: "Expect a follow-up from our customer service team." },
      { keyword: "gift cards by brand", response: "Browse gift cards available by brand." },
      { keyword: "seasonal shopping tips", response: "Get seasonal shopping tips on our blog." },
      { keyword: "brand collaborations", response: "Explore our brand collaborations for unique offerings." },
      { keyword: "flash sales", response: "Stay updated on our flash sales." },
      { keyword: "event highlights", response: "Catch up on our event highlights on social media." },
      { keyword: "customer appreciation", response: "We appreciate our customers and their support." },
      { keyword: "gift planning tips", response: "Find tips for effective gift planning." },
      { keyword: "online shopping benefits", response: "Discover the benefits of online shopping." },
      { keyword: "store promotions", response: "Check out our store promotions for discounts." },
      { keyword: "shopping guides", response: "Access our shopping guides for help." },
      { keyword: "customer support contact", response: "Find our customer support contact information." },
      { keyword: "product range exploration", response: "Explore our extensive product range." },
      { keyword: "brand sustainability", response: "Learn about our brand's sustainability efforts." },
      { keyword: "event participation", response: "Participate in our events for exclusive rewards." },
      { keyword: "gift options for him", response: "Explore gift options tailored for him." },
      { keyword: "frequently visited products", response: "Check out your frequently visited products." },
      { keyword: "member registration", response: "Register as a member for exclusive benefits." },
      { keyword: "product line expansion", response: "Learn about our product line expansion." },
      { keyword: "rewarding shopping experience", response: "We aim to create a rewarding shopping experience." },
      { keyword: "user engagement", response: "Engage with us through various channels." },
      { keyword: "product sustainability", response: "Explore our product sustainability initiatives." },
      { keyword: "seasonal product selection", response: "Browse our seasonal product selection." },
      { keyword: "discount alerts", response: "Sign up for discount alerts." },
      { keyword: "gift options for her", response: "Find gift options tailored for her." },
      { keyword: "customer loyalty tiers", response: "Explore our customer loyalty tiers for benefits." },
      { keyword: "shopping personalization", response: "Experience shopping personalization on our site." },
      { keyword: "shopping community", response: "Join our shopping community for insights." },
      { keyword: "exclusive member rewards", response: "Enjoy exclusive member rewards." },
      { keyword: "event highlights recap", response: "Recap our event highlights through our newsletters." },
      { keyword: "customer service availability", response: "Check our customer service availability hours." },
      { keyword: "gift selection assistance", response: "Get assistance with gift selection." },
      { keyword: "frequent shopper discounts", response: "Enjoy discounts as a frequent shopper." },
      { keyword: "seasonal trends", response: "Stay updated on seasonal trends." },
      { keyword: "limited edition products", response: "Shop our limited edition products." },
      { keyword: "event RSVP", response: "RSVP for our events." },
      { keyword: "shop local", response: "Support local businesses by shopping local." },
      { keyword: "customer satisfaction tracking", response: "We track customer satisfaction to improve." },
      { keyword: "gift recommendations", response: "Receive personalized gift recommendations." },
      { keyword: "promotional offers tracking", response: "Track our promotional offers." },
      { keyword: "shopping guide access", response: "Access our shopping guide for assistance." },
      { keyword: "member-exclusive access", response: "Gain member-exclusive access to new arrivals." },
      { keyword: "customer support updates", response: "Receive updates from our customer support team." },
      { keyword: "shopping event participation", response: "Participate in our shopping events." },
      { keyword: "brand storytelling", response: "Discover our brand storytelling." },
      { keyword: "gift wrap options", response: "Select your preferred gift wrap options." },
      { keyword: "event access codes", response: "Use our event access codes for special events." },
      { keyword: "user-friendly navigation", response: "Enjoy user-friendly navigation on our website." },
      { keyword: "customer care number", response: "Reach out to our customer care number for help." },
      { keyword: "trending items", response: "Check out trending items in our store." },
      { keyword: "special product lines", response: "Explore our special product lines." },
      { keyword: "event merchandise", response: "Browse our event merchandise." },
      { keyword: "personalized experiences", response: "Enjoy personalized experiences when shopping." },
      { keyword: "gift suggestions", response: "Get gift suggestions for every occasion." },
      { keyword: "shopping experience feedback", response: "Provide feedback on your shopping experience." },
      { keyword: "community impact", response: "Learn about our community impact initiatives." },
      { keyword: "charitable cause support", response: "Support our charitable causes." },
      { keyword: "shopping tips and tricks", response: "Get shopping tips and tricks on our blog." },
      { keyword: "customer loyalty rewards program", response: "Join our customer loyalty rewards program." },
      { keyword: "brand partnerships", response: "Discover our brand partnerships." },
      { keyword: "shopping trends insights", response: "Stay informed on shopping trends." },
      { keyword: "personalized shopping experiences", response: "Experience personalized shopping." },
      { keyword: "gift ideas for all occasions", response: "Find gift ideas for all occasions." },
      { keyword: "community contributions", response: "Learn about our community contributions." },
      { keyword: "shopping patterns analysis", response: "Analyze shopping patterns for better services." },
      { keyword: "gift card balance check", response: "Check your gift card balance online." },
      { keyword: "customer journey mapping", response: "Explore our customer journey mapping." },
      { keyword: "event planning assistance", response: "Get event planning assistance." },
      { keyword: "brand reputation management", response: "Learn about our brand reputation management." },
      { keyword: "seasonal marketing strategies", response: "Discover our seasonal marketing strategies." },
      { keyword: "customer retention strategies", response: "Explore our customer retention strategies." },
      { keyword: "gift options for children", response: "Browse gift options for children." },
      { keyword: "online shopping community", response: "Join our online shopping community." },
      { keyword: "event participation benefits", response: "Learn about our event participation benefits." },
      { keyword: "brand storytelling insights", response: "Discover insights into our brand storytelling." },
      { keyword: "customer satisfaction initiatives", response: "Explore our customer satisfaction initiatives." },
      { keyword: "gift packaging options", response: "Select from our gift packaging options." },
      { keyword: "shop by category", response: "Shop by category for easier browsing." },
      { keyword: "personalized promotions", response: "Receive personalized promotions." },
      { keyword: "gift registry services", response: "Utilize our gift registry services." },
      { keyword: "community engagement opportunities", response: "Find community engagement opportunities." },
      { keyword: "event participation guidelines", response: "Check our event participation guidelines." },
      { keyword: "sustainable shopping practices", response: "Adopt sustainable shopping practices." },
      { keyword: "customer feedback channels", response: "Use our customer feedback channels." },
      { keyword: "gift options for teens", response: "Explore gift options for teens." },
      { keyword: "online shopping resources", response: "Access online shopping resources." },
      { keyword: "event planning resources", response: "Find event planning resources." },
      { keyword: "community initiatives participation", response: "Participate in community initiatives." },
      { keyword: "customer service best practices", response: "Learn about our customer service best practices." },
      { keyword: "event merchandise opportunities", response: "Discover opportunities for event merchandise." },
      { keyword: "gift card offerings", response: "Explore our gift card offerings." },
      { keyword: "trending promotions", response: "Stay updated on trending promotions." },
      { keyword: "brand reputation insights", response: "Gain insights into our brand reputation." },
      { keyword: "shopping patterns tracking", response: "Track shopping patterns for better services." },
      { keyword: "gift experiences", response: "Consider gift experiences as unique gifts." },
      { keyword: "customer support resources", response: "Utilize our customer support resources." },
      { keyword: "event experiences participation", response: "Participate in our event experiences." },
      { keyword: "shopping analysis tools", response: "Explore our shopping analysis tools." },
      { keyword: "gift giving advice", response: "Get advice for effective gift giving." },
      { keyword: "customer loyalty analytics", response: "Analyze customer loyalty data." },
      { keyword: "event promotions tracking", response: "Track event promotions." },
      { keyword: "gift options for couples", response: "Find gift options for couples." },
      { keyword: "personalized shopping assistance", response: "Get personalized shopping assistance." },
      { keyword: "community feedback opportunities", response: "Provide feedback on our community initiatives." },
      { keyword: "customer service communication", response: "Improve customer service communication." },
      { keyword: "event planning guidelines", response: "Follow our event planning guidelines." },
      { keyword: "sustainability initiatives updates", response: "Stay updated on sustainability initiatives." },
      { keyword: "gift guides for special occasions", response: "Explore gift guides for special occasions." },
      { keyword: "customer satisfaction reporting", response: "Review our customer satisfaction reporting." },
      { keyword: "event engagement opportunities", response: "Discover event engagement opportunities." },
      { keyword: "gift options for grandparents", response: "Browse gift options for grandparents." },
      { keyword: "customer journey analysis", response: "Analyze the customer journey." },
      { keyword: "online shopping innovations", response: "Stay updated on online shopping innovations." },
      { keyword: "community contributions insights", response: "Explore insights into community contributions." },
      { keyword: "customer experience enhancements", response: "Learn about customer experience enhancements." },
      { keyword: "event participation tracking", response: "Track event participation." },
      { keyword: "gift selection guidance", response: "Get guidance for gift selection." },
      { keyword: "brand transparency", response: "Learn about our brand transparency." },
      { keyword: "trending gifts", response: "Check out trending gifts." },
      { keyword: "personalized loyalty rewards", response: "Receive personalized loyalty rewards." },
      { keyword: "event participation updates", response: "Stay informed about event participation updates." },
      { keyword: "gift planning resources", response: "Access gift planning resources." },
      { keyword: "customer loyalty programs overview", response: "Get an overview of our customer loyalty programs." },
      { keyword: "gift options for pets", response: "Explore gift options for pets." },
      { keyword: "community feedback channels", response: "Use our community feedback channels." },
      { keyword: "customer service insights", response: "Gain insights into our customer service." },
      { keyword: "event participation benefits tracking", response: "Track event participation benefits." },
      { keyword: "gift registry guidelines", response: "Follow our gift registry guidelines." },
      { keyword: "personalized shopping resources", response: "Access personalized shopping resources." },
      { keyword: "community impact updates", response: "Stay updated on community impact." },
      { keyword: "gift suggestions for occasions", response: "Find gift suggestions for various occasions." },
      { keyword: "shopping behavior analysis", response: "Analyze shopping behavior for improvement." },
      { keyword: "event planning support", response: "Get support for event planning." },
      { keyword: "customer loyalty tracking", response: "Track customer loyalty." },
      { keyword: "gift options for special events", response: "Explore gift options for special events." },
      { keyword: "community initiatives engagement", response: "Engage with our community initiatives." },
      { keyword: "customer experience improvements", response: "Discover our customer experience improvements." },
      { keyword: "event participation registration", response: "Register for event participation." },
      { keyword: "gift cards for various occasions", response: "Browse gift cards for various occasions." },
      { keyword: "customer insights tracking", response: "Track customer insights." },
      { keyword: "event merchandise offerings", response: "Explore event merchandise offerings." },
      { keyword: "gift options for housewarming", response: "Find gift options for housewarming." },
      { keyword: "community feedback collection", response: "Help us collect community feedback." },
      { keyword: "customer journey mapping tools", response: "Use customer journey mapping tools." },
      { keyword: "event planning tips", response: "Get tips for successful event planning." },
      { keyword: "sustainability practices updates", response: "Stay updated on sustainability practices." },
      { keyword: "gift options for anniversaries", response: "Explore gift options for anniversaries." },
      { keyword: "customer satisfaction metrics", response: "Review our customer satisfaction metrics." },
      { keyword: "event experiences guidelines", response: "Follow our event experiences guidelines." },
      { keyword: "gift options for holidays", response: "Find gift options for holidays." },
      { keyword: "community initiatives tracking", response: "Track community initiatives." },
      { keyword: "customer support best practices", response: "Learn about customer support best practices." },
      { keyword: "event merchandise availability", response: "Check event merchandise availability." },
      { keyword: "gift planning assistance", response: "Get assistance with gift planning." },
      { keyword: "brand reputation analysis", response: "Analyze brand reputation." },
      { keyword: "customer loyalty insights", response: "Gain insights into customer loyalty." },
      { keyword: "event participation reports", response: "Review event participation reports." },
      { keyword: "gift options for graduation", response: "Find gift options for graduation." },
      { keyword: "community engagement feedback", response: "Provide feedback on community engagement." },
      { keyword: "customer experience tracking", response: "Track customer experience." },
      { keyword: "event planning assistance resources", response: "Access event planning assistance resources." },
      { keyword: "gift options for retirement", response: "Explore gift options for retirement." },
      { keyword: "customer support improvements", response: "Discover improvements in customer support." },
      { keyword: "event merchandise guidelines", response: "Follow event merchandise guidelines." },
      { keyword: "gift options for promotions", response: "Browse gift options for promotions." },
      { keyword: "community feedback analysis", response: "Analyze community feedback." },
      { keyword: "customer satisfaction trends", response: "Stay updated on customer satisfaction trends." },
      { keyword: "event participation opportunities", response: "Discover event participation opportunities." },
      { keyword: "gift options for new parents", response: "Find gift options for new parents." },
      { keyword: "community initiatives updates", response: "Stay updated on community initiatives." },
      { keyword: "customer service insights analysis", response: "Analyze customer service insights." },
      { keyword: "event planning guidelines updates", response: "Stay informed about event planning guidelines." },
      { keyword: "gift options for babies", response: "Explore gift options for babies." },
      { keyword: "community contributions tracking", response: "Track community contributions." },
      { keyword: "customer journey improvements", response: "Discover improvements in the customer journey." },
      { keyword: "event merchandise planning", response: "Plan event merchandise effectively." },
      { keyword: "gift options for unique celebrations", response: "Find gift options for unique celebrations." },
      
];  

    for (const entry of keywords) {
      if (lowerInput.includes(entry.keyword)) {
        return { sender: "bot", text: entry.response, time: new Date().toLocaleTimeString() };
      }
    }

    return { sender: "bot", text: "I'm sorry, I didn't understand that. Can you please clarify?", time: new Date().toLocaleTimeString() };
  };

  const toggleChatbot = () => setIsOpen(!isOpen);
  const closeChatbot = () => setIsOpen(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}>
      {!isOpen && (
        <div onClick={toggleChatbot} style={chatHeadStyle}>
          <FaComments size={24} color="#fff" />
        </div>
      )}

      {isOpen && (
        <div style={chatboxStyle}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0, fontSize: '16px', textAlign: 'center' }}>Chat with Us</h2>
            <button onClick={closeChatbot} style={closeButtonStyle}>
              <FaTimes size={14} color="#fff" />
            </button>
          </div>
          <div ref={chatContainerRef} style={chatContainerStyle}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
                <div style={{ fontSize: '10px', color: '#888' }}>{msg.time}</div>
              </div>
            ))}
            {isTyping && (
              <div style={{ textAlign: 'left', fontStyle: 'italic', color: '#888' }}>
                Bot is typing...
              </div>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={isNameSet ? "Type a message..." : "What can I call you?"}
            style={inputStyle}
          />
          {isNameSet && <button onClick={handleSend} style={sendButtonStyle}>Send</button>}
        </div>
      )}
    </div>
  );
};

const chatHeadStyle = {
  width: "45px",
  height: "45px",
  padding: "5px",
  backgroundColor: "#007bff",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const chatboxStyle = {
  width: "85vw",
  maxWidth: "320px",
  padding: "10px",
  backgroundColor: "#FAFAFA", 
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
};

const closeButtonStyle = {
  background: "red",
  border: "none",
  cursor: "pointer",
};

const chatContainerStyle = {
  height: "300px",
  overflowY: "auto",
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const sendButtonStyle = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#007bff",
  color: "#fff",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

export default Chatbot;
