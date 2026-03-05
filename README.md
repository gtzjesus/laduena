      La Dueña – Business Management & POS System (V2)

A second-generation full-stack commerce and operations platform designed for complete retail business control.

La Dueña V2 is an evolved version of the original system — rebuilt with enhanced UI/UX, expanded inventory controls, improved search performance, and deeper administrative capabilities.

This system is built for real-world retail operations requiring speed, reliability, and precision.

This system provides:

    Customer shopping experience
    
    Inventory management
    
    Sales & revenue tracking
    
    Role-based access control
    
    Administrative dashboard
    
    Secure authentication & authorization

WEB IS LIVE AT:

    laduena.store
    laduena.store/admin/pos

Overview

La Dueña V2 is a comprehensive retail management system that handles:

Customer-Side Experience

    Secure account registration & login

    Modern responsive UI

    Product browsing with optimized search

    Dynamic category filtering

    Real-time shopping cart updates

    Secure checkout workflow

    Order history tracking

Employee & Administrative Operations
    
    Full Point of Sale (POS) system
    
    Advanced inventory management
    
    Real-time stock adjustments
    
    Add inventory
    
    Subtract inventory
    
    Edit product details
    
    Delete products
    
    Update stock quantities instantly
    
    Order management & status control
    
    Sales reporting
    
    Revenue tracking
    
    QR code generation for POS scanning
    
    Role-based access control

Tech Stack

Frontend

    React (via Next.js App Router)
    
    TypeScript
    
    Server Components
    
    Responsive UI architecture

Backend

    Next.js API Route Handlers
    
    Node.js runtime
    
    RESTful API design

    Secure authentication & authorization middleware

Database & CMS

    Sanity (Headless CMS)
    
    GROQ query language
    
    Asset management for image uploads

DevOps & Tooling

    Git version control
    
    REST best practices
    
    Modular service structure

What’s New in V2

La Dueña V2 introduces major system upgrades:

    Improved UI/UX
    
    Cleaner interface
    
    Faster interactions
    
    Better visual hierarchy
    
    Optimized mobile responsiveness
    
    Streamlined admin workflows

    Advanced Inventory Controls
    
    Live quantity adjustments
    
    Add / subtract inventory directly from dashboard
    
    Edit product information dynamically
    
    Delete inventory safely
    
    Improved stock tracking accuracy

    Enhanced Search System
    
    Faster search queries
    
    Better filtering logic
    
    Improved product discovery
    
    Refactored Architecture
    
    Cleaner backend modularization
    
    Improved API structure
    
    Optimized database querying
    
    Better separation of concerns

This version is built to be client-ready and scalable for high-volume seasonal operations.

Core Features

Commerce

    Product search & filtering
    
    Category navigation
    
    Real-time cart updates
    
    Order placement & tracking
    
    Secure authentication system

Point of Sale (POS)

    Scan products via QR code
    
    Fast transaction processing
    
    Direct inventory deduction
    
    Employee-access interface

Inventory Management

    Create products (CRUD)
    
    Edit product details
    
    Delete products
    
    Adjust stock quantities
    
    Track stock levels
    
    Manage categories

Analytics & Reporting

    Revenue monitoring
    
    Sales tracking
    
    Order management dashboard

    Performance insights

Architecture & Scalability

La Dueña V2 was built with scalability and reliability in mind:

    Stateless API design
    
    Optimized query indexing
    
    Pagination for large datasets
    
    Clean database schema for transactional integrity
    
    Modular backend architecture
    
    Separation between presentation and data layers
    
Designed to handle peak seasonal sales traffic efficiently.
    
Code version control using Git

    Separation of concerns between frontend and backend
    
    Follows REST API best practices

Scalability Considerations

    Designed to support high seasonal sales volume
    
    Efficient query indexing
    
    Pagination for large datasets
    
    Stateless API design
    
    Modular service structure

Testing

    Manual functional testing
    
    API endpoint validation (Postman)
    
    Edge case scenario testing
    
    Inventory update validation
    
    Role-based access testing

What This Version Represents

La Dueña V2 represents:

    Improved system maturity
    
    Stronger UI/UX execution
    
    Full CRUD operational control
    
    Real-world retail optimization
    
    Production-style architecture refinement
    


SCREENSHOTS CUSTOMER POV:

    Home page

<img width="545" height="1253" alt="home" src="https://github.com/user-attachments/assets/ff9a354a-5ea9-47f8-9134-4568706162f6" />

    Shopping cart

<img width="562" height="1261" alt="basker" src="https://github.com/user-attachments/assets/9f966423-8d2b-463b-b681-5595fa30c1fa" />

    Product page

<img width="556" height="1261" alt="prod" src="https://github.com/user-attachments/assets/5fbc0f1b-830a-4046-b0be-1612b83ad80f" />

    Categories section

<img width="562" height="1211" alt="cats" src="https://github.com/user-attachments/assets/41589ce4-eb81-4a53-83bd-67d283c51f2f" />

    Search popup

<img width="564" height="1264" alt="search" src="https://github.com/user-attachments/assets/bfd84de0-7f5c-404a-8b19-bc058d81a073" />

SCREENSHOTS EMPLOYEE POV:

    Point of Sale

<img width="564" height="1259" alt="dashy" src="https://github.com/user-attachments/assets/874e6670-4855-4e9e-9837-f35b4f4780ef" />

    Inventory Management
    
<img width="565" height="1264" alt="inv" src="https://github.com/user-attachments/assets/0236f6f4-089b-4f11-af45-7b04b482adc7" />

    Single Inventory page (can update)
    
<img width="561" height="887" alt="editabe" src="https://github.com/user-attachments/assets/5626a544-3979-4a79-b88b-45e3e599c452" />

    Orders page
    
<img width="565" height="1259" alt="orders" src="https://github.com/user-attachments/assets/42db67ff-e00f-4c5d-a060-d21f0c88d270" />

    Order page

<img width="564" height="1121" alt="order" src="https://github.com/user-attachments/assets/a88545dc-841b-41ef-a6e7-c99563599d92" />

    QR Code page (creates QR codes for every product to be scanned at POS page
    
<img width="562" height="1204" alt="QR" src="https://github.com/user-attachments/assets/455e8f3e-df61-4d84-aa97-65f9a0c1af0d" />

Future Improvements

    Payment gateway integration (Stripe / PayPal)
    
    Automated export reports (CSV / PDF)
    
    Full automated testing suite
    
    Docker containerization
    
    CI/CD deployment pipeline
    
    Multi-location support
    
    Advanced analytics dashboard

Installation
    git clone https://github.com/yourusername/la-duena-v2.git
    cd la-duena-v2
Backend Setup
    # Install dependencies
    npm install

# Configure environment variables
# Add SANITY credentials
# Add JWT secrets

# Run development server
npm run dev
    Frontend Setup
npm install
npm run dev
