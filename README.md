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

<img width="561" height="1262" alt="home" src="https://github.com/user-attachments/assets/23bf255e-98fe-4d15-93af-d437f0b07d6a" />

    Shopping cart
    
<img width="565" height="1262" alt="shop" src="https://github.com/user-attachments/assets/14dc850b-35fa-4b3a-b272-785988e026cf" />

    Product page

<img width="566" height="1267" alt="prod" src="https://github.com/user-attachments/assets/94b58041-d52b-4e04-8b46-6c80df2c0ceb" />

    Hours page
    
<img width="562" height="1262" alt="hours" src="https://github.com/user-attachments/assets/0842161f-4dd2-4630-a21e-a3778cf943d5" />

      Menu page
      
<img width="565" height="1265" alt="menu" src="https://github.com/user-attachments/assets/bcad85b1-6a8c-4794-a2cf-06f65139b839" />

SCREENSHOTS EMPLOYEE POV:

    Point of Sale

<img width="559" height="1260" alt="pos1" src="https://github.com/user-attachments/assets/b0953661-3c3a-496d-83d8-13a6f257050f" />
<img width="566" height="1259" alt="pos2" src="https://github.com/user-attachments/assets/6c554566-8797-4701-b25b-4a29a0afcfc5" />

    Inventory Management
    
<img width="566" height="1263" alt="inv" src="https://github.com/user-attachments/assets/131ec40a-3d60-4110-81b8-b35a8253c8d8" />

      Add New Item window

<img width="568" height="1258" alt="add" src="https://github.com/user-attachments/assets/aa85ebc1-1f3a-4706-a09e-6132092e1403" />
   
    Single Inventory page (can update)

<img width="563" height="1256" alt="single" src="https://github.com/user-attachments/assets/a27f3234-c47d-4b6c-9238-f2aba852228c" />

    Orders page
    
<img width="563" height="1261" alt="orders" src="https://github.com/user-attachments/assets/943e3b88-480b-49f5-83cd-ad09113f5b4b" />

      Settings page

<img width="557" height="1249" alt="sett" src="https://github.com/user-attachments/assets/e4d53e62-7fae-4d10-95b1-77838eae2d88" />

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
