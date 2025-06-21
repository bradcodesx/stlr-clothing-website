"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  Star,
  Heart,
  Plus,
  Minus,
  X,
  CreditCard,
  MapPin,
  User,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  color: string
  description: string
  rating: number
}

interface CartItem extends Product {
  quantity: number
  size: string
}

interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

const products: Product[] = [
  {
    id: "blue-shorts",
    name: "Seamless Shorts - Blue",
    price: 45,
    image: "/images/blue-shorts.jpg",
    color: "Blue",
    description: "High-waisted • Squat-proof • Seamless",
    rating: 5,
  },
  {
    id: "sky-shorts",
    name: "Seamless Shorts - Sky",
    price: 45,
    image: "/images/light-blue-shorts.jpg",
    color: "Sky",
    description: "High-waisted • Squat-proof • Seamless",
    rating: 5,
  },
  {
    id: "navy-shorts",
    name: "Seamless Shorts - Navy",
    price: 45,
    image: "/images/navy-shorts.jpg",
    color: "Navy",
    description: "High-waisted • Squat-proof • Seamless",
    rating: 5,
  },
  {
    id: "mauve-shorts",
    name: "Seamless Shorts - Mauve",
    price: 45,
    image: "/images/pink-shorts.jpg",
    color: "Mauve",
    description: "High-waisted • Squat-proof • Seamless",
    rating: 5,
  },
]

export default function STLRClothingBrand() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [email, setEmail] = useState("")
  const [checkoutStep, setCheckoutStep] = useState(1) // 1: Info, 2: Payment, 3: Confirmation
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const addToCart = (product: Product, size = "M") => {
    const existingItem = cart.find((item) => item.id === product.id && item.size === size)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
    } else {
      setCart([...cart, { ...product, quantity: 1, size }])
    }
    setSelectedProduct(null)
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart(cart.filter((item) => !(item.id === productId && item.size === size)))
  }

  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size)
    } else {
      setCart(
        cart.map((item) => (item.id === productId && item.size === size ? { ...item, quantity: newQuantity } : item)),
      )
    }
  }

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
    } else {
      setWishlist([...wishlist, productId])
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getShipping = () => {
    return getTotalPrice() >= 75 ? 0 : 8.99
  }

  const getTax = () => {
    return (getTotalPrice() * 0.08).toFixed(2)
  }

  const getFinalTotal = () => {
    return (getTotalPrice() + getShipping() + Number.parseFloat(getTax())).toFixed(2)
  }

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`Thank you for subscribing with ${email}!`)
      setEmail("")
    }
  }

  const handleCheckoutFormChange = (field: keyof CheckoutForm, value: string) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkoutStep === 1) {
      // Validate shipping info
      if (checkoutForm.email && checkoutForm.firstName && checkoutForm.lastName && checkoutForm.address) {
        setCheckoutStep(2)
      } else {
        alert("Please fill in all required fields")
      }
    } else if (checkoutStep === 2) {
      // Validate payment info
      if (checkoutForm.cardNumber && checkoutForm.expiryDate && checkoutForm.cvv && checkoutForm.nameOnCard) {
        setCheckoutStep(3)
        // Simulate order processing
        setTimeout(() => {
          alert("Order placed successfully! Order #STLR-" + Math.random().toString(36).substr(2, 9).toUpperCase())
          setCart([])
          setIsCheckoutOpen(false)
          setCheckoutStep(1)
          setCheckoutForm({
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            nameOnCard: "",
          })
        }, 2000)
      } else {
        alert("Please fill in all payment details")
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/images/stlr-logo.png" alt="STLR Logo" width={320} height={120} className="h-32 w-auto" />
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("shorts")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Shorts
            </button>
            <button
              onClick={() => scrollToSection("sports-bras")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Sports Bras
            </button>
            <button
              onClick={() => scrollToSection("collections")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-600 transition-colors font-medium"
            >
              About
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="relative">
              <ShoppingBag
                className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => setIsCartOpen(true)}
              />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => scrollToSection("shorts")}>
              Shop Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 border-b pb-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                        <p className="font-semibold">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>{getShipping() === 0 ? "FREE" : `$${getShipping()}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${getTax()}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${getFinalTotal()}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setIsCartOpen(false)
                      setIsCheckoutOpen(true)
                    }}
                  >
                    Checkout
                  </Button>
                  <button
                    className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    onClick={() => {
                      if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
                        alert(`Apple Pay checkout for $${getFinalTotal()} - Demo only`)
                      } else {
                        alert("Apple Pay not available on this device/browser")
                      }
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span>Pay</span>
                  </button>
                  <div className="text-xs text-gray-500 text-center">Secure checkout with Touch ID or Face ID</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCheckoutOpen(false)} />
          <div className="absolute inset-4 bg-white rounded-lg shadow-xl max-w-4xl mx-auto overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold">Checkout</h2>
              <button onClick={() => setIsCheckoutOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div>
                  {/* Progress Steps */}
                  <div className="flex items-center mb-8">
                    <div className={`flex items-center ${checkoutStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {checkoutStep > 1 ? "✓" : "1"}
                      </div>
                      <span className="ml-2 font-medium">Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                    <div className={`flex items-center ${checkoutStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {checkoutStep > 2 ? "✓" : "2"}
                      </div>
                      <span className="ml-2 font-medium">Payment</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                    <div className={`flex items-center ${checkoutStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                      >
                        {checkoutStep > 3 ? "✓" : "3"}
                      </div>
                      <span className="ml-2 font-medium">Confirm</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutSubmit}>
                    {checkoutStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Contact Information
                        </h3>
                        <input
                          type="email"
                          placeholder="Email address"
                          value={checkoutForm.email}
                          onChange={(e) => handleCheckoutFormChange("email", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />

                        <h3 className="text-lg font-semibold flex items-center mt-6">
                          <MapPin className="w-5 h-5 mr-2" />
                          Shipping Address
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First name"
                            value={checkoutForm.firstName}
                            onChange={(e) => handleCheckoutFormChange("firstName", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Last name"
                            value={checkoutForm.lastName}
                            onChange={(e) => handleCheckoutFormChange("lastName", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Address"
                          value={checkoutForm.address}
                          onChange={(e) => handleCheckoutFormChange("address", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={checkoutForm.city}
                            onChange={(e) => handleCheckoutFormChange("city", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={checkoutForm.state}
                            onChange={(e) => handleCheckoutFormChange("state", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code"
                            value={checkoutForm.zipCode}
                            onChange={(e) => handleCheckoutFormChange("zipCode", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    )}

                    {checkoutStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Payment Information
                        </h3>
                        <input
                          type="text"
                          placeholder="Name on card"
                          value={checkoutForm.nameOnCard}
                          onChange={(e) => handleCheckoutFormChange("nameOnCard", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Card number"
                          value={checkoutForm.cardNumber}
                          onChange={(e) => handleCheckoutFormChange("cardNumber", e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={checkoutForm.expiryDate}
                            onChange={(e) => handleCheckoutFormChange("expiryDate", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={checkoutForm.cvv}
                            onChange={(e) => handleCheckoutFormChange("cvv", e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {checkoutStep === 3 && (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3 className="text-lg font-semibold">Processing your order...</h3>
                        <p className="text-gray-600">Please wait while we process your payment</p>
                      </div>
                    )}

                    {checkoutStep < 3 && (
                      <div className="flex justify-between mt-8">
                        {checkoutStep > 1 && (
                          <Button type="button" variant="outline" onClick={() => setCheckoutStep(checkoutStep - 1)}>
                            Back
                          </Button>
                        )}
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white ml-auto">
                          {checkoutStep === 1 ? "Continue to Payment" : "Place Order"}
                        </Button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            Size: {item.size} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-semibold">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>{getShipping() === 0 ? "FREE" : `$${getShipping()}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${getTax()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${getFinalTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProduct(null)} />
          <div className="absolute inset-4 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Select Size</h2>
              <button onClick={() => setSelectedProduct(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={300}
                  height={300}
                  className="w-full rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <p className="text-2xl font-bold mb-4">${selectedProduct.price}</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <div className="flex space-x-2">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded ${
                            selectedSize === size ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(selectedProduct, selectedSize)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4">New Seamless Collection</Badge>
                <h1 className="text-5xl md:text-7xl font-black leading-tight">
                  SEAMLESS<span className="block text-blue-600">PERFECTION</span>
                </h1>
                <p className="text-xl text-gray-600 mt-6 max-w-lg">
                  Discover our signature seamless athletic wear. Designed for comfort, engineered for performance,
                  crafted for the modern athlete.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  onClick={() => scrollToSection("shorts")}
                >
                  Shop Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg"
                  onClick={() => scrollToSection("collections")}
                >
                  View Lookbook
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/shorts-collection.jpg"
                  alt="STLR Seamless Shorts Collection"
                  width={600}
                  height={600}
                  className="w-full h-[600px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">SHIPPING</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Shorts */}
      <section id="shorts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Seamless <span className="text-blue-600">Shorts</span>
            </h2>
            <p className="text-xl text-gray-600">Our signature high-waisted seamless shorts collection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all bg-white"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {index === 0 && (
                    <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-600">Best Seller</Badge>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        wishlist.includes(product.id) ? "text-red-500 fill-red-500" : "text-white hover:text-blue-600"
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <div className="flex">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Bras Section */}
      <section id="sports-bras" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/sports-bras.jpg"
                alt="STLR Sports Bras Collection"
                width={600}
                height={500}
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4">Complete Your Set</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Sports <span className="text-blue-600">Bras</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Match your seamless shorts with our supportive sports bras. Available in all your favorite colors for
                  the perfect coordinated look.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Medium to high support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Seamless construction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Moisture-wicking fabric</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Available in 5 colors</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                onClick={() => alert("Sports Bras coming soon!")}
              >
                Shop Sports Bras
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section id="collections" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mix & <span className="text-blue-600">Match</span>
            </h2>
            <p className="text-xl text-gray-600">Create your perfect workout set with our coordinating pieces</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <Image
                  src="/images/shorts-trio.jpg"
                  alt="STLR Shorts Trio"
                  width={500}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">STLR Azul Collection</h3>
                  <p className="text-lg opacity-90">Azul, Navy & Sky - $120</p>
                  <Button
                    className="mt-4 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      // Add all three blue products to cart
                      const blueProducts = products.filter(
                        (p) => p.color === "Blue" || p.color === "Navy" || p.color === "Sky",
                      )
                      blueProducts.forEach((product) => addToCart(product))
                      alert("Azul Collection added to cart!")
                    }}
                  >
                    Shop Bundle
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative">
                <Image
                  src="/images/blue-shorts.jpg"
                  alt="Blue Collection"
                  width={500}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Ocean Blue</h3>
                  <p className="text-lg opacity-90">Complete your blue set</p>
                  <Button
                    className="mt-4 bg-white text-black hover:bg-gray-100"
                    onClick={() => {
                      const blueProduct = products.find((p) => p.color === "Blue")
                      if (blueProduct) {
                        setSelectedProduct(blueProduct)
                      }
                    }}
                  >
                    Shop Blue
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="about" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-blue-600">STLR</span> Story
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Born from a passion for seamless design and uncompromising quality, STLR creates athletic wear that moves
              with you. Our signature seamless construction eliminates chafing and provides unmatched comfort, while our
              carefully curated color palette ensures you always look stellar.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-600">Seamless Construction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                <div className="text-gray-600">Signature Colors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">∞</div>
                <div className="text-gray-600">Mix & Match Options</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $75</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Quality Promise</h3>
              <p className="text-gray-600">Premium seamless fabric</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">5-Star Rated</h3>
              <p className="text-gray-600">Loved by athletes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Join the <span className="text-blue-600">STLR</span> Family
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be the first to know about new colors, exclusive drops, and styling tips
          </p>
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-blue-200"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center mb-4">
              <Image src="/images/stlr-logo.png" alt="STLR Logo" width={400} height={160} className="h-40 w-auto" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button onClick={() => scrollToSection("shorts")} className="hover:text-blue-600 transition-colors">
                    Seamless Shorts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("sports-bras")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Sports Bras
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("collections")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Bundles
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("shorts")} className="hover:text-blue-600 transition-colors">
                    New Arrivals
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    onClick={() => alert("Size guide coming soon!")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Care instructions coming soon!")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Care Instructions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Returns info coming soon!")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert("Contact us at hello@stlr.com")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    onClick={() => window.open("https://instagram.com", "_blank")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Instagram
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open("https://tiktok.com", "_blank")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    TikTok
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open("https://pinterest.com", "_blank")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Pinterest
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.open("https://youtube.com", "_blank")}
                    className="hover:text-blue-600 transition-colors"
                  >
                    YouTube
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>© 2024 STLR. All rights reserved. • Seamless by design, stellar by nature.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
